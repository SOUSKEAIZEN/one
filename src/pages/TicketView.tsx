import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { X, History, QrCode } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useAppContext } from '../context/AppContext';
import './TicketView.css';

const TicketView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { tickets } = useAppContext();
  
  const [timeLeft, setTimeLeft] = useState<string>('');
  const [showQR, setShowQR] = useState(false);

  const ticket = tickets.find(t => t.id === id);

  useEffect(() => {
    if (!ticket) return;

    const updateTimer = () => {
      const now = Date.now();
      const diff = ticket.expiresAt - now;

      if (diff <= 0) {
        // Handled by AppContext auto-deletion
        setTimeLeft('00:00:00');
        return;
      }
      
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / 1000 / 60) % 60);
      const s = Math.floor((diff / 1000) % 60);

      const format = (val: number) => val.toString().padStart(2, '0');
      setTimeLeft(`${format(h)}:${format(m)}:${format(s)}`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [ticket]);

  if (!ticket) {
    return (
      <div className="page-container page-ticket-view">
        <div className="ticket-view-content flex flex-col items-center justify-center mt-12" style={{ textAlign: 'center' }}>
          <div style={{ margin: '32px 0', color: 'var(--text-secondary)' }}>
            <p style={{ fontSize: '18px', fontWeight: 600 }}>Ticket Unavailable</p>
            <p style={{ marginTop: '8px' }}>This ticket has expired and been automatically deleted, or it does not exist.</p>
          </div>
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            Book a New Ticket
          </button>
        </div>
      </div>
    );
  }

  const formatDateTime = (ts: number) => {
    const d = new Date(ts);
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' }) + 
           ' | ' + 
           d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  // Original fare before discount (since demo gives 10% off)
  const originalFare = (ticket.farePaid / 0.9).toFixed(1);

  return (
    <div className="page-ticket-view">
      {/* Top Header */}
      <div className="ticket-nav-header">
        <button className="icon-btn text-white" onClick={() => navigate('/')}>
          <X size={24} />
        </button>
        <button className="all-tickets-btn text-white" onClick={() => navigate('/tickets')}>
          <History size={18} className="mr-1" /> All tickets
        </button>
      </div>

      <div className="ticket-view-content">
        <div className="demo-warning-banner">
          DEMO TICKET — NOT VALID FOR TRAVEL
        </div>
        
        <div className="white-ticket-card">
          <div className="wtc-header">
            <h3>MetroGo Delhi (Demo)</h3>
          </div>
          
          <div className="wtc-validated-row">
            <span className="wtc-validated-text">VALIDATED DEMO</span>
            <span className="wtc-original-fare">₹{originalFare}</span>
          </div>

          <div className="wtc-divider"></div>

          <div className="wtc-grid-2">
            <div className="wtc-field">
              <span className="wtc-label">Bus Route</span>
              <span className="wtc-value">{ticket.routeNumber}</span>
            </div>
            <div className="wtc-field text-right">
              <span className="wtc-label">Fare</span>
              <span className="wtc-value">₹{ticket.farePaid.toFixed(1)}</span>
            </div>

            <div className="wtc-field mt-2">
              <span className="wtc-label">Booking Time</span>
              <span className="wtc-value">{formatDateTime(ticket.purchaseTime)}</span>
            </div>
            <div className="wtc-field text-right mt-2">
              <span className="wtc-label">Bus Tickets</span>
              <span className="wtc-value">{ticket.ticketsCount}</span>
            </div>
          </div>

          <div className="wtc-field mt-3">
            <span className="wtc-label">Starting stop</span>
            <span className="wtc-value">{ticket.fromStop}</span>
          </div>

          <div className="wtc-field mt-3">
            <span className="wtc-label">Ending stop</span>
            <span className="wtc-value">{ticket.toStop}</span>
          </div>

          <div className="wtc-ticket-id">
            {ticket.id}
          </div>

          <div className="wtc-qr-action">
            {!showQR ? (
              <button className="btn-show-qr" onClick={() => setShowQR(true)}>
                <QrCode size={18} /> Show QR code
              </button>
            ) : (
              <div className="qr-expanded">
                <QRCodeSVG value={ticket.qrPayload} size={160} level="M" />
                <div className="qr-timer">Expires in: {timeLeft}</div>
                <button className="btn-hide-qr" onClick={() => setShowQR(false)}>Hide QR code</button>
              </div>
            )}
          </div>
        </div>

        <div className="validated-pill">
          Validated At: {formatDateTime(ticket.purchaseTime)}
        </div>
        
      </div>
      
      <div className="ticket-footer">
        Powered by MetroGo
      </div>
    </div>
  );
};

export default TicketView;
