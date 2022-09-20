import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter, Input, Output
} from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { NzCardModule } from 'ng-zorro-antd/card';
import { Result } from '../../models';


@Component({
  selector: 'app-card[cardItem]',
  standalone: true,
  imports: [CommonModule, NzCardModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input() cardItemImage!: SafeResourceUrl;

  @Output() onClick = new EventEmitter<Result>();

  @Input() cardItem!: Result;


  clickItem(): void {
    this.onClick.emit(this.cardItem);
  }
}
