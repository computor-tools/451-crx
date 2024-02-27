import {
	ArrowDownLeftIcon,
	ArrowUpRightIcon,
	ArrowsRightLeftIcon,
	HistoryIcon,
} from '@/assets/icons';
import { Routes } from '@/utils/routes';
import { A } from '@solidjs/router';
import { For } from 'solid-js';

const NAVIGATION_ITEMS = [
	{
		title: 'Receive',
		href: Routes.RECEIVE,
		icon: ArrowDownLeftIcon,
	},
	{
		title: 'Transfer',
		href: Routes.TRANSFER,
		icon: ArrowUpRightIcon,
	},
	{
		title: 'Trade on Qx',
		href: Routes.TRADE,
		icon: ArrowsRightLeftIcon,
	},
	{
		title: 'History',
		href: Routes.HISTORY,
		icon: HistoryIcon,
	},
];

export default function NavBar() {
	return (
		<nav class="w-full">
			<ul class="flex text-xxs gap-4 w-full">
				<For each={NAVIGATION_ITEMS}>
					{(item, index) => (
						<li
							class={
								index() === NAVIGATION_ITEMS.length - 1
									? 'w-16 ml-auto'
									: 'w-16'
							}
						>
							<A
								href={item.href}
								class="grid place-items-center items-center gap-2"
							>
								<item.icon class="border w-9 h-9 p-1.5 rounded-lg bg-white" />
								<p>{item.title}</p>
							</A>
						</li>
					)}
				</For>
			</ul>
		</nav>
	);
}
