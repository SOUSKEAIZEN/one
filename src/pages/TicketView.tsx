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
      <div className="page-ticket-view">
        <div className="ticket-view-content" style={{ justifyContent: 'center', textAlign: 'center' }}>
          <div style={{ margin: '32px 0' }}>
            <p style={{ fontSize: '18px', fontWeight: 600 }}>Ticket Unavailable</p>
            <p style={{ marginTop: '8px' }}>This ticket has expired and been automatically deleted, or it does not exist.</p>
          </div>
          <button style={{ padding: '12px 24px', backgroundColor: 'var(--card-white)', color: 'var(--primary-red)', border: 'none', borderRadius: '4px', fontWeight: 'bold' }} onClick={() => navigate('/')}>
            Book a New Ticket
          </button>
        </div>
      </div>
    );
  }

  const formatDateTime = (ts: number) => {
    const d = new Date(ts);
    const day = d.getDate().toString().padStart(2, '0');
    const monthStr = d.toLocaleDateString('en-GB', { month: 'short' });
    const yearStr = d.getFullYear().toString().slice(-2);
    const timeStr = d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    
    // Output: 13 Aug, 26 | 01:38 PM
    return `${day} ${monthStr}, ${yearStr} | ${timeStr}`;
  };

  const originalFare = (ticket.farePaid / 0.9).toFixed(1);

  return (
    <div className="page-ticket-view">
      {/* Top Header */}
      <div className="ticket-nav-header">
        <button className="icon-btn" onClick={() => navigate(-1)}>
          <X size={24} strokeWidth={2.5} />
        </button>
        <button className="all-tickets-btn" onClick={() => navigate('/tickets')}>
          <History size={18} className="mr-1" style={{ marginRight: '6px' }} /> All tickets
        </button>
      </div>

      <div className="ticket-view-content">
        <div className="demo-warning-banner">
          DEMO TICKET — NOT VALID FOR TRAVEL
        </div>
        
        <div className="white-ticket-card">
          <div className="wtc-dept-title">
            MetroGo Dept. of Delhi
          </div>
          
          <div className="wtc-validated-row">
            <span className="wtc-validated-text">VALIDATED</span>
            <span className="wtc-original-fare">₹{originalFare}</span>
          </div>

          <div className="wtc-divider"></div>

          <div className="wtc-main-grid">
            <div className="wtc-field">
              <span className="wtc-label">Bus Route</span>
              <span className="wtc-value">{ticket.routeNumber}</span>
            </div>
            <div className="wtc-field text-right">
              <span className="wtc-label">Fare</span>
              <span className="wtc-value">₹{ticket.farePaid.toFixed(1)}</span>
            </div>

            <div className="wtc-field">
              <span className="wtc-label">Booking Time</span>
              <span className="wtc-value">{formatDateTime(ticket.purchaseTime)}</span>
            </div>
            <div className="wtc-field text-right">
              <span className="wtc-label">Bus Tickets</span>
              <span className="wtc-value">{ticket.ticketsCount}</span>
            </div>

            <div className="wtc-field full-width">
              <span className="wtc-label">Starting stop</span>
              <span className="wtc-value">{ticket.fromStop}</span>
            </div>

            <div className="wtc-field full-width">
              <span className="wtc-label">Ending stop</span>
              <span className="wtc-value">{ticket.toStop}</span>
            </div>
          </div>

          <div className="wtc-ticket-id">
            {ticket.id.toUpperCase().replace(/[^A-Z0-9]/g, '').substring(0, 20)}
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
        
        <div className="ticket-footer">
          <span className="tf-network">METROGO NETWORK</span>
          <span className="tf-powered">Powered by MetroGo</span>
        </div>
      </div>
    </div>
  );
};

export default TicketView;
