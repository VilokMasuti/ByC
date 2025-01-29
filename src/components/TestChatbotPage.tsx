'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { HfInference } from '@huggingface/inference';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiArrowLeft, FiLoader, FiMessageSquare, FiSend } from 'react-icons/fi';

const API_KEY =  process.env.H_API_KEY  // Replace with your actual HF token
const client = new HfInference(API_KEY);

export default function TestChatbotPage({ onBack }: { onBack: () => void }) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<
    { role: 'user' | 'assistant'; content: string }[]
  >([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user' as const, content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await client.chatCompletion({
        model: 'mistralai/Mistral-Nemo-Instruct-2407',
        messages: [...messages, userMessage],
        provider: 'hf-inference',
        max_tokens: 500,
      });

      const aiMessage = {
        role: 'assistant' as const,
        content: response.choices[0]?.message?.content || "I'm not sure.",
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Chatbot API error:', error);
      toast({
        title: 'Error',
        description: 'Failed to get a response. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFeedbackSubmit = () => {
    // Here you would typically send the feedback to your backend
    console.log('Feedback submitted:', feedbackMessage);
    toast({
      title: 'Feedback Submitted',
      description: 'Thank you for your feedback!',
    });
    setShowFeedbackDialog(false);
    setFeedbackMessage('');
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-zinc-950">
      <div className="relative z-10">
        {/* Header Section */}
        <div className="bg-zinc-900 text-white px-4 py-3 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={onBack}
            className="flex items-center space-x-2 text-white hover:text-zinc-300"
          >
            <FiArrowLeft />
            <span>Back</span>
          </Button>

          <Button
            variant="outline"
            onClick={() => setShowFeedbackDialog(true)}
            className="text-white border-zinc-700 hover:bg-zinc-800"
          >
            Share feedback
          </Button>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
              Example Domain
            </h1>
            <p className="text-lg text-zinc-400 mb-4">
              This domain is for use in illustrative examples in documents. You
              may use this domain in literature without prior coordination or
              asking for permission.
            </p>
          </motion.div>
        </div>

        {/* Chat Button and Chatbox */}
        <div className="fixed bottom-4 right-4 z-50">
          {!isChatOpen ? (
            <Button
              size="icon"
              className="rounded-full h-16 w-16 shadow-lg bg-zinc-800 hover:bg-zinc-700 text-white"
              onClick={() => setIsChatOpen(true)}
            >
              <FiMessageSquare size={28} />
            </Button>
          ) : (
            <Card className="w-96 h-[25rem] flex flex-col border-zinc-800 bg-zinc-900">
              <CardHeader>
                <CardTitle className="text-xl text-white">
                  Chat with us
                </CardTitle>
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute top-2 right-2 text-zinc-400 hover:text-white hover:bg-zinc-800"
                  onClick={() => setIsChatOpen(false)}
                >
                  &times;
                </Button>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto p-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`mb-4 ${
                      message.role === 'assistant'
                        ? 'text-zinc-300'
                        : 'text-zinc-400'
                    }`}
                  >
                    <strong>
                      {message.role === 'assistant' ? 'AI: ' : 'You: '}
                    </strong>
                    {message.content}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-center mt-2">
                    <FiLoader
                      className="animate-spin text-zinc-400"
                      size={24}
                    />
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <form onSubmit={handleSubmit} className="flex w-full gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-grow bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-zinc-500 focus:ring-zinc-500"
                    disabled={isLoading}
                  />
                  <Button
                    type="submit"
                    size="icon"
                    className="bg-zinc-700 hover:bg-zinc-600 text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <FiLoader className="animate-spin" />
                    ) : (
                      <FiSend />
                    )}
                  </Button>
                </form>
              </CardFooter>
            </Card>
          )}
        </div>

        {/* Feedback Dialog */}
        <Dialog open={showFeedbackDialog} onOpenChange={setShowFeedbackDialog}>
          <DialogContent className="bg-zinc-900 border-zinc-800">
            <DialogHeader>
              <DialogTitle className="text-white">
                Share Your Feedback
              </DialogTitle>
              <DialogDescription className="text-zinc-400">
                We&apos;d love to hear your thoughts on our chatbot.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Label htmlFor="feedback" className="text-zinc-300">
                Your Feedback
              </Label>
              <Textarea
                id="feedback"
                value={feedbackMessage}
                onChange={(e) => setFeedbackMessage(e.target.value)}
                placeholder="Tell us what you think..."
                className="mt-2 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-zinc-500 focus:ring-zinc-500"
              />
            </div>
            <DialogFooter>
              <Button
                onClick={handleFeedbackSubmit}
                className="bg-zinc-700 hover:bg-zinc-600 text-white"
              >
                Submit Feedback
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
