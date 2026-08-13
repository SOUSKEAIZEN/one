import { Route, Stop } from './types';

const generateStops = (names: string[]): Stop[] => {
  return names.map((name, index) => ({
    id: `s-${name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${index}`,
    name,
    sequence: index + 1,
    latitude: 28.6139 + (Math.random() - 0.5) * 0.1, // Simulated
    longitude: 77.2090 + (Math.random() - 0.5) * 0.1,
    arrivalOffset: index * 3, // Roughly 3 mins between stops
  }));
};

const route511A_Stops = [
  "Dhaula Kuan ARSD College", "Satya Niketan", "Moti Bagh Gurudwara Nanakpura",
  "South Moti Bagh (Ring Road)", "South Moti Bagh", "R K Puram Sector 12",
  "RK Puram Sec-12", "R K Puram Sec-7", "Mohan Singh Market", "RK Puram Sec 1",
  "R K Puram Nab", "Munirka Family Planning", "Munirka DDA Flats",
  "Munirka Family Planning", "ISTM", "Ber Sarai", "School Of Physical Science",
  "FAI", "Sanskrit Vidyapeeth", "Katwaria Sarai", "Qutub Hotel", "NCERT",
  "Adhchini Village", "Mothers International School", "IIT Gate", "Panchsheel Club",
  "Hauz Khas Terminal", "Sadhna Enclave", "Swami Nagar", "Chirag Dilli",
  "OS Communication / Masjid Moth", "Pumposh Enclave", "Nehru Place Terminal",
  "Paras Cinema / Bhairav Temple", "Kalkaji Mandir", "Govind Puri Metro Station",
  "Kalkaji Depot", "C Lal Chowk", "CRPF Camp / Crown Plaza", "Bank",
  "Indra Kalyan Vihar", "Okhla Phase 1", "ESI Hospital", "Tehkhand Depot",
  "Maa Anand Mayee Marg", "Prem Nagar", "Lal Kuan", "Surajkund Crossing",
  "Prehlad Pur", "Badarpur M B Road / Rajiv Gandhi Stadium", "Jaitpur Crossing",
  "Badarpur Border (T)"
];

const route433_Stops = [
  "New Delhi Railway Station Gate 2", "Shivaji Park", "Super Bazar",
  "Palika Kendra", "Police Station Parliament Street", "Aakashwani Bhawan",
  "Central Secretariat Metro Station", "Udyog Bhawan", "Sunehri Masjid / G Block",
  "Krishan Menon Marg", "Police Station Tughlaq Road", "Tughlaq Crescent",
  "SJ Madrasa", "Safdarjung Airport", "INA Colony", "Kidwai Nagar",
  "AIIMS Ring Road", "South Extension", "Andrews Ganj", "Gupta Market",
  "Lajpat Nagar Ring Road", "Lajpat Nagar Crossing", "Garhi Village",
  "B-Block East Of Kailash", "C-Block East Of Kailash", "Sri Niwas Puri Depot",
  "Laghu Udyog Sansthan", "NSIC", "Kalkaji Mandir", "Kalkaji Mandir",
  "Govind Puri Metro Station", "Kalkaji Depot", "C-Lal Chowk",
  "CRPF Camp / Crown Plaza", "Bank", "Okhla Phase 1", "ESI Hospital Okhla",
  "Tehkhand Depot", "Prem Nagar", "Lal Kuan", "Surajkund Crossing",
  "Prehlad Pur", "Badarpur M B Road / Rajiv Gandhi Stadium", "Jaitpur Crossing",
  "Badarpur Border (T)"
];

const route774_Stops = [
  "President Cabinet Apartments", "Dwarka Sec-6/7", "Dwarka Sec-6/7 Crossing",
  "Dwarka Sec-6 Telephone Exchange", "Dwarka Sector 1", "Palam Health Centre",
  "Manglapuri / Palam Village", "Dwarka Flyover", "Palam Colony Flyover",
  "Prehlad Pur (Palam)", "Indian Oil Station", "IOL", "Palam Airport / IGI Airport T1",
  "Palam More CGDA", "Raksha Sampada Bhawan", "Kendriya Vidyalaya APS Colony",
  "APS Colony / Arjun Path", "Subroto Park", "Shani Mandir / Vasant Village",
  "Swami Malai Mandir", "Poorvi Marg RK Puram Sec 5", "RK Puram Sec-5",
  "Vasant Vihar Depot", "Munirka Family Planning", "Munirka DDA Flats",
  "ISTM / JNU", "IIT Hostel", "Jia Sarai", "IIT Gate", "Panchsheel Club",
  "Panchsheel Club / Panchsheel Enclave", "Sadhna Enclave", "North Point Nursing Home",
  "Swami Nagar", "Masjid Moth", "Savitri Cinema", "OS Communications",
  "Pumposh Enclave", "Nehru Place Terminal", "Kalkaji Mandir",
  "Govind Puri Metro Station", "Kalkaji Depot", "C-Lal Chowk",
  "CRPF Camp / Crown Plaza", "Bank", "Okhla Phase 1", "ESI Hospital",
  "Tehkhand Depot", "Prem Nagar", "Lal Kuan", "Surajkund Crossing",
  "Prehlad Pur", "Badarpur M B Road / Rajiv Gandhi Stadium", "Badarpur Jaitpur Crossing",
  "Badarpur Border (T)"
];

const route874_Stops = [
  "Uttam Nagar Terminal", "Uttam Nagar / A1 Janakpuri", "Chander Nagar / Tilak Pul",
  "Jivan Park", "C1 Janak Puri", "A3 Janak Puri", "C-2 Janakpuri",
  "C2B Janak Puri", "C4E Janakpuri", "C4H Janakpuri", "Janakpuri C5A",
  "DESU Colony Janakpuri", "Sagarpur Vashisht Park", "D Block Janak Puri",
  "Lajwanti Garden", "Nangal Raya", "Janak Setu", "Supply Depot", "Kirbi Place",
  "Thimiyan Park", "S.O. Flats Cariappa Marg", "Raj Rif Line", "Golf Club",
  "Dhaula Kuan", "Satya Niketan", "Gurudwara Moti Bagh", "South Moti Bagh",
  "RK Puram Sector 12", "RK Puram Sec 13", "Hyatt Hotel", "Nauroji Nagar",
  "SJ Hospital", "AIIMS Ring Road", "South Extension 2",
  "South Extension Petrol Pump", "Andrews Ganj", "Central School",
  "Lady Shri Ram College", "Kailash Colony", "Sant Nagar", "Nehru Place",
  "Nehru Place Terminal", "Kalkaji Mandir", "Govind Puri Metro Station",
  "Kalkaji Depot", "C-Lal Chowk", "CRPF Camp / Crown Plaza", "Bank",
  "Indra Kalyan Vihar", "Okhla Phase 1", "ESI Hospital", "Tehkhand Depot",
  "Prem Nagar", "Lal Kuan", "Surajkund Crossing", "Prehlad Pur",
  "Badarpur M B Road / Rajiv Gandhi Stadium", "Badarpur Jaitpur Crossing",
  "Badarpur Border (T)"
];

export const ALL_ROUTES: Route[] = [
  {
    id: "r-511a-fwd",
    routeNumber: "511A",
    direction: "Dhaula Kuan → Badarpur Border",
    origin: "Dhaula Kuan ARSD College",
    destination: "Badarpur Border (T)",
    busType: "BOTH",
    stops: generateStops(route511A_Stops),
    estimatedDuration: route511A_Stops.length * 3,
    operatingHours: "06:00 - 22:00",
    frequency: 15
  },
  {
    id: "r-511a-rev",
    routeNumber: "511A",
    direction: "Badarpur Border → Dhaula Kuan",
    origin: "Badarpur Border (T)",
    destination: "Dhaula Kuan ARSD College",
    busType: "BOTH",
    stops: generateStops([...route511A_Stops].reverse()),
    estimatedDuration: route511A_Stops.length * 3,
    operatingHours: "06:00 - 22:00",
    frequency: 15
  },
  {
    id: "r-433-fwd",
    routeNumber: "433",
    direction: "New Delhi Rly Stn → Badarpur Border",
    origin: "New Delhi Railway Station Gate 2",
    destination: "Badarpur Border (T)",
    busType: "NON_AC",
    stops: generateStops(route433_Stops),
    estimatedDuration: route433_Stops.length * 3,
    operatingHours: "05:30 - 23:00",
    frequency: 10
  },
  {
    id: "r-433-rev",
    routeNumber: "433",
    direction: "Badarpur Border → New Delhi Rly Stn",
    origin: "Badarpur Border (T)",
    destination: "New Delhi Railway Station Gate 2",
    busType: "NON_AC",
    stops: generateStops([...route433_Stops].reverse()),
    estimatedDuration: route433_Stops.length * 3,
    operatingHours: "05:30 - 23:00",
    frequency: 10
  },
  {
    id: "r-433b-fwd",
    routeNumber: "433B",
    direction: "New Delhi Rly Stn → Badarpur Border",
    origin: "New Delhi Railway Station Gate 2",
    destination: "Badarpur Border (T)",
    busType: "AC",
    stops: generateStops(route433_Stops),
    estimatedDuration: route433_Stops.length * 3,
    operatingHours: "07:00 - 21:00",
    frequency: 20
  },
  {
    id: "r-774-fwd",
    routeNumber: "774",
    direction: "Dwarka → Badarpur Border",
    origin: "President Cabinet Apartments",
    destination: "Badarpur Border (T)",
    busType: "BOTH",
    stops: generateStops(route774_Stops),
    estimatedDuration: route774_Stops.length * 3,
    operatingHours: "06:00 - 22:30",
    frequency: 12
  },
  {
    id: "r-774-rev",
    routeNumber: "774",
    direction: "Badarpur Border → Dwarka",
    origin: "Badarpur Border (T)",
    destination: "President Cabinet Apartments",
    busType: "BOTH",
    stops: generateStops([...route774_Stops].reverse()),
    estimatedDuration: route774_Stops.length * 3,
    operatingHours: "06:00 - 22:30",
    frequency: 12
  },
  {
    id: "r-774b-fwd",
    routeNumber: "774B",
    direction: "Dwarka → Badarpur Border (Express)",
    origin: "President Cabinet Apartments",
    destination: "Badarpur Border (T)",
    busType: "AC",
    stops: generateStops(route774_Stops),
    estimatedDuration: route774_Stops.length * 3,
    operatingHours: "07:00 - 20:00",
    frequency: 30
  },
  {
    id: "r-874-fwd",
    routeNumber: "874",
    direction: "Uttam Nagar → Badarpur Border",
    origin: "Uttam Nagar Terminal",
    destination: "Badarpur Border (T)",
    busType: "BOTH",
    stops: generateStops(route874_Stops),
    estimatedDuration: route874_Stops.length * 3,
    operatingHours: "05:45 - 22:15",
    frequency: 15
  },
  {
    id: "r-874-rev",
    routeNumber: "874",
    direction: "Badarpur Border → Uttam Nagar",
    origin: "Badarpur Border (T)",
    destination: "Uttam Nagar Terminal",
    busType: "BOTH",
    stops: generateStops([...route874_Stops].reverse()),
    estimatedDuration: route874_Stops.length * 3,
    operatingHours: "05:45 - 22:15",
    frequency: 15
  }
];

export const getRouteById = (id: string) => ALL_ROUTES.find(r => r.id === id);

// Extract unique stops for global search
export const ALL_STOPS = Array.from(new Set([
  ...route511A_Stops, ...route433_Stops, ...route774_Stops, ...route874_Stops
])).map(name => ({
  name,
  routes: ALL_ROUTES.filter(r => r.stops.some(s => s.name === name)).map(r => r.routeNumber)
}));
