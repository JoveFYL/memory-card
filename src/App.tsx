import { useState, useEffect } from 'react';
import { usePokemon } from './usePokemon';
import './styles/styles.css'
import type { PokemonSprite } from './types';
import Cards from './components/Cards';

function App() {
    const amount = 5;
    const { data: sprites, isLoading } = usePokemon(amount);
    const [pokemons, setPokemons] = useState<PokemonSprite[]>([]);

    useEffect(() => {
        setPokemons(sprites);
    }, [sprites]);

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    return (
        <>
            <Cards pokemons={pokemons} setPokemons={setPokemons} />
        </>
    )
}
export default App
