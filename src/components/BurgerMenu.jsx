import { CloseIcon, HamburgerIcon } from '@/assets/icons';
import { Input } from '@/components/ui';
import { createSignal, For } from 'solid-js';

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
			<button class="p-1" onClick={toggleMenu}>
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
							onClick={() => setIsOpen(!isOpen())}
							class="h-5 w-5 justify-self-end"
						>
							<CloseIcon stroke="white" />
						</button>
						<Input
							class="w-[80%]"
							placeholder="search"
							color="secondary"
							size="small"
						/>
					</div>
					<ul class="mt-4">
						<For each={MENU_ITEMS}>
							{(item) => (
								<li>
									<a
										href={item.link}
										class="block py-2 hover:text-primary"
									>
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
