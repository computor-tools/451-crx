import { HashRouter, Route } from '@solidjs/router';
import { AuthGuard } from './components/guards';
import { AppLayout } from './components/ui/layouts';
import { Routes } from './utils/routes';
import { Home, Login, Receive, Trade, Transfer } from './views';

export default function App() {
    return (
        <HashRouter>
            <Route path={Routes.LOGIN} component={Login} />
            <AuthGuard>
                <Route component={AppLayout}>
                    <Route path={Routes.HOME} component={Home} />
                    <Route path={Routes.TRANSFER} component={Transfer} />
                    <Route path={Routes.RECEIVE} component={Receive} />
                    <Route path={Routes.TRADE} component={Trade} />
                </Route>
            </AuthGuard>
        </HashRouter>
    );
}
