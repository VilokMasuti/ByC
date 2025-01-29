'use client';

import { Card } from '@/components/ui/card';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import ChatbotIntegration from './ChatbotIntegration';
import SetupOrganization from './SetupOrganization';
import UserRegistration from './UserRegistration';
import { ColourfulText } from './ui/colourful-text';

const steps = [
  'User Registration',
  'Setup Organization',
  'Chatbot Integration',
];

export default function OnboardingProcess() {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl px-4"
      >
        <Card className="backdrop-blur-md bg-zinc-900/50 border-zinc-800 shadow-2xl">
          <div className="p-6 border-b border-zinc-800">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent font-['Helvetica_Now_Display'] ">
                <ColourfulText text="Chat ֎ Boat  " />
              </h1>
              <div className="flex space-x-2">
                {steps.map((step, index) => (
                  <motion.div
                    key={step}
                    className={`w-2 h-2 rounded-full ${
                      index <= currentStep ? 'bg-white' : 'bg-zinc-700'
                    }`}
                    animate={{
                      scale: index === currentStep ? [1, 1.2, 1] : 1,
                    }}
                    transition={{
                      duration: 0.5,
                      repeat:
                        index === currentStep ? Number.POSITIVE_INFINITY : 0,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 2, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.5 }}
              >
                {currentStep === 0 && <UserRegistration onNext={nextStep} />}
                {currentStep === 1 && (
                  <SetupOrganization onNext={nextStep} onPrev={prevStep} />
                )}
                {currentStep === 2 && <ChatbotIntegration onPrev={prevStep} />}
              </motion.div>
            </AnimatePresence>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
