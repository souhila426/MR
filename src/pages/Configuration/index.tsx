import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ConfigurationDashboard from './ConfigurationDashboard';
import NomenclatureManagement from './Nomenclature/NomenclatureManagement';
import ExternalResources from './Resources/ExternalResources';
import AlertsConfiguration from './Alerts/AlertsConfiguration';
import UserManagement from './Users/UserManagement';
import SecuritySettings from './Security/SecuritySettings';

const Configuration: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ConfigurationDashboard />} />
      <Route path="/nomenclature/*" element={<NomenclatureManagement />} />
      <Route path="/ressources/*" element={<ExternalResources />} />
      <Route path="/alertes/*" element={<AlertsConfiguration />} />
      <Route path="/utilisateurs/*" element={<UserManagement />} />
      <Route path="/securite/*" element={<SecuritySettings />} />
    </Routes>
  );
};

export default Configuration;