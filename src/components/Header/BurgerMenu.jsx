import { A, useBeforeLeave } from '@solidjs/router';
import { For, createSignal } from 'solid-js';

import { CloseIcon, HamburgerIcon } from '@/assets/icons';
import { Input } from '@/components/ui';
import { logout } from '@/utils/service-worker';

import ToggleTheme from './ToggleTheme';

const ACCOUNT_MENU = [
    { title: 'export wallet', link: '#' },
    { title: 'settings', link: '#' },
];

const NETWORK_MENU = [
    { title: 'network stats', link: '#' },
    { title: 'voting', link: '#' },
];

export default function BurgerMenu() {
    const [isOpen, setIsOpen] = createSignal(false);

    const toggleMenu = () => setIsOpen(!isOpen());

    useBeforeLeave(() => {
        if (isOpen()) {
            toggleMenu();
        }
    });

    return (
        <div>
            {/* Hamburger Icon */}
            <button class="p-1" onClick={toggleMenu}>
                <HamburgerIcon class="h-5 w-5 dark:text-white" />
            </button>

            {/* Overlay */}
            <div class={`fixed inset-0 bg-black opacity-50 z-0 ${isOpen() ? 'block' : 'hidden'}`} onClick={() => setIsOpen(false)} />

            {/* Sidebar */}
            <div
                class={`fixed top-0 left-0 w-64 h-full transform transition-transform duration-300 ease-in-out z-10 ${
                    isOpen() ? 'translate-x-0' : '-translate-x-full'
                } bg-surface-container text-on-surface font-primary`}
            >
                <div class="p-5">
                    <div class="grid">
                        <button onClick={() => setIsOpen(!isOpen())} class="h-5 w-5 justify-self-end">
                            <CloseIcon stroke="white" />
                        </button>
                        <Input class="w-[80%]" placeholder="search" color="tertiary" size="small" />
                    </div>
                    <ul class="mt-4">
                        <li>
                            <button onClick={logout} class="block py-2 hover:text-primary capitalize w-full text-left">
                                logout
                            </button>
                        </li>

                        <For each={ACCOUNT_MENU}>
                            {(item) => (
                                <li>
                                    <A href={item.link} class="block py-2 hover:text-primary capitalize">
                                        {item.title}
                                    </A>
                                </li>
                            )}
                        </For>
                    </ul>
                    <hr class="my-3 mr-4" />
                    <ul>
                        <For each={NETWORK_MENU}>
                            {(item) => (
                                <li>
                                    <a href={item.link} class="block py-2 hover:text-primary capitalize">
                                        {item.title}
                                    </a>
                                </li>
                            )}
                        </For>
                    </ul>
                    <div class="w-full flex justify-center mt-6">
                        <ToggleTheme />
                    </div>
                </div>
            </div>
        </div>
    );
}
