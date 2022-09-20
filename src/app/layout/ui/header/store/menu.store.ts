import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { forkJoin } from 'rxjs';
import { GameService } from 'src/app/shared/services';

export interface MenuState {
  gameVersions: string[];
  gameGenerations: string[];
}

const initialState = (): MenuState => {
  return {
    gameGenerations: [],
    gameVersions: [],
  };
};

@Injectable()
export class MenuStore extends ComponentStore<MenuState> {
  constructor(
    private readonly gameService: GameService,
    private readonly nzMessage: NzMessageService
  ) {
    super(initialState());
  }

  private readonly gameVersions$ = this.select((x) => x.gameVersions);
  private readonly gameGenerations$ = this.select((x) => x.gameGenerations);
  private readonly updateVm = this.updater(
    (state, vm: { gameVersions: string[]; gameGenerations: string[] }) => ({
      ...state,
      gameGenerations: vm.gameGenerations,
      gameVersions: vm.gameVersions,
    })
  );

  readonly vm$ = this.select(
    this.gameGenerations$,
    this.gameVersions$,
    (gameGenerations, gameVersions) => ({
      gameGenerations,
      gameVersions,
    }),
  );

  private readonly getMenuData = this.effect(() =>
    forkJoin([
      this.gameService.getListGeneration(),
      this.gameService.getListVersion(),
    ]).pipe(
      tapResponse(
        ([gameGenerations, gameVersions]) => {
          this.updateVm({
            gameGenerations: gameGenerations.results.map((x) => x.name),
            gameVersions: gameVersions.results.map((x) => x.name),
          });
        },
        (err: HttpErrorResponse) => this.nzMessage.error(err.error)
      )
    )
  );
}
