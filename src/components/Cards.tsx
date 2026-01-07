import React, { useState } from 'react';
import Card from "./Card";
import '../styles/styles.css'
import '../styles/card.css'
import { shufflePokemon } from '../usePokemon.ts';
import type { PokemonSprite } from '../types.tsx';

export default function Cards({ pokemons, setPokemons, onClick }: { pokemons: PokemonSprite[], setPokemons: React.Dispatch<React.SetStateAction<PokemonSprite[]>>, onClick: (clickedPokemon: string) => void }) {
    const [isActive, setIsActive] = useState(true);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleClick = (name: string) => {
        if (isAnimating) return;

        // tell App which card was clicked
        onClick(name);

        setIsAnimating(true);
        setIsActive(false);

        // deconflict shuffling and animation timing to prevent race conditions
        setTimeout(() => {
            setPokemons(prev => shufflePokemon(prev));
        }, 900);

        setTimeout(() => {
            setIsActive(true);
            setIsAnimating(false);
        }, 1000);
    }

    return (
        <div className={`cards-container${isActive ? ' flipped' : ''}`}>
            {pokemons.map(sprite =>
                <Card key={sprite.name} onClick={() => handleClick(sprite.name)} sprite={sprite} />
            )}
        </div>
    )
}