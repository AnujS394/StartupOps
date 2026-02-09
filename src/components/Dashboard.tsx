import { useState } from 'react';
import { TrendingUp, Users, CheckCircle2, Clock, Target, Zap, Award, X } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card3D, FloatingElement } from './3DCard';
import { motion } from 'motion/react';
import { FloatingActionButton, MicroInteractionButton, PulseRing } from './InnovativeUI';
import { toast } from 'sonner';

const weeklyProgress = [
  { day: 'Mon', completed: 12, planned: 15 },
  { day: 'Tue', completed: 14, planned: 15 },
  { day: 'Wed', completed: 11, planned: 13 },
  { day: 'Thu', completed: 16, planned: 16 },
  { day: 'Fri', completed: 13, planned: 14 },
];

const burnData = [
  { month: 'Aug', amount: 142 },
  { month: 'Sep', amount: 156 },
  { month: 'Oct', amount: 148 },
  { month: 'Nov', amount: 165 },
  { month: 'Dec', amount: 159 },
  { month: 'Jan', amount: 165 },
];

export function Dashboard() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
  const [showInviteTeamModal, setShowInviteTeamModal] = useState(false);
  const [showSetMilestoneModal, setShowSetMilestoneModal] = useState(false);
  
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    dueDate: '',
    assignee: '',
    priority: 'Medium',
  });

  const [inviteData, setInviteData] = useState({
    email: '',
    role: 'Member',
  });

  const [milestoneData, setMilestoneData] = useState({
    title: '',
    description: '',
    targetDate: '',
    category: 'Growth',
  });

  const handleCreateTask = () => {
    setShowCreateTaskModal(true);
  };

  const handleSaveTask = () => {
    if (!taskData.title || !taskData.dueDate) {
      toast.error('Please fill in task title and due date');
      return;
    }
    setTasks([...tasks, taskData.title]);
    toast.success(`Task "${taskData.title}" created successfully!`);
    setTaskData({ title: '', description: '', dueDate: '', assignee: '', priority: 'Medium' });
    setShowCreateTaskModal(false);
  };

  const handleInviteTeam = () => {
    setShowInviteTeamModal(true);
  };

  const handleSaveInvite = () => {
    if (!inviteData.email) {
      toast.error('Please enter an email address');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inviteData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    toast.success(`Invitation sent to ${inviteData.email}!`);
    setInviteData({ email: '', role: 'Member' });
    setShowInviteTeamModal(false);
  };

  const handleSetMilestone = () => {
    setShowSetMilestoneModal(true);
  };

  const handleSaveMilestone = () => {
    if (!milestoneData.title || !milestoneData.targetDate) {
      toast.error('Please fill in milestone title and target date');
      return;
    }
    toast.success(`Milestone "${milestoneData.title}" created successfully!`);
    setMilestoneData({ title: '', description: '', targetDate: '', category: 'Growth' });
    setShowSetMilestoneModal(false);
  };

  const handleBudgetAnalysis = () => {
    toast.loading('Running budget analysis...');
    setTimeout(() => {
      toast.success('Budget analysis complete! Check the Budget Optimizer for insights');
    }, 2000);
  };

  return (
    <div className="p-8 space-y-8 max-w-[1600px] mx-auto relative" style={{ perspective: '1000px' }}>
      {/* Floating Action Button */}
      <FloatingActionButton
        actions={[
          {
            icon: <CheckCircle2 className="w-5 h-5" />,
            label: 'Create Task',
            onClick: () => {
              handleCreateTask();
            },
            color: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          },
          {
            icon: <Users className="w-5 h-5" />,
            label: 'Invite Team Member',
            onClick: () => {
              handleInviteTeam();
            },
            color: 'linear-gradient(135deg, #10b981, #14b8a6)',
          },
          {
            icon: <Target className="w-5 h-5" />,
            label: 'Set Milestone',
            onClick: () => {
              handleSetMilestone();
            },
            color: 'linear-gradient(135deg, #f59e0b, #ef4444)',
          },
          {
            icon: <Zap className="w-5 h-5" />,
            label: 'AI Analysis',
            onClick: () => {
              handleBudgetAnalysis();
            },
            color: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
          },
        ]}
      />

      {/* Floating background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <FloatingElement depth={50} floatIntensity={15} className="absolute top-20 right-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
        <FloatingElement depth={30} floatIntensity={20} className="absolute bottom-20 left-10 w-40 h-40 bg-success/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2 bg-gradient-to-r from-foreground via-foreground to-foreground/60 bg-clip-text text-transparent">
            Welcome back, Jane
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening with TechVenture today
          </p>
        </div>
        <div className="flex items-center gap-3">
          <MicroInteractionButton variant="ghost" onClick={() => {
            toast.success('Report exported successfully');
          }}>
            Export Report
          </MicroInteractionButton>
          <MicroInteractionButton variant="primary" onClick={() => {
            toast.success('Investor update scheduled for next week');
          }}>
            Schedule Investor Update
          </MicroInteractionButton>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-5">
        <Card3D 
          intensity={12} 
          glowColor="linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(139, 92, 246, 0.3))"
          className="p-6 border-primary/30 bg-gradient-to-br from-primary/5 via-primary/5 to-transparent shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-primary/40 group rounded-xl backdrop-blur-sm border"
        >
          <div className="flex items-start justify-between mb-4">
            <motion.div 
              className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/30"
              whileHover={{ scale: 1.1, rotateZ: 5 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <Target className="w-6 h-6 text-primary-foreground" />
            </motion.div>
            <Badge variant="outline" className="text-xs border-primary/30 bg-primary/5">
              This week
            </Badge>
          </div>
          <p className="text-3xl font-semibold mb-1 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            87%
          </p>
          <p className="text-sm text-muted-foreground mb-3">Goal completion</p>
          <div className="flex items-center gap-1.5 text-xs text-success font-medium">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+12% from last week</span>
          </div>
        </Card3D>

        <Card3D 
          intensity={12}
          className="p-6 border-border/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-border group rounded-xl backdrop-blur-sm border bg-card/60"
        >
          <div className="flex items-start justify-between mb-4">
            <motion.div 
              className="w-12 h-12 rounded-xl bg-muted/80 flex items-center justify-center"
              whileHover={{ scale: 1.1, rotateZ: -5 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <Users className="w-6 h-6 text-foreground" />
            </motion.div>
            <Badge variant="outline" className="text-xs">Active</Badge>
          </div>
          <p className="text-3xl font-semibold mb-1">24</p>
          <p className="text-sm text-muted-foreground mb-3">Team members</p>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span>2 roles open</span>
          </div>
        </Card3D>

        <Card3D 
          intensity={12}
          className="p-6 border-border/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-border group rounded-xl backdrop-blur-sm border bg-card/60"
        >
          <div className="flex items-start justify-between mb-4">
            <motion.div 
              className="w-12 h-12 rounded-xl bg-muted/80 flex items-center justify-center"
              whileHover={{ scale: 1.1, rotateZ: 5 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <CheckCircle2 className="w-6 h-6 text-foreground" />
            </motion.div>
            <Badge variant="outline" className="text-xs">Today</Badge>
          </div>
          <p className="text-3xl font-semibold mb-1">18/22</p>
          <p className="text-sm text-muted-foreground mb-3">Tasks completed</p>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span>4 in progress</span>
          </div>
        </Card3D>

        <Card3D 
          intensity={12}
          glowColor="linear-gradient(135deg, rgba(34, 197, 94, 0.3), rgba(16, 185, 129, 0.3))"
          className="p-6 border-success/30 bg-gradient-to-br from-success/5 via-success/5 to-transparent shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-success/40 group rounded-xl backdrop-blur-sm border"
        >
          <div className="flex items-start justify-between mb-4">
            <motion.div 
              className="w-12 h-12 rounded-xl bg-gradient-to-br from-success to-success/80 flex items-center justify-center shadow-lg shadow-success/30"
              whileHover={{ scale: 1.1, rotateZ: -5 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <Clock className="w-6 h-6 text-white" />
            </motion.div>
            <Badge variant="outline" className="text-xs border-success/30 bg-success/5">
              Runway
            </Badge>
          </div>
          <p className="text-3xl font-semibold mb-1 bg-gradient-to-r from-success to-success/70 bg-clip-text text-transparent">
            18 mo
          </p>
          <p className="text-sm text-muted-foreground mb-3">Cash runway</p>
          <div className="flex items-center gap-1.5 text-xs text-success font-medium">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Healthy position</span>
          </div>
        </Card3D>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-2 gap-6">
        <Card3D intensity={10} className="p-6 shadow-xl rounded-xl border border-border/50 bg-card/80 backdrop-blur-md">
          <div className="mb-6">
            <h3 className="mb-1">Weekly Task Completion</h3>
            <p className="text-sm text-muted-foreground">Planned vs completed tasks this week</p>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height={256}>
              <BarChart data={weeklyProgress}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="#737373" />
                <YAxis tick={{ fontSize: 12 }} stroke="#737373" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e5e5',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="planned" fill="#e5e5e5" radius={[4, 4, 0, 0]} />
                <Bar dataKey="completed" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card3D>

        <Card3D intensity={10} className="p-6 shadow-xl rounded-xl border border-border/50 bg-card/80 backdrop-blur-md">
          <div className="mb-6">
            <h3 className="mb-1">Monthly Burn Rate</h3>
            <p className="text-sm text-muted-foreground">Operating expenses over time</p>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height={256}>
              <LineChart data={burnData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#737373" />
                <YAxis 
                  tick={{ fontSize: 12 }} 
                  stroke="#737373"
                  tickFormatter={(value) => `$${value}K`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e5e5',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => [`$${value}K`, 'Burn']}
                />
                <Line 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#6366f1" 
                  strokeWidth={3}
                  dot={{ fill: '#6366f1', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card3D>
      </div>

      {/* Activity Feed & Quick Actions */}
      <div className="grid grid-cols-3 gap-6">
        <Card3D intensity={8} className="col-span-2 p-6 shadow-xl rounded-xl border border-border/50 bg-card/80 backdrop-blur-md">
          <h3 className="mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { icon: CheckCircle2, color: 'success', text: 'Marketing team completed Q4 campaign launch', time: '2 hours ago' },
              { icon: Users, color: 'primary', text: 'Sarah Chen joined as Senior Product Designer', time: '5 hours ago' },
              { icon: Award, color: 'warning', text: 'Reached 1,000 active users milestone', time: '1 day ago' },
              { icon: Zap, color: 'primary', text: 'AI Budget Optimizer suggested 3 cost improvements', time: '1 day ago' },
              { icon: Target, color: 'success', text: 'Engineering sprint #12 completed ahead of schedule', time: '2 days ago' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex items-start gap-3 p-3 hover:bg-muted/50 rounded-lg transition-colors">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    item.color === 'success' ? 'bg-success/10' :
                    item.color === 'warning' ? 'bg-warning/10' :
                    'bg-primary/10'
                  }`}>
                    <Icon className={`w-4 h-4 ${
                      item.color === 'success' ? 'text-success' :
                      item.color === 'warning' ? 'text-warning' :
                      'text-primary'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">{item.text}</p>
                    <p className="text-xs text-muted-foreground mt-1">{item.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card3D>

        <Card3D intensity={8} className="p-6 shadow-xl rounded-xl border border-border/50 bg-card/80 backdrop-blur-md">
          <h3 className="mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start" onClick={handleCreateTask}>
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Create Task
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={handleInviteTeam}>
              <Users className="w-4 h-4 mr-2" />
              Invite Team Member
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={handleSetMilestone}>
              <Target className="w-4 h-4 mr-2" />
              Set Milestone
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={handleBudgetAnalysis}>
              <Zap className="w-4 h-4 mr-2" />
              Run Budget Analysis
            </Button>
          </div>

          <div className="mt-6 pt-6 border-t border-border">
            <h4 className="text-sm mb-3">AI Insights</h4>
            <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
              <p className="text-sm">
                Your team velocity is <strong>23% above average</strong>. Consider allocating more resources to product development.
              </p>
            </div>
          </div>
        </Card3D>
      </div>

      {/* Create Task Modal */}
      {showCreateTaskModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md p-6 bg-card border border-border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Create Task</h2>
              <button 
                onClick={() => setShowCreateTaskModal(false)}
                className="p-1 hover:bg-muted rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="task-title">Task Title *</Label>
                <Input 
                  id="task-title" 
                  placeholder="e.g., Implement user authentication"
                  value={taskData.title}
                  onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
                  className="mt-1.5"
                />
              </div>
              
              <div>
                <Label htmlFor="task-description">Description</Label>
                <Input 
                  id="task-description" 
                  placeholder="Task description (optional)"
                  value={taskData.description}
                  onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
                  className="mt-1.5"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="task-due-date">Due Date *</Label>
                  <Input 
                    id="task-due-date" 
                    type="date"
                    value={taskData.dueDate}
                    onChange={(e) => setTaskData({ ...taskData, dueDate: e.target.value })}
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="task-priority">Priority</Label>
                  <select 
                    id="task-priority"
                    value={taskData.priority}
                    onChange={(e) => setTaskData({ ...taskData, priority: e.target.value })}
                    className="mt-1.5 w-full px-3 py-2 border border-input rounded-md bg-background text-sm"
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                    <option>Urgent</option>
                  </select>
                </div>
              </div>

              <div>
                <Label htmlFor="task-assignee">Assign To</Label>
                <Input 
                  id="task-assignee" 
                  placeholder="Team member name"
                  value={taskData.assignee}
                  onChange={(e) => setTaskData({ ...taskData, assignee: e.target.value })}
                  className="mt-1.5"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6 pt-4 border-t border-border">
              <Button variant="outline" className="flex-1" onClick={() => setShowCreateTaskModal(false)}>
                Cancel
              </Button>
              <Button className="flex-1" onClick={handleSaveTask}>
                Create Task
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Invite Team Modal */}
      {showInviteTeamModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md p-6 bg-card border border-border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Invite Team Member</h2>
              <button 
                onClick={() => setShowInviteTeamModal(false)}
                className="p-1 hover:bg-muted rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="invite-email">Email Address *</Label>
                <Input 
                  id="invite-email" 
                  type="email"
                  placeholder="colleague@company.com"
                  value={inviteData.email}
                  onChange={(e) => setInviteData({ ...inviteData, email: e.target.value })}
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="invite-role">Role</Label>
                <select 
                  id="invite-role"
                  value={inviteData.role}
                  onChange={(e) => setInviteData({ ...inviteData, role: e.target.value })}
                  className="mt-1.5 w-full px-3 py-2 border border-input rounded-md bg-background text-sm"
                >
                  <option>Member</option>
                  <option>Manager</option>
                  <option>Admin</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6 pt-4 border-t border-border">
              <Button variant="outline" className="flex-1" onClick={() => setShowInviteTeamModal(false)}>
                Cancel
              </Button>
              <Button className="flex-1" onClick={handleSaveInvite}>
                Send Invite
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Set Milestone Modal */}
      {showSetMilestoneModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md p-6 bg-card border border-border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Set Milestone</h2>
              <button 
                onClick={() => setShowSetMilestoneModal(false)}
                className="p-1 hover:bg-muted rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="milestone-title">Milestone Title *</Label>
                <Input 
                  id="milestone-title" 
                  placeholder="e.g., Launch MVP"
                  value={milestoneData.title}
                  onChange={(e) => setMilestoneData({ ...milestoneData, title: e.target.value })}
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="milestone-description">Description</Label>
                <Input 
                  id="milestone-description" 
                  placeholder="Milestone description (optional)"
                  value={milestoneData.description}
                  onChange={(e) => setMilestoneData({ ...milestoneData, description: e.target.value })}
                  className="mt-1.5"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="milestone-date">Target Date *</Label>
                  <Input 
                    id="milestone-date" 
                    type="date"
                    value={milestoneData.targetDate}
                    onChange={(e) => setMilestoneData({ ...milestoneData, targetDate: e.target.value })}
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="milestone-category">Category</Label>
                  <select 
                    id="milestone-category"
                    value={milestoneData.category}
                    onChange={(e) => setMilestoneData({ ...milestoneData, category: e.target.value })}
                    className="mt-1.5 w-full px-3 py-2 border border-input rounded-md bg-background text-sm"
                  >
                    <option>Growth</option>
                    <option>Product</option>
                    <option>Funding</option>
                    <option>Team</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6 pt-4 border-t border-border">
              <Button variant="outline" className="flex-1" onClick={() => setShowSetMilestoneModal(false)}>
                Cancel
              </Button>
              <Button className="flex-1" onClick={handleSaveMilestone}>
                Create Milestone
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}