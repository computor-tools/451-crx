import networkStatus from '@/signals/network-status';
import { Show } from 'solid-js';
import { StatusIndicator } from '../ui';

const { broadcastedComputors, tick } = networkStatus || {};

const isNetworkConnected = () => broadcastedComputors()?.epoch && tick()?.tick;

const appendTickAndEpoch = function (epoch, tick) {
    return epoch ? `${epoch}${tick ? `|${tick.toLocaleString()}` : ''}` : '';
};

export default function NetworkStatus() {
    return (
        <div class="flex items-center justify-end gap-2">
            <Show when={isNetworkConnected()} fallback={<p>Connecting...</p>}>
                <div class="text-xxs grid place-items-end">
                    <span>3/4 peers</span>
                    <span>{appendTickAndEpoch(broadcastedComputors()?.epoch, tick()?.tick)}</span>
                </div>
            </Show>
            <StatusIndicator status={isNetworkConnected() ? 'success' : 'warning'} />
        </div>
    );
}
