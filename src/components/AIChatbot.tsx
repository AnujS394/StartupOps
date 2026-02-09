import { useState, useRef, useEffect } from 'react';
import { Send, Loader, Sparkles, RotateCcw, Volume2, Copy, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { ScrollArea } from './ui/scroll-area';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  type?: 'insight' | 'recommendation' | 'analysis' | 'warning';
}

export function AIChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content:
        "Hi! 👋 I'm your AI Co-Founder Assistant. I analyze your startup's execution data, metrics, and metrics to give you actionable insights. Ask me about your funding readiness, team performance, growth strategies, or anything else related to your startup!",
      timestamp: new Date(),
      type: 'insight',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    '📊 What should I focus on this week?',
    '💰 Am I ready for Series A?',
    '⚠️ What are my biggest risks?',
    '🚀 How can I optimize my burn rate?',
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateAIResponse(input),
        timestamp: new Date(),
        type: detectMessageType(input),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const detectMessageType = (text: string): 'insight' | 'recommendation' | 'analysis' | 'warning' => {
    const lower = text.toLowerCase();
    if (lower.includes('risk') || lower.includes('problem') || lower.includes('issue')) return 'warning';
    if (lower.includes('how') || lower.includes('optimize')) return 'recommendation';
    if (lower.includes('data') || lower.includes('metric')) return 'analysis';
    return 'insight';
  };

  const generateAIResponse = (userInput: string): string => {
    const responses: { [key: string]: string } = {
      focus:
        '🎯 **Weekly Focus Areas:**\n\n✅ **High Priority:**\n• Close 2-3 customer calls to validate product-market fit\n• Complete backend optimization (will reduce latency by 40%)\n• Interview 5 candidates for the Growth Lead role\n\n⏱️ **Time Allocation:**\n- 40% Product & Engineering\n- 30% Customer Development  \n- 20% Team & Hiring\n- 10% Fundraising Prep\n\n💡 Your engagement emails have 34% open rate (industry avg: 21%). Double down on this channel.',
      series:
        '🚀 **Series A Readiness: 78/100**\n\n✅ **Green Lights:**\n• $2.1M ARR (target: $1M+)\n• 87% customer retention rate\n• 23% MoM growth (sustainable)\n• Strong founding team (ex-Google, ex-Stripe)\n\n🟡 **Areas to Improve:**\n• Need 2-3 more enterprise reference customers\n• Product roadmap should extend 18 months\n• Build a dedicated CFO/Finance person\n\n📋 **Next Steps:**\n1. Refine pitch deck with latest metrics\n2. Schedule warm intros with target VCs\n3. Prepare detailed financial model',
      risks:
        '⚠️ **Top 3 Risks (Priority Ranked):**\n\n1️⃣ **Customer Concentration Risk**\n   • Top 3 customers = 45% of revenue\n   • Action: Target 50+ mid-market customers\n   • Timeline: 6 months\n\n2️⃣ **Runway Risk**\n   • Current: 18 months at this burn rate\n   • Cushion: Only 6 months above minimum\n   • Action: Reduce burn by $50k/month or raise sooner\n\n3️⃣ **Team Risk**\n   • 2 critical engineering roles unfilled\n   • CTO is overworked (60 hours/week)\n   • Action: Hire immediately or restructure\n\n✅ Mitigation: I recommend raising Series A within 90 days.',
      burn:
        '💡 **Burn Rate Optimization Plan**\n\n📊 **Current Metrics:**\n• Monthly Burn: $280k\n• Runway: 18.2 months\n• Cash on Hand: $5.1M\n\n💰 **Quick Wins (Save $50k/month):**\n1. Renegotiate AWS contracts (-$12k) ✓ Feasible\n2. Move to remote-first office (-$15k) ✓ 1 month setup\n3. Eliminate unused tools (-$5k) ✓ Immediate\n4. Reduce contractor spend (-$18k) ✓ Hire 1 FTE\n\n🎯 **Target State:**\n• New Burn: $230k/month\n• New Runway: 22 months\n• ROI: Gain 4 months of runway at zero revenue impact\n\n⚡ **Revenue Opportunities:**\n• Enterprise tier pricing: +$40k/month\n• New market expansion: +$80k/month\n• Total upside: $120k/month by Q3',
      default:
        '🤔 **Great question!** Here\'s my analysis:\n\n**What I\'m observing:**\nYour metrics suggest strong product-market fit. Your NPS of 68 is excellent for B2B SaaS, and your CAC payback period of 8 months is within healthy range.\n\n**Key recommendation:**\nFocus on customer expansion revenue. Your current customers have high perceived value, so implementing upsells could increase ARPU by 25-30%.\n\n**Specific actions:**\n1. Analyze customer segments by spending\n2. Create tiered pricing for advanced features\n3. Build case studies from your top 5 customers\n\n**Next week:**\nI\'ll have more precise data after analyzing this week\'s customer interviews. Want me to track any specific metrics?',
    };

    const lower = userInput.toLowerCase();
    for (const [key, value] of Object.entries(responses)) {
      if (lower.includes(key)) {
        return value;
      }
    }
    return responses.default;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content:
          "Hi! 👋 I'm your AI Co-Founder Assistant. I analyze your startup's execution data, metrics, and metrics to give you actionable insights. Ask me about your funding readiness, team performance, growth strategies, or anything else related to your startup!",
        timestamp: new Date(),
        type: 'insight',
      },
    ]);
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-background via-background to-background/95 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 border-b border-border bg-card/50 backdrop-blur px-8 py-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-primary to-purple-500 rounded-lg">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">AI Co-Founder Assistant</h1>
            <p className="text-muted-foreground text-sm">Your 24/7 startup advisor & strategic partner</p>
          </div>
        </div>
      </div>

      {/* Main Chat Container */}
      <div className="flex-1 flex flex-col overflow-hidden max-w-5xl mx-auto w-full p-6">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-card border border-border rounded-xl overflow-hidden shadow-lg">
          {/* Chat Header */}
          <div className="flex-shrink-0 bg-gradient-to-r from-primary/80 to-purple-600/80 px-6 py-4 border-b border-primary/20 flex items-center justify-between">
            <div>
              <h2 className="text-white font-bold">Startup Analysis & Strategy</h2>
              <p className="text-primary-foreground/80 text-xs">Real-time insights powered by 24/7 analysis</p>
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={clearChat}
              className="text-white hover:bg-white/20"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto bg-card px-6 py-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-2xl px-4 py-3 rounded-lg text-sm ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground rounded-br-none'
                        : `bg-muted ${
                            message.type === 'warning'
                              ? 'border border-warning/30'
                              : message.type === 'recommendation'
                                ? 'border border-success/30'
                                : 'border border-border/50'
                          } rounded-bl-none`
                    }`}
                  >
                    <p className="leading-relaxed whitespace-pre-wrap break-words">
                      {message.content}
                    </p>
                    <div className="flex items-center justify-between mt-2 gap-2">
                      <p className="text-xs text-muted-foreground">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                      {message.role === 'assistant' && (
                        <button
                          onClick={() => copyToClipboard(message.content)}
                          className="p-1 hover:bg-muted rounded text-xs opacity-50 hover:opacity-100"
                          title="Copy"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted border border-border/50 text-foreground px-4 py-3 rounded-lg rounded-bl-none flex items-center gap-2 text-sm">
                    <Loader className="w-4 h-4 animate-spin flex-shrink-0" />
                    <p>Analyzing your metrics...</p>
                  </div>
                </div>
              )}

              <div ref={scrollRef} />
            </div>
          </div>

          {/* Input Area */}
          <div className="flex-shrink-0 border-t border-border bg-card p-4">
            <div className="flex gap-2 mb-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !isLoading) {
                    handleSendMessage();
                  }
                }}
                placeholder="Ask me about your startup, metrics, strategy, risks, or anything else..."
                className="flex-1 h-10"
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={isLoading || !input.trim()}
                className="px-4 h-10"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">Press Enter to send • Try: "Am I ready for Series A?" or "What are my risks?"</p>
          </div>
        </div>

        {/* Quick Prompts */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
          {suggestedPrompts.map((prompt, index) => (
            <button
              key={index}
              onClick={() => setInput(prompt)}
              className="p-3 text-left text-xs font-medium text-foreground bg-muted hover:bg-muted border border-border rounded-lg transition-all hover:shadow-md"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-muted border border-border rounded-lg p-4">
            <p className="text-xs text-muted-foreground mb-1">Monthly Burn</p>
            <p className="text-2xl font-bold">$280k</p>
          </div>
          <div className="bg-muted border border-border rounded-lg p-4">
            <p className="text-xs text-muted-foreground mb-1">Runway</p>
            <p className="text-2xl font-bold">18.2 <span className="text-lg">mo</span></p>
          </div>
          <div className="bg-muted border border-border rounded-lg p-4">
            <p className="text-xs text-muted-foreground mb-1">Growth Rate</p>
            <p className="text-2xl font-bold text-success">23% MoM</p>
          </div>
          <div className="bg-muted border border-border rounded-lg p-4">
            <p className="text-xs text-muted-foreground mb-1">NPS Score</p>
            <p className="text-2xl font-bold text-primary">68</p>
          </div>
        </div>
      </div>
    </div>
  );
}
