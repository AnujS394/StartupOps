import { useState, useRef, useEffect } from 'react';
import { Send, X, MessageCircle, Minimize2 } from 'lucide-react';
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

export function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'bot',
      content: "Hi! 👋 Have any questions? I'm here to help!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

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
      funding: "Great question about funding! Start with a strong pitch deck and clear metrics.",
      team: "Building the right team is key. Look for experienced founders and builders.",
      growth: "For growth, focus on your core metrics and scale what works best.",
      product: "Product-market fit comes first. Listen to user feedback and iterate.",
      default:
        "That's a great question! Can you tell me more about what you're looking for?",
    };

    const lowerInput = userInput.toLowerCase();
    for (const [key, value] of Object.entries(responses)) {
      if (lowerInput.includes(key)) {
        return value;
      }
    }
    return responses.default;
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-40 group"
      >
        <MessageCircle className="w-6 h-6 text-white" />
        <span className="absolute bottom-16 right-0 bg-slate-900 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          Chat with AI
        </span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 z-50">
      <Card className="h-[500px] flex flex-col shadow-2xl border border-slate-700 bg-slate-800">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-t-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-white" />
            <h3 className="text-white font-semibold">AI Assistant</h3>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-white hover:bg-opacity-20 rounded-lg transition"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4 bg-slate-800">
          <div className="space-y-3 pr-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-none'
                      : 'bg-slate-700 text-slate-100 rounded-tl-none'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-700 text-slate-100 px-3 py-2 rounded-lg rounded-tl-none text-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}
            <div ref={scrollRef} />
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="border-t border-slate-700 p-3 bg-slate-800 rounded-b-lg">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !isLoading) {
                  handleSendMessage();
                }
              }}
              placeholder="Type a message..."
              className="flex-1 h-9 bg-slate-700 border-slate-600 text-white text-sm placeholder-slate-400"
              disabled={isLoading}
            />
            <Button
              onClick={handleSendMessage}
              disabled={isLoading || !input.trim()}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
