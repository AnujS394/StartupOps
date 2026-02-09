import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { TrendingUp, TrendingDown, Download } from 'lucide-react';
import { Card3D, FloatingElement } from './3DCard';
import { motion } from 'motion/react';
import { Chart3DWrapper, ParallaxChart } from './3DChart';
import { toast } from 'sonner';
import { generateAnalyticsReportPDF } from '../utils/pdfGenerator';
import { useState } from 'react';

const revenueData = [
  { month: 'Aug', revenue: 45, costs: 142 },
  { month: 'Sep', revenue: 58, costs: 156 },
  { month: 'Oct', revenue: 72, costs: 148 },
  { month: 'Nov', revenue: 89, costs: 165 },
  { month: 'Dec', revenue: 105, costs: 159 },
  { month: 'Jan', revenue: 124, costs: 165 },
];

const userGrowthData = [
  { month: 'Aug', users: 450 },
  { month: 'Sep', users: 620 },
  { month: 'Oct', users: 830 },
  { month: 'Nov', users: 1050 },
  { month: 'Dec', users: 1280 },
  { month: 'Jan', users: 1520 },
];

const departmentSpend = [
  { name: 'Engineering', value: 4200, color: '#3b82f6' },
  { name: 'Marketing', value: 2500, color: '#10b981' },
  { name: 'Sales', value: 1900, color: '#8b5cf6' },
  { name: 'Product', value: 1800, color: '#f59e0b' },
  { name: 'Operations', value: 1600, color: '#ef4444' },
];

export function Analytics() {
  const [isExporting, setIsExporting] = useState(false);

  const handleExportReport = async () => {
    setIsExporting(true);
    toast.loading('Generating analytics report...');
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
      generateAnalyticsReportPDF();
      toast.success('Analytics report exported successfully!');
    } catch (error) {
      toast.error('Failed to export report. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="p-8 space-y-8 max-w-[1600px] mx-auto relative" style={{ perspective: '1000px' }}>
      {/* Floating background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <FloatingElement depth={45} floatIntensity={14} className="absolute top-24 right-16 w-30 h-30 bg-primary/5 rounded-full blur-3xl" />
        <FloatingElement depth={38} floatIntensity={16} className="absolute bottom-24 left-16 w-38 h-38 bg-success/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2">Analytics</h1>
          <p className="text-muted-foreground">
            Track key metrics, monitor growth, and analyze performance
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={handleExportReport} disabled={isExporting}>
            <Download className="w-4 h-4 mr-2" />
            {isExporting ? 'Exporting...' : 'Export Report'}
          </Button>
        </div>
      </div>

      {/* Key Metrics Summary */}
      <div className="grid grid-cols-4 gap-4">
        <Card3D intensity={12} className="p-5 shadow-xl rounded-xl border border-border/50 bg-card/80 backdrop-blur-md">
          <p className="text-sm text-muted-foreground mb-1">Monthly Revenue</p>
          <p className="text-2xl font-medium mb-2">$124K</p>
          <div className="flex items-center gap-1 text-xs text-success">
            <TrendingUp className="w-3 h-3" />
            <span>+18% from last month</span>
          </div>
        </Card3D>

        <Card3D intensity={12} className="p-5 shadow-xl rounded-xl border border-border/50 bg-card/80 backdrop-blur-md">
          <p className="text-sm text-muted-foreground mb-1">Active Users</p>
          <p className="text-2xl font-medium mb-2">1,520</p>
          <div className="flex items-center gap-1 text-xs text-success">
            <TrendingUp className="w-3 h-3" />
            <span>+19% from last month</span>
          </div>
        </Card3D>

        <Card3D intensity={12} className="p-5 shadow-xl rounded-xl border border-border/50 bg-card/80 backdrop-blur-md">
          <p className="text-sm text-muted-foreground mb-1">Burn Multiple</p>
          <p className="text-2xl font-medium mb-2">1.33×</p>
          <div className="flex items-center gap-1 text-xs text-success">
            <TrendingDown className="w-3 h-3" />
            <span>Improving (lower is better)</span>
          </div>
        </Card3D>

        <Card3D intensity={12} className="p-5 shadow-xl rounded-xl border border-border/50 bg-card/80 backdrop-blur-md">
          <p className="text-sm text-muted-foreground mb-1">Net Burn Rate</p>
          <p className="text-2xl font-medium mb-2">$41K</p>
          <div className="flex items-center gap-1 text-xs text-success">
            <TrendingDown className="w-3 h-3" />
            <span>-24% from last month</span>
          </div>
        </Card3D>
      </div>

      {/* Revenue vs Costs */}
      <Card3D intensity={10} className="p-6 shadow-xl rounded-xl border border-border/50 bg-card/80 backdrop-blur-md">
        <div className="mb-6">
          <h3 className="mb-1">Revenue vs Operating Costs</h3>
          <p className="text-sm text-muted-foreground">Monthly comparison over the past 6 months</p>
        </div>
        <Chart3DWrapper className="h-80 w-full">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#737373" />
              <YAxis tick={{ fontSize: 12 }} stroke="#737373" tickFormatter={(value) => `$${value}K`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e5e5',
                  borderRadius: '8px',
                }}
                formatter={(value: number) => [`$${value}K`, '']}
              />
              <Legend />
              <Bar dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} name="Revenue" />
              <Bar dataKey="costs" fill="#ef4444" radius={[4, 4, 0, 0]} name="Costs" />
            </BarChart>
          </ResponsiveContainer>
        </Chart3DWrapper>
      </Card3D>

      {/* User Growth & Department Spend */}
      <div className="grid grid-cols-2 gap-6">
        <Card3D intensity={10} className="p-6 shadow-xl rounded-xl border border-border/50 bg-card/80 backdrop-blur-md">
          <div className="mb-6">
            <h3 className="mb-1">User Growth</h3>
            <p className="text-sm text-muted-foreground">Total active users over time</p>
          </div>
          <ParallaxChart depth={30} className="h-72 w-full">
            <ResponsiveContainer width="100%" height={288}>
              <LineChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#737373" />
                <YAxis tick={{ fontSize: 12 }} stroke="#737373" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e5e5',
                    borderRadius: '8px',
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="users" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', r: 4 }}
                  name="Active Users"
                />
              </LineChart>
            </ResponsiveContainer>
          </ParallaxChart>
        </Card3D>

        <Card3D intensity={10} className="p-6 shadow-xl rounded-xl border border-border/50 bg-card/80 backdrop-blur-md">
          <div className="mb-6">
            <h3 className="mb-1">Department Spend Distribution</h3>
            <p className="text-sm text-muted-foreground">Monthly budget allocation</p>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height={288}>
              <PieChart>
                <Pie
                  data={departmentSpend}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {departmentSpend.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e5e5',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => [`$${value}K`, 'Monthly']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-4">
            {departmentSpend.map((dept, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: dept.color }}></div>
                  <span>{dept.name}</span>
                </div>
                <span className="font-medium">${dept.value}K</span>
              </div>
            ))}
          </div>
        </Card3D>
      </div>

      {/* Key Insights */}
      <Card3D intensity={8} className="p-6 shadow-xl rounded-xl border border-border/50 bg-card/80 backdrop-blur-md">
        <h3 className="mb-4">Key Insights</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 border border-success/20 bg-success/5 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-success" />
              <span className="text-sm font-medium">Strong Growth</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Revenue is growing 18% MoM while costs remain stable, indicating improving unit economics
            </p>
          </div>

          <div className="p-4 border border-primary/20 bg-primary/5 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">User Acquisition</span>
            </div>
            <p className="text-xs text-muted-foreground">
              User growth is accelerating with 19% increase month-over-month
            </p>
          </div>

          <div className="p-4 border border-warning/20 bg-warning/5 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-warning" />
              <span className="text-sm font-medium">Path to Profitability</span>
            </div>
            <p className="text-xs text-muted-foreground">
              At current growth rate, reaching break-even in ~8 months
            </p>
          </div>
        </div>
      </Card3D>
    </div>
  );
}