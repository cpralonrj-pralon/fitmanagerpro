
import React, { useState, useCallback, useEffect } from 'react';
import { AppView } from './types';
import { supabase } from './supabaseClient';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import StudentList from './components/StudentList';
import StudentProfile from './components/StudentProfile';
import Schedule from './components/Schedule';
import Financial from './components/Financial';
import Reports from './components/Reports';
import Communication from './components/Communication';
import StudentModal from './components/StudentModal';
import Marketing from './components/Marketing';

import Terms from './components/Terms';
import Privacy from './components/Privacy';
import Help from './components/Help';
import Settings from './components/Settings';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.LOGIN);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isStudentModalOpen, setStudentModalOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleStudentAdded = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  /* Ref to access currentView inside callbacks without triggering re-renders */
  const currentViewRef = React.useRef(currentView);

  // Marketing Navigation State
  const [marketingView, setMarketingView] = useState<'dashboard' | 'builder'>('dashboard');

  const handleOpenCampaign = useCallback(() => {
    setMarketingView('builder');
    setCurrentView(AppView.MARKETING);
  }, []);

  useEffect(() => {
    currentViewRef.current = currentView;
  }, [currentView]);

  useEffect(() => {
    // Check active sessions on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        // Only redirect to dashboard if we are currently at login
        if (currentViewRef.current === AppView.LOGIN) {
          setCurrentView(AppView.DASHBOARD);
        }
      }
      setLoading(false);
    }).catch((error) => {
      console.error('Error getting session:', error);
      setLoading(false);
    });

    // Listen for changes on auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        setCurrentView(AppView.DASHBOARD);
      } else if (event === 'SIGNED_OUT') {
        const view = currentViewRef.current;
        if (view !== AppView.TERMS && view !== AppView.PRIVACY && view !== AppView.HELP) {
          setCurrentView(AppView.LOGIN);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, []); // Run only once on mount

  const navigate = useCallback((view: AppView) => {
    // Reset marketing view when navigating away or to marketing root
    if (view === AppView.MARKETING) {
      setMarketingView('dashboard');
    }
    setCurrentView(view);
    setSidebarOpen(false);
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background-light dark:bg-background-dark">
        <div className="size-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle public pages (no auth needed)
  if (currentView === AppView.TERMS) {
    return <Terms onBack={() => navigate(AppView.LOGIN)} />;
  }
  if (currentView === AppView.PRIVACY) {
    return <Privacy onBack={() => navigate(AppView.LOGIN)} />;
  }
  if (currentView === AppView.HELP) {
    return <Help onBack={() => navigate(AppView.LOGIN)} />;
  }

  if (currentView === AppView.LOGIN) {
    return <Login onLogin={() => navigate(AppView.DASHBOARD)} onNavigate={navigate} />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark">
      {/* Sidebar - Mobile Toggle handled via visibility */}
      <Sidebar
        currentView={currentView}
        onNavigate={navigate}
        isOpen={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onAddStudent={() => setStudentModalOpen(true)}
      />

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Header
          currentView={currentView}
          onMenuClick={() => setSidebarOpen(true)}
          onNavigate={navigate}
        />

        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-8">
          <div className="max-w-7xl mx-auto h-full">
            {currentView === AppView.DASHBOARD && <Dashboard />}
            {currentView === AppView.STUDENTS && (
              <StudentList
                onSelectStudent={() => navigate(AppView.PROFILE)}
                refreshTrigger={refreshTrigger}
              />
            )}
            {currentView === AppView.PROFILE && <StudentProfile onBack={() => navigate(AppView.STUDENTS)} />}
            {currentView === AppView.SCHEDULE && <Schedule />}
            {/* Pass handleOpenCampaign to Financial */}
            {currentView === AppView.FINANCIAL && <Financial onOpenCampaign={handleOpenCampaign} />}
            {currentView === AppView.REPORTS && <Reports />}
            {currentView === AppView.COMMUNICATION && <Communication />}
            {/* Pass controlled state to Marketing */}
            {currentView === AppView.MARKETING && (
              <Marketing
                onNavigate={navigate}
                currentView={marketingView}
                onChangeView={setMarketingView}
              />
            )}
            {currentView === AppView.SETTINGS && <Settings />}
          </div>
        </main>
      </div>

      <StudentModal
        isOpen={isStudentModalOpen}
        onClose={() => setStudentModalOpen(false)}
        onSuccess={handleStudentAdded}
      />
    </div>
  );
};

export default App;
