'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type ThemeContextType = {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
export const ThemeProvider = ({ children }: { children: ReactNode }) => {

    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
        if (savedTheme) {
            setTheme(savedTheme);
        }
        setMounted(true);
    }, []);

    useEffect(() => {
        if(mounted) {
            localStorage.setItem('theme', theme);
        }
    }, [theme, mounted]);
    
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    if (!mounted) {
        return <div className="invisible">{children}</div>;;
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <div className={`${theme} min-h-screen bg-gradient-to-r from-slate-200 to-indigo-500 dark:from-slate-950 dark:to-indigo-950 transition-colors duration-500`}>
                {children}
            </div>
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

