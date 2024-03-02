import { createSignal, createRoot } from 'solid-js';

export default createRoot(function () {
    const [entity, setEntity] = createSignal();

    navigator.serviceWorker.addEventListener('message', (event) => {
        switch (event.data.command) { 
            case 'ENTITY':
                console.log(event.data.entity);
                setEntity(event.data.entity);
                break;
            case 'TRANSACTION':
                if (event.data.transaction) {
                    setEntity((current) => (!current.outgoingTransaction ? {
                        ...current,
                        outgoingTransaction: event.data.transaction,
                    } : current));
                }
                break;
        }
    });

    navigator.serviceWorker.ready.then(() => navigator.serviceWorker.controller.postMessage({
        command: 'ENTITY',
    }));

    return entity;
});