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
            <header class="px-5 py-2 shadow flex justify-between w-[var(--vw)] h-[var(--header-height)] fixed top-0 bg-white z-10">
                <BurgerMenu />
                <Show when={entity()?.energy !== undefined}>
                    <span class="mx-auto">{formatQubic(entity().energy)}</span>
                </Show>
                <NetworkStatus />
            </header>
            {location.pathname === '/' && <TxInfo />}
        </>
    );
}
