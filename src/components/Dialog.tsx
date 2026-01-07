import '../styles/dialog.css'

export default function Dialog({ status, resetGame, currScore, highScore }: { status: string, resetGame: () => void, currScore: number, highScore: number }) {
    return (
        <div className="backdrop">
            <dialog className="dialog">
                <h1>{status === "win" ? "You Win!" : "Game Over"}</h1>
                <img src={status === "win"
                    ? "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZjFkdTZ2eWI3d2txMnlpOXFucmJ1dGloM2hiZHFjNHM1dnRkdWRsbyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/LsB3O1Dt7A0UxdxtRz/giphy.gif"
                    : "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3ZHVtNnV2ZjE5Z3YzMGoyYnQ0bGh0MGxrbzh5Y21oNWluN2ZkcGJ0aSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/gf6M41jQ0VHrKygiQR/giphy.gif"} alt="game over GIF" />
                <p>Score: {currScore}</p>
                <p>Highscore: {highScore}</p>
                <div className='button-container'>
                    {status === "win"
                        ? <button className="game-button" type="button" onClick={resetGame}>Play Again</button>
                        : <button className="game-button" type="button" onClick={resetGame}>Try Again</button>}
                </div>
            </dialog>
        </div>
    );
}