import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ItemSectionComponent } from './ui/item-section/item-section.component';
import { PokemonSectionComponent } from './ui/pokemon-section/pokemon-section.component';
import { TrailerComponent } from './ui/trailer/trailer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TrailerComponent, PokemonSectionComponent, ItemSectionComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
}
