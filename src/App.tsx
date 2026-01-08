import { useState } from 'react';
import './styles/styles.css'
import type { GameStatus, PokemonSprite } from './types';
import Cards from './components/Cards';
import Dialog from './components/Dialog';
import StartDialog from './components/StartDialog';
import { useQuery } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function App() {
    const [cards, setCards] = useState(5);
    const [attempt, setAttempt] = useState<Set<string>>(new Set()); // score = attempt.size
    const [finalScore, setFinalScore] = useState(0);
    const [gameStatus, setGameStatus] = useState<GameStatus>("start");
    const [highestScore, setHighestScore] = useState(Number(localStorage.getItem("highscore") ?? 0));
    const queryClient = useQueryClient();

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

    const getPokemonSprites = async (): Promise<number[]> => {
        const randomInts = Array.from(generateUniqueRandom(cards));

        // only fetch uncached pokemons
        const uncachedIds = randomInts.filter(id => !queryClient.getQueryData(['pokemon', id]));
        const cachedIds = randomInts.filter(id => !uncachedIds.includes(id));
        const responses = uncachedIds.map((id) =>
            fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        );
        const results = await Promise.all(responses);
        const jsonData = await Promise.all(
            results.map((res) => res.json())
        );

        // cache previously uncached pokemons
        jsonData.forEach(data => {
            queryClient.setQueryData(['pokemon', data.id], {
                id: data.id,
                name: data.name,
                front_default: data.sprites.front_default,
                front_shiny: data.sprites.front_shiny,
            });
        });

        return [...uncachedIds, ...cachedIds];
    }

    const fetchPokemonRound = async () => {
        const pokemonIds = await getPokemonSprites();
        return pokemonIds;
    }

    const { data: pokemonIds, isPending } = useQuery({
        queryKey: ['pokemonRound', cards],
        queryFn: fetchPokemonRound,
        enabled: gameStatus === "playing" // only run when user starts playing
    })

    // fetch all the pokemons using their IDs from the queryClient cache
    const pokemons = pokemonIds?.map(id => queryClient.getQueryData<PokemonSprite>(['pokemon', id]))
        .filter(p => p !== undefined);

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
        setGameStatus("playing");
    }

    const resetGame = () => {
        setAttempt(new Set());
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

    if (isPending && gameStatus === "playing") {
        return <h1>Loading...</h1>;
    }

    return (
        <div className='app-container'>
            <ReactQueryDevtools initialIsOpen={false} />
            {
                gameStatus === "start"
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
                            {
                                gameStatus === "lose"
                                    ? <Dialog status={gameStatus} resetGame={resetGame} currScore={finalScore} highScore={highestScore} />
                                    : gameStatus === "win"
                                        ? <Dialog status={gameStatus} resetGame={resetGame} currScore={finalScore} highScore={highestScore} />
                                        : <Cards pokemons={pokemons ?? []} onClick={handleCardClick} />
                            }
                        </>
                    </>
            }
        </div>
    )
}
export default App;
