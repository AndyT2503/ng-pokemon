import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { DATA_TYPE } from 'src/app/shared/constants';
import { Pokemon, Result } from 'src/app/shared/models';
import { ImageUrlPipe } from 'src/app/shared/pipes';
import { PokemonService } from 'src/app/shared/services';
import { CardComponent, PokemonDetailComponent } from 'src/app/shared/ui';

@Component({
  selector: 'app-pokemon-section',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    NzModalModule,
    RouterModule,
    ImageUrlPipe,
  ],
  templateUrl: './pokemon-section.component.html',
  styleUrls: ['./pokemon-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonSectionComponent implements OnInit {
  private readonly pokemonService = inject(PokemonService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly httpClient = inject(HttpClient);
  private readonly modalService = inject(NzModalService);
  readonly DATA_TYPE = DATA_TYPE;
  listPokemon: Result[] = [];

  ngOnInit(): void {
    this.pokemonService.getList(1, 10).subscribe((x) => {
      this.listPokemon = x.results;
      this.cdr.markForCheck();
    });
  }

  showDetail(value: Result): void {
    this.httpClient.get<Pokemon>(value.url).subscribe((res) => {
      this.modalService.create({
        nzTitle: 'Pokemon Info',
        nzContent: PokemonDetailComponent,
        nzComponentParams: {
          pokemon: res,
        },
        nzFooter: null,
      });
    });
  }
}
