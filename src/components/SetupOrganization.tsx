'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FiAlertCircle, FiCheck, FiClock } from 'react-icons/fi';
import { ShootingStars } from './ui/shooting-stars';
import { StarsBackground } from './ui/stars-background';

const dummyWebpages = [
  {
    url: '/home',
    status: 'scraped',
    chunks: ['Welcome to our company', 'We provide innovative solutions'],
  },
  {
    url: '/about',
    status: 'scraped',
    chunks: ['Our mission is to transform businesses', 'Founded in 2020'],
  },
  { url: '/products', status: 'pending', chunks: [] },
  { url: '/contact', status: 'detected', chunks: [] },
];

export default function SetupOrganization({
  onNext,
  onPrev,
}: {
  onNext: () => void;
  onPrev: () => void;
}) {
  const [formData, setFormData] = useState({
    companyName: '',
    companyUrl: '',
    companyDescription: '',
  });
  const [selectedPage, setSelectedPage] = useState<
    (typeof dummyWebpages)[0] | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isChatbotTraining, setIsChatbotTraining] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (formData.companyUrl && formData.companyUrl.includes('.')) {
      setIsLoading(true);
      // Simulate fetching meta description
      setTimeout(() => {
        setFormData((prev) => ({
          ...prev,
          companyDescription:
            'This is an auto-fetched meta description for the company website.',
        }));
        setIsLoading(false);
        toast({
          title: 'Meta description fetched successfully!',
        });
      }, 1500);
    }
  }, [formData.companyUrl, toast]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scraped':
        return <FiCheck className="text-green-400" />;
      case 'pending':
        return <FiClock className="text-yellow-400" />;
      case 'detected':
        return <FiAlertCircle className="text-blue-400" />;
      default:
        return null;
    }
  };

  const handleFinishTraining = () => {
    setIsChatbotTraining(false);
    toast({
      title: 'Chatbot Training Complete',
      description: 'Your chatbot is now ready to use.',
    });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-zinc-950">
      <StarsBackground />
      <ShootingStars />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="space-y-6 relative z-10 p-6"
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="companyName" className="text-zinc-300">
              Company Name
            </Label>
            <Input
              id="companyName"
              placeholder="Enter your company name"
              value={formData.companyName}
              onChange={(e) =>
                setFormData({ ...formData, companyName: e.target.value })
              }
              className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-zinc-500 focus:ring-zinc-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="companyUrl" className="text-zinc-300">
              Company Website URL
            </Label>
            <Input
              id="companyUrl"
              placeholder="https://example.com"
              value={formData.companyUrl}
              onChange={(e) =>
                setFormData({ ...formData, companyUrl: e.target.value })
              }
              className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-zinc-500 focus:ring-zinc-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="companyDescription" className="text-zinc-300">
              Company Description
            </Label>
            <Textarea
              id="companyDescription"
              placeholder="Describe your company"
              value={formData.companyDescription}
              onChange={(e) =>
                setFormData({ ...formData, companyDescription: e.target.value })
              }
              className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-zinc-500 focus:ring-zinc-500"
            />
            {isLoading && (
              <p className="text-sm text-zinc-400">
                Fetching meta description...
              </p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-zinc-300">
            Detected Webpages
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dummyWebpages.map((page) => (
              <Card
                key={page.url}
                className={`cursor-pointer transition-all duration-300 bg-zinc-800 border-zinc-700 ${
                  selectedPage?.url === page.url ? 'ring-2 ring-zinc-500' : ''
                }`}
                onClick={() => setSelectedPage(page)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-zinc-300">{page.url}</p>
                    {getStatusIcon(page.status)}
                  </div>
                  <p className="text-sm text-zinc-400 capitalize mt-2">
                    {page.status}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {selectedPage && selectedPage.chunks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold text-zinc-300">
              Scraped Data from {selectedPage.url}
            </h3>
            <div className="space-y-2">
              {selectedPage.chunks.map((chunk, index) => (
                <Card key={index} className="bg-zinc-800 border-zinc-700">
                  <CardContent className="p-4">
                    <p className="text-zinc-300">{chunk}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-zinc-300">
            Chatbot Training
          </h3>
          {isChatbotTraining ? (
            <div className="flex items-center space-x-4">
              <div className="w-6 h-6 border-t-2 border-blue-500 rounded-full animate-spin"></div>
              <p className="text-zinc-300">Training in progress...</p>
            </div>
          ) : (
            <p className="text-green-400">Training complete!</p>
          )}
          <div className="flex space-x-4">
            <Button
              onClick={handleFinishTraining}
              className="bg-blue-600 hover:bg-blue-700 text-white"
              disabled={!isChatbotTraining}
            >
              Finish Training
            </Button>
            <Button
              onClick={onNext}
              className="bg-zinc-700 hover:bg-zinc-600 text-white"
            >
              Continue Setup
            </Button>
          </div>
        </div>

        <div className="flex justify-between">
          <Button
            onClick={onPrev}
            variant="outline"
            className="text-zinc-300 border-zinc-700 hover:bg-zinc-800"
          >
            Back
          </Button>
          <Button
            onClick={onNext}
            className="bg-zinc-700 hover:bg-zinc-600 text-white"
            disabled={isChatbotTraining}
          >
            {isChatbotTraining ? 'Please wait...' : 'Continue'}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
