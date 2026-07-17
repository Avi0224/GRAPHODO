import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../lib/api';
import { Loader2 } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { checkAuth } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await api.post('/auth/login', data);
      if (response.data.status === 'success') {
        await checkAuth();
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to login');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-surface p-8 shadow-xl border border-border">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-on-background">
            Welcome back
          </h2>
          <p className="mt-2 text-center text-sm text-on-surface">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-primary hover:text-primary/80 transition-colors">
              Sign up
            </Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {error && (
            <div className="rounded-md bg-error/10 p-4 border border-error/20">
              <div className="text-sm text-error">{error}</div>
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                {...register('email')}
                className={`block w-full rounded-lg border ${errors.email ? 'border-error focus:ring-error' : 'border-border focus:border-primary focus:ring-primary'} bg-background px-4 py-3 text-on-background shadow-sm focus:outline-none focus:ring-2 transition-colors`}
                placeholder="Email address"
              />
              {errors.email && <p className="mt-1 text-sm text-error">{errors.email.message}</p>}
            </div>
            
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                {...register('password')}
                className={`block w-full rounded-lg border ${errors.password ? 'border-error focus:ring-error' : 'border-border focus:border-primary focus:ring-primary'} bg-background px-4 py-3 text-on-background shadow-sm focus:outline-none focus:ring-2 transition-colors`}
                placeholder="Password"
              />
              {errors.password && <p className="mt-1 text-sm text-error">{errors.password.message}</p>}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full justify-center rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? <Loader2 className="animate-spin h-5 w-5" /> : 'Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
