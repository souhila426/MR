import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HelpDashboard from './HelpDashboard';
import AboutPage from './AboutPage';
import ContactPage from './ContactPage';
import FAQPage from './FAQPage';
import InteractiveAssistance from './InteractiveAssistance';
import TechnicalSupport from './TechnicalSupport';

const Help: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HelpDashboard />} />
      <Route path="/a-propos" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/chat" element={<InteractiveAssistance />} />
      <Route path="/support-technique" element={<TechnicalSupport />} />
    </Routes>
  );
};

export default Help;