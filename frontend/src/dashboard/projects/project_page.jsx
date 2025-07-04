import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Badge } from '../../components/ui/badge';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';

const projects = [
  {
    title: 'AI-Powered Fitness Planner',
    author: 'Jane Doe',
    avatar: 'https://placehold.co/40x40.png',
    image: 'https://placehold.co/600x400.png',
    skills: ['React Native', 'Firebase', 'Python', 'AI'],
  },
  {
    title: 'Sustainable Recipe Finder',
    author: 'John Smith',
    avatar: 'https://placehold.co/40x40.png',
    image: 'https://placehold.co/600x400.png',
    skills: ['Next.js', 'Supabase', 'Web Scraping'],
  },
  {
    title: 'Community Art Platform',
    author: 'Alex Ray',
    avatar: 'https://placehold.co/40x40.png',
    image: 'https://placehold.co/600x400.png',
    skills: ['Vue.js', 'MongoDB', 'UI/UX Design'],
  },
  {
    title: 'Personal Finance Tracker',
    author: 'Emily White',
    avatar: 'https://placehold.co/40x40.png',
    image: 'https://placehold.co/600x400.png',
    skills: ['Flutter', 'SQL', 'Data Visualization'],
  },
];

export default function ProjectsPage() {
  return (
    <div className="container mx-auto">
      <div className="space-y-2 mb-8 text-center">
        <h1 className="text-3xl text-white font-bold tracking-tight font-headline">Peer Project Gallery</h1>
        <p className="text-muted-foreground text-white max-w-2xl mx-auto">Get inspired by projects built by members of the Career Compass community.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Tilt
              tiltMaxAngleX={15}
              tiltMaxAngleY={15}
              perspective={1000}
              scale={1.05}
              transitionSpeed={400}
              gyroscope={true}
            >
              <Card className="flex flex-col overflow-hidden rounded-3xl bg-white/70 dark:bg-white/5 backdrop-blur-2xl border border-blue-100 dark:border-gray-700 shadow-xl hover:shadow-blue-500/30 transition-all duration-500 transform">
                <CardHeader className="p-0">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover rounded-t-3xl"
                  />
                </CardHeader>
                <CardContent className="p-6 flex-grow flex flex-col">
                  <CardTitle className="text-xl font-bold font-headline mb-2">{project.title}</CardTitle>
                  <div className="flex items-center gap-2 mb-4">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={project.avatar} alt={project.author} />
                      <AvatarFallback>{project.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{project.author}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.skills.map(skill => (
                      <Badge key={skill} variant="outline" className="border-blue-300 dark:border-blue-700">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="p-6">
                  <button className="w-full py-2 rounded-md bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold shadow-md transition-all duration-300">
                    View Project
                  </button>
                </CardFooter>
              </Card>
            </Tilt>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
