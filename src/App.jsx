import { HashRouter, Route } from '@solidjs/router';
import { AppLayout } from './components/ui/layouts';
import { EnergyTransfer, Home, TransferOwnership } from './views';

export default function App() {
	return (
		<HashRouter root={AppLayout}>
			<Route path="/" component={Home} />
			<Route path="/energy-transfer" component={EnergyTransfer} />
			<Route path="/transfer-ownership" component={TransferOwnership} />
		</HashRouter>
	);
}
