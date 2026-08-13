import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Plus } from 'lucide-react';
import './Help.css';

const Help = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'FAQS' | 'COMPLAINTS'>('FAQS');

  const handleComplaint = () => {
    navigate('/complaint');
  };

  const faqs = {
    "General": [
      "ETM Related issue"
    ],
    "Driver": [
      "Rash Driving",
      "Not stopping the bus at stop",
      "Driving the bus slow or fast",
      "Late arrival or departure of the Bus",
      "Wrong route",
      "Driver not allowed Ladies/Sr. Citizens to board from the front gate",
      "Driver misbehave"
    ],
    "Conductor": [
      "The conductor refused to give a complaint book",
      "Conductor misbehave",
      "Conductor not issuing the ticket after taking fare",
      "Excess fare charged"
    ]
  };

  return (
    <div className="page-help">
      <div className="help-gradient-header">
        <div className="help-logo">METROGO</div>
        <Settings size={24} className="help-settings-icon" onClick={() => navigate('/settings')} />
      </div>

      <div className="help-tabs-row">
        <div 
          className={`help-tab ${activeTab === 'FAQS' ? 'active' : ''}`}
          onClick={() => setActiveTab('FAQS')}
        >
          FAQs
        </div>
        <div 
          className={`help-tab ${activeTab === 'COMPLAINTS' ? 'active' : ''}`}
          onClick={() => setActiveTab('COMPLAINTS')}
        >
          My Complaints
        </div>
      </div>

      <div className="help-content-scroll">
        {activeTab === 'FAQS' ? (
          <>
            <div className="help-page-title">FAQs</div>
            
            {Object.entries(faqs).map(([category, items]) => (
              <div key={category}>
                <div className="faq-cat-title">{category}</div>
                {items.map((item, idx) => (
                  <div key={idx} className="faq-item-row">
                    <div className="faq-item-text">{item}</div>
                    <div className="faq-plus-icon"><Plus size={14} strokeWidth={3} /></div>
                  </div>
                ))}
              </div>
            ))}

            <div className="help-footer-section">
              <span className="help-cant-find">Can't find what you're looking for?</span>
              <button className="btn-raise-complaint" onClick={handleComplaint}>
                Raise New Complaint
              </button>
            </div>
          </>
        ) : (
          <div className="text-center mt-8 text-gray-500">
            No complaints found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Help;
