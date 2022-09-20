import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: 'home',
    loadComponent: () =>
      import('../home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'pokemon-list',
    loadComponent: () =>
      import('../pokemon-list/pokemon-list.component').then((c) => c.PokemonListComponent),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
];
