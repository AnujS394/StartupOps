import { 
  LayoutDashboard, 
  Presentation, 
  DollarSign, 
  Users, 
  CheckSquare, 
  BarChart3, 
  Eye, 
  Settings,
  ChevronLeft,
  CreditCard,
  MessageCircle,
  Brain
} from 'lucide-react';
import { Logo } from './Logo';

interface AppSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  currentView: string;
  onNavigate: (view: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'pitch-desk', label: 'Pitch Desk', icon: Presentation },
  { id: 'funding', label: 'Funding', icon: DollarSign },
  { id: 'teams', label: 'Teams', icon: Users },
  { id: 'tasks', label: 'Tasks', icon: CheckSquare },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'investor-view', label: 'Investor View', icon: Eye },
  { id: 'payment-simulator', label: 'Billing & Plans', icon: CreditCard },
  { id: 'ai-chatbot', label: 'AI Co-Founder', icon: Brain },
  { id: 'chatbot', label: 'Support Chat', icon: MessageCircle },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function AppSidebar({ isCollapsed, onToggle, currentView, onNavigate }: AppSidebarProps) {
  return (
    <aside
      className={`h-screen bg-card/60 backdrop-blur-xl border-r border-border/50 transition-all duration-300 flex flex-col shadow-lg ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-border/50 bg-gradient-to-b from-card/80 to-transparent">
        {!isCollapsed && (
          <Logo size="md" showText={true} />
        )}
        {isCollapsed && (
          <div className="mx-auto">
            <Logo size="sm" showText={false} />
          </div>
        )}
        <button
          onClick={onToggle}
          className={`p-1.5 hover:bg-muted rounded-lg transition-colors ${isCollapsed ? 'absolute top-4 left-1/2 -translate-x-1/2' : ''}`}
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <ChevronLeft className={`w-4 h-4 transition-transform ${isCollapsed ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-3 space-y-1.5 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 relative overflow-hidden group ${
                isActive
                  ? 'bg-gradient-to-r from-primary to-primary text-primary-foreground shadow-md shadow-primary/20'
                  : 'hover:bg-muted/80 text-foreground hover:translate-x-0.5'
              }`}
              title={isCollapsed ? item.label : undefined}
            >
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
              <Icon className={`w-5 h-5 flex-shrink-0 relative z-10 ${isActive ? '' : 'group-hover:scale-110 transition-transform'}`} />
              {!isCollapsed && <span className="relative z-10 font-medium">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Bottom branding */}
      {!isCollapsed && (
        <div className="p-4 border-t border-border/50 bg-gradient-to-t from-card/80 to-transparent">
          <div className="text-xs text-muted-foreground text-center">
            <p className="mb-1">StartupOps v2.0</p>
            <p className="opacity-60">Founder Intelligence</p>
          </div>
        </div>
      )}
    </aside>
  );
}