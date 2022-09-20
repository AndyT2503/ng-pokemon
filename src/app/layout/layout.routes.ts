import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: 'home',
    loadComponent: () =>
      import('../home/home.component').then((c) => c.HomeComponent),
    title: 'Home',
  },
  {
    path: 'pokemon-list',
    loadComponent: () =>
      import('../pokemon-list/pokemon-list.component').then(
        (c) => c.PokemonListComponent
      ),
    title: 'Pokemon List',
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
];
