import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import BottomNavigation from './components/BottomNavigation';
import BusHome from './pages/BusHome';
import BusSearch from './pages/BusSearch';
import RouteDetails from './pages/RouteDetails';
import BuyTickets from './pages/BuyTickets';
import Checkout from './pages/Checkout';
import TicketView from './pages/TicketView';
import TicketHistory from './pages/TicketHistory';
import Hub from './pages/Hub';
import TripPlanner from './pages/TripPlanner';
import Help from './pages/Help';
import Complaint from './pages/Complaint';
import Settings from './pages/Settings';
import './App.css';

const AppLayout = () => {
  const location = useLocation();
  const hideBottomNav = ['/buy', '/checkout', '/ticket/'].some(path => location.pathname.startsWith(path));

  return (
    <>
      <main className="main-content" style={hideBottomNav ? { paddingBottom: 0 } : {}}>
        <Routes>
          <Route path="/" element={<BusHome />} />
          <Route path="/search" element={<BusSearch />} />
          <Route path="/route/:id" element={<RouteDetails />} />
          <Route path="/buy" element={<BuyTickets />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/ticket/:id" element={<TicketView />} />
          <Route path="/tickets" element={<TicketHistory />} />
          <Route path="/hub" element={<Hub />} />
          <Route path="/trip-plan" element={<TripPlanner />} />
          <Route path="/help" element={<Help />} />
          <Route path="/complaint" element={<Complaint />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
      {!hideBottomNav && (
        <div className="bottom-nav-container">
          <BottomNavigation />
          <div className="global-footer-banner">
            Powered by MetroGo, DoT & ARF (Demo)
          </div>
        </div>
      )}
    </>
  );
};

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
