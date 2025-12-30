// import { useState, useEffect } from 'react'
// import type { PokemonSprites } from './types';
// import { fetchPokemonSprites } from './pokemon';
import { usePokemon } from './usePokemon';
import './App.css'

function App() {
    const amount = 10;
    const { data: sprites, isLoading } = usePokemon(amount);

    return (
        <>
            {
                (isLoading ? <h1>Loading...</h1>
                    : sprites.map(
                        sprite =>
                            <img key={crypto.randomUUID()} src={sprite.front_default} alt={sprite.front_default}></img>
                    ))
            }

        </>
    )
}
export default App
