import { useState } from 'react';
import { Users, Search, Plus, Mail, MoreVertical, ChevronRight, X } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner';

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

interface TeamFormData {
  name: string;
  lead: string;
  description: string;
}

export function Teams() {
  const [showCreateTeamModal, setShowCreateTeamModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [teamList, setTeamList] = useState(teams);
  const [formData, setFormData] = useState<TeamFormData>({
    name: '',
    lead: '',
    description: '',
  });
  const [inviteEmail, setInviteEmail] = useState('');

  const handleCreateTeam = () => {
    if (!formData.name || !formData.lead) {
      toast.error('Please fill in all required fields');
      return;
    }

    const newTeam = {
      name: formData.name,
      lead: formData.lead,
      members: 1,
      roles: ['Team Lead'],
      color: 'primary',
    };

    setTeamList([...teamList, newTeam]);
    setFormData({ name: '', lead: '', description: '' });
    setShowCreateTeamModal(false);
    toast.success(`Team "${formData.name}" created successfully!`);
  };

  const handleInviteMember = () => {
    if (!inviteEmail) {
      toast.error('Please enter an email address');
      return;
    }

    toast.success(`Invitation sent to ${inviteEmail}! They'll receive an email shortly.`);
    setInviteEmail('');
    setShowInviteModal(false);
  };

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
          <Button variant="outline" onClick={() => setShowInviteModal(true)}>
            <Mail className="w-4 h-4 mr-2" />
            Invite Members
          </Button>
          <Button onClick={() => setShowCreateTeamModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Team
          </Button>
        </div>
      </div>

      {/* Team Overview Cards */}
      <div className="grid grid-cols-4 gap-4">
        {teamList.map((team, i) => (
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
                <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => {
                  toast.info(`Opening profile for ${member.name}`);
                }}>
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
          <Button variant="outline" size="sm" onClick={() => {
            toast.info('Opening full organization chart');
          }}>View Full Chart</Button>
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
            {teamList.map((team, i) => (
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

      {/* Create Team Modal */}
      {showCreateTeamModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Create New Team</h2>
              <button
                onClick={() => setShowCreateTeamModal(false)}
                className="p-1 hover:bg-muted rounded transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <Label htmlFor="teamName" className="text-sm font-medium mb-1.5">
                  Team Name *
                </Label>
                <Input
                  id="teamName"
                  placeholder="e.g., DevOps, QA, Growth"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full"
                />
              </div>

              <div>
                <Label htmlFor="teamLead" className="text-sm font-medium mb-1.5">
                  Team Lead *
                </Label>
                <Input
                  id="teamLead"
                  placeholder="e.g., John Smith"
                  value={formData.lead}
                  onChange={(e) => setFormData({ ...formData, lead: e.target.value })}
                  className="w-full"
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-sm font-medium mb-1.5">
                  Description
                </Label>
                <Input
                  id="description"
                  placeholder="Brief description of the team"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowCreateTeamModal(false)}
              >
                Cancel
              </Button>
              <Button className="flex-1" onClick={handleCreateTeam}>
                Create Team
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Invite Members Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Invite Team Members</h2>
              <button
                onClick={() => setShowInviteModal(false)}
                className="p-1 hover:bg-muted rounded transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <Label htmlFor="inviteEmail" className="text-sm font-medium mb-1.5">
                  Email Address *
                </Label>
                <Input
                  id="inviteEmail"
                  type="email"
                  placeholder="colleague@company.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="w-full"
                />
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  They'll receive an invitation email and can join your workspace immediately.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowInviteModal(false)}
              >
                Cancel
              </Button>
              <Button className="flex-1" onClick={handleInviteMember}>
                Send Invitation
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
