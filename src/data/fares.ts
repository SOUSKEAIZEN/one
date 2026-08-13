import { FareRule } from './types';

// Simplified demo fare bands based on stop sequences/distance
export const FARE_RULES: FareRule[] = [
  { distanceBandKm: 4, acFare: 10, nonAcFare: 5 },
  { distanceBandKm: 8, acFare: 15, nonAcFare: 10 },
  { distanceBandKm: 12, acFare: 20, nonAcFare: 15 },
  { distanceBandKm: 999, acFare: 25, nonAcFare: 20 },
];

export const calculateFare = (
  stopsDistance: number, // number of stops as proxy for distance
  busType: 'AC' | 'NON_AC',
  quantity: number
): { original: number; discounted: number; discountPercent: number } => {
  // Approximate 1 stop = 0.5 km
  const estKm = stopsDistance * 0.5;
  
  let baseFare = FARE_RULES[FARE_RULES.length - 1].nonAcFare;
  for (const rule of FARE_RULES) {
    if (estKm <= rule.distanceBandKm) {
      baseFare = busType === 'AC' ? rule.acFare : rule.nonAcFare;
      break;
    }
  }

  const originalTotal = baseFare * quantity;
  
  // 10% demo discount always applied
  const discountPercent = 10;
  const discountedTotal = originalTotal * (1 - discountPercent / 100);

  return {
    original: originalTotal,
    discounted: Math.round(discountedTotal * 2) / 2, // Round to nearest 0.5
    discountPercent
  };
};

// Fix the typo in `discountTotal`
export const getFareDetails = (
  startIndex: number,
  endIndex: number,
  busType: 'AC' | 'NON_AC',
  quantity: number
) => {
  const stopsDistance = Math.abs(endIndex - startIndex);
  if (stopsDistance === 0) return { original: 0, discounted: 0, discountPercent: 0 };
  
  const estKm = stopsDistance * 0.5;
  let baseFare = FARE_RULES[FARE_RULES.length - 1].nonAcFare;
  for (const rule of FARE_RULES) {
    if (estKm <= rule.distanceBandKm) {
      baseFare = busType === 'AC' ? rule.acFare : rule.nonAcFare;
      break;
    }
  }

  const originalTotal = baseFare * quantity;
  const discountPercent = 10;
  const discountedTotal = originalTotal * (1 - discountPercent / 100);

  return {
    original: originalTotal,
    discounted: Math.max(0, Math.round(discountedTotal * 2) / 2),
    discountPercent
  };
}
