export interface FareInfo {
  original: number;
  discounted: number;
  discountPercent: number;
}

export const getFareDetails = (
  routeNumber: string,
  busType: 'AC' | 'NON_AC',
  quantity: number = 1
): FareInfo => {
  let singleBaseFare = 10;

  const routeUpper = routeNumber.toUpperCase();

  if (routeUpper.includes('774') || routeUpper.includes('874')) {
    // 774 and 874: AC = 10 -> 9.0 | Non-AC = 5 -> 4.5
    singleBaseFare = busType === 'AC' ? 10 : 5;
  } else if (routeUpper.includes('511') || routeUpper.includes('433')) {
    // 511A and 433/433B: AC = 15 -> 13.5 | Non-AC = 10 -> 9.0
    singleBaseFare = busType === 'AC' ? 15 : 10;
  } else {
    // Default fallback
    singleBaseFare = busType === 'AC' ? 10 : 5;
  }

  const original = singleBaseFare * quantity;
  const discounted = original * 0.9; // 10% discount

  return {
    original,
    discounted,
    discountPercent: 10.0
  };
};