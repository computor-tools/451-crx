import { Badge } from '@/components/ui';
import { CONTRACT_DESCRIPTIONS } from '@/constants';
import { formatQubic } from '@/utils/units';
import TxHead from './TxHead';

import entity from '@/signals/entity';

export default function ScIpoBidCard() {
    return (
        <>
            <TxHead retryText="Retry bid" accentColor="green">
                <h2>
                    SC {CONTRACT_DESCRIPTIONS[entity().outgoingTransaction.executedContractIndex].name} ({entity().outgoingTransaction.executedContractIndex})
                </h2>
                <Badge size="x-small">by QUORUM</Badge>
            </TxHead>

            <div>
                <div class="flex">
                    <table class="w-full text-xs">
                        <thead>
                            <tr>
                                <th class="p-2 text-left">Quantity</th>
                                <th class="p-2 text-left">Energy</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="border-t">
                                <td class="p-2 align-top text-green-500">
                                    +{entity().outgoingTransaction.contractIPO_BidQuantity.toLocaleString()}{' '}
                                    {CONTRACT_DESCRIPTIONS[entity().outgoingTransaction.executedContractIndex].name} shares
                                </td>
                                <td class="p-2 align-top">
                                    <div class="grid gap-1">
                                        <span class="text-red-500">-{formatQubic(entity().outgoingTransaction.contractIPO_BidAmount)}</span>
                                        <span class="text-xxs -ml-3">{entity().outgoingTransaction.contractIPO_BidPrice.toLocaleString()} Qus / share</span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
