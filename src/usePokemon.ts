import { useState, useEffect } from 'react';
import type { PokemonSprites } from './types';

function usePokemon(amount: number): {
    data: PokemonSprites[];
    isLoading: boolean;
} {
    const [data, setData] = useState<PokemonSprites[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let ignore = false;

        const fetchPokemon = async () => {
            setIsLoading(true);
            const randomInts = Array.from(
                { length: amount },
                () => Math.floor(Math.random() * 1025) + 1
            );

            const responses = randomInts.map((id) =>
                fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            );
            const results = await Promise.all(responses);
            const jsonData = await Promise.all(
                results.map((res) => res.json())
            );
            const sprites = jsonData.map((data) => data.sprites);

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
