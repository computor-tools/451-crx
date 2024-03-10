const IS_FORMAT_UNITS_ACTIVE = false;

export const formatQubic = (amountBigInt) => {
    if (!IS_FORMAT_UNITS_ACTIVE) {
        return `${amountBigInt.toLocaleString()} Qus`;
    }

    if (amountBigInt === BigInt(1)) return '1 Qubic';

    const suffixes = [
        { threshold: BigInt(1e12), suffix: 'TQus' },
        { threshold: BigInt(1e9), suffix: 'BQus' },
        { threshold: BigInt(1e6), suffix: 'MQus' },
        { threshold: BigInt(1), suffix: 'Qus' },
    ];

    const { suffix, threshold } = suffixes.find(({ threshold }) => amountBigInt >= threshold) || {
        threshold: BigInt(1),
        suffix: 'Qus',
    };

    let formattedAmountBigInt = amountBigInt / threshold;

    let formattedAmount = formattedAmountBigInt.toLocaleString();

    return `${formattedAmount} ${suffix}`;
};

export const formatQubicTx = (amountBigInt, type) => {
    if (type !== 'Sent' && type !== 'Received') {
        throw new Error('Invalid tx type');
    }

    return `${type === 'Sent' ? '-' : '+'}${formatQubic(amountBigInt)}`;
};
