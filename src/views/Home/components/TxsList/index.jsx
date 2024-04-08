import { For, createSignal } from 'solid-js';
import TxDetailsModal from './TxDetailsModal';
import TxItem from './TxItem';

import entity from '@/signals/entity';

const filters = ['All', 'Incoming', 'Outgoing'];

export default function TxsList() {
    const [filter, setFilter] = createSignal('All');
    const [showTxDetailsModal, setShowTxDetailsModal] = createSignal(false);
    const [transaction, setTransaction] = createSignal();

    const handleSetFilter = (filter) => {
        setFilter(filter);
    };

    const handleShowTxDetails = (digest, txType) => {
        setTransaction({ ...entity()?.transactions[digest], txType });
        setShowTxDetailsModal(true);
    };

    return (
        <>
            <section class="border rounded-xl w-full bg-white mb-16 dark:bg-surface dark:border-zinc-600">
                <div class="flex items-center border-b sticky top-10 bg-white rounded-t-xl dark:bg-surface dark:border-zinc-600">
                    {/* Filters */}
                    <ul class="flex">
                        <For each={filters}>
                            {(filterValue) => (
                                <li>
                                    <button
                                        class={`w-40 text-sm text-muted-foreground px-4 py-3 dark:text-white ${filter() === filterValue ? 'border-b-primary border-b-2' : ''}`}
                                        onClick={() => handleSetFilter(filterValue)}
                                    >
                                        {filterValue}
                                    </button>
                                </li>
                            )}
                        </For>
                    </ul>
                </div>
                <ul>
                    <For each={Object.values(entity()?.transactions || {})} fallback={<p class="flex justify-center p-4 text-sm">No Transactions Found</p>}>
                        {(transaction, index) => <TxItem class={index() === 0 && 'border-0'} data-index={index()} onShowTxDetails={handleShowTxDetails} {...transaction} />}
                    </For>
                </ul>
            </section>

            <TxDetailsModal isOpen={showTxDetailsModal()} onClose={setShowTxDetailsModal} {...transaction} />
        </>
    );
}
