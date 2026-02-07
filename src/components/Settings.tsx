import { User, Bell, Shield, CreditCard, Building2, Users, Save } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export function Settings() {
  return (
    <div className="p-8 space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account, team, and platform preferences
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="company">Company</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-start gap-6">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-3xl font-medium text-primary">JD</span>
              </div>
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="Jane" className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Doe" className="mt-1.5" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="jane@techventure.com" className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" defaultValue="CEO & Founder" className="mt-1.5" />
                </div>
              </div>
            </div>
            <Separator className="my-6" />
            <div className="flex justify-end gap-3">
              <Button variant="outline">Cancel</Button>
              <Button>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="mb-4">Security</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" className="mt-1.5" />
              </div>
              <Button size="sm">Update Password</Button>
            </div>
          </Card>
        </TabsContent>

        {/* Company Tab */}
        <TabsContent value="company" className="space-y-6">
          <Card className="p-6">
            <h3 className="mb-4">Company Information</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="companyName">Company Name</Label>
                <Input id="companyName" defaultValue="TechVenture Inc." className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="industry">Industry</Label>
                <Input id="industry" defaultValue="SaaS / B2B Software" className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="website">Website</Label>
                <Input id="website" defaultValue="https://techventure.com" className="mt-1.5" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="foundedYear">Founded Year</Label>
                  <Input id="foundedYear" defaultValue="2023" className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="teamSize">Team Size</Label>
                  <Input id="teamSize" defaultValue="24" className="mt-1.5" />
                </div>
              </div>
            </div>
            <Separator className="my-6" />
            <div className="flex justify-end gap-3">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="mb-4">Funding Information</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="currentStage">Current Stage</Label>
                <Input id="currentStage" defaultValue="Seed" className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="totalRaised">Total Raised</Label>
                <Input id="totalRaised" defaultValue="$12.0M" className="mt-1.5" />
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Team Tab */}
        <TabsContent value="team" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3>Team Members</h3>
              <Button size="sm">
                <Users className="w-4 h-4 mr-2" />
                Invite Member
              </Button>
            </div>
            <div className="space-y-3">
              {[
                { name: 'Jane Doe', email: 'jane@techventure.com', role: 'Admin' },
                { name: 'Michael Chen', email: 'michael@techventure.com', role: 'Member' },
                { name: 'Sarah Martinez', email: 'sarah@techventure.com', role: 'Member' },
              ].map((member, i) => (
                <div key={i} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{member.name}</p>
                      <p className="text-xs text-muted-foreground">{member.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{member.role}</span>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="p-6">
            <h3 className="mb-4">Email Notifications</h3>
            <div className="space-y-4">
              {[
                { label: 'Task assignments', description: 'Get notified when you are assigned a task' },
                { label: 'Team updates', description: 'Receive updates about team activities' },
                { label: 'Funding milestones', description: 'Get alerts for funding-related events' },
                { label: 'Weekly reports', description: 'Receive weekly performance summaries' },
                { label: 'AI insights', description: 'Get notified about new AI recommendations' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                  <Switch defaultChecked={i < 3} />
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="mb-4">Push Notifications</h3>
            <div className="space-y-4">
              {[
                { label: 'Urgent alerts', description: 'Critical notifications that need immediate attention' },
                { label: 'Mentions', description: 'When someone mentions you in a comment' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Billing Tab */}
        <TabsContent value="billing" className="space-y-6">
          <Card className="p-6">
            <h3 className="mb-4">Current Plan</h3>
            <div className="p-4 border-2 border-primary rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-medium mb-1">Growth Plan</h4>
                  <p className="text-sm text-muted-foreground">For scaling startups</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-medium">$199</p>
                  <p className="text-xs text-muted-foreground">per month</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Up to 50 team members</li>
                <li>• Unlimited projects and tasks</li>
                <li>• AI Budget Optimizer</li>
                <li>• Investor dashboard access</li>
                <li>• Priority support</li>
              </ul>
            </div>
            <Button variant="outline" className="w-full mt-4">Change Plan</Button>
          </Card>

          <Card className="p-6">
            <h3 className="mb-4">Payment Method</h3>
            <div className="flex items-center gap-4 p-4 border border-border rounded-lg">
              <div className="w-12 h-12 rounded bg-muted flex items-center justify-center">
                <CreditCard className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">•••• •••• •••• 4242</p>
                <p className="text-xs text-muted-foreground">Expires 12/2026</p>
              </div>
              <Button variant="outline" size="sm">Update</Button>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="mb-4">Billing History</h3>
            <div className="space-y-2">
              {[
                { date: 'Jan 1, 2026', amount: '$199.00', status: 'Paid' },
                { date: 'Dec 1, 2025', amount: '$199.00', status: 'Paid' },
                { date: 'Nov 1, 2025', amount: '$199.00', status: 'Paid' },
              ].map((invoice, i) => (
                <div key={i} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div>
                    <p className="text-sm font-medium">{invoice.date}</p>
                    <p className="text-xs text-muted-foreground">{invoice.status}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm">{invoice.amount}</span>
                    <Button variant="ghost" size="sm">Download</Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
