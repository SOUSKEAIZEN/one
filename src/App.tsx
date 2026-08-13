import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import BottomNavigation from './components/BottomNavigation';
import DemoIndicator from './components/DemoIndicator';
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

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <DemoIndicator />
        <main className="main-content">
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
        <div className="bottom-nav-container">
          <BottomNavigation />
          <div className="global-footer-banner">
            Powered by MetroGo, DoT & ARF (Demo)
          </div>
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
