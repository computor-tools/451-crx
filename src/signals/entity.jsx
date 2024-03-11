import { createEffect, createRoot, createSignal } from 'solid-js';

export default createRoot(function () {
    const [entity, setEntity] = createSignal();

    const broadcastChannel = new BroadcastChannel('user-control');
    broadcastChannel.addEventListener('message', (event) => {
        switch (event.data.command) {
            case 'DISCARD_TRANSACTION':
                setEntity((current) => ((current.outgoingTransaction && current.outgoingTransaction.executed === false) ? {
                    ...current,
                    outgoingTransaction: undefined,
                } : current));
                break;
        }
    });

    navigator.serviceWorker.addEventListener('message', (event) => {
        switch (event.data.command) {
            case 'ENTITY':
                console.log('ENTITY:', event.data.entity);
                setEntity((current) => ({
                    ...(current?.outgoingTransaction?.executed === false ? {
                        ...event.data.entity,
                        outgoingTransaction: event.data.entity.id ? current?.outgoingTransaction : undefined,
                    } : event.data.entity),
                    transactions: event.data.entity.id && current?.transactions ? {
                        ...current?.transactions,
                        ...(current?.outgoingTransaction?.executed !== undefined ? {
                            [current.outgoingTransaction.digest]: current.outgoingTransaction
                        } : {}),
                    } : undefined,
                }));
                break;
            case 'TRANSACTION':
                if (event.data.transaction) {
                    console.log("TRANSACTION:", event.data.transaction);
                    setEntity((current) => ((!current?.outgoingTransaction || current?.outgoingTransaction?.executed === false) ? {
                        ...current,
                        outgoingTransaction: event.data.transaction,
                        transactions: {
                            ...(current?.transactions || {}),
                            [event.data.transaction.digest]: event.data.transaction,
                        },
                    } : current));
                }
                break;
            case 'GET_TRANSACTIONS':
                if (event.data.transactions) {
                    console.log("GET_TRANSACTIONS:", event.data.transactions);
                    setEntity((current) => ({
                        ...current,
                        transactions: event.data.transactions.reduce((acc, transaction) => {
                            acc[transaction.digest] = transaction;
                            return acc;
                        }, {}),
                    }));
                } else {
                    if (event.data.errorMessage) {
                        // TODO: disaply error
                    }
                }
                break;
        }
    });

    createEffect(() => {
        if (entity()?.id === undefined) {
            navigator.serviceWorker.ready.then(() => navigator.serviceWorker.controller.postMessage({
                command: 'ENTITY',
            }));
        } else if (entity()?.id && entity()?.transactions === undefined) {
            // eslint-disable-next-line solid/reactivity
            navigator.serviceWorker.ready.then(() => navigator.serviceWorker.controller.postMessage({
                command: 'GET_TRANSACTIONS',
                id: entity().id,
            }));
        }
	});

    return entity;
});