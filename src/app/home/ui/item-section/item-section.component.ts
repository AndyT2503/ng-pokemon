import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { DATA_TYPE } from 'src/app/shared/constants';
import { Result } from 'src/app/shared/models';
import { ImageUrlPipe } from 'src/app/shared/pipes';
import { ItemService } from 'src/app/shared/services';
import { CardComponent } from 'src/app/shared/ui';

@Component({
  selector: 'app-item-section',
  standalone: true,
  imports: [CommonModule, CardComponent, ImageUrlPipe],
  templateUrl: './item-section.component.html',
  styleUrls: ['./item-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemSectionComponent implements OnInit {
  private readonly itemService = inject(ItemService);
  private readonly cdr = inject(ChangeDetectorRef);
  readonly DATA_TYPE = DATA_TYPE;
  listItem: Result[] = [];

  ngOnInit(): void {
    this.itemService.getList(1, 10).subscribe((x) => {
      this.listItem = x.results;
      this.cdr.markForCheck();
    });
  }

}
