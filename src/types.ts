type PokemonSprite = {
    id: number;
    name: string;
    front_default: string;
    front_shiny: string;
}

type GameStatus = "start" | "playing" | "win" | "lose";

export type { PokemonSprite, GameStatus }