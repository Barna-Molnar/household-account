export const updateData = (where, otherAcc, amount) => {
    return where.map((item) => {
        if (item.to === otherAcc) {
            return { value: item.value + amount, to: otherAcc };
        } else {
            return item;
        }
    });
};