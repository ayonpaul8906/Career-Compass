import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Compass, Mail, KeyRound } from 'lucide-react';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../lib/firebase";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form["email"].value;
    const password = form["password"].value;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      alert(err.message);
    }
  };

const handleGoogleSignIn = async () => {
  try {
    await signInWithPopup(auth, new GoogleAuthProvider());
    navigate("/dashboard");
  } catch (err) {
    alert(err.message);
  }
};

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-100 to-slate-300 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
      <Card className="mx-auto max-w-md w-full shadow-lg border border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm transition-all duration-300">
        <CardHeader className="space-y-1 text-center">
          <Link to="/" className="inline-block mb-2">
            <Compass className="h-10 w-10 text-blue-600 dark:text-blue-500 mx-auto" />
          </Link>
          <CardTitle className="text-2xl font-bold font-headline text-gray-900 dark:text-gray-100">Welcome Back</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-800 dark:text-gray-300">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  className="pl-10 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <Label htmlFor="password" className="text-gray-800 dark:text-gray-300">Password</Label>
                <Link to="#" className="ml-auto inline-block text-sm underline text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Forgot your password?
                </Link>
              </div>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
                <Input
                  id="password"
                  type="password"
                  required
                  className="pl-10 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <Button type="submit" className="w-full font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300">
              Login
            </Button>
          </form>
          <div className="relative my-6">
            <div className="flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-gray-900 px-2 text-gray-500 dark:text-gray-400">Or continue with</span>
            </div>
            <div className="border-t border-gray-300 dark:border-gray-700 mt-[-10px]" />
          </div>
          <Button
            variant="outline"
            className="w-full font-semibold border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
            onClick={handleGoogleSignIn}
          >
            <svg role="img" viewBox="0 0 24 24" className="mr-2 h-4 w-4"><path fill="currentColor" d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.02-2.3 1.84-4.32 1.84-3.6 0-6.5-2.95-6.5-6.5s2.9-6.5 6.5-6.5c1.95 0 3.35.73 4.32 1.7l2.16-2.16C18.2 3.3 15.6.8 12.48.8 7.1.8 2.92 5.05 2.92 10.4s4.18 9.6 9.56 9.6c2.63 0 4.88-.87 6.5-2.5 1.7-1.7 2.2-4.2 2.2-6.2v-.2H12.48z"></path></svg>
            Sign in with Google
          </Button>
          <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="underline hover:text-blue-600 dark:hover:text-blue-400">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
