import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('../features/dashboard/dashboard.component').then(m => m.DashboardComponent) },
  { path: 'tree', loadComponent: () => import('../features/tree/tree-view/tree-view.component').then(m => m.TreeViewComponent) },
  { path: 'sefirot', loadComponent: () => import('../features/sefirot/sefirot-list/sefirot-list.component').then(m => m.SefirotListComponent) },
  { path: 'sefirot/:id', loadComponent: () => import('../features/sefirot/sefirah-detail/sefirah-detail.component').then(m => m.SefirahDetailComponent) },
  { path: 'paths', loadComponent: () => import('../features/paths/paths-list/paths-list.component').then(m => m.PathsListComponent) },
  { path: 'paths/:id', loadComponent: () => import('../features/paths/path-detail/path-detail.component').then(m => m.PathDetailComponent) },
  { path: 'worlds', loadComponent: () => import('../features/worlds/worlds-overview/worlds-overview.component').then(m => m.WorldsOverviewComponent) },
  { path: 'worlds/:id', loadComponent: () => import('../features/worlds/world-detail/world-detail.component').then(m => m.WorldDetailComponent) },
  { path: 'qliphoth', loadComponent: () => import('../features/qliphoth/qliphoth-tree/qliphoth-tree.component').then(m => m.QliphothTreeComponent) },
  { path: 'qliphoth/:id', loadComponent: () => import('../features/qliphoth/qliphah-detail/qliphah-detail.component').then(m => m.QliphahDetailComponent) },
  { path: 'gematria', loadComponent: () => import('../features/gematria/gematria-calculator/gematria-calculator.component').then(m => m.GematriaCalculatorComponent) },
  { path: 'study/flashcards', loadComponent: () => import('../features/study/flashcards/flashcards.component').then(m => m.FlashcardsComponent) },
  { path: 'study/quiz', loadComponent: () => import('../features/study/quiz/quiz.component').then(m => m.QuizComponent) },
  { path: 'notes', loadComponent: () => import('../features/notes/notes-list/notes-list.component').then(m => m.NotesListComponent) },
  { path: 'bookmarks', loadComponent: () => import('../features/bookmarks/bookmarks-list/bookmarks-list.component').then(m => m.BookmarksListComponent) },
  { path: '**', redirectTo: '' },
];
