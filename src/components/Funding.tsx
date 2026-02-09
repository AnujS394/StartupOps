import { DollarSign, TrendingUp, Calendar, FileText, Plus, Download, X } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Card3D, FloatingElement } from './3DCard';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { generateCapTablePDF } from '../utils/pdfGenerator';
import { useState } from 'react';

const fundingRounds = [
  {
    round: 'Pre-seed',
    amount: '$500K',
    date: 'Jan 2023',
    investors: ['Y Combinator', 'Angel Investors'],
    status: 'Closed',
  },
  {
    round: 'Seed',
    amount: '$3.5M',
    date: 'Aug 2023',
    investors: ['Sequoia Capital', 'a16z', 'Individual Angels'],
    status: 'Closed',
  },
  {
    round: 'Bridge',
    amount: '$1.2M',
    date: 'Mar 2024',
    investors: ['Existing Investors'],
    status: 'Closed',
  },
  {
    round: 'Series A',
    amount: '$12M (Target)',
    date: 'Q2 2025',
    investors: ['TBD'],
    status: 'Planning',
  },
];

const allocationData = [
  { category: 'Engineering', amount: 4200, color: '#6366f1' },
  { category: 'Product', amount: 1800, color: '#10b981' },
  { category: 'Marketing', amount: 2500, color: '#8b5cf6' },
  { category: 'Sales', amount: 1900, color: '#f59e0b' },
  { category: 'Operations', amount: 1600, color: '#ef4444' },
];

export function Funding() {
  const [isExporting, setIsExporting] = useState(false);
  const [showPlanRoundModal, setShowPlanRoundModal] = useState(false);
  const [fundingRoundData, setFundingRoundData] = useState({
    roundName: '',
    targetAmount: '',
    timeline: '',
    purpose: '',
    leadInvestor: '',
  });

  const handleExportCapTable = async () => {
    setIsExporting(true);
    toast.loading('Generating cap table PDF...');
    
    // Simulate document generation delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
      generateCapTablePDF();
      toast.success('Cap table exported successfully! Check your downloads folder.');
    } catch (error) {
      toast.error('Failed to export cap table. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handlePlanNextRound = () => {
    setShowPlanRoundModal(true);
  };

  const handleSaveFundingRound = () => {
    if (!fundingRoundData.roundName || !fundingRoundData.targetAmount || !fundingRoundData.timeline) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Validate amount format
    const amountValue = parseFloat(fundingRoundData.targetAmount.replace(/[^0-9.]/g, ''));
    if (isNaN(amountValue) || amountValue <= 0) {
      toast.error('Please enter a valid funding amount');
      return;
    }

    toast.success(
      `${fundingRoundData.roundName} round ($${amountValue}M) planning initiated! Timeline: ${fundingRoundData.timeline}`
    );
    setFundingRoundData({ roundName: '', targetAmount: '', timeline: '', purpose: '', leadInvestor: '' });
    setShowPlanRoundModal(false);
  };
  return (
    <div className="p-8 space-y-8 max-w-[1600px] mx-auto relative" style={{ perspective: '1000px' }}>
      {/* Floating background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <FloatingElement depth={40} floatIntensity={12} className="absolute top-32 right-20 w-28 h-28 bg-primary/5 rounded-full blur-3xl" />
        <FloatingElement depth={35} floatIntensity={18} className="absolute bottom-32 left-20 w-36 h-36 bg-success/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2 bg-gradient-to-r from-foreground via-foreground to-foreground/60 bg-clip-text text-transparent">
            Funding Management
          </h1>
          <p className="text-muted-foreground">
            Track your funding rounds, capital deployment, and prepare for your next raise
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-border/50 hover:border-border" onClick={handleExportCapTable} disabled={isExporting}>
            <Download className="w-4 h-4 mr-2" />
            {isExporting ? 'Exporting...' : 'Export Cap Table'}
          </Button>
          <Button className="bg-gradient-to-r from-primary to-primary shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all" onClick={handlePlanNextRound}>
            <Plus className="w-4 h-4 mr-2" />
            Plan Next Round
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-5">
        <Card3D 
          intensity={12}
          glowColor="linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(139, 92, 246, 0.3))"
          className="p-6 border-primary/30 bg-gradient-to-br from-primary/5 via-primary/5 to-transparent shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-primary/40 group rounded-xl backdrop-blur-sm border"
        >
          <div className="flex items-start justify-between mb-4">
            <motion.div 
              className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/30"
              whileHover={{ scale: 1.15, rotateY: 15 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <DollarSign className="w-6 h-6 text-primary-foreground" />
            </motion.div>
          </div>
          <p className="text-3xl font-semibold mb-1 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            $12.0M
          </p>
          <p className="text-sm text-muted-foreground">Total Raised</p>
        </Card3D>

        <Card3D 
          intensity={12}
          className="p-6 border-border/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-border group rounded-xl backdrop-blur-sm border bg-card/60"
        >
          <div className="flex items-start justify-between mb-4">
            <motion.div 
              className="w-12 h-12 rounded-xl bg-muted/80 flex items-center justify-center"
              whileHover={{ scale: 1.15, rotateY: -15 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <DollarSign className="w-6 h-6 text-foreground" />
            </motion.div>
          </div>
          <p className="text-3xl font-semibold mb-1">$3.8M</p>
          <p className="text-sm text-muted-foreground">Cash Remaining</p>
        </Card3D>

        <Card3D 
          intensity={12}
          className="p-6 border-border/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-border group rounded-xl backdrop-blur-sm border bg-card/60"
        >
          <div className="flex items-start justify-between mb-4">
            <motion.div 
              className="w-12 h-12 rounded-xl bg-muted/80 flex items-center justify-center"
              whileHover={{ scale: 1.15, rotateY: 15 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <TrendingUp className="w-6 h-6 text-foreground" />
            </motion.div>
          </div>
          <p className="text-3xl font-semibold mb-1">$165K</p>
          <p className="text-sm text-muted-foreground">Monthly Burn</p>
        </Card3D>

        <Card3D 
          intensity={12}
          glowColor="linear-gradient(135deg, rgba(34, 197, 94, 0.3), rgba(16, 185, 129, 0.3))"
          className="p-6 border-success/30 bg-gradient-to-br from-success/5 via-success/5 to-transparent shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-success/40 group rounded-xl backdrop-blur-sm border"
        >
          <div className="flex items-start justify-between mb-4">
            <motion.div 
              className="w-12 h-12 rounded-xl bg-gradient-to-br from-success to-success/80 flex items-center justify-center shadow-lg shadow-success/30"
              whileHover={{ scale: 1.15, rotateY: -15 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <Calendar className="w-6 h-6 text-white" />
            </motion.div>
          </div>
          <p className="text-3xl font-semibold mb-1 bg-gradient-to-r from-success to-success/70 bg-clip-text text-transparent">
            18 mo
          </p>
          <p className="text-sm text-muted-foreground">Runway Remaining</p>
        </Card3D>
      </div>

      {/* Capital Allocation */}
      <Card3D intensity={10} className="p-6 border-border/50 shadow-xl rounded-xl border bg-card/80 backdrop-blur-md">
        <div className="mb-6">
          <h3 className="mb-1">Current Capital Allocation</h3>
          <p className="text-sm text-muted-foreground">Monthly spend breakdown by department</p>
        </div>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={allocationData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
              <XAxis type="number" tick={{ fontSize: 12 }} stroke="#737373" tickFormatter={(value) => `$${value}K`} />
              <YAxis dataKey="category" type="category" tick={{ fontSize: 12 }} stroke="#737373" width={100} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e5e5',
                  borderRadius: '8px',
                }}
                formatter={(value: number) => [`$${value}K`, 'Monthly Spend']}
              />
              <Bar dataKey="amount" radius={[0, 4, 4, 0]}>
                {allocationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card3D>

      {/* Funding Rounds */}
      <Card3D intensity={8} className="p-6 shadow-xl rounded-xl border border-border/50 bg-card/80 backdrop-blur-md">
        <h3 className="mb-6">Funding History</h3>
        <div className="space-y-4">
          {fundingRounds.map((round, i) => (
            <motion.div
              key={i}
              className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
              whileHover={{ scale: 1.01, x: 5 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium">{round.round}</h4>
                    <Badge
                      variant={round.status === 'Closed' ? 'outline' : 'default'}
                      className={
                        round.status === 'Closed'
                          ? 'bg-success/10 text-success border-success/20'
                          : ''
                      }
                    >
                      {round.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {round.investors.join(', ')}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">{round.amount}</p>
                <p className="text-sm text-muted-foreground">{round.date}</p>
              </div>
              <Button variant="ghost" size="sm" className="ml-4" onClick={() => {
                toast.info(`Viewing documents for ${round.round} round`);
              }}>
                <FileText className="w-4 h-4" />
              </Button>
            </motion.div>
          ))}
        </div>
      </Card3D>

      {/* Investor Relations */}
      <div className="grid grid-cols-2 gap-6">
        <Card3D intensity={8} className="p-6 shadow-xl rounded-xl border border-border/50 bg-card/80 backdrop-blur-md">
          <h3 className="mb-4">Key Investors</h3>
          <div className="space-y-3">
            {[
              { name: 'Sequoia Capital', stake: '18%', lead: true },
              { name: 'a16z', stake: '15%', lead: true },
              { name: 'Y Combinator', stake: '7%', lead: false },
              { name: 'Angel Investors', stake: '12%', lead: false },
            ].map((investor, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 border border-border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">
                      {investor.name.substring(0, 2).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-sm">{investor.name}</p>
                    {investor.lead && (
                      <p className="text-xs text-primary">Lead Investor</p>
                    )}
                  </div>
                </div>
                <Badge variant="outline">{investor.stake}</Badge>
              </div>
            ))}
          </div>
        </Card3D>

        <Card3D intensity={8} className="p-6 shadow-xl rounded-xl border border-border/50 bg-card/80 backdrop-blur-md">
          <h3 className="mb-4">Upcoming Milestones</h3>
          <div className="space-y-3">
            {[
              { title: 'Monthly Investor Update', date: 'Feb 15, 2026', type: 'report' },
              { title: 'Series A Kickoff', date: 'Apr 1, 2026', type: 'meeting' },
              { title: 'Board Meeting', date: 'Mar 8, 2026', type: 'meeting' },
              { title: 'Cap Table Review', date: 'Feb 28, 2026', type: 'report' },
            ].map((milestone, i) => (
              <div key={i} className="flex items-center gap-3 p-3 border border-border rounded-lg">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{milestone.title}</p>
                  <p className="text-xs text-muted-foreground">{milestone.date}</p>
                </div>
              </div>
            ))}
          </div>
        </Card3D>
      </div>

      {/* Plan Next Round Modal */}
      {showPlanRoundModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md p-6 bg-card border border-border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Plan Next Funding Round</h2>
              <button 
                onClick={() => setShowPlanRoundModal(false)}
                className="p-1 hover:bg-muted rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="round-name">Funding Round *</Label>
                <select 
                  id="round-name"
                  value={fundingRoundData.roundName}
                  onChange={(e) => setFundingRoundData({ ...fundingRoundData, roundName: e.target.value })}
                  className="mt-1.5 w-full px-3 py-2 border border-input rounded-md bg-background text-sm"
                >
                  <option value="">Select a round...</option>
                  <option>Series A</option>
                  <option>Series B</option>
                  <option>Series C</option>
                  <option>Bridge Round</option>
                </select>
              </div>

              <div>
                <Label htmlFor="target-amount">Target Amount (Million $) *</Label>
                <Input 
                  id="target-amount" 
                  placeholder="e.g., 12 or 8.5"
                  type="text"
                  value={fundingRoundData.targetAmount}
                  onChange={(e) => setFundingRoundData({ ...fundingRoundData, targetAmount: e.target.value })}
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="timeline">Timeline *</Label>
                <select 
                  id="timeline"
                  value={fundingRoundData.timeline}
                  onChange={(e) => setFundingRoundData({ ...fundingRoundData, timeline: e.target.value })}
                  className="mt-1.5 w-full px-3 py-2 border border-input rounded-md bg-background text-sm"
                >
                  <option value="">Select timeline...</option>
                  <option>3 months</option>
                  <option>6 months</option>
                  <option>9 months</option>
                  <option>12 months</option>
                </select>
              </div>

              <div>
                <Label htmlFor="lead-investor">Lead Investor</Label>
                <Input 
                  id="lead-investor" 
                  placeholder="e.g., Sequoia Capital"
                  value={fundingRoundData.leadInvestor}
                  onChange={(e) => setFundingRoundData({ ...fundingRoundData, leadInvestor: e.target.value })}
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="purpose">Use of Funds</Label>
                <textarea 
                  id="purpose"
                  placeholder="How will you use the capital? (e.g., Product development, team expansion, market expansion)"
                  value={fundingRoundData.purpose}
                  onChange={(e) => setFundingRoundData({ ...fundingRoundData, purpose: e.target.value })}
                  className="mt-1.5 w-full px-3 py-2 border border-input rounded-md bg-background text-sm resize-none h-20"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6 pt-4 border-t border-border">
              <Button variant="outline" className="flex-1" onClick={() => setShowPlanRoundModal(false)}>
                Cancel
              </Button>
              <Button className="flex-1" onClick={handleSaveFundingRound}>
                Start Planning
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}