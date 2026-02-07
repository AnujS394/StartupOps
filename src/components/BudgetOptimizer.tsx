import { ArrowRight, Sparkles, TrendingDown, DollarSign, Zap } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

interface BudgetItem {
  category: string;
  current: number;
  optimized: number;
  savings: number;
}

const budgetOptimizations: BudgetItem[] = [
  { category: 'Engineering', current: 4200, optimized: 4200, savings: 0 },
  { category: 'Marketing - Paid Ads', current: 1500, optimized: 1050, savings: 450 },
  { category: 'Marketing - Content', current: 400, optimized: 850, savings: -450 },
  { category: 'Sales', current: 1900, optimized: 2100, savings: -200 },
  { category: 'Product', current: 1800, optimized: 1800, savings: 0 },
  { category: 'Cloud Infrastructure', current: 850, optimized: 650, savings: 200 },
  { category: 'Software Subscriptions', current: 450, optimized: 380, savings: 70 },
  { category: 'Operations', current: 1600, optimized: 1570, savings: 30 },
];

const totalCurrent = budgetOptimizations.reduce((sum, item) => sum + item.current, 0);
const totalOptimized = budgetOptimizations.reduce((sum, item) => sum + item.optimized, 0);
const totalSavings = totalCurrent - totalOptimized;

export function BudgetOptimizer() {
  return (
    <div className="p-8 space-y-8 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1">
            <Sparkles className="w-3 h-3" />
            AI Budget Optimization
          </Badge>
        </div>
        <h1 className="text-3xl">Budget Optimizer</h1>
        <p className="text-muted-foreground max-w-3xl">
          AI-powered recommendations to optimize your spending based on ROI data, industry benchmarks, and growth goals.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-5">
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-foreground" />
            </div>
            <Badge variant="outline">Current</Badge>
          </div>
          <p className="text-2xl font-medium mb-1">${(totalCurrent / 1000).toFixed(1)}K</p>
          <p className="text-sm text-muted-foreground">Monthly Spend</p>
        </Card>

        <Card className="p-5 border-primary/20 bg-primary/5">
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              Optimized
            </Badge>
          </div>
          <p className="text-2xl font-medium mb-1">${(totalOptimized / 1000).toFixed(1)}K</p>
          <p className="text-sm text-muted-foreground">Recommended Spend</p>
        </Card>

        <Card className="p-5 border-success/20 bg-success/5">
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-success" />
            </div>
            <Badge variant="outline" className="bg-success/10 text-success border-success/20">
              Savings
            </Badge>
          </div>
          <p className="text-2xl font-medium mb-1">${(totalSavings / 1000).toFixed(1)}K</p>
          <p className="text-sm text-muted-foreground">
            {((totalSavings / totalCurrent) * 100).toFixed(1)}% reduction
          </p>
        </Card>
      </div>

      {/* Budget Comparison */}
      <Card className="p-6">
        <h3 className="mb-6">Budget Allocation Comparison</h3>
        <div className="space-y-4">
          {budgetOptimizations.map((item, i) => (
            <div key={i} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{item.category}</span>
                <div className="flex items-center gap-4">
                  <span className="text-muted-foreground">${item.current}K</span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  <span className={item.savings > 0 ? 'text-success' : item.savings < 0 ? 'text-warning' : ''}>
                    ${item.optimized}K
                  </span>
                  {item.savings !== 0 && (
                    <Badge
                      variant="outline"
                      className={`text-xs min-w-[80px] justify-center ${
                        item.savings > 0
                          ? 'bg-success/10 text-success border-success/20'
                          : 'bg-warning/10 text-warning border-warning/20'
                      }`}
                    >
                      {item.savings > 0 ? '-' : '+'}${Math.abs(item.savings)}K
                    </Badge>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-foreground/20"
                    style={{ width: `${(item.current / totalCurrent) * 100}%` }}
                  ></div>
                </div>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary"
                    style={{ width: `${(item.optimized / totalOptimized) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-border text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-foreground/20"></div>
            <span>Current Allocation</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-primary"></div>
            <span>AI Recommended</span>
          </div>
        </div>
      </Card>

      {/* AI Insights & Recommendations */}
      <div className="grid grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="mb-1">Key Insights</h3>
              <p className="text-sm text-muted-foreground">
                Based on your performance data and growth trajectory
              </p>
            </div>
          </div>
          <div className="space-y-4">
            {[
              {
                title: 'Marketing Channel Efficiency',
                description: 'Paid ads showing diminishing returns (18% increase in CAC). Content marketing has 3.2× better ROI.',
                impact: 'High',
              },
              {
                title: 'Infrastructure Optimization',
                description: 'Moving to reserved instances and optimizing database queries can save $200K annually.',
                impact: 'Medium',
              },
              {
                title: 'Sales Investment Opportunity',
                description: 'Strong product-market fit signals. Increasing sales team by 2 reps could accelerate revenue 25%.',
                impact: 'High',
              },
            ].map((insight, i) => (
              <div key={i} className="p-4 border border-border rounded-lg space-y-2">
                <div className="flex items-start justify-between">
                  <h4 className="text-sm font-medium">{insight.title}</h4>
                  <Badge
                    variant="outline"
                    className={`text-xs ${
                      insight.impact === 'High'
                        ? 'bg-primary/10 text-primary border-primary/20'
                        : 'bg-muted'
                    }`}
                  >
                    {insight.impact} Impact
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {insight.description}
                </p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="mb-4">Recommended Actions</h3>
          <div className="space-y-3">
            {[
              {
                action: 'Shift $450K from paid ads to content marketing',
                timeline: 'Implement over next 2 months',
                priority: 1,
              },
              {
                action: 'Hire 2 senior sales reps to capitalize on PMF',
                timeline: 'Start hiring process immediately',
                priority: 1,
              },
              {
                action: 'Migrate to AWS reserved instances',
                timeline: 'Complete by end of quarter',
                priority: 2,
              },
              {
                action: 'Consolidate software subscriptions',
                timeline: 'Review and optimize by month-end',
                priority: 3,
              },
              {
                action: 'Renegotiate vendor contracts',
                timeline: 'Ongoing process',
                priority: 3,
              },
            ].map((rec, i) => (
              <div key={i} className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-medium text-primary">{rec.priority}</span>
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{rec.action}</p>
                    <p className="text-xs text-muted-foreground">{rec.timeline}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Separator className="my-4" />
          <Button className="w-full">Apply Recommendations</Button>
        </Card>
      </div>

      {/* Impact Projection */}
      <Card className="p-6 bg-gradient-to-br from-success/5 to-success/10 border-success/20">
        <h3 className="mb-4">Projected Impact</h3>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Annual Savings</p>
            <p className="text-2xl font-medium mb-1">${(totalSavings * 12 / 1000).toFixed(1)}K</p>
            <p className="text-xs text-success">~2 months additional runway</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Efficiency Gain</p>
            <p className="text-2xl font-medium mb-1">18%</p>
            <p className="text-xs text-muted-foreground">Cost per customer acquisition</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Revenue Impact</p>
            <p className="text-2xl font-medium mb-1">+$380K</p>
            <p className="text-xs text-muted-foreground">From sales investment (12 mo)</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
