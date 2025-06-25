import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LegalTextsCatalog from './LegalTextsCatalog';
import AdvancedSearch from './AdvancedSearch';
import DataExtraction from './DataExtraction';
import AssistedWriting from './AssistedWriting';

const LegalTexts: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LegalTextsCatalog />} />
      <Route path="/catalogue" element={<LegalTextsCatalog />} />
      <Route path="/recherche-avancee" element={<AdvancedSearch />} />
      <Route path="/extraction" element={<DataExtraction />} />
      <Route path="/redaction-assistee" element={<AssistedWriting />} />
    </Routes>
  );
};

export default LegalTexts;