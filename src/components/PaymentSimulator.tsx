import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  CreditCard, 
  DollarSign, 
  Check, 
  Calendar, 
  Building2, 
  Sparkles,
  TrendingUp,
  Lock,
  ArrowRight,
  Crown,
  Zap
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner';

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    price: 49,
    icon: Sparkles,
    color: 'from-blue-500 to-cyan-500',
    features: [
      'Basic Dashboard & Analytics',
      'Up to 3 Team Members',
      'Pitch Deck Builder',
      'Email Support',
      '5 AI Budget Optimizations/month'
    ]
  },
  {
    id: 'growth',
    name: 'Growth',
    price: 149,
    icon: TrendingUp,
    color: 'from-primary to-purple-500',
    popular: true,
    features: [
      'Everything in Starter',
      'Up to 15 Team Members',
      'AI Pitch Simulator',
      'Priority Support',
      'Unlimited AI Optimizations',
      'Advanced Analytics',
      'Investor Portal Access'
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 499,
    icon: Crown,
    color: 'from-purple-500 to-pink-500',
    features: [
      'Everything in Growth',
      'Unlimited Team Members',
      'Custom Integrations',
      'Dedicated Success Manager',
      'White-label Options',
      'API Access',
      'Custom AI Training'
    ]
  }
];

export function PaymentSimulator() {
  const [selectedPlan, setSelectedPlan] = useState('growth');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [step, setStep] = useState<'plans' | 'payment' | 'success'>('plans');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Payment form state
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const selectedPlanData = plans.find(p => p.id === selectedPlan);
  const discount = billingCycle === 'annual' ? 0.2 : 0;
  const finalPrice = selectedPlanData 
    ? billingCycle === 'annual' 
      ? selectedPlanData.price * 12 * (1 - discount) 
      : selectedPlanData.price
    : 0;

  const handlePayment = async () => {
    if (!cardNumber || !cardName || !expiryDate || !cvv) {
      toast.error('Please fill in all payment details');
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setStep('success');
      toast.success('Payment processed successfully!');
    }, 2000);
  };

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
    return formatted.substring(0, 19);
  };

  if (step === 'success') {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="p-12 text-center bg-card/60 backdrop-blur-xl border-border/50">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-6"
            >
              <Check className="w-10 h-10 text-white" />
            </motion.div>
            
            <h2 className="text-3xl font-semibold mb-4">Payment Successful!</h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Welcome to StartupOps {selectedPlanData?.name} Plan
            </p>
            
            <div className="bg-muted/30 rounded-xl p-6 mb-8 border border-border/50">
              <div className="flex items-center justify-between mb-4">
                <span className="text-muted-foreground">Plan</span>
                <span className="font-semibold">{selectedPlanData?.name}</span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-muted-foreground">Billing</span>
                <span className="font-semibold capitalize">{billingCycle}</span>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-border/50">
                <span className="text-muted-foreground">Amount Paid</span>
                <span className="text-2xl font-semibold text-primary">
                  ${finalPrice.toFixed(2)}
                </span>
              </div>
            </div>

            <Button
              onClick={() => setStep('plans')}
              className="w-full bg-gradient-to-r from-primary to-primary/80"
            >
              Return to Plans
            </Button>
          </Card>
        </motion.div>
      </div>
    );
  }

  if (step === 'payment') {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <Button
          variant="ghost"
          onClick={() => setStep('plans')}
          className="mb-6"
        >
          ← Back to Plans
        </Button>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Payment Form */}
          <Card className="p-6 bg-card/60 backdrop-blur-xl border-border/50">
            <h2 className="text-2xl font-semibold mb-6">Payment Details</h2>
            
            <div className="space-y-6">
              <div>
                <Label htmlFor="cardNumber">Card Number</Label>
                <div className="relative mt-2">
                  <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                    className="pl-10"
                    maxLength={19}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="cardName">Cardholder Name</Label>
                <div className="relative mt-2">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="cardName"
                    placeholder="Jane Doe"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <div className="relative mt-2">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="expiry"
                      placeholder="MM/YY"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                      className="pl-10"
                      maxLength={5}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <div className="relative mt-2">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="cvv"
                      type="password"
                      placeholder="123"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      className="pl-10"
                      maxLength={4}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border/50">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <Lock className="w-4 h-4" />
                  <span>Your payment information is secure and encrypted</span>
                </div>

                <Button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full bg-gradient-to-r from-primary to-primary/80"
                >
                  {isProcessing ? (
                    <span className="flex items-center gap-2">
                      <motion.div
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Pay ${finalPrice.toFixed(2)}
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  )}
                </Button>
              </div>
            </div>
          </Card>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="p-6 bg-card/60 backdrop-blur-xl border-border/50">
              <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Plan</span>
                  <span className="font-medium">{selectedPlanData?.name}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Billing Cycle</span>
                  <span className="font-medium capitalize">{billingCycle}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Base Price</span>
                  <span className="font-medium">
                    ${billingCycle === 'annual' 
                      ? (selectedPlanData!.price * 12).toFixed(2) 
                      : selectedPlanData!.price.toFixed(2)}
                  </span>
                </div>
                
                {billingCycle === 'annual' && (
                  <div className="flex items-center justify-between text-green-500">
                    <span>Annual Discount (20%)</span>
                    <span>-${(selectedPlanData!.price * 12 * discount).toFixed(2)}</span>
                  </div>
                )}
                
                <div className="pt-4 border-t border-border/50">
                  <div className="flex items-center justify-between text-xl font-semibold">
                    <span>Total</span>
                    <span className="text-primary">${finalPrice.toFixed(2)}</span>
                  </div>
                  {billingCycle === 'annual' && (
                    <p className="text-sm text-muted-foreground mt-2">
                      ${(finalPrice / 12).toFixed(2)}/month billed annually
                    </p>
                  )}
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-primary/5 border-primary/20">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-medium text-foreground mb-1">Money-Back Guarantee</p>
                  <p className="text-muted-foreground">
                    Try StartupOps risk-free for 30 days. If you're not satisfied, get a full refund.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-semibold mb-4">Choose Your Plan</h1>
        <p className="text-muted-foreground text-lg">
          Scale your startup with the right tools and support
        </p>
      </div>

      {/* Billing Toggle */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => setBillingCycle('monthly')}
          className={`px-6 py-2.5 rounded-lg transition-all ${
            billingCycle === 'monthly'
              ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
              : 'bg-muted/50 text-muted-foreground hover:bg-muted'
          }`}
        >
          Monthly
        </button>
        <button
          onClick={() => setBillingCycle('annual')}
          className={`px-6 py-2.5 rounded-lg transition-all relative ${
            billingCycle === 'annual'
              ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
              : 'bg-muted/50 text-muted-foreground hover:bg-muted'
          }`}
        >
          Annual
          <Badge className="absolute -top-2 -right-2 bg-green-500 text-white text-xs">
            Save 20%
          </Badge>
        </button>
      </div>

      {/* Plans Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan, index) => {
          const Icon = plan.icon;
          const isSelected = selectedPlan === plan.id;
          const price = billingCycle === 'annual' 
            ? plan.price * 12 * (1 - discount) 
            : plan.price;

          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={`p-6 bg-card/60 backdrop-blur-xl border-border/50 relative overflow-hidden transition-all cursor-pointer ${
                  isSelected 
                    ? 'ring-2 ring-primary shadow-xl shadow-primary/20 scale-105' 
                    : 'hover:border-border hover:shadow-lg'
                }`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.popular && (
                  <Badge className="absolute top-4 right-4 bg-gradient-to-r from-primary to-purple-500 text-white">
                    Most Popular
                  </Badge>
                )}

                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-6`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
                
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-semibold">
                      ${billingCycle === 'annual' ? (price / 12).toFixed(0) : price}
                    </span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  {billingCycle === 'annual' && (
                    <p className="text-sm text-muted-foreground mt-1">
                      ${price.toFixed(2)} billed annually
                    </p>
                  )}
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => {
                    setSelectedPlan(plan.id);
                    setStep('payment');
                  }}
                  className={`w-full ${
                    isSelected
                      ? `bg-gradient-to-r ${plan.color} text-white`
                      : 'bg-muted/50 text-foreground hover:bg-muted'
                  }`}
                >
                  {isSelected ? 'Continue' : 'Select Plan'}
                </Button>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Features Comparison */}
      <Card className="p-8 bg-card/60 backdrop-blur-xl border-border/50">
        <h3 className="text-2xl font-semibold mb-6 text-center">All plans include</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-medium mb-1">AI-Powered Insights</h4>
              <p className="text-sm text-muted-foreground">
                Get intelligent recommendations to optimize your startup operations
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Lock className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-medium mb-1">Enterprise Security</h4>
              <p className="text-sm text-muted-foreground">
                Bank-level encryption and data protection for your sensitive information
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-medium mb-1">Growth Analytics</h4>
              <p className="text-sm text-muted-foreground">
                Track key metrics and predict your startup's growth trajectory
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
