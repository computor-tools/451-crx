import { Match, Switch, createEffect, createSignal } from 'solid-js';

import { AssetsTable, NavBar } from '@/components';
import { Navigate } from '@solidjs/router';

export default function Home() {
	const [entity, setEntity] = createSignal(undefined);

	createEffect(() => {
		if (entity() === undefined) {
			navigator.serviceWorker.addEventListener('message', (event) => {
				switch (event.data.command) {
					case 'ID':
						setEntity({ id: event.data.id });
						break;
				}
			});

			navigator.serviceWorker.ready.then((registration) => registration.active.postMessage({
				command: 'ID',
			}));
		}
	});

	return (
		<Switch fallback={<div>Loading......</div>}>
			<Match when={entity()?.id === ''}>
				<Navigate href="/login" />
			</Match>
			<Match when={entity()?.id}>
				<div class="flex flex-col gap-10 justify-center items-center">
					<div>{entity().id}</div>
					<NavBar />
					<AssetsTable />
				</div>
			</Match>
		</Switch>
	);
}
