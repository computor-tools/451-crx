import { Header } from '@/components';

export default function AppLayout(props) {
	return (
		<div class="w-[var(--vw)] h-[var(--vh)]">
			<Header />
			<main class="h-[var(--container-height)] w-full">
				{props.children}
			</main>
		</div>
	);
}
