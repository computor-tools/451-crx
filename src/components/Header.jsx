import BurgerMenu from './BurgerMenu';

export default function Header() {
	return (
		<header class="px-5 py-2 shadow-md flex justify-between w-full h-[var(--header-height)]">
			<BurgerMenu />
			<img src="icons/icon.png" alt="451-logo" width={28} height={24} />
		</header>
	);
}
