import '../styles/card.css'
import type { PokemonSprite } from '../types';

function Card({ onClick, sprite }: { onClick: React.MouseEventHandler<HTMLButtonElement>, sprite: PokemonSprite }) {
    return (
        <button className="card-container" onClick={onClick}>
            <div className="card">
                <div className="front">
                    <img src="/card.png" alt="card.png" />
                </div>
                <div className="back">
                    <img src={sprite.front_default} alt={sprite.front_default} />
                    <h2 className="back-h2">{sprite.name}</h2>
                </div>
            </div>
        </button>
    );
}

export default Card;