import { useLocation } from '@solidjs/router';
import BurgerMenu from './BurgerMenu';
import NetworkStatus from './NetworkStatus';
import TxInfo from './TxInfo';

export default function Header() {
    const location = useLocation();

    return (
        <>
            <header class="px-5 py-2 shadow flex justify-between w-[var(--vw)] h-[var(--header-height)] fixed top-0 bg-white z-10">
                <BurgerMenu />
                <img src="icons/icon.png" alt="451-logo" width={28} height={24} />
                <NetworkStatus />
            </header>
            {location.pathname === '/' && <TxInfo />}
        </>
    );
}
