import * as qubic from 'qubic-lrv';

let lrv;

let seed;
const privateKeys = new Map();

let currentId = '';
const entities = new Map();
const entityMessages = new Map();
entityMessages.set('', {
    command: 'ENTITY',
    entity: {
        id: '',
    },
});

let latestBroadcastedComputors;
let latestTick;

const epochListener = function (broadcastedComputors) {
    console.log('Epoch:', broadcastedComputors.epoch);

    if (latestBroadcastedComputors === undefined || latestBroadcastedComputors.epoch < broadcastedComputors.epoch) {
        latestBroadcastedComputors = broadcastedComputors;

        postMessage({
            command: 'EPOCH',
            broadcastedComputors,
        });
    }
};

const tickListener = function (tick) {
    console.log('\nTick  :', tick.tick, tick.spectrumDigest, tick.universeDigest, tick.computerDigest);

    if (latestTick === undefined || latestTick.tick < tick.tick) {
        latestTick = tick;

        postMessage({
            command: 'TICK',
            tick,
        });
    }
};

const entityListener = function (entity) {
    if (entity.outgoingTransfer !== undefined) {
        console.log('Entity:', entity.tick, entity.spectrumDigest, entity.id, entity.energy, entity.outgoingTransfer.digest, entity.outgoingTransfer.tick, 'executed:', entity.outgoingTransfer.executed);
    } else {
        console.log('Entity:', entity.tick, entity.spectrumDigest, entity.id, entity.energy);
    }

    const entityMessage = entityMessages.get(entity.id);
    if (entityMessage) {
        if (entityMessage.entity.tick === undefined || entityMessage.entity.tick < entity.tick) {
            entityMessage.entity = {
                id: entity.id,
                energy: entity.energy,
                incomingAmount: entity.incomingAmount,
                outgoingAmount: entity.outgoingAmount,
                numberOfIncomingTransfers: entity.numberOfIncomingTransfers,
                numberOfOutgoingTransfers: entity.numberOfOutgoingTransfers,
                latestIncomingTransferTick: entity.latestIncomingTransferTick,
                latestOutgoingTransferTick: entity.latestOutgoingTransferTick,

                tick: entity.tick,
                epoch: entity.epoch,
                timestamp: entity.timestamp,

                digest: entity.digest,
                siblings: entity.siblings,
                spectrumIndex: entity.spectrumIndex,
                spectrumDigest: entity.spectrumDigest,

                outgoingTransfer: entity.outgoingTransfer,
            };

            postMessage(entityMessage);
        }
    }
};

const transferListener = function (transfer) {
    console.log('Transfer:', transfer);
};

const tickStatsListener = function (stats) {
    console.log('Stats :', stats.tick, '(' + stats.numberOfSkippedTicks.toString() + ' skipped)', stats.duration.toString() + 'ms,', stats.numberOfUpdatedEntities, 'entities updated', stats.numberOfSkippedEntities, 'skipped,', stats.numberOfClearedTransactions, 'txs cleared');
};

const errorListener = function (error) {
    console.log(error);
};

const postMessage = (message) => {
    self.clients.matchAll().then((clients) => clients?.forEach((client) => client.postMessage(message)));
};

const addEntity = async function (event) {
    const privateKey = await qubic.createPrivateKey(seed, event.data.index);
    const entity = await lrv.createEntity(privateKey);

    privateKeys.set(entity.id, privateKey);
    entities.set(entity.id, entity);

    const entityMessage = {
        command: 'ENTITY',
        entity: {
            id: entity.id,
        },
    };
    entityMessages.set(entity.id, entityMessage);

    postMessage(entityMessage);

    return entity.id;
};

self.addEventListener('message', async function (event) {
    switch (event.data.command) {
        case 'INIT':
            event.source.postMessage(entityMessages.get(currentId));

            if (lrv === undefined) {
                lrv = qubic.lrv();

                await lrv.subscribe({ id: qubic.ARBITRATOR }); // subscribe to arbitrary id

                lrv.addListener('epoch', epochListener);
                lrv.addListener('tick', tickListener);
                lrv.addListener('entity', entityListener);
                lrv.addListener('transfer', transferListener);
                lrv.addListener('tick_stats', tickStatsListener);
                lrv.addListener('error', errorListener);

                lrv.connect([{
                    protocol: qubic.COMMUNICATION_PROTOCOLS.WEBSOCKET,
                    tls: true,
                    address: 'lrv.quorum.gr',
                }]); // start the loop by listening to networked messages
            } else {
                if (latestBroadcastedComputors !== undefined) {
                    event.source.postMessage({
                        command: 'EPOCH',
                        broadcastedComputors: latestBroadcastedComputors,
                    });

                    if (latestTick !== undefined) {
                        event.source.postMessage({
                            command: 'TICK',
                            tick: latestTick,
                        });
                    }
                }
            }

            break;

        case 'ENTITY':
            if (event.data.id) {
                if (entities.has(event.data.id)) {
                    currentId = event.data.id;
                }
            }
            if (currentId) {
                event.source.postMessage(entityMessages.get(currentId));
            }
            break;

        case 'LOGIN':
            if (lrv !== undefined) {
                if (seed === undefined) {
                    seed = event.data.seed;
                    currentId = await addEntity(event);
                }
            }
            break;

        case 'ADD_ENTITY':
            if (lrv !== undefined) {
                if (seed !== undefined) {
                    addEntity(event);
                }
            }
            break;

        case 'LOGOUT':
            if (seed !== undefined) {
                seed = undefined;
                privateKeys.clear();

                entities.forEach(entity => entity.unsubscribe());
                entities.clear();

                currentId = '';
                postMessage(entityMessages.get(''));
            }
            break;
    }
});