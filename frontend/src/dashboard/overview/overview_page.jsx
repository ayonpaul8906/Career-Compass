import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { ArrowRight, Lightbulb, Briefcase, FolderKanban, Bot } from 'lucide-react';

export default function OverviewPage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className="space-y-2 mb-10">
        <h1 className="text-3xl font-bold tracking-tight font-headline text-gray-900 dark:text-white">
          Welcome to your Dashboard!
        </h1>
        <p className="text-gray-600 dark:text-gray-400">Here's a quick overview of what you can do.</p>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        <FeatureCard
          title="Start with the Quiz"
          description="Take our interest quiz to get personalized career recommendations tailored to your strengths."
          href="/dashboard/quiz"
          icon={<Lightbulb className="w-6 h-6 text-blue-600 dark:text-blue-500" />}
          cta="Take the Quiz"
        />
        <FeatureCard
          title="Explore Opportunities"
          description="Discover internships, workshops, and events to grow your skills and network."
          href="/dashboard/opportunity"
          icon={<Briefcase className="w-6 h-6 text-blue-600 dark:text-blue-500" />}
          cta="Browse Now"
        />
        <FeatureCard
          title="See Peer Projects"
          description="Get inspired by what others are building and share your own work with the community."
          href="/dashboard/projects"
          icon={<FolderKanban className="w-6 h-6 text-blue-600 dark:text-blue-500" />}
          cta="View Gallery"
        />
        <FeatureCard
          title="Chat with your AI Mentor"
          description="Get instant guidance, resume feedback, and professional advice from your AI mentor."
          href="/dashboard/chatbot"
          icon={<Bot className="w-6 h-6 text-blue-600 dark:text-blue-500" />}
          cta="Start Chatting"
        />
      </div>
    </div>
  );
}

function FeatureCard({ title, description, href, icon, cta }) {
  return (
    <Card className="relative overflow-hidden rounded-xl border bg-white/70 dark:bg-white/5 backdrop-blur-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:border-blue-500">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-700/10 opacity-30 pointer-events-none" />
      <CardHeader className="flex flex-row items-center gap-4 relative z-10">
        <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-800">
          {icon}
        </div>
        <CardTitle className="text-gray-900 dark:text-white font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="relative z-10">
        <CardDescription className="text-gray-600 dark:text-gray-300">{description}</CardDescription>
        <Button
          asChild
          size="sm"
          variant="outline"
          className="mt-4 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-800 transition-all duration-300 font-medium"
        >
          <Link to={href}>
            {cta} <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
