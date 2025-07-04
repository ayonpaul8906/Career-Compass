import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import QuizFlow from '../../components/quiz/QuizFlow';
import { Button } from '../../components/ui/button';
import { motion } from 'framer-motion';
import { Atom, Briefcase, Paintbrush, ArrowLeft } from 'lucide-react';

const streamOptions = {
  science: {
    icon: <Atom className="w-12 h-12 text-blue-600 dark:text-blue-500" />,
    title: 'Science',
    description: 'For those who love to explore, experiment, and understand how the world works.',
  },
  commerce: {
    icon: <Briefcase className="w-12 h-12 text-blue-600 dark:text-blue-500" />,
    title: 'Commerce',
    description: 'For the business-savvy, future entrepreneurs, and financial wizards.',
  },
  arts: {
    icon: <Paintbrush className="w-12 h-12 text-blue-600 dark:text-blue-500" />,
    title: 'Arts & Humanities',
    description: 'For creative minds, storytellers, and cultural explorers.',
  },
};

export default function QuizPage() {
  const [selectedStream, setSelectedStream] = useState(null);

  if (selectedStream) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500 flex flex-col items-center justify-center px-4">
        <Button variant="ghost" onClick={() => setSelectedStream(null)} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to stream selection
        </Button>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-3xl"
        >
          <Card className="glassmorphic backdrop-blur-lg border border-blue-100/30 dark:border-blue-800/30 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold font-headline text-gray-900 dark:text-white">
                Career Interest Quiz: {streamOptions[selectedStream].title}
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Answer a few questions to discover career paths tailored to your interests and skills.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <QuizFlow stream={selectedStream} />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500 flex flex-col items-center justify-center px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tight font-headline text-gray-900 dark:text-white">First, choose your academic stream</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-2xl mx-auto">Select the stream you are currently in or interested in pursuing to get a personalized quiz.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8 w-full max-w-5xl">
        {Object.keys(streamOptions).map((stream, index) => (
          <motion.div
            key={stream}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            whileHover={{ y: -5, scale: 1.03 }}
            className="h-full"
          >
            <Card
              onClick={() => setSelectedStream(stream)}
              className="text-center p-6 cursor-pointer flex flex-col items-center justify-between h-full glassmorphic hover:shadow-xl transition-all"
            >
              <div>
                <div className="mb-4 flex justify-center">
                  {streamOptions[stream].icon}
                </div>
                <h2 className="text-xl font-bold font-headline mb-2 text-gray-900 dark:text-white">{streamOptions[stream].title}</h2>
                <p className="text-gray-600 dark:text-gray-300">{streamOptions[stream].description}</p>
              </div>
              <Button className="mt-6 w-full">Select</Button>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
