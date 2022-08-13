import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';

function Menu() {
    return (
        <div className="menu">
            <img src={logo} alt="AutoClaw" />
            <Link to="/game" className="menu-button">
                Play
            </Link>
            <Link to="/credits" className="menu-button">
                Credits
            </Link>
        </div>
    );
}

export default Menu;
