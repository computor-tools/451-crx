import { Button } from '@/components/ui/buttons';
import { mergeProps, Show } from 'solid-js';
import { twMerge } from 'tailwind-merge';
import { Badge, StatusIndicator } from '../ui';

import entity from '@/signals/entity';

export default function TxInfo(_props) {
    const props = mergeProps(
        {
            id: 'AFZPUAIYVPNUYGJRQVLUKOPPVLHAZQTGLYAAUUNBXFTVTAMSBKQBLECsEP',
            name: 'SC XXXXXXXX(3)',
            quantity: '123,213',
            energy: '100B',
            class: '',
            owner: 'Quorum',
        },
        _props
    );

    return (
        <Show when={entity()}>
            <article class={twMerge('pace-y-3 px-6 py-5 border-y-2 border-orange-300 w-full  bg-[rgba(230,121,0,0.2)] mt-10', props.class)}>
                <div class="space-y-5">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2">
                            <h2>{props.name}</h2>
                            <Badge size="x-small">by {props.owner}</Badge>
                            <StatusIndicator status="success" />
                        </div>
                        <div class="flex w-2/4 gap-4">
                            <Button size="x-small" color="green">
                                Bid
                            </Button>
                            <Button size="x-small" color="red" variant="outlined" class="w-2/4">
                                Ask
                            </Button>
                        </div>
                    </div>
                    <div>
                        <div class="flex">
                            <table class="w-full text-xs">
                                <thead>
                                    <tr>
                                        <th class="p-2 text-left">Quantity</th>
                                        <th class="p-2 text-left">Energy</th>
                                        <th class="p-2 text-left">Status</th>
                                        <th class="p-2" />
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="border-t">
                                        <td class="p-2 align-top">{props.quantity}</td>
                                        <td class="p-2 align-top">
                                            <div class="grid gap-1">
                                                <span>{props.energy}</span>
                                                <span class="text-xxs -ml-3">1xxx = 1 Bqus</span>
                                            </div>
                                        </td>
                                        <td class="p-2 align-top">{props.status}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </article>
        </Show>
    );
}
