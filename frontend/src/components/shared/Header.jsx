import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Compass } from 'lucide-react';

export default function Header() {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center bg-background/80 backdrop-blur-sm sticky top-0 z-50 border-b">
      <Link to="/" className="flex items-center justify-center gap-2">
        <Compass className="h-6 w-6 text-blue-600 dark:text-blue-500" />
        <span className="text-white font-bold">Career Compass</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Button variant="ghost" asChild>
          <Link to="/login" className="text-sm text-white font-medium">
            Sign In
          </Link>
        </Button>
        <Button asChild>
          <Link to="/register" className="text-sm text-white font-medium">
            Sign Up
          </Link>
        </Button>
      </nav>
    </header>
  );
}
