// import { useState, useEffect } from 'react';
import { usePokemon } from './usePokemon';
import Card from './components/Card';
import './styles/styles.css'

function App() {
    const amount = 5;
    const { data: sprites, isLoading } = usePokemon(amount);

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    return (
        <>
            <div className="cards-container">
                {sprites.map(sprite =>
                    <Card key={crypto.randomUUID()} sprite={sprite} />
                )}
            </div>

        </>
    )
}
export default App
