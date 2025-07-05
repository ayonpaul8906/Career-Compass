import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Compass, Lightbulb, Briefcase, Bot } from 'lucide-react';
import Header from '../components/shared/Header';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
      <Header />
      <main className="flex-grow">
        <section className="w-full py-16 md:py-32 lg:py-40 xl:py-48 relative overflow-hidden">
          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-6">
                <div className="space-y-4">
                  <h1 className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl font-headline text-gray-900 dark:text-white animate-fade-in-up">
                    Find Your Career Path with <span className="text-blue-600 dark:text-blue-500">Career Compass</span>
                  </h1>
                  <p className="max-w-[600px] text-gray-700 dark:text-gray-300 md:text-xl animate-fade-in-up">
                    Discover your interests, explore opportunities, and get AI-powered guidance to navigate your professional journey.
                  </p>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row animate-fade-in-up">
                  <Button asChild size="lg" className="font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300">
                    <Link to="/register">Get Started</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="font-semibold border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-800 transition-all duration-300">
                    <Link to="/login">Sign In</Link>
                  </Button>
                </div>
              </div>
              <img
                src="/career.png"
                alt="Hero"
                className="mx-auto rounded-xl shadow-2xl object-cover w-full h-auto lg:order-last animate-fade-in"
              />
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-16 md:py-24 lg:py-32 bg-white dark:bg-gray-900 transition-colors duration-500">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <div className="inline-block rounded-full bg-blue-100 dark:bg-blue-900 px-4 py-1 text-sm font-medium text-white dark:text-blue-300">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-5xl font-headline text-gray-900 dark:text-white">Navigate Your Future</h2>
                <p className="max-w-[900px] text-gray-600 dark:text-gray-400 md:text-xl/relaxed">
                  Our tools are designed to provide clarity and direction for students and young professionals.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-2 xl:grid-cols-2">
              <FeatureCard
                icon={<Lightbulb className="w-8 h-8 text-blue-600 dark:text-blue-500" />}
                title="Interest Quiz"
                description="Take our interactive quiz to pinpoint your career interests and discover matching paths."
              />
              <FeatureCard
                icon={<Briefcase className="w-8 h-8 text-blue-600 dark:text-blue-500" />}
                title="Opportunity Showcase"
                description="Browse a curated list of local internships, workshops, and events to gain real-world experience."
              />
              <FeatureCard
                icon={<Bot className="w-8 h-8 text-blue-600 dark:text-blue-500" />}
                title="AI Career Mentor"
                description="Chat with our AI-powered mentor for personalized advice, resume tips, and interview practice."
              />
              <FeatureCard
                icon={<Compass className="w-8 h-8 text-blue-600 dark:text-blue-500" />}
                title="Peer Project Gallery"
                description="Get inspired by projects from your peers and showcase your own work to the community."
              />
            </div>
          </div>
        </section>
      </main>
      <footer className="flex items-center justify-center h-16 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
        <p className="text-sm text-gray-500 dark:text-gray-400">&copy; 2024 Career Compass. All rights reserved.</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <Card
      className="relative overflow-hidden rounded-xl border bg-white/70 dark:bg-white/5 backdrop-blur-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:border-blue-500"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-700/10 opacity-30 pointer-events-none" />
      <CardHeader className="flex flex-row items-center gap-4 z-10 relative">
        <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-800">
          {icon}
        </div>
        <CardTitle className="text-gray-900 dark:text-white font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="z-10 relative">
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </CardContent>
    </Card>
  );
}

