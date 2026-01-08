import '../styles/loader.css'

export default function Loader() {
    return (
        <div className="loader-container">
            <div className="loader">
                <img src="/pokeball.png" alt="pokeball" />
                <h1>Loading...</h1>
            </div>
        </div>
    );
}