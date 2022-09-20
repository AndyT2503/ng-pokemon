import { RouterModule } from '@angular/router';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { MenuStore } from './store/menu.store';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, NzMenuModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MenuStore],
})
export class HeaderComponent {
  private readonly menuStore = inject(MenuStore);

  readonly vm$ = this.menuStore.vm$;
}
