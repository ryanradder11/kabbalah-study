import { Component, inject, computed, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { QliphothService } from '../../../core/services/qliphoth.service';

@Component({
  selector: 'app-qliphah-detail',
  standalone: true,
  imports: [RouterLink, TitleCasePipe, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './qliphah-detail.component.html',
  styleUrls: ['./qliphah-detail.component.scss'],
})
export class QliphahDetailComponent {
  @Input() set id(val: string) { this._id = val; }
  private _id = '';
  private readonly qliphothSvc = inject(QliphothService);
  readonly qliphah = computed(() => this.qliphothSvc.getById(this._id));
}
