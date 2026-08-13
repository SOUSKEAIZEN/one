import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp, MessageSquare } from 'lucide-react';
import { FAQS } from '../data/faqs';
import './Help.css';

const Help = () => {
  const navigate = useNavigate();
  const [openCategory, setOpenCategory] = useState<string | null>("General");
  const [openQ, setOpenQ] = useState<string | null>(null);

  const toggleCategory = (cat: string) => {
    setOpenCategory(openCategory === cat ? null : cat);
  };

  const toggleQ = (q: string) => {
    setOpenQ(openQ === q ? null : q);
  };

  return (
    <div className="page-container page-help">
      <div className="route-header">
        <h2>Help & Support</h2>
      </div>

      <div className="help-content">
        <button className="btn btn-primary btn-large w-full mb-4" onClick={() => navigate('/complaint')}>
          <MessageSquare size={18} className="mr-2" /> Raise New Complaint
        </button>
        
        <h3>Frequently Asked Questions</h3>
        
        <div className="faq-container mt-3">
          {FAQS.map(category => (
            <div key={category.category} className="faq-category">
              <div 
                className="faq-cat-header" 
                onClick={() => toggleCategory(category.category)}
              >
                <span>{category.category}</span>
                {openCategory === category.category ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
              
              {openCategory === category.category && (
                <div className="faq-questions">
                  {category.questions.map(item => (
                    <div key={item.q} className="faq-item">
                      <div 
                        className="faq-q" 
                        onClick={() => toggleQ(item.q)}
                      >
                        <span>{item.q}</span>
                        {openQ === item.q ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </div>
                      {openQ === item.q && (
                        <div className="faq-a">
                          {item.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Help;
