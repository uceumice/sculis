import { Dispatch, useEffect, useState, SetStateAction, useLayoutEffect } from 'react';

function useLocalStorageState<S>(defaultValue: S | (() => S), key: string): [S, Dispatch<SetStateAction<S>>] {
    const [value, setValue] = useState<S>(() => {
        const stickyValue = window.localStorage.getItem(key);
        return stickyValue !== null
            ? JSON.parse(stickyValue)
            : defaultValue;
    });
    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    return [value, setValue];
}

function useSessionStorageState<S>(defaultValue: S | (() => S), key: string): [S, Dispatch<SetStateAction<S>>] {
    const [value, setValue] = useState<S>(() => {
        const stickyValue = window.sessionStorage.getItem(key);
        return stickyValue !== null
            ? JSON.parse(stickyValue)
            : defaultValue;
    });
    useEffect(() => {
        window.sessionStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    return [value, setValue];
}

function useThemeDetector() {
    const getCurrentTheme = () => window.matchMedia("(prefers-color-scheme: dark)").matches;
    const [isDarkTheme, setIsDarkTheme] = useState(getCurrentTheme());
    const mqListener = (e => {
        setIsDarkTheme(e.matches);
    });

    useEffect(() => {
        const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
        darkThemeMq.addEventListener("change", mqListener, false);
        return () => darkThemeMq.removeEventListener("change", mqListener, false);
    }, []);
    return isDarkTheme;
}

function useWindowSize(): [number, number] {
    const [size, setSize] = useState<[number, number]>([0, 0]);
    useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}

export { useLocalStorageState, useSessionStorageState, useWindowSize };

