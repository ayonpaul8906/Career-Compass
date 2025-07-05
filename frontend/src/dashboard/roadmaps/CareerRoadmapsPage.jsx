import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Badge } from '../../components/ui/badge';

const roadmaps = {
  "Data Scientist": {
    description: "Analyze data, build predictive models, and help organizations make data-driven decisions.",
    steps: [
      {
        title: "Learn Foundations",
        items: [
          "Mathematics & Statistics basics",
          "Python or R basics",
          "Intro to SQL"
        ]
      },
      {
        title: "Develop Skills",
        items: [
          "Machine Learning algorithms",
          "Data Visualization tools (Tableau, PowerBI)",
          "Big Data basics (Spark, Hadoop)"
        ]
      },
      {
        title: "Certifications & Projects",
        items: [
          "Complete Kaggle competitions",
          "Build portfolio projects (e.g., prediction models, dashboards)",
          "Get certified in Data Science (e.g., IBM, Coursera)"
        ]
      },
      {
        title: "First Roles",
        items: [
          "Data Analyst",
          "Junior Data Scientist",
          "Business Intelligence Analyst"
        ]
      }
    ]
  },
  "UX Designer": {
    description: "Design user-centered products and improve user experiences through research and design.",
    steps: [
      {
        title: "Learn Design Principles",
        items: [
          "Basics of visual design & typography",
          "User-centered design concepts",
          "Wireframing tools (Figma, Adobe XD)"
        ]
      },
      {
        title: "Build Skills",
        items: [
          "User research methods",
          "Prototyping & usability testing",
          "Design systems and component libraries"
        ]
      },
      {
        title: "Certifications & Portfolio",
        items: [
          "Create portfolio case studies",
          "Participate in design challenges (e.g., Dribbble, Behance)",
          "Earn UX design certifications"
        ]
      },
      {
        title: "First Roles",
        items: [
          "Junior UX Designer",
          "Product Designer",
          "UX Research Assistant"
        ]
      }
    ]
  },
  "Software Engineer": {
    description: "Develop software applications, write code, and solve complex problems using technology.",
    steps: [
      {
        title: "Learn Programming Basics",
        items: [
          "Choose a programming language (Python, JavaScript, Java)",
          "Understand algorithms and data structures",
          "Version control with Git"
        ]
      },
      {
        title: "Develop Skills",
        items: [
          "Web development (HTML, CSS, JavaScript)",
          "Backend development (Node.js, Django, Flask)",
          "Database management (SQL, NoSQL)"
        ]
      },
      {
        title: "Certifications & Projects",
        items: [
          "Contribute to open-source projects",
          "Build personal projects (e.g., web apps, APIs)",
          "Earn software engineering certifications"
        ]
      },
      {
        title: "First Roles",
        items: [
          "Junior Software Engineer",
          "Frontend Developer",
          "Backend Developer"
        ]
      }
    ]
  },
  "Product Manager": {
    description: "Oversee product development, define product vision, and ensure successful product delivery.",
    steps: [
      {
        title: "Learn Product Management Basics",
        items: [
          "Understand product lifecycle",
          "Basics of Agile and Scrum methodologies",
          "Market research and user feedback analysis"
        ]
      },
      {
        title: "Develop Skills",
        items: [
          "Roadmapping and prioritization techniques",
          "Stakeholder management",
          "Data analysis for product decisions"
        ]
      },
      {
        title: "Certifications & Experience",
        items: [
          "Complete product management courses (e.g., General Assembly, Pragmatic Institute)",
          "Work on product-related projects or internships",
          "Earn certifications in product management"
        ]
      },
      {
        title: "First Roles",
        items: [
          "Associate Product Manager",
          "Product Analyst",
          "Product Owner"
        ]
      }
    ]
  },
  "Chartered Accountant": {
    description: "Manage financial records, audits, and tax-related services for organizations.",
    steps: [
      { title: "Academic Preparation", items: ["Commerce background", "Strong Accounting & Business basics"] },
      { title: "Pass Foundation Exams", items: ["CA Foundation course", "Accounting principles", "Business laws"] },
      { title: "Intermediate & Articleship", items: ["CA Intermediate", "Practical training", "Audit & taxation practice"] },
      { title: "Final Exam & License", items: ["Pass CA Final", "Get ICAI membership", "Start practice or join firms"] },
      { title: "First Roles", items: ["Junior Accountant", "Audit Assistant", "Tax Consultant"] }
    ]
  },
  "Graphic Designer": {
    description: "Create visual concepts to communicate ideas that inspire and inform audiences.",
    steps: [
      { title: "Learn Design Tools", items: ["Photoshop", "Illustrator", "Figma or XD"] },
      { title: "Develop Design Skills", items: ["Typography", "Color theory", "Layout & composition"] },
      { title: "Build Portfolio", items: ["Freelance projects", "Personal branding", "Design challenges (Dribbble, Behance)"] },
      { title: "Certifications & Jobs", items: ["Design courses (Coursera, Skillshare)", "Internships", "Junior Designer roles"] }
    ]
  },
  "Psychologist": {
    description: "Help individuals improve mental health through counseling and therapy.",
    steps: [
      { title: "Academic Foundation", items: ["Bachelor’s in Psychology", "Research basics", "Human behavior study"] },
      { title: "Specialization", items: ["Master’s in Clinical, Counseling, or Organizational Psychology", "Field internships"] },
      { title: "Certifications & Licenses", items: ["Licensing exams", "Practicum", "State-specific certifications"] },
      { title: "Build Practice", items: ["Join hospitals or clinics", "Start private practice", "Continue research"] },
      { title: "First Roles", items: ["Assistant Counselor", "Rehabilitation Worker", "Research Assistant"] }
    ]
  },
  "Entrepreneur": {
    description: "Start and run your own business by solving market problems with innovative solutions.",
    steps: [
      { title: "Ideation", items: ["Identify problems", "Validate ideas", "Basic market research"] },
      { title: "Business Planning", items: ["Draft business plan", "Understand finances & legal", "Build minimum viable product (MVP)"] },
      { title: "Launch & Iterate", items: ["Pitch to investors", "Launch product/service", "Collect feedback & improve"] },
      { title: "Grow & Scale", items: ["Marketing strategies", "Build a team", "Expand market reach"] },
      { title: "First Milestones", items: ["Product-market fit", "First revenue", "Early hires"] }
    ]
  }
};

export default function CareerRoadmapsPage() {
  const [selectedCareer, setSelectedCareer] = useState("Data Scientist");

  const roadmap = roadmaps[selectedCareer];

  return (
    <div className="container mx-auto py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white font-headline">Career Roadmaps</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-xl mx-auto">
          Choose a career path to explore a detailed step-by-step guide to achieve your goal.
        </p>
      </div>

      <div className="flex justify-center mb-8">
        <Select value={selectedCareer} onValueChange={setSelectedCareer}>
          <SelectTrigger className="w-[220px] bg-white/10 dark:bg-gray-800 backdrop-blur-md border border-blue-300 dark:border-gray-600 text-gray-900 dark:text-white">
            <SelectValue placeholder="Select Career" className="text-gray-900 dark:text-white" />
          </SelectTrigger>
          <SelectContent className='text-green-50 backdrop-blur-lg'>
            {Object.keys(roadmaps).map((career) => (
              <SelectItem key={career} value={career}>{career}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCareer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg border border-blue-100 dark:border-gray-700 shadow-xl rounded-3xl transition-all">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-blue-600 dark:text-blue-400">{selectedCareer}</CardTitle>
              <p className="text-gray-700 dark:text-gray-300">{roadmap.description}</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {roadmap.steps.map((step, index) => (
                <div key={index}>
                  <Badge variant="outline" className="mb-2 border-blue-400 text-blue-600 dark:text-blue-300 dark:border-blue-600">{step.title}</Badge>
                  <ul className="list-disc list-inside text-gray-800 dark:text-gray-300">
                    {step.items.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
