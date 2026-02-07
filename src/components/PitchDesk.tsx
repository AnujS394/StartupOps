import { TrendingUp, DollarSign, Clock, Shield, Zap, Target } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const valuationData = [
  { month: 'Jan 24', value: 2.5, actual: 2.5 },
  { month: 'Mar 24', value: 3.2, actual: 3.2 },
  { month: 'May 24', value: 4.1, actual: 4.1 },
  { month: 'Jul 24', value: 5.8, actual: 5.8 },
  { month: 'Sep 24', value: 7.2, actual: 7.2 },
  { month: 'Nov 24', value: 9.5, actual: 9.5 },
  { month: 'Jan 25', value: 12.0, actual: 12.0 },
  { month: 'Mar 25', value: 15.5, projected: 15.5 },
  { month: 'May 25', value: 19.2, projected: 19.2 },
  { month: 'Jul 25', value: 24.0, projected: 24.0 },
  { month: 'Sep 25', value: 29.5, projected: 29.5 },
  { month: 'Nov 25', value: 35.0, projected: 35.0 },
];

export function PitchDesk() {
  return (
    <div className="p-8 space-y-8 max-w-[1600px] mx-auto">
      {/* Hero Section */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1">
            <TrendingUp className="w-3 h-3" />
            Investor Intelligence
          </Badge>
        </div>
        <h1 className="text-3xl">Pitch Desk</h1>
        <p className="text-muted-foreground max-w-3xl">
          A complete view of your startup's past performance, current execution, and AI-predicted future. 
          Built for investor confidence and founder clarity.
        </p>
      </div>

      {/* Investor Confidence Strip */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-5 border-success/20 bg-success/5 backdrop-blur-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Funding</p>
              <p className="text-2xl font-medium">$12.0M</p>
              <p className="text-xs text-success mt-1">100% deployed strategically</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-success" />
            </div>
          </div>
        </Card>

        <Card className="p-5 backdrop-blur-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Monthly Burn</p>
              <p className="text-2xl font-medium">$165K</p>
              <p className="text-xs text-muted-foreground mt-1">-12% vs projection</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-5 border-success/20 bg-success/5 backdrop-blur-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Runway</p>
              <p className="text-2xl font-medium">18 months</p>
              <p className="text-xs text-success mt-1">Healthy cash position</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-success" />
            </div>
          </div>
        </Card>

        <Card className="p-5 border-primary/20 bg-primary/5 backdrop-blur-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Transparency Score</p>
              <p className="text-2xl font-medium">96/100</p>
              <p className="text-xs text-primary mt-1">Investor-ready reporting</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
          </div>
        </Card>
      </div>

      {/* Valuation Timeline */}
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="mb-1">Valuation Growth Timeline</h3>
            <p className="text-sm text-muted-foreground">
              Historical performance and AI-projected growth based on execution velocity
            </p>
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={valuationData}>
                <defs>
                  <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="projectedGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 12 }}
                  stroke="#737373"
                />
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
                    padding: '8px 12px',
                  }}
                  formatter={(value: number) => [`$${value}M`, '']}
                />
                <Area
                  type="monotone"
                  dataKey="actual"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  fill="url(#actualGradient)"
                />
                <Area
                  type="monotone"
                  dataKey="projected"
                  stroke="#10b981"
                  strokeWidth={3}
                  strokeDasharray="5 5"
                  fill="url(#projectedGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              <span>Actual Valuation</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-success"></div>
              <span>AI Projected</span>
            </div>
          </div>
        </div>
      </Card>

      {/* AI Growth Reasoning */}
      <div className="grid grid-cols-2 gap-6">
        <Card className="p-6 space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Target className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="mb-2">AI Growth Analysis</h3>
              <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>
                  Based on your current execution velocity and market conditions, we project a <strong className="text-foreground">2.9× valuation increase</strong> over the next 11 months.
                </p>
                <p>
                  Key drivers include: <strong className="text-foreground">92% on-time task completion</strong>, 
                  strong product-market fit signals (NPS 68), and efficient capital deployment (12% under burn projection).
                </p>
                <p>
                  Your team is executing <strong className="text-foreground">23% faster</strong> than similar seed-stage startups, 
                  positioning you well for Series A conversations.
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <h3 className="mb-2">Execution & Budget Health</h3>
          
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2 text-sm">
                <span className="text-muted-foreground">Milestone Completion</span>
                <span className="font-medium">87%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-success" style={{ width: '87%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2 text-sm">
                <span className="text-muted-foreground">Budget Efficiency</span>
                <span className="font-medium">94%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: '94%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2 text-sm">
                <span className="text-muted-foreground">Team Velocity</span>
                <span className="font-medium">92%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: '92%' }}></div>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Your execution indicators are <strong className="text-success">above benchmark</strong>. 
                Continue current velocity to reach projected Series A valuation of $35M.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}