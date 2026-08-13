import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronDown, CheckCircle2 } from 'lucide-react';
import './Complaint.css';

const Complaint = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [complaintId, setComplaintId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 5; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setComplaintId(`MG-CMP-${result}`);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="page-container page-complaint flex-center">
        <div className="success-message text-center px-4">
          <CheckCircle2 size={64} color="var(--success)" className="mb-4 mx-auto" style={{ margin: '0 auto' }}/>
          <h2 className="mb-2">Complaint Submitted</h2>
          <p className="mb-4">Your demo complaint has been successfully recorded.</p>
          <div className="complaint-id-box mb-6">
            ID: <strong>{complaintId}</strong>
          </div>
          <button className="btn btn-primary w-full" onClick={() => navigate('/help')}>
            Back to Help
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container page-complaint">
      <div className="route-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={24} />
        </button>
        <h2>Raise Complaint</h2>
      </div>

      <div className="complaint-content">
        <form onSubmit={handleSubmit} className="card">
          <div className="form-group">
            <label className="input-label">Category</label>
            <div className="select-wrapper">
              <select className="input-field select-field" required defaultValue="">
                <option value="" disabled>Select category</option>
                <option value="driver">Driver Issue</option>
                <option value="conductor">Conductor Issue</option>
                <option value="bus">Bus Condition</option>
                <option value="app">App / Ticketing Issue</option>
                <option value="other">Other</option>
              </select>
              <ChevronDown className="select-icon" size={20} />
            </div>
          </div>

          <div className="form-group">
            <label className="input-label">Route Number (Optional)</label>
            <input type="text" className="input-field" placeholder="e.g. 511A" />
          </div>

          <div className="form-group">
            <label className="input-label">Description</label>
            <textarea 
              className="input-field" 
              rows={4} 
              placeholder="Describe your issue..."
              required
            ></textarea>
          </div>
          
          <div className="form-group">
            <label className="input-label">Attach Image (Optional)</label>
            <input type="file" className="input-field" accept="image/*" />
          </div>

          <button type="submit" className="btn btn-primary mt-4">
            Submit Demo Complaint
          </button>
        </form>
      </div>
    </div>
  );
};

export default Complaint;
