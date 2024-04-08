import { MoonIcon, SunIcon } from '@/assets/icons';
import { createSignal, onMount } from 'solid-js';

export default function ToggleTheme() {
    const [theme, setTheme] = createSignal('light'); // Default theme

    const isChromeExtensionEnvironment = () => {
        return typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync;
    };

    const saveThemePreference = (newTheme) => {
        if (isChromeExtensionEnvironment()) {
            chrome.storage.sync.set({ theme: newTheme }, () => {
                if (chrome.runtime.lastError) {
                    console.error('Error setting theme in Chrome storage:', chrome.runtime.lastError);
                }
            });
        } else {
            try {
                localStorage.setItem('theme', newTheme);
            } catch (error) {
                console.error('Error setting theme in localStorage:', error);
            }
        }
    };

    const applyTheme = (newTheme) => {
        setTheme(newTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
        saveThemePreference(newTheme);
    };

    const initializeTheme = () => {
        const applySystemTheme = () => {
            const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
            applyTheme(prefersDarkScheme ? 'dark' : 'light');
        };

        if (isChromeExtensionEnvironment()) {
            chrome.storage.sync.get(['theme'], function (result) {
                if (result.theme) {
                    applyTheme(result.theme);
                } else {
                    applySystemTheme();
                }
            });
        } else {
            const storedTheme = localStorage.getItem('theme');
            if (storedTheme) {
                applyTheme(storedTheme);
            } else {
                applySystemTheme();
            }
        }
    };

    const toggleTheme = () => {
        const newTheme = theme() === 'light' ? 'dark' : 'light';
        applyTheme(newTheme);
    };

    onMount(initializeTheme);

    return (
        <button onClick={toggleTheme} class="p-1 border rounded-lg hover:bg-zinc-700">
            {theme() === 'light' ? <MoonIcon class="w-5"/> : <SunIcon class="w-5"/>}
        </button>
    );
}
