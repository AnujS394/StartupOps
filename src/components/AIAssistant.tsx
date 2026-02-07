import { Sparkles, TrendingUp, AlertTriangle, CheckCircle2, Target, ArrowRight, Mic, Send, Brain, Lightbulb, Activity, Shield, Zap, TrendingDown } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useState } from 'react';
import { ScrollArea } from './ui/scroll-area';

interface ChatMessage {
  role: 'assistant' | 'user';
  content: string;
  timestamp: Date;
  metadata?: {
    type?: 'insight' | 'recommendation' | 'analysis' | 'warning';
    data?: any;
  };
}

export function AIAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: "Hi Jane! I'm your virtual co-founder and I've been analyzing TechVenture's execution data 24/7. Let me give you a comprehensive update on where you stand right now.",
      timestamp: new Date(),
    },
    {
      role: 'assistant',
      content: "**Startup Health Check (Real-time Analysis)**\n\n✅ **Strong Areas:**\n• Team velocity is 23% above industry benchmark\n• 87% milestone completion rate (target: 80%)\n• Burn rate 12% below projection - excellent capital efficiency\n• NPS of 68 indicates strong product-market fit\n\n⚠️ **Areas Needing Attention:**\n• CAC increased 18% over past 2 months (from $270 to $320)\n• Paid ad conversion declining - down to 2.1% from 3.2%\n• 2 critical hires still unfilled (Senior Backend, Growth Lead)\n\n🎯 **Execution Score: 87/100** (Up 5 points from last month)",
      timestamp: new Date(),
      metadata: { type: 'analysis' }
    },
  ]);
  const [input, setInput] = useState('');
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const quickActions = [
    { icon: Activity, label: "What should I focus on this week?", color: "primary" },
    { icon: TrendingUp, label: "Am I ready for Series A?", color: "success" },
    { icon: Shield, label: "What are my biggest risks?", color: "warning" },
    { icon: Lightbulb, label: "Optimize my budget", color: "primary" },
  ];

  const insights = [
    {
      type: 'strength',
      icon: CheckCircle2,
      title: 'Exceptional Execution Velocity',
      description: "Your team is completing tasks 23% faster than similar seed-stage startups. This isn't luck - your sprint planning and daily standups are working. Your engineering team's 92% on-time delivery is particularly impressive.",
      actionable: "Keep this momentum. Consider documenting your process to scale it as you grow.",
    },
    {
      type: 'risk',
      icon: AlertTriangle,
      title: 'Marketing Channel Efficiency Alert',
      description: "Your CAC has crept up 18% (from $270 to $320) while paid ad conversion dropped from 3.2% to 2.1%. This is a red flag - you're spending more to acquire fewer customers.",
      actionable: "Shift 30% of paid budget to content marketing (your organic conversion is 3.8×better). I can help you model this.",
    },
    {
      type: 'opportunity',
      icon: TrendingUp,
      title: 'Product-Market Fit Signals Strong',
      description: "NPS of 68, 40% week-over-week retention, and 85% feature adoption rate all indicate you've found PMF. Your customers are telling you something important.",
      actionable: "Now is the time to accelerate growth investments. Consider hiring 2 senior sales reps to capitalize on this momentum.",
    },
    {
      type: 'validation',
      icon: Target,
      title: 'Startup DNA Analysis',
      description: "Your behavior pattern shows you're a 'Builder-Optimizer' founder. You execute fast but also course-correct based on data. This is rare and valuable. Your decision to pivot pricing in Q3 (based on user feedback) increased MRR by 28%.",
      actionable: "Trust your data-driven instincts. You're making the right calls.",
    },
  ];

  const recommendations = [
    {
      priority: "Critical",
      action: "Shift $450K from paid ads to content marketing over next 60 days",
      reasoning: "Your organic content has 3.8× better conversion rate and $85 lower CAC",
      impact: "Could reduce CAC by 25% and improve customer quality",
      timeline: "Start this week",
    },
    {
      priority: "High",
      action: "Hire 2 senior sales reps immediately",
      reasoning: "Strong PMF + high retention + low churn = perfect time to scale sales",
      impact: "Projected 40% revenue increase in 6 months",
      timeline: "Post job by Monday",
    },
    {
      priority: "High",
      action: "Schedule Series A conversations for Q2 2025",
      reasoning: "Your metrics, velocity, and runway positioning you well. Strike while momentum is strong.",
      impact: "Could raise at 2.5-3× higher valuation than today",
      timeline: "Start warm intros now",
    },
    {
      priority: "Medium",
      action: "Renegotiate cloud infrastructure contracts",
      reasoning: "You're overpaying by ~$200K annually. Your usage doesn't match your plan.",
      impact: "Extend runway by 1.2 months",
      timeline: "Next 30 days",
    },
  ];

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMessage: ChatMessage = {
      role: 'user',
      content: input,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate intelligent response based on keywords
    setTimeout(() => {
      let response = '';
      const lowerInput = input.toLowerCase();

      if (lowerInput.includes('focus') || lowerInput.includes('priority') || lowerInput.includes('week')) {
        response = "**This Week's Top 3 Priorities:**\n\n1. **Address CAC inflation** - Meet with marketing team to review paid ad performance. I've identified 3 underperforming campaigns eating 40% of budget with <1% conversion.\n\n2. **Close those 2 critical hires** - Your Senior Backend Engineer and Growth Lead positions. Every week delay costs you ~$15K in opportunity cost based on your current velocity.\n\n3. **Start Series A groundwork** - Begin warm introductions to 3-5 target investors. Your metrics are strong NOW. Don't wait for them to plateau.\n\n**Quick wins:** Kill the underperforming ad campaigns today. That's $18K/month back in your pocket.";
      } else if (lowerInput.includes('series a') || lowerInput.includes('funding') || lowerInput.includes('ready')) {
        response = "**Series A Readiness Analysis:**\n\n**You're 75% ready. Here's what you have:**\n✅ Strong revenue growth (18% MoM)\n✅ Proven PMF (NPS 68, 40% retention)\n✅ Capital efficiency (12% under burn)\n✅ Experienced team executing well\n✅ Clear path to $10M ARR\n\n**What you need:**\n⏳ 6 more months of consistent growth\n⏳ Hit 2,000 paying customers milestone\n⏳ Hire those 2 senior roles to show team strength\n\n**My recommendation:** Start conversations NOW (6 months lead time is normal). Target Q2 2025 close. You could raise at $30-35M valuation based on your trajectory.\n\n**Investors to target:** Sequoia, a16z, Accel (they love SaaS with your metrics).";
      } else if (lowerInput.includes('risk') || lowerInput.includes('concern') || lowerInput.includes('worry')) {
        response = "**Top 5 Risks I'm Monitoring (Ranked by Impact):**\n\n🔴 **Critical: CAC Trend**\nRising CAC + declining ad conversion = unit economics risk. If this continues for 2 more months, you'll burn through runway 30% faster.\n\n🟡 **High: Key Person Dependency**\nMichael (VP Eng) is single point of failure. 80% of architecture decisions go through him. If he leaves, you're in trouble.\n\n🟡 **High: Competition**\nTwo well-funded competitors launched similar features last month. They're 6-12 months behind you, but they have deeper pockets.\n\n🟢 **Medium: Churn Risk**\nYour enterprise customers have 6× higher retention than SMBs. Over-indexing on SMBs could hurt long-term LTV.\n\n🟢 **Low: Technical Debt**\nYour codebase is healthy, but you're accumulating debt. Budget 20% eng time for refactoring.\n\n**Action Plan:** I've created a risk mitigation roadmap. Want to see it?";
      } else if (lowerInput.includes('budget') || lowerInput.includes('optimize') || lowerInput.includes('save')) {
        response = "**Budget Optimization Opportunities (AI Analysis):**\n\nI've analyzed every dollar you spend. Here are the quick wins:\n\n💰 **Save $18K/month immediately:**\n• Kill 3 underperforming ad campaigns (spending $12K, generating 4 customers)\n• Renegotiate AWS contract (move to reserved instances) = $4K/month\n• Consolidate 6 redundant SaaS tools = $2K/month\n\n📈 **Reallocate for better ROI:**\n• Move $450K from paid ads → content marketing (3.8× better conversion)\n• Invest $200K in 2 senior sales hires (projected 40% revenue increase)\n\n**Net Impact:** Reduce burn by $18K/month + increase revenue by ~$50K/month = 4-5 additional months of runway + faster growth.\n\nWant me to create the detailed implementation plan?";
      } else if (lowerInput.includes('team') || lowerInput.includes('hire') || lowerInput.includes('hiring')) {
        response = "**Team & Hiring Strategy:**\n\n**Current Team Strength: 8/10**\nYou've built a strong core team that executes well. But you have gaps:\n\n🔴 **Critical Gaps:**\n• Senior Backend Engineer (unfilled 6 weeks) - blocking 3 major features\n• Growth Lead (unfilled 4 weeks) - CAC rising without ownership\n\n🟡 **Future Needs (Next 6 months):**\n• 2 Senior Sales Reps (for Series A push)\n• Product Marketing Manager (to support growth pivot)\n• Technical Recruiter (to scale hiring)\n\n**Hiring Pro Tip:** Your offer-to-acceptance ratio is 45% (industry avg: 65%). You're losing candidates at the offer stage. I analyzed the data - your equity packages are 20% below market for senior roles.\n\n**Action:** Increase senior equity bands by 0.15-0.25% and you'll close more candidates.";
      } else {
        response = "I've analyzed your question in the context of TechVenture's current state. Based on your:\n\n• 18% MoM revenue growth\n• 87% milestone completion rate  \n• 23% above-benchmark team velocity\n• $3.8M cash, 18-month runway\n\nHere's my assessment: You're in a strong position with clear momentum. The main thing to focus on is maintaining this velocity while addressing the CAC efficiency issue.\n\nWant me to dive deeper into any specific area? I can help with:\n• Growth strategy\n• Fundraising readiness  \n• Risk mitigation\n• Budget optimization\n• Team planning";
      }

      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: response,
        timestamp: new Date(),
        metadata: { type: 'insight' }
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickAction = (question: string) => {
    setInput(question);
    setTimeout(() => handleSend(), 100);
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1">
            <Brain className="w-3 h-3" />
            24/7 Virtual Co-Founder
          </Badge>
        </div>
        <h1 className="text-3xl">AI Co-Founder Assistant</h1>
        <p className="text-muted-foreground">
          Real-time startup intelligence powered by continuous analysis of your execution data, market conditions, and founder behavior patterns.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Chat Interface */}
        <div className="col-span-2 space-y-4">
          <Card className="p-6 h-[700px] flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3>Intelligent Conversation</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Ask anything about your startup, execution, or strategy
                </p>
              </div>
              <Button
                variant={isVoiceMode ? "default" : "outline"}
                size="sm"
                onClick={() => setIsVoiceMode(!isVoiceMode)}
              >
                <Mic className="w-4 h-4 mr-2" />
                {isVoiceMode ? 'Voice On' : 'Voice Off'}
              </Button>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 pr-4 mb-4">
              <div className="space-y-4">
                {messages.map((message, i) => (
                  <div
                    key={i}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.role === 'assistant' ? (
                      <div className="flex gap-3 max-w-[90%]">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center flex-shrink-0">
                          <Brain className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-medium">AI Co-Founder</span>
                            <span className="text-xs text-muted-foreground">
                              {message.timestamp.toLocaleTimeString()}
                            </span>
                            {message.metadata?.type && (
                              <Badge variant="outline" className="text-xs">
                                {message.metadata.type}
                              </Badge>
                            )}
                          </div>
                          <div className="bg-muted rounded-2xl rounded-tl-none px-4 py-3">
                            <div className="text-sm leading-relaxed whitespace-pre-line">
                              {message.content}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-3 max-w-[85%]">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1 justify-end">
                            <span className="text-xs text-muted-foreground">
                              {message.timestamp.toLocaleTimeString()}
                            </span>
                            <span className="text-xs font-medium">You</span>
                          </div>
                          <div className="bg-primary rounded-2xl rounded-tr-none px-4 py-3">
                            <p className="text-sm leading-relaxed text-primary-foreground">
                              {message.content}
                            </p>
                          </div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-medium text-primary">JD</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center flex-shrink-0">
                      <Brain className="w-5 h-5 text-white" />
                    </div>
                    <div className="bg-muted rounded-2xl px-4 py-3">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-75"></div>
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-150"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Quick Actions */}
            <div className="mb-3">
              <p className="text-xs text-muted-foreground mb-2">Quick Questions:</p>
              <div className="flex flex-wrap gap-2">
                {quickActions.map((action, i) => {
                  const Icon = action.icon;
                  return (
                    <Button
                      key={i}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickAction(action.label)}
                      className="gap-2"
                    >
                      <Icon className="w-3 h-3" />
                      {action.label}
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Input */}
            <div className="border-t border-border pt-4">
              <div className="flex items-center gap-2">
                {isVoiceMode && (
                  <Button variant="outline" size="icon">
                    <Mic className="w-4 h-4" />
                  </Button>
                )}
                <Input
                  placeholder="Ask me anything about your startup..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  className="flex-1"
                />
                <Button size="icon" onClick={handleSend}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Insights Sidebar */}
        <div className="space-y-6">
          {/* Executive Summary */}
          <Card className="p-5 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium mb-1">Real-time Health Score</h4>
                <p className="text-xs text-muted-foreground">
                  Updated every hour based on your data
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Overall Health</span>
                <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                  87/100
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Execution Velocity</span>
                <div className="flex items-center gap-1 text-sm">
                  <TrendingUp className="w-3 h-3 text-success" />
                  <span className="font-medium">+23%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Burn Efficiency</span>
                <div className="flex items-center gap-1 text-sm">
                  <TrendingDown className="w-3 h-3 text-success" />
                  <span className="font-medium">-12%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Series A Readiness</span>
                <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
                  6-8 months
                </Badge>
              </div>
            </div>
          </Card>

          {/* Key Insights */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Live Insights</h4>
            <ScrollArea className="h-[500px]">
              <div className="space-y-3 pr-4">
                {insights.map((insight, i) => {
                  const Icon = insight.icon;
                  const colorClass =
                    insight.type === 'strength' ? 'success' :
                    insight.type === 'risk' ? 'warning' :
                    insight.type === 'validation' ? 'primary' :
                    'primary';

                  return (
                    <Card key={i} className="p-4">
                      <div className="flex items-start gap-3 mb-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          colorClass === 'success' ? 'bg-success/10' :
                          colorClass === 'warning' ? 'bg-warning/10' :
                          'bg-primary/10'
                        }`}>
                          <Icon className={`w-4 h-4 ${
                            colorClass === 'success' ? 'text-success' :
                            colorClass === 'warning' ? 'text-warning' :
                            'text-primary'
                          }`} />
                        </div>
                        <div>
                          <h5 className="text-sm font-medium mb-1">{insight.title}</h5>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                        {insight.description}
                      </p>
                      <div className="pt-2 border-t border-border">
                        <p className="text-xs font-medium text-foreground">
                          {insight.actionable}
                        </p>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>

      {/* Recommendations Dashboard */}
      <Card className="p-6">
        <h3 className="mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-primary" />
          AI-Powered Action Plan (Prioritized by Impact)
        </h3>
        <div className="space-y-3">
          {recommendations.map((rec, i) => (
            <div key={i} className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={`text-xs ${
                      rec.priority === 'Critical' ? 'bg-destructive/10 text-destructive border-destructive/20' :
                      rec.priority === 'High' ? 'bg-warning/10 text-warning border-warning/20' :
                      'bg-muted'
                    }`}
                  >
                    {rec.priority}
                  </Badge>
                  <span className="text-sm font-medium">{rec.action}</span>
                </div>
                <Button variant="ghost" size="sm">
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-1 text-xs text-muted-foreground">
                <p><strong className="text-foreground">Why:</strong> {rec.reasoning}</p>
                <p><strong className="text-foreground">Impact:</strong> {rec.impact}</p>
                <p><strong className="text-foreground">Timeline:</strong> {rec.timeline}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
