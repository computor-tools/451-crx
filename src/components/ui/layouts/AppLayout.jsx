import { Header } from '@/components';

/**
 * AppLayout component props documentation
 * @param {Object} props - Component props
 * @param {Solid.Children} props.children - The content to be rendered within the main area of the layout.
 */
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
