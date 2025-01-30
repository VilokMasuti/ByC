'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { TextRevealCard, TextRevealCardTitle } from './ui/text-reveal-card';

export default function UserRegistration({ onNext }: { onNext: () => void }) {
  const [step, setStep] = useState<'register' | 'verify'>('register');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    verificationCode: '',
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (step === 'register') {
      toast({
        className: ' ml-[-3%] ',
        title: 'Verification code sent',
        description: 'Please check your email for the verification code.',
      });
      setStep('verify');
    } else {
      if (formData.verificationCode === '123456') {
        toast({
          className: ' ml-[-3%] ',
          title: 'Email verified successfully!',
          description: 'You can now proceed to the next step.',
        });
        onNext();
      } else {
        toast({
          className: ' ml-[-3%] ',
          title: 'Invalid verification code',
          description: 'Please try again.',
          variant: 'destructive',
        });
      }
    }
  };

  const handleGoogleLogin = () => {
    toast({
      className: ' ml-[-3%] ',
      title: 'Continuing with Google...',
      description: 'This feature is not implemented in this demo.',
    });
    setTimeout(onNext, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent font-['Helvetica_Now_Display'] ">
          Create Account
        </h2>
        <p className="text-zinc-400 text-sm font-['Helvetica_Now_Display'] ">
          Join us to set up your AI chatbot
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {step === 'register' ? (
          <>
            <div className="space-y-2 font-['Helvetica_Now_Display']">
              <Label htmlFor="name" className="text-zinc-400 text-sm">
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Hare Krishna"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600"
              />
            </div>
            <div className="space-y-2 font-['Helvetica_Now_Display']">
              <Label htmlFor="email" className="text-zinc-400 text-sm">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="krishna@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600"
              />
            </div>
            <div className="space-y-2 font-['Helvetica_Now_Display']">
              <Label htmlFor="password" className="text-zinc-400 text-sm">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
                className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600"
              />
            </div>
          </>
        ) : (
          <div className="space-y-4 font-['Helvetica_Now_Display']">
            <TextRevealCard
              text="Your Verification Code ? Come On Hover Me  "
              revealText="123456"
              className="w-full"
            >
              <TextRevealCardTitle className="font-['Helvetica_Now_Display']">
                Sometimes, you just need to see it.
              </TextRevealCardTitle>
            </TextRevealCard>
            <div className="space-y-2 font-['Helvetica_Now_Display']">
              <Label
                htmlFor="verificationCode"
                className="text-zinc-400 text-sm"
              >
                Verification Code
              </Label>
              <Input
                id="verificationCode"
                type="text"
                placeholder="******"
                value={formData.verificationCode}
                onChange={(e) =>
                  setFormData({ ...formData, verificationCode: e.target.value })
                }
                required
                className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600 font-['Helvetica_Now_Display']"
              />
            </div>
          </div>
        )}

        <button
          type="submit"
          className="inline-flex h-10 animate-shimmer w-full items-center justify-center rounded-md border border-zinc-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-zinc-400 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 focus:ring-offset-zinc-50"
        >
          {step === 'register' ? 'Continue' : 'Verify'}
        </button>
      </form>

      {step === 'register' && (
        <>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-zinc-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-zinc-900 px-2 text-zinc-500">
                Or continue with
              </span>
            </div>
          </div>

          <button
            className="inline-flex h-10 animate-shimmer w-full items-center justify-center rounded-md border border-zinc-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-zinc-400 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 focus:ring-offset-zinc-50"
            onClick={handleGoogleLogin}
          >
            <FcGoogle className="mr-2 h-4 w-4" />
            Google
          </button>
        </>
      )}

      {step === 'verify' && (
        <Button
          variant="link"
          className="w-full text-zinc-400 hover:text-white text-sm"
          onClick={() => setStep('register')}
        >
          Back to registration
        </Button>
      )}
    </motion.div>
  );
}
