import { Link } from 'react-router-dom';
import { useTheme } from '../darkMode';
import logo from '../assets/images/logo.png';
import logoLight from '../assets/images/logo-light.png';

function Menu() {
    const [theme, setTheme] = useTheme();

    function toggleTheme() {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    }

    return (
        <div className="menu">
            <img src={theme === 'dark' ? logoLight : logo} alt="AutoClaw" />
            <Link to="/game" className="menu-button">
                Play
            </Link>
            <Link to="/credits" className="menu-button">
                Credits
            </Link>

            <button
                className={'theme-toggler ' + theme}
                onClick={toggleTheme}
            ></button>
        </div>
    );
}

export default Menu;
