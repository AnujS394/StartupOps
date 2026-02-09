import { useState } from 'react';
import { User, Bell, Shield, CreditCard, Building2, Users, Save } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { toast } from 'sonner';

export function Settings() {
  const [profileData, setProfileData] = useState({
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane@techventure.com',
    role: 'CEO & Founder',
  });

  const [companyData, setCompanyData] = useState({
    companyName: 'TechVenture Inc.',
    industry: 'SaaS / B2B Software',
    website: 'https://techventure.com',
    foundedYear: '2023',
    teamSize: '24',
    currentStage: 'Seed',
    totalRaised: '$12.0M',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    weeklyReport: true,
    investorAlerts: true,
    chatNotifications: false,
  });

  const handleSaveProfile = () => {
    if (!profileData.firstName || !profileData.lastName || !profileData.email) {
      toast.error('Please fill in all required fields');
      return;
    }
    toast.success('Profile updated successfully!');
  };

  const handleSaveCompany = () => {
    if (!companyData.companyName) {
      toast.error('Company name is required');
      return;
    }
    toast.success('Company information updated successfully!');
  };

  const handleUpdatePassword = () => {
    if (!passwordData.currentPassword || !passwordData.newPassword) {
      toast.error('Please fill in all password fields');
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    if (passwordData.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }
    toast.success('Password updated successfully!');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications({ ...notifications, [key]: value });
    toast.success('Notification settings updated');
  };
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
                    <Input 
                      id="firstName" 
                      value={profileData.firstName}
                      onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                      className="mt-1.5" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input 
                      id="lastName" 
                      value={profileData.lastName}
                      onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                      className="mt-1.5" 
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    className="mt-1.5" 
                  />
                </div>
                <div>
                  <Label htmlFor="role">Role</Label>
                  <Input 
                    id="role" 
                    value={profileData.role}
                    onChange={(e) => setProfileData({ ...profileData, role: e.target.value })}
                    className="mt-1.5" 
                  />
                </div>
              </div>
            </div>
            <Separator className="my-6" />
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => {
                setProfileData({
                  firstName: 'Jane',
                  lastName: 'Doe',
                  email: 'jane@techventure.com',
                  role: 'CEO & Founder',
                });
                toast.info('Changes discarded');
              }}>Cancel</Button>
              <Button onClick={handleSaveProfile}>
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
                <Input 
                  id="currentPassword" 
                  type="password" 
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                  className="mt-1.5" 
                />
              </div>
              <div>
                <Label htmlFor="newPassword">New Password</Label>
                <Input 
                  id="newPassword" 
                  type="password" 
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  className="mt-1.5" 
                />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input 
                  id="confirmPassword" 
                  type="password" 
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                  className="mt-1.5" 
                />
              </div>
              <Button size="sm" onClick={handleUpdatePassword}>Update Password</Button>
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
                <Input 
                  id="companyName" 
                  value={companyData.companyName}
                  onChange={(e) => setCompanyData({ ...companyData, companyName: e.target.value })}
                  className="mt-1.5" 
                />
              </div>
              <div>
                <Label htmlFor="industry">Industry</Label>
                <Input 
                  id="industry" 
                  value={companyData.industry}
                  onChange={(e) => setCompanyData({ ...companyData, industry: e.target.value })}
                  className="mt-1.5" 
                />
              </div>
              <div>
                <Label htmlFor="website">Website</Label>
                <Input 
                  id="website" 
                  value={companyData.website}
                  onChange={(e) => setCompanyData({ ...companyData, website: e.target.value })}
                  className="mt-1.5" 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="foundedYear">Founded Year</Label>
                  <Input 
                    id="foundedYear" 
                    value={companyData.foundedYear}
                    onChange={(e) => setCompanyData({ ...companyData, foundedYear: e.target.value })}
                    className="mt-1.5" 
                  />
                </div>
                <div>
                  <Label htmlFor="teamSize">Team Size</Label>
                  <Input 
                    id="teamSize" 
                    value={companyData.teamSize}
                    onChange={(e) => setCompanyData({ ...companyData, teamSize: e.target.value })}
                    className="mt-1.5" 
                  />
                </div>
              </div>
            </div>
            <Separator className="my-6" />
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => {
                setCompanyData({
                  companyName: 'TechVenture Inc.',
                  industry: 'SaaS / B2B Software',
                  website: 'https://techventure.com',
                  foundedYear: '2023',
                  teamSize: '24',
                  currentStage: 'Seed',
                  totalRaised: '$12.0M',
                });
                toast.info('Changes discarded');
              }}>Cancel</Button>
              <Button onClick={handleSaveCompany}>Save Changes</Button>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="mb-4">Funding Information</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="currentStage">Current Stage</Label>
                <Input 
                  id="currentStage" 
                  value={companyData.currentStage}
                  onChange={(e) => setCompanyData({ ...companyData, currentStage: e.target.value })}
                  className="mt-1.5" 
                />
              </div>
              <div>
                <Label htmlFor="totalRaised">Total Raised</Label>
                <Input 
                  id="totalRaised" 
                  value={companyData.totalRaised}
                  onChange={(e) => setCompanyData({ ...companyData, totalRaised: e.target.value })}
                  className="mt-1.5" 
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Team Tab */}
        <TabsContent value="team" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3>Team Members</h3>
              <Button size="sm" onClick={() => {
                toast.success('Invite member dialog opened');
              }}>
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
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Email Updates</p>
                  <p className="text-xs text-muted-foreground">Receive email updates on important activities</p>
                </div>
                <Switch 
                  checked={notifications.emailUpdates}
                  onCheckedChange={(value) => handleNotificationChange('emailUpdates', value)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Weekly Reports</p>
                  <p className="text-xs text-muted-foreground">Receive weekly performance summaries</p>
                </div>
                <Switch 
                  checked={notifications.weeklyReport}
                  onCheckedChange={(value) => handleNotificationChange('weeklyReport', value)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Investor Alerts</p>
                  <p className="text-xs text-muted-foreground">Get alerts for funding-related events</p>
                </div>
                <Switch 
                  checked={notifications.investorAlerts}
                  onCheckedChange={(value) => handleNotificationChange('investorAlerts', value)}
                />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="mb-4">Push Notifications</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Chat Notifications</p>
                  <p className="text-xs text-muted-foreground">Get notified about new messages</p>
                </div>
                <Switch 
                  checked={notifications.chatNotifications}
                  onCheckedChange={(value) => handleNotificationChange('chatNotifications', value)}
                />
              </div>
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
