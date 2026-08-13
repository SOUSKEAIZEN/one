export interface Stop {
  id: string;
  name: string;
  sequence: number;
  latitude: number;
  longitude: number;
  arrivalOffset: number; // minutes from start
}

export interface Route {
  id: string;
  routeNumber: string;
  direction: string;
  origin: string;
  destination: string;
  busType: 'AC' | 'NON_AC' | 'BOTH';
  stops: Stop[];
  estimatedDuration: number; // minutes
  operatingHours: string;
  frequency: number; // minutes between buses
}

export interface Ticket {
  id: string;
  routeId: string;
  routeNumber: string;
  fromStop: string;
  toStop: string;
  busType: 'AC' | 'NON_AC';
  ticketsCount: number;
  farePaid: number;
  purchaseTime: number;
  expiresAt: number;
  qrPayload: string;
}

export interface FareRule {
  distanceBandKm: number;
  acFare: number;
  nonAcFare: number;
}
