import { AssetsTable, NavBar } from '@/components';

export default function Home() {
	return (
		<div class="flex flex-col gap-10 justify-center items-center">
			<NavBar />
			<AssetsTable />
		</div>
	);
}
