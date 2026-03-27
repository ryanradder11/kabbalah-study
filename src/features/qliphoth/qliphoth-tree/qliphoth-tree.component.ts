import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { QliphothService } from '../../../core/services/qliphoth.service';

@Component({
  selector: 'app-qliphoth-tree',
  standalone: true,
  imports: [RouterLink, TitleCasePipe, MatCardModule, MatButtonModule],
  templateUrl: './qliphoth-tree.component.html',
  styleUrls: ['./qliphoth-tree.component.scss'],
})
export class QliphothTreeComponent {
  private readonly qliphothSvc = inject(QliphothService);
  readonly qliphoth = this.qliphothSvc.qliphoth;
}
