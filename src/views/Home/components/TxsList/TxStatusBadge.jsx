import { HistoryIcon } from '@/assets/icons';
import { Badge, StatusIndicator } from '@/components/ui';
import { Match, Show, Switch } from 'solid-js';

import networkStatus from '@/signals/network-status';

export default function TxStatusBadge(props) {
    const getPendingTicks = () => {
        const networkTick = networkStatus.tick()?.tick;
        if (props.txTick && networkTick !== undefined) {
            return Math.max(0, props.txTick - networkTick);
        }
        return 0;
    };

    return (
        <Switch>
            <Match when={props.executed === undefined || getPendingTicks()}>
                <Badge color="warning" size="x-small" rounded class="pr-3">
                    <HistoryIcon class="w-4 h-4 text-warning mr-1 ml-0.5" />
                    Pending <Show when={networkStatus.tick()?.tick && props.txtick}>({getPendingTicks()} ticks)</Show>
                </Badge>
            </Match>
            <Match when={props.executed === false}>
                <Badge color="error" size="x-small" rounded class="pr-3">
                    <StatusIndicator status="error" />
                    Failed
                </Badge>
            </Match>
            <Match when={props.executed === true}>
                <Badge color="success" size="x-small" rounded class="pr-3">
                    <StatusIndicator status="success" />
                    Processed
                </Badge>
            </Match>
        </Switch>
    );
}
