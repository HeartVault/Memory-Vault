'use client';

import { useState } from 'react';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name:'',
    username:'',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
 
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    } 

    try { 
        setIsLoading(true);
        const response = await axios.post('/api/auth/signup', formData );
        if(response.data !== null){
          router.push('/auth/verify-email');
        }
    } catch (error) {
      console.log(error)
    }
    finally{
      setIsLoading(false);
    }
  
    
  
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 ">
      {/* Name field */}

      <div className='flex items-center gap-4 '>   
      <div className="space-y-2 flex-1">
        <Label htmlFor="first_name">First Name</Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            id="first_name"
            name="first_name"
            type="text"
            placeholder="John"
            value={formData.first_name}
            onChange={handleChange}
            required
            className="pl-10 w-full"
          />
        </div>
      </div>
         <div className="space-y-2 flex-1">
        <Label htmlFor="last_name">Last Name</Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            id="name"
            name="last_name"
            type="text"
            placeholder="Doe"
            value={formData.last_name}
            onChange={handleChange}
            required
            className="pl-10 w-full"
          />
        </div>

      </div>


</div>

<div className='flex items-center  gap-4'>
      {/* Email field */}
      <div className="space-y-2 flex-1">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="pl-10"
          />
        </div>
      </div>

      {/* username */}
          <div className="space-y-2 flex-1">
        <Label htmlFor="username">Username</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            id="username"
            name="username"
            type="text"
            placeholder="johndoe12"
            value={formData.username}
            onChange={handleChange}
            required
            className="pl-10 "
          />
        </div>
      </div>
</div>


<div className='flex items-center gap-4'>
      {/* Password field */}
      <div className="space-y-2 flex-1">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={8}
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
        <p className="text-xs text-gray-500">Must be at least 8 characters</p>
      </div>

      {/* Confirm Password field */}
      <div className="space-y-2 flex-1">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="pl-10 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
          >
            {showConfirmPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
        <p className="text-xs text-gray-500">Must be at least 8 characters</p>
      </div>
</div>
      {/* Terms and conditions */}
      <div className="flex items-start space-x-2">
        <input
          type="checkbox"
          id="terms"
          required
          className="w-4 h-4 mt-1 rounded border-white/20 bg-white/5 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-0"
        />
        <Label htmlFor="terms" className="text-sm text-gray-400 cursor-pointer">
          I agree to the{' '}
          <a href="#" className="text-emerald-400 hover:text-emerald-300">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="text-emerald-400 hover:text-emerald-300">
            Privacy Policy
          </a>
        </Label>
      </div>

      {/* Submit button */}
      <Button
        type="submit"
        className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white rounded-full shadow-lg hover:shadow-emerald-500/50 transition-all duration-300"
        disabled={isLoading}
      >
        {isLoading ? 'Creating account...' : 'Create Account'}
      </Button>

  

    </form>
  );
}

