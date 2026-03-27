import { Injectable, computed, inject } from '@angular/core';
import { StorageService } from './storage.service';
import { QuizSession, QuizQuestion } from '../models/storage.model';
import { SEFIROT } from '../../data/sefirot.data';
import { PATHS } from '../../data/paths.data';

type Topic = 'sefirot' | 'paths';

const SEFIRAH_ATTRS: Array<{ key: string; label: string; getValue: (s: typeof SEFIROT[0]) => string }> = [
  { key: 'divineName', label: 'What is the divine name of', getValue: s => s.divineNameTranslit },
  { key: 'archangel', label: 'Which Archangel governs', getValue: s => s.archangel },
  { key: 'angelicOrder', label: 'What is the Angelic Order of', getValue: s => s.angelicOrder },
  { key: 'mundaneChakra', label: 'What is the Mundane Chakra of', getValue: s => s.mundaneChakra },
  { key: 'virtue', label: 'What is the virtue of', getValue: s => s.virtue },
  { key: 'meaning', label: 'What does the name mean for', getValue: s => s.meaning },
];

const PATH_ATTRS: Array<{ key: string; label: string; getValue: (p: typeof PATHS[0]) => string }> = [
  { key: 'letterName', label: 'What Hebrew letter is on path', getValue: p => p.letterName },
  { key: 'letterMeaning', label: 'What does the letter on path mean for path', getValue: p => p.letterMeaning },
  { key: 'letterType', label: 'What type is the letter on path', getValue: p => p.letterType },
];

@Injectable({ providedIn: 'root' })
export class QuizService {
  private readonly storage = inject(StorageService);

  readonly history = computed(() => this.storage.store().quizHistory);

  generateSession(count: number, topics: Topic[]): QuizSession {
    const questions: QuizQuestion[] = [];
    const pool = this.buildPool(topics);

    for (let i = 0; i < count && pool.length > 0; i++) {
      const item = pool[Math.floor(Math.random() * pool.length)];
      const q = item.type === 'sefirah'
        ? this.makeSefirahQuestion(item.data as typeof SEFIROT[0])
        : this.makePathQuestion(item.data as typeof PATHS[0]);
      if (q) questions.push(q);
    }

    const session: QuizSession = {
      id: crypto.randomUUID(),
      startedAt: new Date().toISOString(),
      completedAt: null,
      questions,
      answers: [],
      score: 0,
      total: questions.length,
    };

    this.storage.update(store => ({
      ...store,
      quizHistory: [session, ...store.quizHistory].slice(0, 20),
    }));

    return session;
  }

  submitAnswer(sessionId: string, questionIndex: number, answerIndex: number): void {
    this.storage.update(store => ({
      ...store,
      quizHistory: store.quizHistory.map(s => {
        if (s.id !== sessionId) return s;
        const answers = [...s.answers];
        answers[questionIndex] = answerIndex;
        return { ...s, answers };
      }),
    }));
  }

  completeSession(sessionId: string): QuizSession | undefined {
    let result: QuizSession | undefined;
    this.storage.update(store => ({
      ...store,
      quizHistory: store.quizHistory.map(s => {
        if (s.id !== sessionId) return s;
        const score = s.questions.reduce(
          (acc, q, i) => acc + (s.answers[i] === q.correctIndex ? 1 : 0), 0
        );
        result = { ...s, completedAt: new Date().toISOString(), score };
        return result;
      }),
    }));
    return result;
  }

  private buildPool(topics: Topic[]): Array<{ type: string; data: unknown }> {
    const pool: Array<{ type: string; data: unknown }> = [];
    if (topics.includes('sefirot')) {
      SEFIROT.filter(s => !s.isHidden).forEach(s => pool.push({ type: 'sefirah', data: s }));
    }
    if (topics.includes('paths')) {
      PATHS.forEach(p => pool.push({ type: 'path', data: p }));
    }
    return pool;
  }

  private makeSefirahQuestion(s: typeof SEFIROT[0]): QuizQuestion | null {
    const attr = SEFIRAH_ATTRS[Math.floor(Math.random() * SEFIRAH_ATTRS.length)];
    const correct = attr.getValue(s);
    if (!correct) return null;

    const others = SEFIROT.filter(o => o.id !== s.id && attr.getValue(o) !== correct);
    const wrongs = this.sample(others, 3).map(attr.getValue);
    const options = this.shuffle([correct, ...wrongs]);

    return {
      id: crypto.randomUUID(),
      questionText: `${attr.label} ${s.transliteration}?`,
      options,
      correctIndex: options.indexOf(correct),
      entityType: 'sefirah',
      entityId: s.id,
      attribute: attr.key,
    };
  }

  private makePathQuestion(p: typeof PATHS[0]): QuizQuestion | null {
    const attr = PATH_ATTRS[Math.floor(Math.random() * PATH_ATTRS.length)];
    const correct = attr.getValue(p);
    if (!correct) return null;

    const others = PATHS.filter(o => o.id !== p.id && attr.getValue(o) !== correct);
    const wrongs = this.sample(others, 3).map(attr.getValue);
    const options = this.shuffle([correct, ...wrongs]);

    return {
      id: crypto.randomUUID(),
      questionText: `${attr.label} ${p.id} (${p.fromSefirah} → ${p.toSefirah})?`,
      options,
      correctIndex: options.indexOf(correct),
      entityType: 'path',
      entityId: String(p.id),
      attribute: attr.key,
    };
  }

  private sample<T>(arr: T[], n: number): T[] {
    const copy = [...arr];
    const result: T[] = [];
    for (let i = 0; i < n && copy.length > 0; i++) {
      const idx = Math.floor(Math.random() * copy.length);
      result.push(copy.splice(idx, 1)[0]);
    }
    return result;
  }

  private shuffle<T>(arr: T[]): T[] {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }
}
