import { Link, useParams } from 'react-router-dom';

function Win() {
    const { lines } = useParams();

    const tweet = new URL('https://twitter.com/intent/tweet');
    tweet.searchParams.append(
        'text',
        `I cleared my grid in ${lines} instructions! https://c1200.itch.io/AutoClaw #AutoClaw @C1200Games`
    );

    return (
        <div className="win">
            <div>
                <h1>Yay!</h1>
                <h4>You won in {lines} instructions</h4>

                <a
                    href={tweet.href}
                    target="_blank"
                    rel="noreferrer"
                    className="button"
                >
                    Tweet
                </a>
                <Link to="/" className="button">
                    Home
                </Link>
            </div>
        </div>
    );
}

export default Win;
