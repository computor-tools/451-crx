import * as qubic from 'qubic-lrv';

let lrv;

let epochListener;
let tickListener;

const entityListener = function (entity) {
    if (entity.outgoingTransfer !== undefined) {
        console.log('Entity:', entity.tick, entity.spectrumDigest, entity.id, entity.energy, entity.outgoingTransfer.digest, entity.outgoingTransfer.tick, 'executed:', entity.outgoingTransfer.executed);
    } else {
        console.log('Entity:', entity.tick, entity.spectrumDigest, entity.id, entity.energy);
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

let seed;
const privateKeys = new Map();
const entities = new Map();

const addId = async function (event) {
    const privateKey = await qubic.createPrivateKey(seed, event.data.index);
    const entity = await lrv.createEntity(privateKey);

    privateKeys.set(entity.id, privateKey);
    entities.set(entity.id, entity);

    event.source.postMessage({
        command: 'ID',
        id: entity.id,
    });
};

addEventListener("message", async function (event) {
    switch (event.data.command) {
        case 'INIT':
            if (lrv === undefined) {
                lrv = qubic.lrv();

                epochListener = function (broadcastedComputors) {
                    console.log('Epoch:', broadcastedComputors.epoch);

                    event.source.postMessage({
                        command: 'EPOCH',
                        broadcastedComputors,
                    });
                };

                tickListener = function (tick) {
                    console.log('\nTick  :', tick.tick, tick.spectrumDigest, tick.universeDigest, tick.computerDigest);

                    event.source.postMessage({
                        command: 'TICK',
                        tick,
                    });
                };

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
            }

            break;

        case 'LOGIN':
            if (lrv !== undefined) {
                if (seed === undefined) {
                    seed = event.data.seed;
                    addId(event);
                }
            }
            break;

        case 'ADD_ID':
            if (lrv !== undefined) {
                if (seed !== undefined) {
                    addId(event);
                }
            }
            break;

        case 'REMOVE_ID':
            if (lrv !== undefined) {
                const entity = entities.get(event.data.id);
                if (entity !== undefined) {
                    // entity.remove();
                }

                privateKeys.delete(event.data.id);
                entities.delete(event.data.id);
            }
            break;

        case 'LOGOUT':
            if (seed !== undefined) {
                seed = '';
                privateKeys.clear();

                // entities.forEach(entity => entity.destroy());
                entities.clear();
            }
            break;
    }
});