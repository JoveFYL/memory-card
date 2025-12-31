import { useState, useEffect } from 'react';
import type { PokemonSprite } from './types';

function generateUniqueRandom(amount: number) {
    const MAX_POKEMON = 1025;

    // guard against max pokemon
    if (amount > MAX_POKEMON) {
        throw new Error(`Cannot generate more than ${MAX_POKEMON} unique Pokémon IDs`);
    }

    const set = new Set<number>();

    // max pokemon number is 1025
    while (set.size < amount) {
        set.add(Math.floor(Math.random() * MAX_POKEMON) + 1);
    }

    return set;
}

function usePokemon(amount: number): {
    data: PokemonSprite[];
    isLoading: boolean;
} {
    const [data, setData] = useState<PokemonSprite[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let ignore = false;

        const fetchPokemon = async () => {
            setIsLoading(true);
            const randomInts = Array.from(generateUniqueRandom(amount));

            const responses = randomInts.map((id) =>
                fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            );
            const results = await Promise.all(responses);
            const jsonData = await Promise.all(
                results.map((res) => res.json())
            );
            const sprites = jsonData.map(data => ({
                name: data.name,
                front_default: data.sprites.front_default,
                front_shiny: data.sprites.front_shiny,
            }));

            if (!ignore) {
                setData(sprites);
                setIsLoading(false);
            }
        };

        fetchPokemon();

        return () => {
            ignore = true;
        };
    }, [amount]);

    return { data, isLoading };
}

export { usePokemon };
