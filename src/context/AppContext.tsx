import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Ticket, Route, Stop } from '../data/types';

interface AppState {
  tickets: Ticket[];
  addTicket: (ticket: Ticket) => void;
  // Booking state
  selectedRoute: Route | null;
  setSelectedRoute: (route: Route | null) => void;
  selectedSource: Stop | null;
  setSelectedSource: (stop: Stop | null) => void;
  selectedDestination: Stop | null;
  setSelectedDestination: (stop: Stop | null) => void;
  selectedBusType: 'AC' | 'NON_AC';
  setSelectedBusType: (type: 'AC' | 'NON_AC') => void;
  ticketQuantity: number;
  setTicketQuantity: (qty: number) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [selectedSource, setSelectedSource] = useState<Stop | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<Stop | null>(null);
  const [selectedBusType, setSelectedBusType] = useState<'AC' | 'NON_AC'>('NON_AC');
  const [ticketQuantity, setTicketQuantity] = useState<number>(1);

  // Load state from local storage on mount
  useEffect(() => {
    const savedTickets = localStorage.getItem('metrogo_tickets');
    if (savedTickets) {
      try {
        const parsed = JSON.parse(savedTickets) as Ticket[];
        // Auto-delete expired tickets on load
        const validTickets = parsed.filter(t => t.expiresAt > Date.now());
        setTickets(validTickets);
      } catch (e) {
        console.error("Failed to parse tickets", e);
      }
    }
  }, []);

  // Sync tickets to local storage
  useEffect(() => {
    localStorage.setItem('metrogo_tickets', JSON.stringify(tickets));
  }, [tickets]);

  // Periodic cleanup of expired tickets
  useEffect(() => {
    const interval = setInterval(() => {
      setTickets(prev => {
        const now = Date.now();
        const valid = prev.filter(t => t.expiresAt > now);
        // Only update if something changed
        if (valid.length !== prev.length) {
          return valid;
        }
        return prev;
      });
    }, 5000); // Check every 5 seconds
    
    return () => clearInterval(interval);
  }, []);

  const addTicket = (ticket: Ticket) => {
    setTickets(prev => [ticket, ...prev]);
  };

  return (
    <AppContext.Provider value={{
      tickets,
      addTicket,
      selectedRoute,
      setSelectedRoute,
      selectedSource,
      setSelectedSource,
      selectedDestination,
      setSelectedDestination,
      selectedBusType,
      setSelectedBusType,
      ticketQuantity,
      setTicketQuantity
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within AppProvider");
  return context;
};
