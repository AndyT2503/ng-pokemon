import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input
} from '@angular/core';
import { Pokemon } from 'src/app/shared/models';
import { NzGridModule } from 'ng-zorro-antd/grid';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [CommonModule, NzGridModule],
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonDetailComponent {
  @Input() pokemon!: Pokemon;
}
