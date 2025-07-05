import OpportunityList from '../../components/opportunities/OpportunityList';
// import OpportunityList from '../../assets/';

const opportunities = [
  {
    title: 'Software Engineer Intern',
    company: 'Tech Solutions Inc.',
    type: 'Internship',
    department: 'Technical',
    location: 'Remote',
    tags: ['Software', 'Engineering', 'Frontend'],
    image: '/Software_Engineer.png',
    imageHint: 'code laptop',
  },
  {
    title: 'UX/UI Design Workshop',
    company: 'DesignHub',
    type: 'Workshop',
    department: 'Design',
    location: 'New York, NY',
    tags: ['Design', 'UX', 'UI'],
    image: '/ui_ux.png',
    imageHint: 'design wireframe',
  },
  {
    title: 'Data Science Hackathon',
    company: 'DataFest',
    type: 'Hackathon',
    department: 'Technical',
    location: 'San Francisco, CA',
    tags: ['Data Science', 'Machine Learning', 'AI'],
    image: '/Data_Science.png',
    imageHint: 'data chart',
  },
  {
    title: 'Product Management Bootcamp',
    company: 'Product School',
    type: 'Workshop',
    department: 'Business',
    location: 'Remote',
    tags: ['Product', 'Management', 'Business'],
    image: '/Product_Management.png',
    imageHint: 'team meeting',
  },
  {
    title: 'Frontend Developer Intern',
    company: 'Web Weavers',
    type: 'Internship',
    department: 'Technical',
    location: 'Austin, TX',
    tags: ['Software', 'Frontend', 'React'],
    image: '/Frontend_Developer.png',
    imageHint: 'web design',
  },
  {
    title: 'Cloud Computing Challenge',
    company: 'CloudWorks',
    type: 'Hackathon',
    department: 'Technical',
    location: 'Remote',
    tags: ['Cloud', 'DevOps', 'AWS'],
    image: '/Cloud_Computing.png',
    imageHint: 'server room',
  },
  {
    title: 'Financial Analyst Workshop',
    company: 'FinancePro',
    type: 'Workshop',
    department: 'Finance',
    location: 'Chicago, IL',
    tags: ['Finance', 'Analysis', 'Investment'],
    image: '/Financial_Analyst.png',
    imageHint: 'finance chart',
  },
  {
    title: 'Healthcare Innovation Hackathon',
    company: 'MediFuture',
    type: 'Hackathon',
    department: 'Medical',
    location: 'Boston, MA',
    tags: ['Healthcare', 'Innovation', 'Tech'],
    image: '/Healthcare_Innovation.png',
    imageHint: 'medical tech',
  },
  {
    title: 'Marketing Strategy Bootcamp',
    company: 'MarketGenius',
    type: 'Workshop',
    department: 'Business',
    location: 'Remote',
    tags: ['Marketing', 'Strategy', 'Growth'],
    image: '/Marketing_Strategy.png',
    imageHint: 'marketing plan',
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
          Find the perfect opportunity to kickstart your career. Filter by department, type, location, and skills.
        </p>
      </div>
      <OpportunityList opportunities={opportunities} />
    </div>
  );
}
