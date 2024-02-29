import * as qubic from 'qubic-lrv';

const test = async function () {
    const lrv = qubic.lrv();

    await lrv.subscribe({ id: qubic.ARBITRATOR }); // subscribe to arbitrary id

    lrv.addListener('epoch', (epoch) => console.log('Epoch:', epoch.epoch));
    lrv.addListener('tick', (tick) => console.log('\nTick  :', tick.tick, tick.spectrumDigest, tick.universeDigest, tick.computerDigest));
    lrv.addListener('entity', (entity) => {
        if (entity.outgoingTransfer !== undefined) {
            console.log('Entity:', entity.tick, entity.spectrumDigest, entity.id, entity.energy, entity.outgoingTransfer.digest, entity.outgoingTransfer.tick, 'executed:', entity.outgoingTransfer.executed);
        } else {
            console.log('Entity:', entity.tick, entity.spectrumDigest, entity.id, entity.energy);
        }
    });
    lrv.addListener('transfer', (transfer) => console.log('Transfer:', transfer));
    lrv.addListener('tick_stats', (stats) => console.log('Stats :', stats.tick, '(' + stats.numberOfSkippedTicks.toString() + ' skipped)', stats.duration.toString() + 'ms,', stats.numberOfUpdatedEntities, 'entities updated', stats.numberOfSkippedEntities, 'skipped,', stats.numberOfClearedTransactions, 'txs cleared'));

    lrv.addListener('error', (error) => console.log(error.message));

    lrv.connect([{
        protocol: qubic.COMMUNICATION_PROTOCOLS.WEBSOCKET,
        tls: true,
        address: 'lrv.quorum.gr',
    }]); // start the loop by listening to networked messages
};

test();