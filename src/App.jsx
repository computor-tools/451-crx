import { HashRouter, Navigate, Route } from '@solidjs/router';

import { AppLayout } from './components/ui/layouts';
import { History, Home, Login, Receive, Trade, Transfer } from './views';

export default function App() {
	return (
		<HashRouter root={AppLayout}>
			<Route path="/" component={Home} />
			<Route path="/login" component={Login} />
			<Route path="/logout" component={() => {
				navigator.serviceWorker.ready.then((registration) => registration.active.postMessage({
					command: 'LOGOUT',
				}));

				return (<Navigate href="/" />);
			}} />
			<Route path="/transfer" component={Transfer} />
			<Route path="/receive" component={Receive} />
			<Route path="/trade" component={Trade} />
			<Route path="/history" component={History} />
		</HashRouter>
	);
}
