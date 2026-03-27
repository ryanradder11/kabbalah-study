import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

interface NavItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, RouterLink, RouterLinkActive,
    MatToolbarModule, MatSidenavModule, MatIconModule,
    MatButtonModule, MatListModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  readonly sidenavOpen = signal(true);

  readonly navItems: NavItem[] = [
    { label: 'Dashboard', icon: 'home', route: '/' },
    { label: 'Tree of Life', icon: 'account_tree', route: '/tree' },
    { label: 'Sefirot', icon: 'brightness_7', route: '/sefirot' },
    { label: 'Paths', icon: 'linear_scale', route: '/paths' },
    { label: 'Four Worlds', icon: 'layers', route: '/worlds' },
    { label: 'Qliphoth', icon: 'dark_mode', route: '/qliphoth' },
    { label: 'Gematria', icon: 'calculate', route: '/gematria' },
    { label: 'Flashcards', icon: 'style', route: '/study/flashcards' },
    { label: 'Quiz', icon: 'quiz', route: '/study/quiz' },
    { label: 'Notes', icon: 'notes', route: '/notes' },
    { label: 'Bookmarks', icon: 'bookmark', route: '/bookmarks' },
  ];

  toggleSidenav(): void {
    this.sidenavOpen.update(v => !v);
  }
}
