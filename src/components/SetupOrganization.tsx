// app/components/SetupOrganization.tsx
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
      setTimeout(() => {
        setFormData((prev) => ({
          ...prev,
          companyDescription:
            'This is an auto-fetched meta description for the company website.',
        }));
        setIsLoading(false);
        toast({
          className: ' ml-[-3%] ',
          title: 'Meta description fetched successfully!',
        });
      }, 1500);
    }
  }, [formData.companyUrl, toast]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scraped':
        return <FiCheck className="text-green-400 shrink-0" size={18} />;
      case 'pending':
        return <FiClock className="text-yellow-400 shrink-0" size={18} />;
      case 'detected':
        return <FiAlertCircle className="text-blue-400 shrink-0" size={18} />;
      default:
        return null;
    }
  };

  const handleFinishTraining = () => {
    setIsChatbotTraining(false);
    toast({
      className: ' ml-[-3%] ',
      title: 'Chatbot Training Complete',
      description: 'Your chatbot is now ready to use.',
    });
  };

  return (
    <div className="relative min-h-screen overflow-hidden  ">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="space-y-6 relative z-10 p-4 sm:p-6"
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="companyName"
              className="text-sm sm:text-base text-zinc-300 font-['Helvetica_Now_Display']"
            >
              Company Name
            </Label>
            <Input
              id="companyName"
              placeholder="Enter your company name"
              value={formData.companyName}
              onChange={(e) =>
                setFormData({ ...formData, companyName: e.target.value })
              }
              className="h-10 sm:h-12 text-sm sm:text-base bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-zinc-500"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="companyUrl"
              className="text-sm sm:text-base text-zinc-300font-['Helvetica_Now_Display']"
            >
              Company Website URL
            </Label>
            <Input
              id="companyUrl"
              placeholder="https://example.com"
              value={formData.companyUrl}
              onChange={(e) =>
                setFormData({ ...formData, companyUrl: e.target.value })
              }
              className="h-10 sm:h-12 text-sm sm:text-base bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-zinc-500"
              inputMode="url"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="companyDescription"
              className="text-sm sm:text-base text-zinc-300 font-['Helvetica_Now_Display']"
            >
              Company Description
            </Label>
            <Textarea
              id="companyDescription"
              placeholder="Describe your company"
              value={formData.companyDescription}
              onChange={(e) =>
                setFormData({ ...formData, companyDescription: e.target.value })
              }
              className="min-h-[100px] sm:min-h-[120px] text-sm sm:text-base bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-zinc-500"
            />
            {isLoading && (
              <p className="text-sm text-zinc-400 font-['Helvetica_Now_Display']">
                Fetching meta description...
              </p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl font-semibold text-zinc-300 font-['Helvetica_Now_Display']">
            Detected Webpages
          </h3>
          <div className="grid grid-cols-1 gap-3 sm:gap-4">
            {dummyWebpages.map((page) => (
              <Card
                key={page.url}
                className={`cursor-pointer transition-all bg-zinc-800 border-zinc-700 ${
                  selectedPage?.url === page.url
                    ? 'ring-1 sm:ring-2 ring-zinc-500'
                    : ''
                }`}
                onClick={() => setSelectedPage(page)}
              >
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm sm:text-base font-mediumfont-['Helvetica_Now_Display'] text-zinc-300 truncate">
                      {page.url}
                    </p>
                    {getStatusIcon(page.status)}
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-400 capitalize mt-1 font-['Helvetica_Now_Display']">
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
            <h3 className="text-lg sm:text-xl font-semibold text-zinc-300 font-['Helvetica_Now_Display'] ">
              Scraped Data from {selectedPage.url}
            </h3>
            <div className="space-y-2">
              {selectedPage.chunks.map((chunk, index) => (
                <Card key={index} className="bg-zinc-800 border-zinc-700">
                  <CardContent className="p-3 sm:p-4">
                    <p className="text-sm sm:text-base text-zinc-300 font-['Helvetica_Now_Display']">
                      {chunk}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl font-semibold text-zinc-300 font-['Helvetica_Now_Display']">
            Chatbot Training
          </h3>
          {isChatbotTraining ? (
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="w-5 h-5 sm:w-6 sm:h-6 border-t-2 border-blue-500 rounded-full animate-spin font-['Helvetica_Now_Display']" />
              <p className="text-sm sm:text-base text-zinc-300">
                Training in progress...
              </p>
            </div>
          ) : (
            <p className="text-green-400 text-sm sm:text-base font-['Helvetica_Now_Display']">
              Training complete!
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Button
              onClick={handleFinishTraining}
              className="w-full sm:w-auto text-sm sm:text-base py-2 px-4 bg-blue-500 hover:bg-blue-700"
              disabled={!isChatbotTraining}
            >
              Finish Training
            </Button>
            <button
              onClick={onNext}
              className=" inline-flex h-10 animate-shimmer items-center justify-center rounded-md border border-zinc-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-zinc-400 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 focus:ring-offset-zinc- hover:bg-zinc-800 antialiased font-['Helvetica_Now_Display']"
            >
              Continue Setup
            </button>
          </div>
        </div>

        <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 sm:justify-between">
          <button
            onClick={onPrev}
            className=" inline-flex h-10 animate-shimmer items-center justify-center rounded-md border border-zinc-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-zinc-400 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 focus:ring-offset-zinc- hover:bg-zinc-800 antialiased font-['Helvetica_Now_Display']"
          >
            Back
          </button>
          <Button
            onClick={onNext}
            className="w-full sm:w-auto text-sm sm:text-base py-2 px-4 bg-zinc-900 hover:bg-zinc-900 animate-aurora duration-1000 font-['Helvetica_Now_Display'"
            disabled={isChatbotTraining}
          >
            {isChatbotTraining ? 'Please wait...' : 'Continue'}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
