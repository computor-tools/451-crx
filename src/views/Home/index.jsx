import { NavBar } from '@/components';
import { Navigate } from '@solidjs/router';
import { Match, Switch } from 'solid-js';
import { CopyIdClipboard, TxsList } from './components';

import entity from '@/signals/entity';

export default function Home() {
    return (
        <Switch fallback={<div>Loading...</div>}>
            <Match when={entity()?.id === ''}>
                <Navigate href="/login" />
            </Match>
            <Match when={entity()?.id}>
                <div class="flex flex-col gap-10 justify-center items-center">
                    <CopyIdClipboard entityId={entity().id} />
                    <NavBar />
                    <TxsList />
                </div>
            </Match>
        </Switch>
    );
}
