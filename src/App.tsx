import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/Header';
import MobileMenu from './components/MobileMenu';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Search from './pages/Search';
import Documents from './pages/Documents';
import Assistant from './pages/Assistant';
import Alerts from './pages/Alerts';
import Analytics from './pages/Analytics';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Procedures from './pages/Procedures';
import LegalTexts from './pages/LegalTexts';
import AnalysisReports from './pages/Analytics/AnalysisReports';
import CollaborationPlatform from './pages/Collaboration/CollaborationPlatform';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentUser] = useState({
    name: 'LAHOUAZI Youcef',
    role: 'Juriste Senior',
    organization: 'Cabinet Juridique International',
    avatar: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  });

  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={
              <>
                <Header 
                  user={currentUser}
                  onMenuClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                />
                
                <MobileMenu 
                  isOpen={mobileMenuOpen}
                  onClose={() => setMobileMenuOpen(false)}
                />
                
                <main className="flex-1 max-w-7xl mx-auto px-4 py-6 w-full">
                  <Routes>
                    <Route path="/" element={<Dashboard user={currentUser} />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/documents" element={<Documents />} />
                    <Route path="/assistant" element={<Assistant />} />
                    <Route path="/alerts" element={<Alerts />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/profile" element={<Profile user={currentUser} />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/procedures/*" element={<Procedures />} />
                    <Route path="/textes/*" element={<LegalTexts />} />
                    
                    {/* Routes pour Analyse & Rapports */}
                    <Route path="/analyse/*" element={<AnalysisReports />} />
                    
                    {/* Routes pour Collaboration */}
                    <Route path="/collaboration/*" element={<CollaborationPlatform />} />
                    
                    {/* Routes pour les autres menus */}
                    <Route path="/actualites/*" element={
                      <div className="max-w-7xl mx-auto p-8 text-center">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Section Actualités et Références</h1>
                        <p className="text-gray-600">Cette section sera développée prochainement</p>
                      </div>
                    } />
                    <Route path="/config/*" element={
                      <div className="max-w-7xl mx-auto p-8 text-center">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Section Configuration</h1>
                        <p className="text-gray-600">Cette section sera développée prochainement</p>
                      </div>
                    } />
                    <Route path="/aide/*" element={
                      <div className="max-w-7xl mx-auto p-8 text-center">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Section Aide et Support</h1>
                        <p className="text-gray-600">Cette section sera développée prochainement</p>
                      </div>
                    } />
                  </Routes>
                </main>

                <Footer />
              </>
            } />
          </Routes>
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;