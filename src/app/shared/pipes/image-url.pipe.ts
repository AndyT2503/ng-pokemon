import { inject, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { DATA_TYPE } from '../constants';
import { Result } from '../models';

@Pipe({
  name: 'imageUrl',
  standalone: true,
})
export class ImageUrlPipe implements PipeTransform {
  private readonly domSanitizer = inject(DomSanitizer);
  transform(value: Result, type: DATA_TYPE): SafeResourceUrl {
    if (type === DATA_TYPE.Pokemon) {
      return this.domSanitizer.bypassSecurityTrustResourceUrl(
        `${environment.spritesResourceUrl}/pokemon/shiny/${this.getId(value.url)}.png`
      );
    }
    if (type === DATA_TYPE.Item) {
      return this.domSanitizer.bypassSecurityTrustResourceUrl(
        `${environment.spritesResourceUrl}/items/${value.name}.png`
      );
    }
    throw new Error('Invalid Data Type');
  }

  private getId(url: string): string {
    const urlArr = url.split('/');
    return urlArr[urlArr.length - 2];
  }
}
