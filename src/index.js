import ReactDOM from 'react-dom/client';
import App from './App';
import preload from './preload';
import './assets/scss/index.scss';

preload().then(() => {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<App />);
});
