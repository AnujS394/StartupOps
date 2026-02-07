import { Bell, ChevronDown, Sparkles, Presentation, Zap, LogOut } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';

interface AppHeaderProps {
  onNavigate: (view: string) => void;
  onLogout: () => void;
  user: { email: string; name: string } | null;
}

export function AppHeader({ onNavigate, onLogout, user }: AppHeaderProps) {
  // Get initials from user name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <header className="h-16 border-b border-border/50 bg-card/60 backdrop-blur-xl flex items-center justify-between px-6 sticky top-0 z-10 shadow-sm">
      {/* Left side - Startup name and round selector */}
      <div className="flex items-center gap-6">
        <div>
          <h1 className="text-lg font-semibold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            StartupOps
          </h1>
          <p className="text-xs text-muted-foreground">Intelligence Platform</p>
        </div>
        
        <Select defaultValue="seed">
          <SelectTrigger className="w-[180px] bg-background/50 border-border/50 hover:border-border transition-colors">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pre-seed">Pre-seed Round</SelectItem>
            <SelectItem value="seed">Seed Round</SelectItem>
            <SelectItem value="series-a">Series A</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Right side - AI Assistant, notifications, profile */}
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          className="gap-2 border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all group"
          onClick={() => onNavigate('budget-optimizer')}
        >
          <Zap className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
          <span className="hidden md:inline">Budget AI</span>
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="gap-2 border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all group"
          onClick={() => onNavigate('ai-assistant')}
        >
          <Sparkles className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
          <span className="hidden md:inline">AI Co-Founder</span>
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="gap-2 border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all group"
          onClick={() => onNavigate('pitch-simulator')}
        >
          <Presentation className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
          <span className="hidden md:inline">Pitch Practice</span>
        </Button>

        <button className="relative p-2 hover:bg-muted/80 rounded-xl transition-all hover:scale-105 group">
          <Bell className="w-5 h-5 group-hover:text-primary transition-colors" />
          <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-gradient-to-br from-destructive to-destructive/80 text-[10px] shadow-md">
            3
          </Badge>
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2.5 hover:bg-muted/80 px-3 py-2 rounded-xl transition-all group">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/70 text-primary-foreground flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                <span className="text-sm font-medium">{user ? getInitials(user.name) : 'JD'}</span>
              </div>
              <div className="hidden md:block text-left text-sm">
                <p className="font-medium">{user?.name || 'Jane Doe'}</p>
                <p className="text-xs text-muted-foreground">Founder & CEO</p>
              </div>
              <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onNavigate('settings')}>
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onNavigate('payment-simulator')}>
              Billing & Plans
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onLogout} className="text-destructive">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}