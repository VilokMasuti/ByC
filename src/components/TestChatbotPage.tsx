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
import { ShootingStars } from './ui/shooting-stars';
import { StarsBackground } from './ui/stars-background';

const client = new HfInference('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'); // Replace with your HF token

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
      <StarsBackground />
      <ShootingStars />
      <div className="relative z-10">
        {/* Header Section */}
        <div className="bg-zinc-900 text-white px-4 py-3 flex items-center justify-between">
          <button
            onClick={onBack}
            className=" inline-flex h-10 animate-shimmer items-center justify-center rounded-md border border-zinc-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-zinc-400 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 focus:ring-offset-zinc- "
          >
            <FiArrowLeft />
            <span className="hidden sm:inline">Back</span>
          </button>

          <button
            onClick={() => setShowFeedbackDialog(true)}
            className="inline-flex h-10 animate-shimmer items-center justify-center rounded-md border border-zinc-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-zinc-400 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 focus:ring-offset-zinc-5"
          >
            Feedback
          </button>
        </div>

        {/* Main Content */}
        <div className="sm:max-w-7xl mx-auto px-4 py-6 sm:py-12 min-w-full ">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1
              className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white to-zinc-900 bg-clip-text text-transparent
             font-['Helvetica_Now_Display'  "
            >
              Example Domain
            </h1>
            <p className="text-sm sm:text-lg text-zinc-400 mb-4 font-['Helvetica_Now_Display'  ">
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
              className="rounded-full h-12 w-12 sm:h-16 sm:w-16 shadow-lg bg-zinc-800 hover:bg-zinc-700 text-white"
              onClick={() => setIsChatOpen(true)}
            >
              <FiMessageSquare size={24} />
            </Button>
          ) : (
            <Card className="w-[240px] sm:w-96 h-[23rem] flex flex-col border-zinc-800 bg-zinc-900">
              <CardHeader>
                <CardTitle
                  className="text-lg sm:text-xl text-white
                font-['Helvetica_Now_Display']
                "
                >
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
          <DialogContent className="bg-zinc-900 border-zinc-800 w-[90vw] max-w-[425px]">
            <DialogHeader>
              <DialogTitle
                className="text-xl sm:text-2xl text-white
               font-['Helvetica_Now_Display']
              "
              >
                Share Your Feedback
              </DialogTitle>
              <DialogDescription
                className="text-sm sm:text-base text-zinc-900
               font-['Helvetica_Now_Display']
              "
              >
                We&apos;d love to hear your thoughts on our chatbot.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Label
                htmlFor="feedback"
                className="text-sm sm:text-base text-zinc-300"
              >
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
              <button
                onClick={handleFeedbackSubmit}
                className="inline-flex h-10 animate-shimmer w-full items-center justify-center rounded-md border border-zinc-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-zinc-400 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 focus:ring-offset-zinc-5"
              >
                Submit Feedback
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
