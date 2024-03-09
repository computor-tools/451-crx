const IS_FORMAT_UNITS_ACTIVE = false;

export const formatQubic = (amountBigInt) => {
    const amount = Number(amountBigInt);

    if (!IS_FORMAT_UNITS_ACTIVE) {
        return `${amount} Qus`;
    }

    if (amount === 1) return '1 Qubic';

    const suffixes = [
        { threshold: 1e12, suffix: 'TQus' },
        { threshold: 1e9, suffix: 'BQus' },
        { threshold: 1e6, suffix: 'MQus' },
    ];

    const { suffix, threshold } = suffixes.find(({ threshold }) => amount >= threshold) || {
        threshold: 0,
        suffix: 'Qus',
    };

    const formattedAmount = (amount / (threshold || 1)).toLocaleString();

    return `${formattedAmount} ${suffix}`;
};

export const formatQubicTx = (amountBigInt, type) => {
    if (type !== 'Sent' && type !== 'Received') {
        throw new Error('Invalid tx type');
    }

    return `${type === 'Sent' ? '-' : '+'}${formatQubic(amountBigInt)}`;
};
