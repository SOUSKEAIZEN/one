export const FAQS = [
  {
    category: "General",
    questions: [
      { q: "Ticket not received", a: "If your ticket doesn't appear, refresh the app. This is a demo application." },
      { q: "Refund question", a: "Since this is a demo app, no real payments are processed, so no refunds are needed." },
      { q: "Phone lost/unresponsive", a: "Your ticket history is stored on your device. Losing your phone means losing demo data." }
    ]
  },
  {
    category: "Driver",
    questions: [
      { q: "Rash Driving", a: "Please use the Complaints tab to report rash driving with the bus and route number." },
      { q: "Bus not stopping", a: "Drivers are required to stop at all designated stops. You can log a complaint if this occurs." },
      { q: "Driver misbehavior", a: "Any misbehavior can be reported through the complaint form." }
    ]
  },
  {
    category: "Conductor",
    questions: [
      { q: "Conductor misbehavior", a: "Submit a complaint with the route details for conductor issues." },
      { q: "Excess fare charged", a: "Demo fares are fixed. In reality, you can report excess fare charges." },
      { q: "ETM Related Issue", a: "Electronic Ticketing Machine issues can be reported here." }
    ]
  },
  {
    category: "Bus",
    questions: [
      { q: "Bus cleanliness", a: "We strive to keep buses clean. Report any hygiene issues." },
      { q: "AC not working", a: "If you boarded an AC bus and the AC is off, you may file a complaint." }
    ]
  },
  {
    category: "EV Charging",
    questions: [
      { q: "Charging rate issue", a: "EV charging rates in this demo are simulated." }
    ]
  }
];

export const EV_STATIONS = [
  { id: "ev-1", name: "Okhla Phase 1 EV Hub", distance: "1.2 km", availability: "3 slots available", type: "DC Fast (CCS2)", support: "4W" },
  { id: "ev-2", name: "Nehru Place Charging Stn", distance: "3.5 km", availability: "Fully occupied", type: "AC Type 2", support: "2W, 4W" },
  { id: "ev-3", name: "Dhaula Kuan Rapid Charge", distance: "8.1 km", availability: "1 slot available", type: "DC Fast (CCS2)", support: "4W" },
  { id: "ev-4", name: "Kalkaji Mandir E-Park", distance: "2.4 km", availability: "5 slots available", type: "AC Type 2", support: "2W, 3W" },
];

export const PARKING_SPOTS = [
  { id: "p-1", name: "Govind Puri Metro Parking", distance: "1.5 km", slots: 42, price: "₹20/hr" },
  { id: "p-2", name: "Nehru Place Multilevel", distance: "3.8 km", slots: 105, price: "₹40/hr" },
  { id: "p-3", name: "Hauz Khas Terminal Park", distance: "6.2 km", slots: 12, price: "₹30/hr" },
];
