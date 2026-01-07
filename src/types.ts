type PokemonSprite = {
    name: string;
    front_default: string;
    front_shiny: string;
}

type GameStatus = "start" | "end" | "playing" | "win" | "lose";

export type { PokemonSprite, GameStatus }