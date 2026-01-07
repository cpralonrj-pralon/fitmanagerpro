
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

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.LOGIN);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isStudentModalOpen, setStudentModalOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleStudentAdded = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setCurrentView(AppView.DASHBOARD);
      }
      setLoading(false);
    }).catch((error) => {
      console.error('Error getting session:', error);
      setLoading(false);
    });

    // Listen for changes on auth state (logged in, signed out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setCurrentView(AppView.DASHBOARD);
      } else {
        setCurrentView(AppView.LOGIN);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const navigate = useCallback((view: AppView) => {
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

  if (currentView === AppView.LOGIN) {
    return <Login onLogin={() => navigate(AppView.DASHBOARD)} />;
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
            {currentView === AppView.FINANCIAL && <Financial />}
            {currentView === AppView.REPORTS && <Reports />}
            {currentView === AppView.COMMUNICATION && <Communication />}
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
