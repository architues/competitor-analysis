import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CollaborationProvider } from './context/CollaborationContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

// Pages/Components
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import OnboardingWizard from './components/Onboarding/OnboardingWizard';
import Dashboard from './components/Dashboard';
import CompetitorList from './components/CompetitorList';
import Analysis from './components/Analysis';
import FeatureMatrix from './components/FeatureMatrix';
import Insights from './components/Insights';
import CompanyDetail from './components/CompanyDetail';
import SettingsLayout from './components/Settings/SettingsLayout';
import { competitors as initialCompetitors } from './data/mockData';
import './styles/index.css';

// Wrapper component to handle the inner logic (State + Routing)
const AppContent = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [competitors, setCompetitors] = useState(initialCompetitors);
  const [selectedCompany, setSelectedCompany] = useState(null);

  // -- Handlers --
  const handleAddCompetitor = () => {
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

  // -- Render Logic for "Main" App Areas --
  const renderContent = () => {
    if (selectedCompany) {
      return (
        <CompanyDetail
          company={selectedCompany}
          onBack={() => setSelectedCompany(null)}
        />
      );
    }

    switch (currentView) {
      case 'dashboard':
        return <Dashboard competitors={competitors} />;
      case 'competitors':
        return (
          <CompetitorList
            competitors={competitors}
            onAdd={handleAddCompetitor}
            onDelete={handleDeleteCompetitor}
            onViewCompany={setSelectedCompany}
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

  return (
    <CollaborationProvider>
      <Layout currentView={currentView} onNavigate={(view) => {
        setSelectedCompany(null); // Clear selected company when switching views
        setCurrentView(view);
      }} onBack={() => { }}>
        {renderContent()}
      </Layout>
    </CollaborationProvider>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Onboarding Route */}
        <Route path="/onboarding" element={
          <ProtectedRoute>
            <OnboardingWizard />
          </ProtectedRoute>
        } />

        {/* Protected Dashboard Route */}
        <Route path="/" element={
          <ProtectedRoute>
            <AppContent />
          </ProtectedRoute>
        } />

        {/* Catch all - Redirect to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
