import { useState, useRef, useEffect } from 'react';
import { Send, MessageCircle, Loader } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { ScrollArea } from './ui/scroll-area';

interface Message {
  id: string;
  role: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'bot',
      content:
        "Hello! 👋 I'm your AI Assistant. How can I help you today? Feel free to ask me anything about your startup, funding, or general business questions.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        content: generateBotResponse(input),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const generateBotResponse = (userInput: string): string => {
    const responses: { [key: string]: string } = {
      funding: "For funding, I recommend starting with a solid pitch deck covering your market opportunity, team credentials, and traction. Focus on your unique value proposition.",
      team:
        "Building a strong team is crucial. Focus on hiring experienced people who've been through similar challenges before.",
      growth:
        "Growth strategies depend on your business model. Consider a mix of organic growth, content marketing, and paid advertising.",
      product:
        "Prioritize product-market fit before scaling. Ensure your users love what you've built.",
      default:
        "Great question! That's an important consideration for your startup. Could you provide more details so I can give you more specific advice?",
    };

    const lowerInput = userInput.toLowerCase();
    for (const [key, value] of Object.entries(responses)) {
      if (lowerInput.includes(key)) {
        return value;
      }
    }
    return responses.default;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <Card className="w-full max-w-2xl h-[600px] flex flex-col shadow-2xl border border-slate-700 bg-slate-800">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-t-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white bg-opacity-20 rounded-lg">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">AI Assistant</h2>
              <p className="text-blue-100 text-sm">Always here to help</p>
            </div>
          </div>
        </div>

        {/* Messages Container */}
        <ScrollArea className="flex-1 p-6 bg-slate-800">
          <div className="space-y-4 pr-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-none'
                      : 'bg-slate-700 text-slate-100 rounded-tl-none'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <p
                    className={`text-xs mt-2 ${
                      message.role === 'user'
                        ? 'text-blue-100'
                        : 'text-slate-400'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-700 text-slate-100 px-4 py-3 rounded-lg rounded-tl-none flex items-center gap-2">
                  <Loader className="w-4 h-4 animate-spin" />
                  <p className="text-sm">Thinking...</p>
                </div>
              </div>
            )}

            <div ref={scrollRef} />
          </div>
        </ScrollArea>

        {/* Input Container */}
        <div className="border-t border-slate-700 p-4 bg-slate-800 rounded-b-lg">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !isLoading) {
                  handleSendMessage();
                }
              }}
              placeholder="Type your message here..."
              className="flex-1 bg-slate-700 border-slate-600 text-white placeholder-slate-400"
              disabled={isLoading}
            />
            <Button
              onClick={handleSendMessage}
              disabled={isLoading || !input.trim()}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            Press Enter or click Send to submit your message
          </p>
        </div>
      </Card>
    </div>
  );
}
