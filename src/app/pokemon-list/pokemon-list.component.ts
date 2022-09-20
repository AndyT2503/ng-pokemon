import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import {
  debounceTime,
  distinctUntilChanged,
  map, takeUntil
} from 'rxjs';
import { DATA_TYPE } from '../shared/constants';
import { Pokemon, Result } from '../shared/models';
import { ImageUrlPipe } from '../shared/pipes';
import { CardComponent, PokemonDetailComponent } from '../shared/ui';
import { PokemonListStore } from './store/pokemon-list.store';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    NzModalModule,
    NzPaginationModule,
    NzInputModule,
    ReactiveFormsModule,
    ImageUrlPipe
  ],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PokemonListStore],
})
export class PokemonListComponent implements OnInit {
  private readonly pokemonListStore = inject(PokemonListStore);
  private readonly httpClient = inject(HttpClient);
  private readonly modalService = inject(NzModalService);
  readonly DATA_TYPE = DATA_TYPE;
  formSearch = new FormControl<string>('', {
    nonNullable: true,
  });

  vm$ = this.pokemonListStore.vm$;

  limit$ = this.pokemonListStore.limit$;
  offset$ = this.pokemonListStore.offset$;

  ngOnInit(): void {
    this.setupSearchForm();
  }

  private setupSearchForm(): void {
    this.formSearch.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.pokemonListStore.destroy$)
      )
      .subscribe((value) => this.pokemonListStore.updateNameFilter(value));
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

  onPageIndexChange(index: number): void {
    this.pokemonListStore.updateOffset(index);
  }

  onPageSizeChange(size: number): void {
    this.pokemonListStore.updateLimit(size);
  }
}
