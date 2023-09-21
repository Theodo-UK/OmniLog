export const formatCostToString = (cost: number | null): string => {
    if (cost === null) {
        return "-";
    }
    if (cost >= 1000) {
        const thousands = cost / 1000;
        const cleanThousandsString = formatNumber(thousands);
        return `${cleanThousandsString}k`;
    }
    const cleanCostString = formatNumber(cost);
    if (cleanCostString === "0.00" && cost !== 0) {
        return "0.00*";
    }

    return cleanCostString;
}

const formatNumber = (num: number) => {
    const rounded = roundNumber(num, 4);
    const decimalsString = rounded.toString().split(".")[1];
    const decimalsStringWithZeros = decimalsString?.padEnd(2, "0") ?? "00";
    const integerString = rounded.toString().split(".")[0] ?? "0";
    return `${integerString}.${decimalsStringWithZeros}`;
}

const roundNumber = (num: number, decimals: number) => {
    const rounded = Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
    return rounded;
}