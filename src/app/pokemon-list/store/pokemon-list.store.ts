import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { NzMessageService } from 'ng-zorro-antd/message';
import {
  combineLatestWith,
  debounceTime,
  defer, map,
  switchMap,
  tap
} from 'rxjs';
import {
  DEFAULT_LIMIT,
  DEFAULT_OFFSET,
  MAX_LIMIT
} from 'src/app/shared/constants';
import { Pagination } from 'src/app/shared/models';
import { PokemonService } from 'src/app/shared/services';

export interface PokemonListState extends Pagination {
  nameFilter: string;
  limit: number;
  offset: number;
  cacheResults: Pagination;
}

const initialState = (): PokemonListState => {
  return {
    count: 0,
    nameFilter: '',
    limit: DEFAULT_LIMIT,
    offset: DEFAULT_OFFSET,
    results: [],
    next: null,
    previous: null,
    cacheResults: {} as Pagination,
  };
};

@Injectable()
export class PokemonListStore extends ComponentStore<PokemonListState> {
  constructor(
    private readonly pokemonService: PokemonService,
    private readonly nzMessage: NzMessageService
  ) {
    super(initialState());
  }

  readonly updateVm = this.updater((state, vm: Pagination) => ({
    ...state,
    results: vm.results,
    count: vm.count,
    next: vm.next,
    previous: vm.previous,
  }));

  readonly updateLimit = this.updater((state, limit: number) => ({
    ...state,
    offset: 1,
    limit,
  }));

  readonly updateOffset = this.updater((state, offset: number) => ({
    ...state,
    offset,
  }));

  readonly updateCacheResult = this.updater((state, results: Pagination) => ({
    ...state,
    cacheResults: results,
  }));

  readonly updateNameFilter = this.updater((state, nameFilter: string) => ({
    ...state,
    offset: 1,
    nameFilter,
  }));

  readonly results$ = this.select((state) => state.results);
  readonly count$ = this.select((state) => state.count);

  readonly vm$ = this.select(this.results$, this.count$, (results, count) => ({
    results,
    count,
  }));

  readonly limit$ = this.select((state) => state.limit);
  readonly offset$ = this.select((state) => state.offset);
  readonly nameFilter$ = this.select((state) => state.nameFilter);

  readonly getList = this.effect(() => {
    const limit$ = this.limit$;
    const offset$ = this.offset$;
    const nameFilter$ = this.nameFilter$;
    return limit$.pipe(
      combineLatestWith(offset$, nameFilter$),
      debounceTime(300),
      switchMap(([limit, offset, nameFilter]) =>
        defer(() => {
          if (!nameFilter && !this.get().cacheResults.results) {
            return this.pokemonService.getList(offset, limit);
          } else {
            if (!this.get().cacheResults.results) {
              return this.pokemonService
                .getList(DEFAULT_OFFSET, MAX_LIMIT)
                .pipe(
                  tap((res) => {
                    this.updateCacheResult(structuredClone(res));
                  }),
                  map((res) => {
                    res.results = res.results.filter((x) =>
                      x.name.includes(nameFilter)
                    );
                    res.count = res.results.length;
                    res.results = res.results.slice(
                      (offset - 1) * limit,
                      limit * offset
                    );
                    return res;
                  })
                );
            } else {
              return this.select((s) => s.cacheResults).pipe(
                map((res) => {
                  const cloneRes = structuredClone(res) as Pagination;
                  cloneRes.results = cloneRes.results.filter((x) =>
                    x.name.includes(nameFilter)
                  );
                  cloneRes.count = cloneRes.results.length;
                  cloneRes.results = cloneRes.results.slice(
                    (offset - 1) * limit,
                    limit * offset
                  );
                  return cloneRes;
                })
              );
            }
          }
        }).pipe(
          tapResponse(
            (res) => this.updateVm(res),
            (err: HttpErrorResponse) => this.nzMessage.error(err.error)
          )
        )
      )
    );
  });
}
