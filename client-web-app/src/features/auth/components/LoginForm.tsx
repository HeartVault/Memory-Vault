'use client';

import { useState } from 'react';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { toast } from "sonner"
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';


export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

        try { 
            setIsLoading(true);
            const response = await axios.post('/api/auth/signin', {email,password} );
           if(response.data.session){
            toast.success("Signed in successfully!");
            router.replace('/explore')
           } else {
            toast.error("Invalid credentials, please try again.");
           }
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "An unexpected error occurred.");
        }
        finally{
          setIsLoading(false);
        }

  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email field */}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="pl-10"
          />
        </div>
      </div>

      {/* Password field */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <Link
            href="/auth/forgot-password"
            className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            Forgot password?
          </Link>
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="pl-10 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Remember me */}
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="remember"
          className="w-4 h-4 rounded border-white/20 bg-white/5 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-0"
        />
        <Label htmlFor="remember" className="text-sm text-gray-400 cursor-pointer">
          Remember me
        </Label>
      </div>

      {/* Submit button */}
      <Button
        type="submit"
        className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white rounded-full shadow-lg hover:shadow-emerald-500/50 transition-all duration-300"
        disabled={isLoading}
      >
        {isLoading ? 'Signing in...' : 'Sign In'}
      </Button>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-[#0a0a0a] text-gray-400">Or continue with</span>
        </div>
      </div>

      {/* Social login buttons */}
      <div className="grid grid-cols-1 gap-4">
        <Button
          type="button"
          variant="outline"
          className="glass border-white/20 text-white hover:bg-white/10 rounded-full"
        >
          Google
        </Button>
   
      </div>
    </form>
  );
}

