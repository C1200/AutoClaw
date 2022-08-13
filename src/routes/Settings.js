import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Settings() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    function invalid(value) {
        setError(value);
    }

    function submit(ev) {
        ev.preventDefault();
        const data = new FormData(ev.target);

        const x = parseInt(data.get('gridx'));
        const y = parseInt(data.get('gridy'));

        if (Number.isNaN(x)) return invalid('X is not a number');
        if (Number.isNaN(y)) return invalid('Y is not a number');
        if (x < 5) return invalid('X is below 5');
        if (y < 5) return invalid('Y is below 5');
        if (x > 10) return invalid('X is above 10');
        if (x > 10) return invalid('Y is above 10');

        navigate(`/game/${x}/${y}`);
    }

    return (
        <form className="settings" onSubmit={submit}>
            <div>
                {error && <p style={{ color: 'red' }}>Error: {error}</p>}

                <h4>Grid Size</h4>

                <div className="flex">
                    <input type="number" name="gridx" id="gridx" />
                    <span>&times;</span>
                    <input type="number" name="gridy" id="gridy" />
                </div>

                <button type="submit">Play</button>
            </div>
        </form>
    );
}

export default Settings;
