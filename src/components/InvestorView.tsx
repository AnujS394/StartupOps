import { Shield, TrendingUp, DollarSign, Clock, Target, CheckCircle2, Award } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const valuationTimeline = [
  { quarter: 'Q1 24', value: 3.2 },
  { quarter: 'Q2 24', value: 5.8 },
  { quarter: 'Q3 24', value: 9.5 },
  { quarter: 'Q4 24', value: 12.0 },
  { quarter: 'Q1 25', value: 15.5 },
  { quarter: 'Q2 25', value: 19.2 },
];

const milestones = [
  { title: 'Product-Market Fit Achieved', date: 'Q2 2024', status: 'completed' },
  { title: '1,000 Paying Customers', date: 'Q3 2024', status: 'completed' },
  { title: 'Break-even Revenue', date: 'Q4 2025', status: 'on-track' },
  { title: 'Series A Funding', date: 'Q2 2025', status: 'planned' },
];

export function InvestorView() {
  return (
    <div className="p-8 space-y-8 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="text-center space-y-3">
        <Badge variant="outline" className="gap-1">
          <Shield className="w-3 h-3" />
          Investor Dashboard
        </Badge>
        <h1 className="text-3xl">TechVenture Inc. - Investor Report</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          A transparent view of our progress, execution, and path to growth. Updated monthly for investor confidence.
        </p>
      </div>

      {/* Trust Metrics */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-5 text-center border-primary/20 bg-primary/5">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <p className="text-2xl font-medium mb-1">96/100</p>
          <p className="text-sm text-muted-foreground">Transparency Score</p>
        </Card>

        <Card className="p-5 text-center border-success/20 bg-success/5">
          <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-3">
            <TrendingUp className="w-6 h-6 text-success" />
          </div>
          <p className="text-2xl font-medium mb-1">192%</p>
          <p className="text-sm text-muted-foreground">YoY Growth</p>
        </Card>

        <Card className="p-5 text-center">
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
            <DollarSign className="w-6 h-6 text-foreground" />
          </div>
          <p className="text-2xl font-medium mb-1">$3.8M</p>
          <p className="text-sm text-muted-foreground">Cash on Hand</p>
        </Card>

        <Card className="p-5 text-center border-success/20 bg-success/5">
          <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-3">
            <Clock className="w-6 h-6 text-success" />
          </div>
          <p className="text-2xl font-medium mb-1">18 mo</p>
          <p className="text-sm text-muted-foreground">Runway</p>
        </Card>
      </div>

      {/* Valuation Growth */}
      <Card className="p-6">
        <div className="mb-6">
          <h3 className="mb-1">Valuation Trajectory</h3>
          <p className="text-sm text-muted-foreground">
            Current valuation: <strong className="text-foreground">$12.0M</strong> | 
            Projected Series A: <strong className="text-foreground">$35M</strong>
          </p>
        </div>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={valuationTimeline}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
              <XAxis dataKey="quarter" tick={{ fontSize: 12 }} stroke="#737373" />
              <YAxis 
                tick={{ fontSize: 12 }} 
                stroke="#737373"
                tickFormatter={(value) => `$${value}M`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e5e5',
                  borderRadius: '8px',
                }}
                formatter={(value: number) => [`$${value}M`, 'Valuation']}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Performance Highlights */}
      <div className="grid grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="mb-4">Execution Highlights</h3>
          <div className="space-y-4">
            {[
              { label: 'Milestone Completion Rate', value: '87%', status: 'success' },
              { label: 'Team Velocity vs Benchmark', value: '+23%', status: 'success' },
              { label: 'Budget Efficiency', value: '94%', status: 'success' },
              { label: 'Customer Satisfaction (NPS)', value: '68', status: 'success' },
            ].map((metric, i) => (
              <div key={i} className="flex items-center justify-between pb-3 border-b border-border last:border-0 last:pb-0">
                <span className="text-sm text-muted-foreground">{metric.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{metric.value}</span>
                  <CheckCircle2 className="w-4 h-4 text-success" />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="mb-4">Key Milestones</h3>
          <div className="space-y-3">
            {milestones.map((milestone, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  milestone.status === 'completed' ? 'bg-success/10' :
                  milestone.status === 'on-track' ? 'bg-primary/10' :
                  'bg-muted'
                }`}>
                  {milestone.status === 'completed' ? (
                    <CheckCircle2 className="w-4 h-4 text-success" />
                  ) : milestone.status === 'on-track' ? (
                    <Target className="w-4 h-4 text-primary" />
                  ) : (
                    <Award className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{milestone.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-xs text-muted-foreground">{milestone.date}</p>
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        milestone.status === 'completed' ? 'bg-success/10 text-success border-success/20' :
                        milestone.status === 'on-track' ? 'bg-primary/10 text-primary border-primary/20' :
                        ''
                      }`}
                    >
                      {milestone.status === 'completed' ? 'Completed' :
                       milestone.status === 'on-track' ? 'On Track' :
                       'Planned'}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Financial Health Summary */}
      <Card className="p-6 bg-gradient-to-br from-card to-muted/10">
        <h3 className="mb-4">Financial Health Summary</h3>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Monthly Recurring Revenue</p>
            <p className="text-2xl font-medium mb-1">$124K</p>
            <p className="text-xs text-success">+18% MoM growth</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Gross Margin</p>
            <p className="text-2xl font-medium mb-1">72%</p>
            <p className="text-xs text-muted-foreground">Above target (70%)</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">CAC Payback Period</p>
            <p className="text-2xl font-medium mb-1">8 months</p>
            <p className="text-xs text-muted-foreground">Industry standard: 12 mo</p>
          </div>
        </div>
      </Card>

      {/* Investment Thesis */}
      <Card className="p-6">
        <h3 className="mb-4">Why TechVenture is a Strong Investment</h3>
        <div className="grid grid-cols-2 gap-6">
          {[
            {
              title: 'Proven Execution',
              description: 'Team consistently delivers 23% above industry benchmarks with 87% milestone completion rate.',
            },
            {
              title: 'Strong Unit Economics',
              description: 'CAC payback in 8 months with 72% gross margin, indicating sustainable business model.',
            },
            {
              title: 'Market Timing',
              description: 'Addressing $15B TAM with 40% week-over-week retention showing product-market fit.',
            },
            {
              title: 'Capital Efficiency',
              description: 'Operating 12% under burn projections while exceeding growth targets.',
            },
          ].map((point, i) => (
            <div key={i} className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-medium text-primary">{i + 1}</span>
                </div>
                {point.title}
              </h4>
              <p className="text-sm text-muted-foreground pl-8">{point.description}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}