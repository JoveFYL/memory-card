import '../styles/dialog.css'

export default function StartDialog({ onClick }: { onClick: (difficulty: string) => void }) {
    return (
        <div className="backdrop">
            <dialog className="dialog" open>
                <h1>Welcome!</h1>
                <img src="https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3NDFjZ2R6N2owdHo0MXBmODNlM3p3ajNkMGdicDdkN3E1bXRiNDBhcCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/vnGlErQHuF9BK/giphy.gif" alt="game start GIF" />
                <div className='button-container'>
                    <button className="game-button" type="button" onClick={() => onClick("easy")}>Easy</button>
                    <button className="game-button" type="button" onClick={() => onClick("medium")}>Medium</button>
                    <button className="game-button" type="button" onClick={() => onClick("hard")}>Hard</button>
                </div>
            </dialog>
        </div>
    );
}