export const findDeleteOrDecrease = (where, otherAcc, amount) => {
    const result = where.find((item) => item.to === otherAcc && item.value - amount !== 0);
    if (!result) {
        return where.filter(item => item.to !== otherAcc);
    } else {
        return where.map((item, i) => {
            if (item.to === otherAcc) {
                return { value: item.value - amount, to: otherAcc };
            } else {
                return item;
            }
        });
    }
};