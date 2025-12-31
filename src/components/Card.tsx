import '../styles/card.css'
import type { PokemonSprite } from '../types';

function Card({ sprite }: { sprite: PokemonSprite }) {
    return (
        <div className="card-container">
            <div className="card">
                <div className="front">
                    <img src="/card.png" alt="card.png" />
                </div>
                <div className="back">
                    <img src={sprite.front_default} alt={sprite.front_default} />
                    <h2 className="back-h2">{sprite.name}</h2>
                </div>
            </div>
        </div>
    );
}

export default Card;