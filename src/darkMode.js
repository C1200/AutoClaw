import { createContext, useContext, useEffect, useState } from 'react';

function checkDarkMode() {
    switch (window.localStorage.getItem('theme')) {
        case 'dark':
            window.document.body.classList.add('dark');
            break;
        case 'light':
            window.document.body.classList.remove('dark');
            break;
        default:
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                window.document.body.classList.add('dark');
            }
            break;
    }

    return window.document.body.classList.contains('dark');
}

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(checkDarkMode() ? 'dark' : 'light');

    useEffect(() => {
        window.localStorage.setItem('theme', theme);
        checkDarkMode();
    }, [theme]);

    return (
        <ThemeContext.Provider value={[theme, setTheme]}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}
