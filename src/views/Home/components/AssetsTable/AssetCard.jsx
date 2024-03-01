import { ArrowUpRightIcon } from '@/assets/icons';
import { Button } from '@/components/ui/buttons';
import { Routes } from '@/utils/routes';
import { A } from '@solidjs/router';
import { mergeProps } from 'solid-js';
import { twMerge } from 'tailwind-merge';

// TODO: Implement the AssetCard component with real data and add props JSdocs

export default function AssetCard(_props) {
    const props = mergeProps(
        {
            id: 'AFZPUAIYVPNUYGJRQVLUKOPPVLHAZQTGLYAAUUNBXFTVTAMSBKQBLECsEP',
            name: 'ASSETXX',
            quantity: '123,213',
            energy: '100B',
            status: 'Owned',
            managingContractIndex: 1,
            class: '',
        },
        _props
    );

    const parseId = () => {
        const [id, checksum] = [props.id.slice(0, -4), props.id.slice(-4)];
        return { id, checksum };
    };

    return (
        <article class={twMerge('space-y-3 px-6 py-5 border-t', props.class)}>
            <div class="flex items-center gap-2">
                <h2>{props.name}</h2>
                <p>-</p>
                <span class="flex gap-2 text-xs rounded-lg border px-2 py-1">
                    <span># {props.managingContractIndex}</span>
                    <span>{parseId().id}</span>
                    <span class="border-l pl-2">{parseId().checksum}</span>
                </span>
            </div>
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

                        <td class="p-2 flex gap-2">
                            <Button size="x-small" color="secondary" variant="outlined">
                                Ask
                            </Button>
                            <Button size="x-small" color="secondary">
                                Bid
                            </Button>

                            <A href={Routes.TRANSFER}>
                                <ArrowUpRightIcon class="border w-7 h-7 p-1.5 rounded-lg bg-white" />
                            </A>
                        </td>
                    </tr>
                </tbody>
            </table>
        </article>
    );
}
