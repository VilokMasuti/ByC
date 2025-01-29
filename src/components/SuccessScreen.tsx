'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa';

export default function SuccessScreen({ onReset }: { onReset: () => void }) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center relative bg-zinc-950">
      <Confetti />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md shadow-lg border-zinc-800 bg-zinc-900">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
              Integration Successful!
            </CardTitle>
            <CardDescription className="text-xl text-zinc-400">
              Your chatbot is now ready to use.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              className="w-full text-base py-6 bg-zinc-800 hover:bg-zinc-700 text-white"
              onClick={onReset}
            >
              Explore Admin Panel
            </Button>
            <Button
              className="w-full text-base py-6 bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700"
              onClick={onReset}
            >
              Start Talking to Your Chatbot
            </Button>
            <div className="flex justify-center space-x-4">
              <Button
                size="icon"
                variant="outline"
                className="text-zinc-400 border-zinc-700 hover:bg-zinc-800"
              >
                <FaTwitter size={24} />
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="text-zinc-400 border-zinc-700 hover:bg-zinc-800"
              >
                <FaFacebook size={24} />
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="text-zinc-400 border-zinc-700 hover:bg-zinc-800"
              >
                <FaLinkedin size={24} />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
