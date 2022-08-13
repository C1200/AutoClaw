import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Menu from './routes/Menu';
import Game from './routes/Game';
import Credits from './routes/Credits';
import Win from './routes/Win';
import Settings from './routes/Settings';

function App() {
    return (
        <MemoryRouter>
            <Routes>
                <Route path="/" element={<Menu />} />
                <Route path="/game" element={<Settings />} />
                <Route path="/game/:x/:y" element={<Game />} />
                <Route path="/credits" element={<Credits />} />
                <Route path="/win/:lines" element={<Win />} />
            </Routes>
        </MemoryRouter>
    );
}

export default App;
