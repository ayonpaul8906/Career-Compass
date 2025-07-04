import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Input } from '../ui/input';
import { MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';

export default function OpportunityList({ opportunities }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('title-asc');

  const allTypes = useMemo(() => ['all', ...Array.from(new Set(opportunities.map(op => op.type)))], [opportunities]);

  const filteredAndSortedOpportunities = useMemo(() => {
    return opportunities
      .filter(op => {
        const matchesSearch =
          op.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          op.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          op.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesType = typeFilter === 'all' || op.type === typeFilter;
        return matchesSearch && matchesType;
      })
      .sort((a, b) => {
        if (sortOrder === 'title-asc') return a.title.localeCompare(b.title);
        if (sortOrder === 'title-desc') return b.title.localeCompare(a.title);
        return 0;
      });
  }, [opportunities, searchTerm, typeFilter, sortOrder]);

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 mb-8 p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 border border-blue-200 dark:border-gray-700 shadow-md transition-all duration-500">
        <Input
          placeholder="Search by title, company, or skill..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:flex-1 text-white"
        />
        <div className="flex gap-4">
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full md:w-[160px] text-white">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              {allTypes.map(type => (
                <SelectItem key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger className="w-full md:w-[160px] text-white">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="title-asc" className='text-white'>Title (A-Z)</SelectItem>
              <SelectItem value="title-desc" className='text-white'>Title (Z-A)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredAndSortedOpportunities.map((op, index) => (
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
              <Card className="flex flex-col overflow-hidden rounded-3xl bg-white/70 dark:bg-white/5 backdrop-blur-2xl border border-blue-100 dark:border-gray-700 shadow-2xl hover:shadow-blue-500/30 transition-all duration-500 transform">
                <CardHeader className="p-0">
                  <img
                    src={op.image}
                    alt={op.title}
                    data-ai-hint={op.imageHint}
                    className="w-full h-48 object-cover rounded-t-3xl"
                  />
                </CardHeader>
                <CardContent className="p-6 flex-grow">
                  <Badge variant="secondary" className="mb-2">{op.type}</Badge>
                  <CardTitle className="text-xl font-bold font-headline mb-1">{op.title}</CardTitle>
                  <CardDescription className="text-gray-700 dark:text-gray-300">{op.company}</CardDescription>
                  <div className="flex items-center text-sm text-muted-foreground mt-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    {op.location}
                  </div>
                </CardContent>
                <CardFooter className="p-6 flex flex-col items-start">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {op.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="border-blue-300 dark:border-blue-700">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button className="w-full font-semibold bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white transition-all duration-300 shadow-md">
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            </Tilt>
          </motion.div>
        ))}
        {filteredAndSortedOpportunities.length === 0 && (
          <div className="md:col-span-2 lg:col-span-3 text-center py-20">
            <p className="text-muted-foreground text-lg">No opportunities match your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
