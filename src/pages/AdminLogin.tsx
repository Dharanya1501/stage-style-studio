import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isRegister) {
      const { error } = await supabase.auth.signUp({ email, password });
      setLoading(false);
      if (error) {
        toast({ title: 'Registration failed', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Account created! Please contact the site owner to get admin access.' });
        setIsRegister(false);
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setLoading(false);
      if (error) {
        toast({ title: 'Login failed', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Logged in successfully' });
        navigate('/gallery');
      }
    }
  };

  return (
    <main className="pt-20 min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4 p-6">
        <h1 className="font-display text-2xl font-bold text-center">
          {isRegister ? 'Register Admin' : 'Admin Login'}
        </h1>
        <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Please wait...' : isRegister ? 'Register' : 'Sign In'}
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          {isRegister ? (
            <>Already have an account?{' '}<button type="button" className="text-primary underline" onClick={() => setIsRegister(false)}>Sign In</button></>
          ) : (
            <>First time?{' '}<button type="button" className="text-primary underline" onClick={() => setIsRegister(true)}>Register</button></>
          )}
        </p>
      </form>
    </main>
  );
};

export default AdminLogin;
