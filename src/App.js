import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Howl } from 'howler';
import { ThemeProvider } from './darkMode';

import Menu from './routes/Menu';
import Game from './routes/Game';
import Credits from './routes/Credits';
import Win from './routes/Win';
import Settings from './routes/Settings';

const music = [
    require('./assets/audio/Overcast.mp3'),
    require('./assets/audio/Newer Wave.mp3'),
    require('./assets/audio/Voxel Revolution.mp3'),
];
let currentSong = 0;

function playMusic() {
    const howl = new Howl({
        src: [music[currentSong]],
    });
    howl.play();
    howl.volume(0.6);
    howl.once('end', () => {
        howl.stop();

        currentSong++;
        if (currentSong >= music.length) {
            currentSong = 0;
        }

        playMusic();
    });
}

playMusic();

function App() {
    return (
        <ThemeProvider>
            <MemoryRouter>
                <Routes>
                    <Route path="/" element={<Menu />} />
                    <Route path="/game" element={<Settings />} />
                    <Route path="/game/:x/:y" element={<Game />} />
                    <Route path="/credits" element={<Credits />} />
                    <Route path="/win/:lines" element={<Win />} />
                </Routes>
            </MemoryRouter>
        </ThemeProvider>
    );
}

export default App;
