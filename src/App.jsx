import { useState } from 'react';
import { CollaborationProvider } from './context/CollaborationContext';
import Layout from './components/Layout';

import Dashboard from './components/Dashboard';
import CompetitorList from './components/CompetitorList';
import Analysis from './components/Analysis';
import FeatureMatrix from './components/FeatureMatrix';
import Insights from './components/Insights';
import SearchLanding from './components/SearchLanding';
import CompanyDetail from './components/CompanyDetail';
import SettingsLayout from './components/Settings/SettingsLayout';
import { competitors as initialCompetitors, recentSearches } from './data/mockData';
import './styles/index.css';


// Placeholder components
// Placeholder components declaration removed as handled by imports

function App() {
  const [hasSearched, setHasSearched] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  const [competitors, setCompetitors] = useState(initialCompetitors);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const handleSearch = (query) => {
    console.log("Searching for:", query);
    setHasSearched(true);
  };

  const handleAddCompetitor = () => {
    // Placeholder for add logic - will implement modal next
    const newComp = {
      id: Date.now(),
      name: `New Competitor ${competitors.length + 1}`,
      logo: `https://ui-avatars.com/api/?name=New&background=random`,
      marketShare: Math.floor(Math.random() * 20),
      channels: { seo: 50, social: 50, ads: 50, email: 50 },
      features: ["New Feature"],
      recentActivity: "Just added"
    };
    setCompetitors([...competitors, newComp]);
  };

  const handleDeleteCompetitor = (id) => {
    setCompetitors(competitors.filter(c => c.id !== id));
  };

  const handleViewCompany = (company) => {
    setSelectedCompany(company);
  };

  const handleBackFromDetail = () => {
    setSelectedCompany(null);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard competitors={competitors} />;
      case 'competitors':
        return (
          <CompetitorList
            competitors={competitors}
            onAdd={handleAddCompetitor}
            onDelete={handleDeleteCompetitor}
            onViewCompany={handleViewCompany}
          />
        );
      case 'analysis':
        return <Analysis competitors={competitors} />;
      case 'feature-matrix':
        return <FeatureMatrix competitors={competitors} />;
      case 'insights':
        return <Insights competitors={competitors} />;
      case 'settings':
      case 'settings-profile':
      case 'settings-workspace':
      case 'settings-billing':
        const tab = currentView.split('-')[1] || 'profile';
        return <SettingsLayout activeTab={tab} onTabChange={(t) => setCurrentView(`settings-${t}`)} />;
      default:
        return <Dashboard competitors={competitors} />;
    }
  };

  if (!hasSearched) {
    return (
      <CollaborationProvider>
        <SearchLanding onSearch={handleSearch} recentSearches={recentSearches} />
      </CollaborationProvider>
    );
  }

  if (selectedCompany) {
    return (
      <CollaborationProvider>
        <Layout currentView={currentView} onNavigate={setCurrentView} onBack={() => setHasSearched(false)}>
          <CompanyDetail company={selectedCompany} onBack={handleBackFromDetail} />
        </Layout>
      </CollaborationProvider>
    );
  }

  return (
    <CollaborationProvider>
      <Layout currentView={currentView} onNavigate={setCurrentView} onBack={() => setHasSearched(false)}>
        {renderContent()}
      </Layout>
    </CollaborationProvider>
  );
}

export default App;
