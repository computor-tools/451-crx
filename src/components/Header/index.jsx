import { formatQubic } from '@/utils/units';
import { useLocation } from '@solidjs/router';
import { Show } from 'solid-js';
import BurgerMenu from './BurgerMenu';
import NetworkStatus from './NetworkStatus';
import TxInfo from './TxInfo';

import entity from '@/signals/entity';

export default function Header() {
    const location = useLocation();

    return (
        <>
            <header class="px-5 py-2 shadow flex justify-between w-[var(--vw)] h-[var(--header-height)] fixed top-0 bg-white z-10 dark:bg-surface dark:border-b dark:border-zinc-600">
                <BurgerMenu />
                <Show when={entity()?.energy !== undefined}>
                    <span class="mx-auto absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">{formatQubic(entity().energy)}</span>
                </Show>
                <NetworkStatus />
            </header>
            {location.pathname === '/' && <TxInfo />}
        </>
    );
}
