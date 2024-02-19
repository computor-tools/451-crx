import { A } from '@solidjs/router';

export default function Home() {
	return (
		<div class="flex flex-col gap-10 justify-center items-center h-full">
			<h1 class="text-3xl font-bold text-blue-dashed-text">
				Welcome to Qx
			</h1>
			<nav class="text-xs">
				<A href="/energy-transfer" class="px-2">
					Energy Transfer
				</A>
				<A href="/transfer-ownership" class="px-2">
					Transfer Ownership
				</A>
			</nav>
		</div>
	);
}
