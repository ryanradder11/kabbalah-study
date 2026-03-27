import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-flashcard-item',
  standalone: true,
  imports: [],
  template: `<div class="flashcard-item"></div>`,
  styles: ['.flashcard-item { display: contents; }'],
})
export class FlashcardItemComponent {
  @Input() front = '';
  @Input() back = '';
}
