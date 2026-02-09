import { Mic, MicOff, Volume2, VolumeX, Play, RotateCcw, TrendingUp, AlertCircle, CheckCircle2, Sparkles, MessageSquare, Zap } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useState, useEffect } from 'react';
import { Progress } from './ui/progress';
import { ScrollArea } from './ui/scroll-area';
import { Card3D } from './3DCard';
import { motion, AnimatePresence } from 'motion/react';
import { PulseRing } from './InnovativeUI';
import { toast } from 'sonner';

interface Message {
  role: 'judge' | 'founder' | 'system';
  content: string;
  timestamp: Date;
}

interface FollowUpQuestion {
  question: string;
  trigger: string[];
}

const initialQuestions = [
  "Tell me about your business model. How exactly do you make money, and what are your unit economics?",
  "What's your customer acquisition cost, and how does it compare to lifetime value? Show me the numbers.",
  "Who are your main competitors, and why can't they just copy what you're doing?",
  "What are your key metrics? How have they grown over the past 6 months, and what's driving that growth?",
  "You're asking for funding. Walk me through exactly how you'll use this capital and what milestones you'll hit.",
];

const followUpQuestions: Record<string, FollowUpQuestion[]> = {
  revenue: [
    { question: "That's interesting, but what happens when your top 3 customers leave? How diversified is your revenue?", trigger: ['revenue', 'money', 'profit'] },
    { question: "I'm hearing numbers, but where's the proof? Show me your MRR growth trajectory.", trigger: ['subscription', 'recurring', 'mrr'] },
  ],
  competition: [
    { question: "Every founder says they have no competition. If you're so unique, why hasn't anyone else done this?", trigger: ['unique', 'first', 'only'] },
    { question: "What if Google or Microsoft decides to enter this space tomorrow? What's your moat?", trigger: ['competitor', 'market', 'space'] },
  ],
  traction: [
    { question: "Users are vanity metrics. How many are actually paying? What's your conversion rate?", trigger: ['users', 'customers', 'growth'] },
    { question: "That growth sounds good, but is it organic or paid? What's your retention looking like?", trigger: ['growing', 'increasing', 'scaling'] },
  ],
  team: [
    { question: "Why you? What makes your team uniquely qualified to win in this market?", trigger: ['team', 'founder', 'experience'] },
    { question: "Who's your weakest link right now, and how are you planning to fill that gap?", trigger: ['hiring', 'recruit', 'looking for'] },
  ],
  risk: [
    { question: "What keeps you up at night? What's the biggest risk that could kill this business?", trigger: ['risk', 'challenge', 'concern'] },
    { question: "I see regulatory risk written all over this. How are you handling compliance?", trigger: ['regulation', 'legal', 'compliance'] },
  ],
};

export function PitchSimulator() {
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [transcribedText, setTranscribedText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [responseAnalysis, setResponseAnalysis] = useState<string>('');
  const [shouldAskFollowUp, setShouldAskFollowUp] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [sessionStats, setSessionStats] = useState({
    questionsAnswered: 0,
    avgResponseTime: 0,
    confidenceLevel: 0,
  });

  const mockScores = {
    overall: 82,
    confidence: 88,
    clarity: 79,
    traction: 85,
    risk: 76,
  };

  // Simulate audio level for visual feedback
  useEffect(() => {
    if (isRecording) {
      const interval = setInterval(() => {
        setAudioLevel(Math.random() * 100);
      }, 100);
      return () => clearInterval(interval);
    } else {
      setAudioLevel(0);
    }
  }, [isRecording]);

  useEffect(() => {
    // Start with the first question
    if (messages.length === 0) {
      askQuestion(initialQuestions[0]);
    }
  }, []);

  const askQuestion = (question: string) => {
    const newMessage: Message = {
      role: 'judge',
      content: question,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
    
    // Simulate text-to-speech
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(question);
      utterance.rate = 0.9;
      utterance.pitch = 0.9;
      setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    setTranscribedText('');
    
    // Simulate speech-to-text
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      
      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result: any) => result.transcript)
          .join('');
        setTranscribedText(transcript);
      };
      
      recognition.start();
    } else {
      // Fallback: simulate transcription for demo
      setTimeout(() => {
        const mockTranscript = "Our business model is subscription-based SaaS. We charge $49 per month for our basic plan and $149 for enterprise. We currently have 1,200 paying customers with an average LTV of $2,400 and our CAC is around $320, giving us a strong 7.5x LTV to CAC ratio...";
        setTranscribedText(mockTranscript);
      }, 2000);
    }
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setIsProcessing(true);
    
    // Add founder's response to messages
    const founderMessage: Message = {
      role: 'founder',
      content: transcribedText || "Our business model is subscription-based SaaS. We charge $49 per month for basic and $149 for enterprise. We have 1,200 paying customers with LTV of $2,400 and CAC of $320.",
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, founderMessage]);
    
    // Analyze response
    setTimeout(() => {
      analyzeResponse(founderMessage.content);
    }, 1000);
  };

  const analyzeResponse = (response: string) => {
    // Simulate AI analysis
    const hasNumbers = /\d+/.test(response);
    const hasMetrics = /(revenue|customers|growth|ltv|cac|conversion|retention)/i.test(response);
    const hasConfidence = response.length > 100;
    const hasConcerns = /(but|however|challenge|difficult|concern)/i.test(response);
    
    let analysis = '';
    let askFollowUp = false;
    
    if (hasNumbers && hasMetrics) {
      analysis = "Strong response! You backed up your claims with specific metrics. ";
      if (!hasConcerns) {
        analysis += "Consider acknowledging potential challenges to show balanced thinking.";
        askFollowUp = true;
      }
    } else if (hasNumbers) {
      analysis = "You provided numbers, but try to connect them to key business metrics like CAC, LTV, or churn.";
      askFollowUp = true;
    } else {
      analysis = "Your answer lacks specific data points. Investors want to see hard numbers and evidence.";
      askFollowUp = true;
    }
    
    setResponseAnalysis(analysis);
    
    // Add system analysis message
    const analysisMessage: Message = {
      role: 'system',
      content: analysis,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, analysisMessage]);
    
    setIsProcessing(false);
    setShouldAskFollowUp(askFollowUp);
    
    // Update session stats
    setSessionStats(prev => ({
      ...prev,
      questionsAnswered: prev.questionsAnswered + 1,
      confidenceLevel: hasConfidence ? Math.min(prev.confidenceLevel + 5, 100) : prev.confidenceLevel,
    }));
  };

  const handleNextQuestion = () => {
    if (shouldAskFollowUp && currentQuestionIndex < initialQuestions.length) {
      // Ask intelligent follow-up based on previous answer
      const lastMessage = messages.find(m => m.role === 'founder');
      let followUpAsked = false;
      
      if (lastMessage) {
        for (const [category, questions] of Object.entries(followUpQuestions)) {
          for (const fq of questions) {
            if (fq.trigger.some(t => lastMessage.content.toLowerCase().includes(t))) {
              askQuestion(fq.question);
              followUpAsked = true;
              setShouldAskFollowUp(false);
              return;
            }
          }
        }
      }
    }
    
    // Move to next main question
    if (currentQuestionIndex < initialQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      askQuestion(initialQuestions[currentQuestionIndex + 1]);
      setShouldAskFollowUp(false);
      setTranscribedText('');
    } else {
      // Finish session
      setShowScore(true);
    }
  };

  const handleSkipQuestion = () => {
    const skipMessage: Message = {
      role: 'system',
      content: "Question skipped. In a real pitch, hesitation or skipping questions signals lack of preparation.",
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, skipMessage]);
    handleNextQuestion();
  };

  const handleReset = () => {
    setShowScore(false);
    setCurrentQuestionIndex(0);
    setMessages([]);
    setTranscribedText('');
    setSessionStats({
      questionsAnswered: 0,
      avgResponseTime: 0,
      confidenceLevel: 0,
    });
    askQuestion(initialQuestions[0]);
  };

  return (
    <div className="p-8 space-y-8 max-w-6xl mx-auto relative" style={{ perspective: '1000px' }}>
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1">
            <Sparkles className="w-3 h-3" />
            AI Pitch Simulator
          </Badge>
        </div>
        <h1 className="text-3xl">Shark Tank Practice Session</h1>
        <p className="text-muted-foreground">
          Face intelligent AI judges that ask tough questions, analyze your responses in real-time, and help you improve your pitch through voice-based interaction.
        </p>
      </div>

      {!showScore ? (
        <>
          {/* Session Progress */}
          <Card3D intensity={10} className="p-5 shadow-xl rounded-xl border border-border/50 bg-card/80 backdrop-blur-md">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Questions Answered</p>
                <p className="text-xl font-medium">{sessionStats.questionsAnswered}/{initialQuestions.length + 3}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Confidence Level</p>
                <div className="flex items-center gap-2">
                  <Progress value={sessionStats.confidenceLevel} className="h-2 flex-1" />
                  <span className="text-sm font-medium">{sessionStats.confidenceLevel}%</span>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Session Status</p>
                <Badge variant={isRecording ? "default" : "outline"}>
                  {isRecording ? 'Recording Answer' : isProcessing ? 'Analyzing...' : 'Waiting for Response'}
                </Badge>
              </div>
            </div>
          </Card3D>

          {/* Conversation Thread */}
          <Card3D intensity={10} className="p-6 h-[500px] flex flex-col shadow-xl rounded-xl border border-border/50 bg-card/80 backdrop-blur-md">
            <div className="flex items-center justify-between mb-4">
              <h3>Live Pitch Session</h3>
              <div className="flex items-center gap-2">
                <AnimatePresence>
                  {isSpeaking && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="flex items-center gap-1"
                    >
                      <div className="w-1 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
                      <div className="w-1 h-5 bg-primary rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
                      <div className="w-1 h-4 bg-primary rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
                    </motion.div>
                  )}
                </AnimatePresence>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsSpeaking(!isSpeaking)}
                >
                  {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-4">
                {messages.map((message, i) => (
                  <div
                    key={i}
                    className={`flex ${
                      message.role === 'founder' ? 'justify-end' :
                      message.role === 'system' ? 'justify-center' :
                      'justify-start'
                    }`}
                  >
                    {message.role === 'judge' && (
                      <div className="flex gap-3 max-w-[85%]">
                        <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
                          <MessageSquare className="w-5 h-5 text-destructive" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-medium">AI Judge</span>
                            <span className="text-xs text-muted-foreground">
                              {message.timestamp.toLocaleTimeString()}
                            </span>
                          </div>
                          <div className="bg-muted rounded-2xl rounded-tl-none px-4 py-3">
                            <p className="text-sm leading-relaxed">{message.content}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {message.role === 'founder' && (
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

                    {message.role === 'system' && (
                      <div className="max-w-[90%]">
                        <Card className="p-3 bg-primary/5 border-primary/20">
                          <div className="flex items-start gap-2">
                            <Sparkles className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {message.content}
                            </p>
                          </div>
                        </Card>
                      </div>
                    )}
                  </div>
                ))}

                {isProcessing && (
                  <div className="flex justify-center">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                      <span>AI is analyzing your response...</span>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Voice Input Area */}
            <div className="border-t border-border pt-4 mt-4">
              {transcribedText && (
                <Card className="p-3 bg-muted/50 mb-3">
                  <p className="text-sm text-muted-foreground italic">
                    "{transcribedText}"
                  </p>
                </Card>
              )}

              <div className="flex flex-col items-center gap-4">
                <button
                  onClick={isRecording ? handleStopRecording : handleStartRecording}
                  disabled={isProcessing}
                  className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
                    isRecording 
                      ? 'bg-destructive hover:bg-destructive/90 shadow-lg shadow-destructive/20 animate-pulse' 
                      : 'bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20'
                  } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isRecording ? (
                    <MicOff className="w-8 h-8 text-white" />
                  ) : (
                    <Mic className="w-8 h-8 text-white" />
                  )}
                </button>
                
                <p className="text-sm text-muted-foreground text-center">
                  {isRecording ? (
                    <span className="text-destructive font-medium">Recording... Click to stop and submit</span>
                  ) : isProcessing ? (
                    'Processing your response...'
                  ) : (
                    'Click the microphone to record your answer'
                  )}
                </p>

                <div className="flex items-center gap-2 w-full">
                  <Button 
                    className="flex-1"
                    disabled={isRecording || isProcessing || !messages.some(m => m.role === 'founder')}
                    onClick={() => {
                      handleNextQuestion();
                      toast.info('Loading next question...');
                    }}
                  >
                    {shouldAskFollowUp ? 'Continue Conversation' : 'Next Question'}
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      handleSkipQuestion();
                      toast.info('Question skipped');
                    }}
                    disabled={isRecording || isProcessing}
                  >
                    Skip
                  </Button>
                </div>
              </div>
            </div>
          </Card3D>

          {/* Real-time Tips */}
          <Card className="p-5 bg-primary/5 border-primary/20">
            <div className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-primary mt-0.5" />
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Pro Tips for This Session</h4>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  <li>• Be specific: Use exact numbers, percentages, and timeframes</li>
                  <li>• Show confidence: Speak clearly and maintain a steady pace</li>
                  <li>• Acknowledge risks: Investors respect founders who understand challenges</li>
                  <li>• Tell a story: Connect your metrics to real customer impact</li>
                </ul>
              </div>
            </div>
          </Card>
        </>
      ) : (
        /* Score Results */
        <div className="space-y-6">
          <Card className="p-8 text-center space-y-4">
            <div className="mx-auto w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center">
              <div className="text-center">
                <p className="text-5xl font-medium text-primary">{mockScores.overall}</p>
                <p className="text-sm text-muted-foreground mt-1">Score</p>
              </div>
            </div>
            <h2>Strong Performance!</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              You demonstrated good knowledge of your business and clear communication. You answered {sessionStats.questionsAnswered} questions with {sessionStats.confidenceLevel}% confidence level.
            </p>
          </Card>

          {/* Detailed Scores */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">Confidence & Delivery</span>
                <span className="text-xl font-medium">{mockScores.confidence}/100</span>
              </div>
              <Progress value={mockScores.confidence} className="h-2" />
              <p className="text-xs text-success mt-2 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Strong voice clarity and consistent pace
              </p>
            </Card>

            <Card className="p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">Clarity & Structure</span>
                <span className="text-xl font-medium">{mockScores.clarity}/100</span>
              </div>
              <Progress value={mockScores.clarity} className="h-2" />
              <p className="text-xs text-warning mt-2 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                Some answers could be more concise
              </p>
            </Card>

            <Card className="p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">Traction Evidence</span>
                <span className="text-xl font-medium">{mockScores.traction}/100</span>
              </div>
              <Progress value={mockScores.traction} className="h-2" />
              <p className="text-xs text-success mt-2 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Excellent use of specific metrics and data
              </p>
            </Card>

            <Card className="p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">Risk Awareness</span>
                <span className="text-xl font-medium">{mockScores.risk}/100</span>
              </div>
              <Progress value={mockScores.risk} className="h-2" />
              <p className="text-xs text-warning mt-2 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                Address competitive risks more directly
              </p>
            </Card>
          </div>

          {/* Improvement Tips */}
          <Card className="p-6">
            <h3 className="mb-4">Personalized Improvement Recommendations</h3>
            <div className="space-y-3">
              {[
                {
                  priority: 1,
                  tip: "Lead with your strongest metric (18% MoM revenue growth) when discussing traction",
                  impact: "High Impact"
                },
                {
                  priority: 2,
                  tip: "Prepare a 30-second elevator pitch version for each key question",
                  impact: "Medium Impact"
                },
                {
                  priority: 3,
                  tip: "Acknowledge competition directly and explain your 3 unique advantages",
                  impact: "High Impact"
                },
                {
                  priority: 4,
                  tip: "Practice harder questions: 'Why now?' and 'What if [competitor] does this?'",
                  impact: "Medium Impact"
                },
              ].map((item) => (
                <div key={item.priority} className="flex items-start gap-3 p-4 border border-border rounded-lg">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-medium text-primary">{item.priority}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm mb-1">{item.tip}</p>
                    <Badge variant="outline" className="text-xs">{item.impact}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button className="flex-1" onClick={() => {
              handleReset();
              toast.success('Starting new practice session...');
            }}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Practice Again
            </Button>
            <Button variant="outline" onClick={() => {
              window.print();
              toast.success('Generating PDF report...');
            }}>
              Save Report
            </Button>
            <Button variant="outline" onClick={() => {
              setShowScore(false);
              toast.info('Reviewing session');
            }}>
              Review Session
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}