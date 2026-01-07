import { useState, useEffect } from 'react';
import { usePokemon } from './usePokemon';
import './styles/styles.css'
import type { GameStatus, PokemonSprite } from './types';
import Cards from './components/Cards';

function App() {
    const CARDS = 5;
    const { data: sprites, isLoading } = usePokemon(CARDS);
    const [pokemons, setPokemons] = useState<PokemonSprite[]>([]);
    const [attempt, setAttempt] = useState<Set<string>>(new Set()); // score = attempt.size
    const [gameStatus, setGameStatus] = useState<GameStatus>("start");

    const handleCardClick = (clickedPokemon: string) => {
        setAttempt(prev => {
            if (prev.has(clickedPokemon)) {
                setGameStatus("lose");
                localStorage.setItem("highscore", attempt.size.toString());
                return new Set();
            }

            const next = new Set(prev);
            next.add(clickedPokemon);

            if (next.size === CARDS) {
                setGameStatus("win");
                localStorage.setItem("highscore", attempt.size.toString());
            }

            return next;
        })
    }

    useEffect(() => {
        setPokemons(sprites);
    }, [sprites]);

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    if (gameStatus === "lose") {
        return <h1>You lost!</h1>
    }

    if (gameStatus === "win") {
        return <h1>You won!</h1>
    }

    return (
        <div className='app-container'>
            <div className='header-container'>
                <div className="title-container">
                    <img src="/pikachu.png" alt="pikachu" id="pikachu" />
                    <h1>
                        <span className="poke">Poké</span>
                        <span className="find">Find</span>
                    </h1>
                </div>
                <div className="score-container">
                    <h1>Current Score: {attempt.size}</h1>
                    <h1>Highest Score: {localStorage.getItem("highscore") === null ? 0 : localStorage.getItem("highscore")}</h1>
                </div>
            </div>
            <Cards pokemons={pokemons} setPokemons={setPokemons} onClick={handleCardClick} />
        </div>
    )
}
export default App
