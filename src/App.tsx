import { useState, useEffect } from 'react';
import { usePokemon } from './usePokemon';
import './styles/styles.css'
import type { GameStatus, PokemonSprite } from './types';
import Cards from './components/Cards';
import Dialog from './components/Dialog';
import StartDialog from './components/StartDialog';

function App() {
    const [cards, setCards] = useState(5);
    const [round, setRound] = useState(0);
    const [pokemons, setPokemons] = useState<PokemonSprite[]>([]);
    const [attempt, setAttempt] = useState<Set<string>>(new Set()); // score = attempt.size
    const [finalScore, setFinalScore] = useState(0);
    const [gameStatus, setGameStatus] = useState<GameStatus>("start");
    const [highestScore, setHighestScore] = useState(Number(localStorage.getItem("highscore") ?? 0));

    const fetchData = gameStatus === "playing";
    const { data: sprites, isLoading } = usePokemon(cards, round, fetchData);

    const handleCardClick = (clickedPokemon: string) => {
        setAttempt(prev => {
            if (prev.has(clickedPokemon)) {
                setGameStatus("lose");
                updateHighestScore(prev.size);
                setFinalScore(prev.size);
                return new Set();
            }

            const next = new Set(prev);
            next.add(clickedPokemon);

            if (next.size === cards) {
                setGameStatus("win");
                setFinalScore(next.size);
                updateHighestScore(next.size);
            }

            return next;
        })
    }

    const handleDifficulty = (clickedDifficulty: string) => {
        const number = clickedDifficulty === "easy" ? 5 : clickedDifficulty === "medium" ? 10 : 15;
        setCards(number);
        setRound(0);
        setGameStatus("playing");
    }

    const resetGame = () => {
        setAttempt(new Set());
        setRound(prev => prev + 1)
        setGameStatus("start");
    }

    const updateHighestScore = (score: number) => {
        setHighestScore(prev => {
            if (score > prev) {
                localStorage.setItem("highscore", String(score));
                return score;
            }
            return prev;
        })
    }

    useEffect(() => {
        setPokemons(sprites);
    }, [sprites]);

    if (isLoading && gameStatus === "playing") {
        return <h1>Loading...</h1>;
    }

    return (
        <div className='app-container'>
            {gameStatus === "start"
                ? <StartDialog onClick={handleDifficulty} />
                : <>
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
                            <h1>Highest Score: {highestScore}</h1>
                        </div>
                    </div>
                    <>
                        {gameStatus === "lose"
                            ? <Dialog status={gameStatus} resetGame={resetGame} currScore={finalScore} highScore={highestScore} />
                            : gameStatus === "win"
                                ? <Dialog status={gameStatus} resetGame={resetGame} currScore={finalScore} highScore={highestScore} />
                                : <Cards pokemons={pokemons} setPokemons={setPokemons} onClick={handleCardClick} />}
                    </>
                </>}
        </div>
    )
}
export default App;
