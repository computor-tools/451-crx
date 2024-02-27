import BurgerMenu from './BurgerMenu';
import ConnectionStatus from './ConnectionStatus';

export default function Header() {
	return (
		<header class="px-5 py-2 shadow flex justify-between w-[var(--vw)] h-[var(--header-height)] fixed top-0 bg-white z-10">
			<BurgerMenu />
			<img src="icons/icon.png" alt="451-logo" width={28} height={24} />
			<ConnectionStatus status="Synced" />
		</header>
	);
}
