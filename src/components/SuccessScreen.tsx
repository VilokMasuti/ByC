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
import { useEffect, useRef, useState } from 'react';
import Confetti from 'react-confetti';
import { FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { ShootingStars } from './ui/shooting-stars';
import { StarsBackground } from './ui/stars-background';

export default function SuccessScreen({ onReset }: { onReset: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      setDimensions({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      });
    }
    setIsMobile(window.innerWidth < 640);
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen w-full overflow-hidden relative bg-zinc-950 flex flex-col justify-center items-center p-4"
    >
      <StarsBackground />
      <ShootingStars />
      <Confetti
        width={dimensions.width}
        height={dimensions.height}
        numberOfPieces={isMobile ? 100 : 200}
        recycle={false}
        className="absolute inset-0"
        initialVelocityY={20}
        gravity={0.5}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="shadow-lg border-zinc-800 bg-zinc-900/90 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4">
            <CardTitle className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-zinc-900 bg-clip-text text-transparent font-['Helvetica_Now_Display'] tracking-wider ">
              Integration Successful!
            </CardTitle>
            <CardDescription className="text-lg sm:text-xl text-zinc-400 font-['Helvetica_Now_Display'] ">
              Your chatbot is now ready to use.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              className=" w-full inline-flex h-10 animate-shimmer items-center justify-center rounded-md border border-zinc-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-zinc-400 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 focus:ring-offset-zinc- hover:bg-zinc-800 antialiased font-['Helvetica_Now_Display'] "
              onClick={onReset}
            >
              Explore Admin Panel
            </Button>
            <Button
              className="w-full inline-flex h-10 animate-shimmer items-center justify-center rounded-md border border-zinc-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-zinc-400 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 focus:ring-offset-zinc- hover:bg-zinc-800 antialiased font-['Helvetica_Now_Display']e"
              onClick={onReset}
            >
              Start Talking to Your Chatbot
            </Button>
            <div className="flex justify-center gap-3">
              <Button
                size="icon"
                variant="outline"
                className="text-zinc-400 border-zinc-700 hover:bg-zinc-800 w-10 h-10 sm:w-12 sm:h-12"
              >
                <FaTwitter className="text-lg sm:text-xl" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="text-zinc-400 border-zinc-700 hover:bg-zinc-800 w-10 h-10 sm:w-12 sm:h-12"
              >
                <FaFacebook className="text-lg sm:text-xl" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="text-zinc-400 border-zinc-700 hover:bg-zinc-800 w-10 h-10 sm:w-12 sm:h-12"
              >
                <FaLinkedin className="text-lg sm:text-xl" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
