import OpportunityList from '../../components/opportunities/OpportunityList';

const opportunities = [
  {
    title: 'Software Engineer Intern',
    company: 'Tech Solutions Inc.',
    type: 'Internship',
    location: 'Remote',
    tags: ['Software', 'Engineering', 'Frontend'],
    image: 'https://placehold.co/600x400.png',
    imageHint: 'code laptop',
  },
  {
    title: 'UX/UI Design Workshop',
    company: 'DesignHub',
    type: 'Workshop',
    location: 'New York, NY',
    tags: ['Design', 'UX', 'UI'],
    image: 'https://placehold.co/600x400.png',
    imageHint: 'design wireframe',
  },
  {
    title: 'Data Science Hackathon',
    company: 'DataFest',
    type: 'Hackathon',
    location: 'San Francisco, CA',
    tags: ['Data Science', 'Machine Learning', 'AI'],
    image: 'https://placehold.co/600x400.png',
    imageHint: 'data chart',
  },
  {
    title: 'Product Management Bootcamp',
    company: 'Product School',
    type: 'Workshop',
    location: 'Remote',
    tags: ['Product', 'Management', 'Business'],
    image: 'https://placehold.co/600x400.png',
    imageHint: 'team meeting',
  },
  {
    title: 'Frontend Developer Intern',
    company: 'Web Weavers',
    type: 'Internship',
    location: 'Austin, TX',
    tags: ['Software', 'Frontend', 'React'],
    image: 'https://placehold.co/600x400.png',
    imageHint: 'web design',
  },
  {
    title: 'Cloud Computing Challenge',
    company: 'CloudWorks',
    type: 'Hackathon',
    location: 'Remote',
    tags: ['Cloud', 'DevOps', 'AWS'],
    image: 'https://placehold.co/600x400.png',
    imageHint: 'server room',
  },
];

export default function OpportunitiesPage() {
  return (
    <div className="container mx-auto py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight font-headline text-gray-900 dark:text-white">
          Explore Opportunities
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-2xl mx-auto">
          Find the perfect opportunity to kickstart your career. Filter by type, location, and skills.
        </p>
      </div>
      <OpportunityList opportunities={opportunities} />
    </div>
  );
}
