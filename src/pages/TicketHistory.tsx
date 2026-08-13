import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Ticket as TicketIcon } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import './TicketHistory.css';

const TicketHistory = () => {
  const navigate = useNavigate();
  const { tickets } = useAppContext();

  // All tickets in state are now guaranteed to be active due to AppContext cleanup
  const activeTickets = tickets;

  const formatShortDate = (ts: number) => {
    return new Date(ts).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
  };

  return (
    <div className="page-container page-history">
      <div className="route-header">
        <h2>My Bus Tickets</h2>
      </div>

      <div className="history-content">
        {activeTickets.length === 0 ? (
          <div className="no-tickets">
            <TicketIcon size={48} className="mb-2 opacity-50" />
            <p>No active tickets found</p>
            <button className="btn btn-outline mt-4" onClick={() => navigate('/')}>
              Book a Ticket
            </button>
          </div>
        ) : (
          <div className="ticket-section">
            <h3>Active Tickets</h3>
            {activeTickets.map(ticket => (
              <div key={ticket.id} className="history-card active" onClick={() => navigate(`/ticket/${ticket.id}`)}>
                <div className="h-top">
                  <span className="h-route">{ticket.routeNumber}</span>
                  <span className="h-status text-success">VALID DEMO</span>
                </div>
                <div className="h-path">
                  {ticket.fromStop} &rarr; {ticket.toStop}
                </div>
                <div className="h-bottom">
                  <span className="h-date">{formatShortDate(ticket.purchaseTime)}</span>
                  <span className="h-fare">₹{ticket.farePaid.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketHistory;
