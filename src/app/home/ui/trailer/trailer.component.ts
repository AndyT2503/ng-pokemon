import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component, inject
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';


@Component({
  selector: 'app-trailer',
  standalone: true,
  imports: [CommonModule, NzCarouselModule],
  templateUrl: './trailer.component.html',
  styleUrls: ['./trailer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrailerComponent {
  private readonly domSanitizer = inject(DomSanitizer);
  private readonly videoIds = [
    'D0zYJ1RQ-fs',
    '1roy4o4tqQM',
    'bILE5BEyhdo',
    'uBYORdr_TY8',
  ];

  safeUrls = this.videoIds.map((id) =>
    this.domSanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${id}`
    )
  );
}
