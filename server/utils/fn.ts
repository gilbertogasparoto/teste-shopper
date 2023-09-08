export const priceRounder = (price: number) => {
  return Math.round((price + Number.EPSILON) * 100) / 100;
};
