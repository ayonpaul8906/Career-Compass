import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Input } from '../ui/input';
import { MapPin, X } from 'lucide-react';
import { motion } from 'framer-motion';

export default function OpportunityList({ opportunities }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [deptFilter, setDeptFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('title-asc');
  const [openDetailsIndex, setOpenDetailsIndex] = useState(null);

  // extend departments as needed
  const allDepartments = ['all', 'Technical', 'Finance', 'Design', 'Science', 'Business'];

  const allTypes = useMemo(() => ['all', ...Array.from(new Set(opportunities.map(op => op.type)))], [opportunities]);

  const filteredAndSortedOpportunities = useMemo(() => {
    return opportunities
      .filter(op => {
        const matchesSearch =
          op.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          op.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          op.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesType = typeFilter === 'all' || op.type === typeFilter;
        const matchesDept = deptFilter === 'all' || (op.department && op.department === deptFilter);
        return matchesSearch && matchesType && matchesDept;
      })
      .sort((a, b) => {
        if (sortOrder === 'title-asc') return a.title.localeCompare(b.title);
        if (sortOrder === 'title-desc') return b.title.localeCompare(a.title);
        return 0;
      });
  }, [opportunities, searchTerm, typeFilter, deptFilter, sortOrder]);

  return (
    <div>
      {/* Filter bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 p-4 rounded-xl bg-gradient-to-br from-blue-900/30 to-blue-800/20 border border-blue-500 shadow-md">
        <Input
          placeholder="Search by title, company, or skill..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:flex-1 text-white placeholder:text-gray-300 bg-gray-900 border-gray-700 focus:border-blue-500"
        />
        <div className="flex gap-4">
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full md:w-[120px] text-white bg-gray-900 border-gray-700">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent className='text-white backdrop-blur-lg'>
              {allTypes.map(type => (
                <SelectItem key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={deptFilter} onValueChange={setDeptFilter} >
            <SelectTrigger className="w-full md:w-[150px] text-white bg-gray-900 border-gray-700">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent className='text-white backdrop-blur-lg'>
              {allDepartments.map(dept => (
                <SelectItem key={dept} value={dept}>{dept}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger className="w-full md:w-[140px] text-white bg-gray-900 border-gray-700">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent className='text-white backdrop-blur-lg'>
              <SelectItem value="title-asc">Title (A-Z)</SelectItem>
              <SelectItem value="title-desc">Title (Z-A)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredAndSortedOpportunities.map((op, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
            className="relative"
          >
            <Card className="flex flex-col overflow-hidden rounded-3xl bg-gray-900/60 backdrop-blur border border-blue-700 shadow-md hover:shadow-blue-500/30 transition-all duration-500">
              <CardHeader className="p-0">
                <img
                  src={op.image}
                  alt={op.title}
                  data-ai-hint={op.imageHint}
                  className="w-full h-48 object-cover rounded-t-3xl"
                />
              </CardHeader>
              <CardContent className="p-6 flex-grow">
                <Badge variant="secondary" className="mb-2 bg-blue-600/20 text-blue-400 border border-blue-500">
                  {op.type}
                </Badge>
                <CardTitle className="text-xl font-bold text-white mb-1">{op.title}</CardTitle>
                <CardDescription className="text-gray-300">{op.company}</CardDescription>
                <div className="flex items-center text-sm text-gray-400 mt-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  {op.location}
                </div>
              </CardContent>
              <CardFooter className="p-6 flex flex-col items-start">
                <div className="flex flex-wrap gap-2 mb-4">
                  {op.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="border-blue-400 text-blue-300 bg-blue-500/10">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button
                  onClick={() => setOpenDetailsIndex(openDetailsIndex === index ? null : index)}
                  className="w-full font-semibold bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white transition-all duration-300 shadow-md"
                >
                  {openDetailsIndex === index ? 'Hide Details' : 'View Details'}
                </Button>
              </CardFooter>

              {/* Details overlay */}
              {openDetailsIndex === index && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute top-0 left-0 w-full h-full bg-black/80 backdrop-blur-lg p-6 flex flex-col text-white rounded-3xl"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-bold">Details</h3>
                    <button onClick={() => setOpenDetailsIndex(null)} className="text-gray-300 hover:text-white">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <ul className="list-disc list-inside space-y-2 text-sm text-gray-300">
                    <li>Gain hands-on industry experience.</li>
                    <li>Work under experienced mentors.</li>
                    <li>Opportunity to network with professionals.</li>
                    <li>Enhance your technical & soft skills.</li>
                    <li>Potential for future full-time offers.</li>
                  </ul>
                </motion.div>
              )}
            </Card>
          </motion.div>
        ))}
        {filteredAndSortedOpportunities.length === 0 && (
          <div className="md:col-span-2 lg:col-span-3 text-center py-20">
            <p className="text-gray-400 text-lg">No opportunities match your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
