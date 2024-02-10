import { CloseIcon, HamburgerIcon } from '@/assets/icons';
import { Input } from '@/components/ui';
import { createSignal } from 'solid-js';

const MENU_ITEMS = [
	{ title: 'logout', link: '#' },
	{ title: 'export wallet', link: '#' },
	{ title: 'settings', link: '#' },
	{ title: 'network stats', link: '#' },
	{ title: 'voting', link: '#' },
];

export default function BurgerMenu() {
	const [isOpen, setIsOpen] = createSignal(false);

	const toggleMenu = () => setIsOpen(!isOpen());

	return (
		<div>
			{/* Hamburger Icon */}
			<button class="p-1" onclick={toggleMenu}>
				<HamburgerIcon />
			</button>

			{/* Sidebar */}
			<div
				class={`fixed top-0 left-0 w-64 h-full transform transition-transform duration-300 ease-in-out ${
					isOpen() ? 'translate-x-0' : '-translate-x-full'
				} bg-surface-container text-on-surface font-primary`}
			>
				<div class="p-5">
					<div class="grid">
						<button
							onclick={() => setIsOpen(!isOpen())}
							class="h-5 w-5 justify-self-end"
						>
							<CloseIcon stroke="white" />
						</button>
						<Input
							className="w-[80%]"
							placeholder="search"
							color="secondary"
							size="small"
						/>
					</div>
					<ul class="mt-4">
						{MENU_ITEMS.map((item) => (
							<li>
								<a
									href={item.link}
									class="block py-2 hover:text-primary"
								>
									{item.title}
								</a>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}
