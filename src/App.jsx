import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CollaborationProvider } from './context/CollaborationContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import { apiCall } from './utils/api';

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
import './styles/index.css';

// Wrapper component to handle the inner logic (State + Routing)
const AppContent = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [competitors, setCompetitors] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch competitors from API on mount
  useEffect(() => {
    fetchCompetitors();
  }, []);

  const fetchCompetitors = async () => {
    try {
      const data = await apiCall('/competitors', 'GET');
      setCompetitors(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch competitors:', err);
      setCompetitors([]);
    } finally {
      setIsLoading(false);
    }
  };

  // -- Handlers --
  const handleDeleteCompetitor = async (id) => {
    try {
      await apiCall(`/competitors/${id}`, 'DELETE');
      // Refetch after delete
      await fetchCompetitors();
    } catch (err) {
      console.error('Failed to delete competitor:', err);
    }
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
        {isLoading ? (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            color: 'var(--text-secondary)'
          }}>
            Loading competitors...
          </div>
        ) : (
          renderContent()
        )}
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
