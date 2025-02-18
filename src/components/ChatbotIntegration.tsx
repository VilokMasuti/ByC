'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { FaCheckCircle, FaCode, FaComments, FaEnvelope } from 'react-icons/fa';
import SuccessScreen from './SuccessScreen';
import TestChatbotPage from './TestChatbotPage';

export default function ChatbotIntegration({ onPrev }: { onPrev: () => void }) {
  const [step, setStep] = useState('options');
  const [integrationStatus, setIntegrationStatus] = useState<
    'success' | 'failure' | null
  >(null);
  const [showTestChatbot, setShowTestChatbot] = useState(false);
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const { toast } = useToast();
  const [developerEmail, setDeveloperEmail] = useState('');

  const testIntegration = () => {
    // Simulate integration test
    setTimeout(() => {
      const success = Math.random() > 0.5;
      setIntegrationStatus(success ? 'success' : 'failure');
    }, 2000);
  };

  const handleFeedbackSubmit = () => {
    toast({
      className: ' ml-[-3%] ',
      title: 'Feedback submitted',
      description: 'Thank you for your feedback!',
    });
    setShowFeedbackDialog(false);
    setFeedbackMessage('');
  };

  const handleSendInstructions = () => {
    if (!developerEmail) {
      toast({
        className: ' ml-[-3%] ',
        title: 'Error',
        description: 'Please enter a valid email address.',
        variant: 'destructive',
      });
      return;
    }

    // Here you would typically send the email to your backend
    console.log('Sending instructions to:', developerEmail);

    toast({
      className: ' ml-[-3%] ',
      title: 'Instructions Sent',
      description: 'Integration instructions have been sent to the developer.',
    });

    setDeveloperEmail('');
  };

  if (showTestChatbot) {
    return <TestChatbotPage onBack={() => setShowTestChatbot(false)} />;
  }

  if (integrationStatus === 'success') {
    return <SuccessScreen onReset={() => setIntegrationStatus(null)} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6 p-4 md:p-6"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-center bg-gradient-to-r from-white to-zinc-900 bg-clip-text text-transparent font-['Helvetica_Now_Display'] antialiased  ">
        Chatbot Integration & Testing
      </h2>
      <AnimatePresence mode="wait">
        {step === 'options' && (
          <motion.div
            key="options"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <button
              className=" w-full  inline-flex h-10 animate-shimmer items-center justify-center rounded-md border border-zinc-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-zinc-400 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 focus:ring-offset-zinc-"
              onClick={() => setShowTestChatbot(true)}
            >
              <FaComments className="mr-2 text-lg md:text-xl" />
              Test Chatbot
            </button>
            <button
              className=" w-full inline-flex h-10 animate-shimmer items-center justify-center rounded-md border border-zinc-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-zinc-400 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 focus:ring-offset-zinc-"
              onClick={() => setStep('integrate')}
            >
              <FaCode className="mr-2 text-lg md:text-xl" />
              Integrate on your website
            </button>
            <button
              className=" w-full inline-flex h-10 animate-shimmer items-center justify-center rounded-md border border-zinc-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-zinc-400 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 focus:ring-offset-zinc-"
              onClick={testIntegration}
            >
              <FaCheckCircle className="mr-2 text-lg md:text-xl" />
              Test Integration
            </button>
          </motion.div>
        )}
        {step === 'integrate' && (
          <motion.div
            key="integrate"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="space-y-4 p-4 md:p-6">
                <div className="space-y-2">
                  <Label className="text-sm md:text-base text-zinc-400 font-['Helvetica_Now_Display']">
                    Copy-paste this code in your website&lsquo;s {'<head>'} tag:
                  </Label>
                  <pre className="bg-zinc-800 p-2 md:p-4 rounded-md text-xs md:text-sm overflow-x-auto text-zinc-300">
                    <code>{`<script src="https://example.com/chatbot.js"></script>`}</code>
                  </pre>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="developerEmail"
                    className="text-sm md:text-base text-zinc-400 font-['Helvetica_Now_Display']"
                  >
                    Or, we can email instructions to your developer:
                  </Label>
                  <Input
                    id="developerEmail"
                    type="email"
                    placeholder="developer@example.com"
                    value={developerEmail}
                    onChange={(e) => setDeveloperEmail(e.target.value)}
                    className="text-sm md:text-base py-2 md:py-6 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                  />
                  <button
                    className="inline-flex h-10 animate-shimmer items-center justify-center rounded-md border border-zinc-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-zinc-400 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 focus:ring-offset-zinc-"
                    onClick={handleSendInstructions}
                  >
                    <FaEnvelope className="mr-2 text-lg md:text-xl font-['Helvetica_Now_Display']" />
                    Send Instructions
                  </button>
                </div>
              </CardContent>
            </Card>
            <button
              className="inline-flex h-10 animate-shimmer items-center justify-center rounded-md border border-zinc-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-zinc-400 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 focus:ring-offset-zinc- hover:bg-zinc-800"
              onClick={() => setStep('options')}
            >
              Back to Options
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      {integrationStatus === 'failure' && (
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="space-y-4 p-4 md:p-6">
            <h3 className="text-lg md:text-xl font-semibold text-white font-['Helvetica_Now_Display']">
              Integration Failed
            </h3>
            <p className="text-sm md:text-base text-zinc-400 font-['Helvetica_Now_Display']">
              We couldn&apos;t detect the chatbot on your website.
            </p>
            <button
              className=" w-full inline-flex h-10 animate-shimmer items-center justify-center rounded-md border border-zinc-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-zinc-400 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 focus:ring-offset-zinc- hover:bg-zinc-800 antialiased font-['Helvetica_Now_Display']"
              onClick={() => setIntegrationStatus(null)}
            >
              Try Again
            </button>
            <button
              className=" w-full inline-flex h-10 animate-shimmer items-center justify-center rounded-md border border-zinc-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-zinc-400 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 focus:ring-offset-zinc- hover:bg-zinc-800 antialiased font-['Helvetica_Now_Display']"
              onClick={() => setShowFeedbackDialog(true)}
            >
              Report an Issue
            </button>
          </CardContent>
        </Card>
      )}
      {step === 'options' && (
        <button
          className=" w-full inline-flex h-10 animate-shimmer items-center justify-center rounded-md border border-zinc-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-zinc-400 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 focus:ring-offset-zinc- hover:bg-zinc-800 antialiased font-['Helvetica_Now_Display'] "
          onClick={onPrev}
        >
          Back to Setup
        </button>
      )}

      <Dialog open={showFeedbackDialog} onOpenChange={setShowFeedbackDialog}>
        <DialogContent className="sm:max-w-[425px] bg-zinc-900 border-zinc-800">
          <DialogHeader>
            <DialogTitle className="text-xl md:text-2xl text-white">
              Share Your Feedback
            </DialogTitle>
            <DialogDescription className="text-sm md:text-base text-zinc-400">
              Let us know what went wrong with the integration process.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Label
              htmlFor="feedback"
              className="text-sm md:text-base text-zinc-400"
            >
              Your Feedback
            </Label>
            <Textarea
              id="feedback"
              value={feedbackMessage}
              onChange={(e) => setFeedbackMessage(e.target.value)}
              placeholder="Describe the issue you encountered..."
              className="h-24 md:h-32 text-sm md:text-base bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
            />
          </div>
          <DialogFooter>
            <Button
              onClick={handleFeedbackSubmit}
              className="w-full text-sm md:text-base py-2 md:py-6 bg-zinc-700 hover:bg-zinc-600 text-white"
            >
              Submit Feedback
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
