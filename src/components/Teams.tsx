import { Users, Search, Plus, Mail, MoreVertical, ChevronRight } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';

const teams = [
  {
    name: 'Engineering',
    lead: 'Michael Chen',
    members: 12,
    roles: ['Frontend', 'Backend', 'DevOps', 'QA'],
    color: 'primary',
  },
  {
    name: 'Product',
    lead: 'Sarah Martinez',
    members: 5,
    roles: ['Product Manager', 'Designer', 'User Research'],
    color: 'success',
  },
  {
    name: 'Marketing',
    lead: 'David Kim',
    members: 4,
    roles: ['Content', 'Growth', 'Brand'],
    color: 'warning',
  },
  {
    name: 'Sales',
    lead: 'Emily Roberts',
    members: 3,
    roles: ['AE', 'SDR'],
    color: 'destructive',
  },
];

const teamMembers = [
  { name: 'Michael Chen', role: 'VP Engineering', team: 'Engineering', avatar: 'MC', status: 'active' },
  { name: 'Sarah Martinez', role: 'Head of Product', team: 'Product', avatar: 'SM', status: 'active' },
  { name: 'David Kim', role: 'Marketing Lead', team: 'Marketing', avatar: 'DK', status: 'active' },
  { name: 'Emily Roberts', role: 'Sales Lead', team: 'Sales', avatar: 'ER', status: 'active' },
  { name: 'Alex Johnson', role: 'Senior Engineer', team: 'Engineering', avatar: 'AJ', status: 'active' },
  { name: 'Lisa Wang', role: 'Product Designer', team: 'Product', avatar: 'LW', status: 'active' },
  { name: 'Tom Brown', role: 'DevOps Engineer', team: 'Engineering', avatar: 'TB', status: 'active' },
  { name: 'Jessica Lee', role: 'Content Manager', team: 'Marketing', avatar: 'JL', status: 'away' },
];

export function Teams() {
  return (
    <div className="p-8 space-y-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2">Teams & Hierarchy</h1>
          <p className="text-muted-foreground">
            Manage your team structure, roles, and organizational hierarchy
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Mail className="w-4 h-4 mr-2" />
            Invite Members
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Team
          </Button>
        </div>
      </div>

      {/* Team Overview Cards */}
      <div className="grid grid-cols-4 gap-4">
        {teams.map((team, i) => (
          <Card key={i} className="p-5 cursor-pointer hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                team.color === 'primary' ? 'bg-primary/10' :
                team.color === 'success' ? 'bg-success/10' :
                team.color === 'warning' ? 'bg-warning/10' :
                'bg-destructive/10'
              }`}>
                <Users className={`w-6 h-6 ${
                  team.color === 'primary' ? 'text-primary' :
                  team.color === 'success' ? 'text-success' :
                  team.color === 'warning' ? 'text-warning' :
                  'text-destructive'
                }`} />
              </div>
              <Button variant="ghost" size="icon">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
            <h3 className="mb-1">{team.name}</h3>
            <p className="text-sm text-muted-foreground mb-3">{team.members} members</p>
            <div className="pt-3 border-t border-border">
              <p className="text-xs text-muted-foreground mb-1">Lead</p>
              <p className="text-sm font-medium">{team.lead}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Team Members List */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3>All Team Members</h3>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search members..." className="pl-9 w-64" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {teamMembers.map((member, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="font-medium text-primary">{member.avatar}</span>
                  </div>
                  <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-card ${
                    member.status === 'active' ? 'bg-success' : 'bg-warning'
                  }`}></div>
                </div>
                <div>
                  <p className="font-medium">{member.name}</p>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant="outline">{member.team}</Badge>
                <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Org Chart Preview */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3>Organization Chart</h3>
          <Button variant="outline" size="sm">View Full Chart</Button>
        </div>
        
        <div className="space-y-6">
          {/* CEO */}
          <div className="flex justify-center">
            <Card className="p-4 w-64 bg-primary/5 border-primary/20">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                  <span className="font-medium text-primary">JD</span>
                </div>
                <p className="font-medium">Jane Doe</p>
                <p className="text-sm text-muted-foreground">CEO & Founder</p>
              </div>
            </Card>
          </div>

          {/* Direct Reports */}
          <div className="grid grid-cols-4 gap-4">
            {teams.map((team, i) => (
              <Card key={i} className="p-4 text-center">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mx-auto mb-2">
                  <span className="text-sm font-medium">
                    {team.lead.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <p className="text-sm font-medium">{team.lead}</p>
                <p className="text-xs text-muted-foreground">{team.name} Lead</p>
              </Card>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
