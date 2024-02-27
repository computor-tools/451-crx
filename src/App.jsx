import { HashRouter, Route } from '@solidjs/router';
import { AppLayout } from './components/ui/layouts';
import { History, Home, Receive, Trade, Transfer } from './views';

export default function App() {
	return (
		<HashRouter root={AppLayout}>
			<Route path="/" component={Home} />
			<Route path="/transfer" component={Transfer} />
			<Route path="/receive" component={Receive} />
			<Route path="/trade" component={Trade} />
			<Route path="/history" component={History} />
		</HashRouter>
	);
}
