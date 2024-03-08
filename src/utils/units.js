export const formatQubic = (amountBigInt) => {
    const amount = Number(amountBigInt);

    if (amount === 1) return '1 Qubic';

    const suffixes = [
        { threshold: 1e12, suffix: 'TQus' },
        { threshold: 1e9, suffix: 'BQus' },
        { threshold: 1e6, suffix: 'MQus' },
        { threshold: 0, suffix: 'Qus' },
    ];

    const { suffix, threshold } = suffixes.find(({ threshold }) => amount >= threshold);

    const formattedAmount = (amount / (threshold || 1)).toLocaleString();

    return `${formattedAmount} ${suffix}`;
};

export const formatQubicTx = (amountBigInt, type) => {
    if (type !== 'Sent' && type !== 'Received') {
        throw new Error('Invalid tx type');
    }

    return `${type === 'Sent' ? '-' : '+'}${formatQubic(amountBigInt)}`;
};
