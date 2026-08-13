import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowLeft, Bus, MapPin } from 'lucide-react';
import { ALL_ROUTES, ALL_STOPS } from '../data/routes';
import { Route } from '../data/types';
import './BusSearch.css';

const BusSearch = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Route[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const q = query.toLowerCase();
    
    // Fuzzy search routes
    const matchedRoutes = ALL_ROUTES.filter(r => 
      r.routeNumber.toLowerCase().includes(q) || 
      r.origin.toLowerCase().includes(q) || 
      r.destination.toLowerCase().includes(q)
    );

    // If query matches a stop, include routes passing through that stop
    const stopMatches = ALL_STOPS.filter(s => s.name.toLowerCase().includes(q));
    const extraRouteNumbers = new Set(stopMatches.flatMap(s => s.routes));
    
    const combined = [...matchedRoutes];
    
    extraRouteNumbers.forEach(num => {
      if (!combined.find(r => r.routeNumber === num)) {
        const rts = ALL_ROUTES.filter(r => r.routeNumber === num);
        combined.push(...rts);
      }
    });

    setResults(combined);
  }, [query]);

  const handleRouteSelect = (route: Route) => {
    navigate(`/route/${route.id}`);
  };

  return (
    <div className="page-container page-search">
      <div className="search-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={24} />
        </button>
        <div className="search-input-wrapper">
          <Search size={20} color="var(--text-secondary)" />
          <input
            ref={inputRef}
            type="text"
            className="search-input"
            placeholder="Search bus number or route"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="search-results">
        {query && results.length === 0 && (
          <div className="no-results">
            No routes found for "{query}"
          </div>
        )}
        
        {results.map(route => (
          <div key={route.id} className="route-result-card" onClick={() => handleRouteSelect(route)}>
            <div className="route-result-left">
              <div className="route-badge">
                <Bus size={16} />
                <span>{route.routeNumber}</span>
              </div>
              {route.busType === 'AC' && <span className="ac-badge">AC</span>}
            </div>
            <div className="route-result-right">
              <div className="route-direction">{route.direction}</div>
              <div className="route-path">
                <MapPin size={12} /> {route.origin} &rarr; {route.destination}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusSearch;
