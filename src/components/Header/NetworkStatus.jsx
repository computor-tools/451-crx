import networkStatus from '@/signals/network-status';
import { StatusIndicator } from '../ui';

const appendTickAndEpoch = function (epoch, tick) {
    return epoch ? `${epoch}${tick ? `|${tick.toLocaleString()}` : ''}` : '';
};

export default function NetworkStatus() {
    return (
        <div class="flex items-center justify-end gap-2">
            <div class="text-xxs grid place-items-end">
                <span>3/4 peers</span>
                <span>{appendTickAndEpoch(networkStatus.broadcastedComputors()?.epoch, networkStatus.tick()?.tick)}</span>
            </div>
            <StatusIndicator status="success" />
        </div>
    );
}
