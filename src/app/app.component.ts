import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import en from '@angular/common/locales/en';
import {
  ChangeDetectionStrategy,
  Component,
  importProvidersFrom,
} from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, TitleStrategy } from '@angular/router';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { interceptorProviders } from './shared/interceptors';
import { TitleStrategyService } from './shared/services';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule],
  standalone: true,
})
export class App {
  static bootstrap() {
    registerLocaleData(en);
    bootstrapApplication(this, {
      providers: [
        { provide: NZ_I18N, useValue: en_US },
        {
          provide: TitleStrategy,
          useClass: TitleStrategyService,
        },
        ...interceptorProviders,
        importProvidersFrom(
          NzMessageModule,
          BrowserAnimationsModule,
          RouterModule.forRoot([
            {
              path: '',
              loadComponent: () =>
                import('./layout/layout.component').then(
                  (c) => c.LayoutComponent
                ),
              loadChildren: () =>
                import('./layout/layout.routes').then((m) => m.routes),
            },
          ], {
            scrollPositionRestoration: 'top'
          }),
          HttpClientModule
        ),
      ],
    }).catch((err) => console.error(err));
  }
}
