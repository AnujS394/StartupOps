import { useState, useEffect } from 'react';
import { AppSidebar } from './components/AppSidebar';
import { AppHeader } from './components/AppHeader';
import { Dashboard } from './components/Dashboard';
import { PitchDesk } from './components/PitchDesk';
import { Funding } from './components/Funding';
import { Teams } from './components/Teams';
import { Tasks } from './components/Tasks';
import { Analytics } from './components/Analytics';
import { InvestorView } from './components/InvestorView';
import { BudgetOptimizer } from './components/BudgetOptimizer';
import { Settings } from './components/Settings';
import { PitchSimulator } from './components/PitchSimulator';
import { AIAssistant } from './components/AIAssistant';
import { Login } from './components/Login';
import { PaymentSimulator } from './components/PaymentSimulator';
import { Chatbot } from './components/Chatbot';
import { FloatingChatbot } from './components/FloatingChatbot';
import { AIChatbot } from './components/AIChatbot';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);

  // Set document title
  useEffect(() => {
    document.title = 'StartupOps - Founder Intelligence Platform';
  }, []);

  const handleLogin = (email: string, password: string) => {
    // Mock authentication - in production, this would call an API
    if (email && password) {
      setIsAuthenticated(true);
      setUser({
        email,
        name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1)
      });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setCurrentView('dashboard');
  };

  // Show login screen if not authenticated
  if (!isAuthenticated) {
    return (
      <>
        <Login onLogin={handleLogin} />
        <Toaster />
      </>
    );
  }

  const handleNavigate = (view: string) => {
    setCurrentView(view);
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'pitch-desk':
        return <PitchDesk />;
      case 'funding':
        return <Funding />;
      case 'teams':
        return <Teams />;
      case 'tasks':
        return <Tasks />;
      case 'analytics':
        return <Analytics />;
      case 'investor-view':
        return <InvestorView />;
      case 'budget-optimizer':
        return <BudgetOptimizer />;
      case 'settings':
        return <Settings />;
      case 'pitch-simulator':
        return <PitchSimulator />;
      case 'ai-assistant':
        return <AIAssistant />;
      case 'payment-simulator':
        return <PaymentSimulator />;
      case 'chatbot':
        return <Chatbot />;
      case 'ai-chatbot':
        return <AIChatbot />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-background via-background to-background/95 overflow-hidden">
      {/* Sidebar */}
      <AppSidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        currentView={currentView}
        onNavigate={handleNavigate}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <AppHeader 
          onNavigate={handleNavigate} 
          onLogout={handleLogout}
          user={user}
        />

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="animate-in fade-in duration-300">
            {renderView()}
          </div>
        </main>
      </div>

      {/* Toast Notifications */}
      <Toaster />

      {/* Floating Chatbot Widget - Hide on AI Chatbot page */}
      {currentView !== 'ai-chatbot' && <FloatingChatbot />}
    </div>
  );
}