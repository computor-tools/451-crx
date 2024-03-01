import { A, useBeforeLeave } from '@solidjs/router';
import { For, createSignal } from 'solid-js';

import { CloseIcon, HamburgerIcon } from '@/assets/icons';
import { Input } from '@/components/ui';

const ACCOUNT_MENU = [
    // NOTE: Let login for test
    { title: 'login', link: '/login' },
    { title: 'logout', link: '/logout' },
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
                <HamburgerIcon />
            </button>

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
                        <For each={ACCOUNT_MENU}>
                            {(item) => (
                                <li>
                                    <A href={item.link} class="block py-2 hover:text-primary">
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
                                    <a href={item.link} class="block py-2 hover:text-primary">
                                        {item.title}
                                    </a>
                                </li>
                            )}
                        </For>
                    </ul>
                </div>
            </div>
        </div>
    );
}
