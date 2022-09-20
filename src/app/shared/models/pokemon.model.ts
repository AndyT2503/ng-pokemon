export interface Pokemon {
  abilities: Ability2[];
  base_experience: number;
  forms: Ability[];
  game_indices: GameIndex[];
  height: number;
  held_items: any[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Move[];
  name: string;
  order: number;
  past_types: any[];
  species: Ability;
  sprites: Sprites;
  stats: Stat[];
  types: Type[];
  weight: number;
}

interface Type {
  slot: number;
  type: Ability;
}

interface Stat {
  base_stat: number;
  effort: number;
  stat: Ability;
}

interface Sprites {
  back_default: string;
  back_female?: string;
  back_shiny: string;
  back_shiny_female?: string;
  front_default: string;
  front_female?: string;
  front_shiny: string;
  front_shiny_female?: string;
  other: Other;
  versions: Versions;
}

interface Versions {
  'generation-i': GenerationII;
  'generation-ii': GenerationII;
  'generation-iii': GenerationIII;
  'generation-iv': GenerationIV;
  'generation-v': Generationv;
  'generation-vi': GenerationVI;
  'generation-vii': GenerationVII;
  'generation-viii': GenerationVIII;
}

interface GenerationVIII {
  icons: Dreamworld;
}

interface GenerationVII {
  icons: Dreamworld;
  'ultra-sun-ultra-moon': Home;
}

interface GenerationVI {
  'omegaruby-alphasapphire': Home;
  'x-y': Home;
}

interface Generationv {
  'black-white': Blackwhite;
}

interface Blackwhite {
  animated: DiamondPearl;
  back_default: string;
  back_female?: any;
  back_shiny: string;
  back_shiny_female?: any;
  front_default: string;
  front_female?: any;
  front_shiny: string;
  front_shiny_female?: any;
}

interface GenerationIV {
  'diamond-pearl': DiamondPearl;
  'heartgold-soulsilver': DiamondPearl;
  platinum: DiamondPearl;
}

interface DiamondPearl {
  back_default: string;
  back_female?: any;
  back_shiny: string;
  back_shiny_female?: any;
  front_default: string;
  front_female?: any;
  front_shiny: string;
  front_shiny_female?: any;
}

interface GenerationIII {
  emerald: Emerald;
  'firered-leafgreen': FireRedLeafGreen;
  'ruby-sapphire': FireRedLeafGreen;
}

interface FireRedLeafGreen {
  back_default: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string;
}

interface Emerald {
  front_default: string;
  front_shiny: string;
}

interface GenerationII {
  crystal: Crystal;
  gold: Gold;
  silver: Gold;
}

interface Gold {
  back_default: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string;
  front_transparent: string;
}

interface Crystal {
  back_default: string;
  back_shiny: string;
  back_shiny_transparent: string;
  back_transparent: string;
  front_default: string;
  front_shiny: string;
  front_shiny_transparent: string;
  front_transparent: string;
}

interface GenerationII {
  'red-blue': RedBlue;
  yellow: RedBlue;
}

interface RedBlue {
  back_default: string;
  back_gray: string;
  back_transparent: string;
  front_default: string;
  front_gray: string;
  front_transparent: string;
}

interface Other {
  dream_world: Dreamworld;
  home: Home;
  'official-artwork': OfficialArtWork;
}

interface OfficialArtWork {
  front_default: string;
}

interface Home {
  front_default: string;
  front_female?: any;
  front_shiny: string;
  front_shiny_female?: any;
}

interface Dreamworld {
  front_default: string;
  front_female?: any;
}

interface Move {
  move: Ability;
  version_group_details: VersionGroupDetail[];
}

interface VersionGroupDetail {
  level_learned_at: number;
  move_learn_method: Ability;
  version_group: Ability;
}

interface GameIndex {
  game_index: number;
  version: Ability;
}

interface Ability2 {
  ability: Ability;
  is_hidden: boolean;
  slot: number;
}

interface Ability {
  name: string;
  url: string;
}
