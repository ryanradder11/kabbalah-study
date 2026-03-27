import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TreeCanvasComponent } from '../tree-canvas/tree-canvas.component';

@Component({
  selector: 'app-tree-view',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatSlideToggleModule, TreeCanvasComponent],
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss'],
})
export class TreeViewComponent {
  readonly showDaat = signal(false);
  readonly showQliphoth = signal(false);
}
