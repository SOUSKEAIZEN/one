import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Ticket, Train } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { ALL_ROUTES } from '../data/routes';
import './TicketHistory.css';

const TicketHistory = () => {
  const navigate = useNavigate();
  const { tickets, setSelectedRoute, setSelectedSource, setSelectedDestination } = useAppContext();

  // Active tickets (auto-deleted if expired)
  const activeTickets = tickets;

  const formatFullDate = (ts: number) => {
    // 13-08-2026 13:38:16
    const d = new Date(ts);
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${pad(d.getDate())}-${pad(d.getMonth() + 1)}-${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  };

  const handleBuyClick = () => {
    const route = ALL_ROUTES.find(r => r.id === 'r-774-fwd');
    if (route) {
      setSelectedRoute(route);
      setSelectedSource(null);
      setSelectedDestination(null);
      navigate('/buy');
    }
  };

  return (
    <div className="page-history">
      <div className="tickets-hero-banner">
        {/* Placeholder for the blue illustration of people on train */}
        <div style={{ opacity: 0.5, color: '#1976D2', display: 'flex', gap: '20px', alignItems: 'center' }}>
          <Train size={64} />
        </div>

        <div className="tickets-top-actions">
          <div className="tt-action-card" onClick={handleBuyClick} style={{ cursor: 'pointer' }}>
            <span className="tt-card-title">Bus<br/>Ticket</span>
            <div className="tt-icon-wrapper" style={{ color: '#FBC02D' }}>
              <Ticket size={24} style={{ transform: 'rotate(-45deg)' }} />
            </div>
          </div>
          <div className="tt-action-card">
            <div className="tt-new-badge">New</div>
            <span className="tt-card-title">Bus<br/>Passes</span>
            <div className="tt-icon-wrapper" style={{ color: '#E91E63' }}>
              <Ticket size={24} style={{ transform: 'rotate(-45deg)' }} />
            </div>
          </div>
          <div className="tt-action-card grey">
            <span className="tt-card-title">Metro<br/>Ticket</span>
            <div className="tt-icon-wrapper" style={{ color: '#D32F2F' }}>
              <Train size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="tickets-main-content">
        
        <div className="tickets-section-header">
          <span className="ts-title">My Bus Ticket</span>
          <span className="ts-view-all" onClick={() => navigate('/tickets')}>View all tickets</span>
        </div>

        {activeTickets.length === 0 ? (
          <div className="ts-empty-card">
            No Ticket Available
          </div>
        ) : (
          activeTickets.map(ticket => {
            const originalFare = (ticket.farePaid / 0.9).toFixed(1);
            return (
              <div key={ticket.id} className="active-ticket-card" onClick={() => navigate(`/ticket/${ticket.id}`)}>
                <div className="atc-top-bar"></div>
                <div className="atc-content">
                  <div className="atc-row-between">
                    <span className="atc-route">{ticket.routeNumber}</span>
                    <div className="atc-price-col">
                      <span className="atc-price-old">₹{originalFare}</span>
                      <span className="atc-qty">x {ticket.ticketsCount}</span>
                      <span className="atc-price-new">₹{ticket.farePaid.toFixed(1)}</span>
                    </div>
                  </div>
                  
                  <div className="atc-date">{formatFullDate(ticket.purchaseTime)}</div>
                  <div className="atc-stop">{ticket.fromStop}</div>
                  <div className="atc-stop">{ticket.toStop}</div>
                  
                  <div className="atc-ticket-id">{ticket.id}</div>
                </div>
              </div>
            );
          })
        )}

        <div className="tickets-section-header">
          <span className="ts-title">My Metro Ticket</span>
          <span className="ts-view-all">View all tickets</span>
        </div>
        <div className="ts-empty-card">
          No Ticket Available
        </div>

        <div className="tickets-section-header">
          <span className="ts-title">My Bus Pass</span>
          <span className="ts-view-all">View all passes</span>
        </div>
        <div className="ts-empty-card">
          Click to View
        </div>

      </div>
    </div>
  );
};

export default TicketHistory;
