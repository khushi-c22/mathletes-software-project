import { useState } from 'react';
import { useAuth } from '../context/AuthContext.tsx';
import { Eye, Mail, Lock, AlertCircle } from 'lucide-react';

export default function Login() {
  const { signInWithEmail, signUp, loading, error } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');
    
    try {
      if (isSignUp) {
        await signUp(email, password);
        setMessage('Check your email to confirm your account!');
      } else {
        await signInWithEmail(email, password);
      }
    } catch (err) {
      console.error('Auth error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className='login-container'>
        <div className='login-loading'>Loading...</div>
      </div>
    );
  }

  return (
    <div className='login-container'>
      <div className='login-card'>
        <div className='login-logo'>
          <Eye size={48} strokeWidth={1.5} />
        </div>
        <h1>Welcome to ici!</h1>
        <p>Track your focus and improve productivity</p>
        
        {error && (
          <div className='login-error'>
            <AlertCircle size={16} />
            {error}
          </div>
        )}
        
        {message && (
          <div className='login-success'>
            {message}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className='login-form'>
          <div className='form-group'>
            <Mail size={16} />
            <input
              type='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className='form-group'>
            <Lock size={16} />
            <input
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>
          
          <button 
            type='submit' 
            className='submit-btn'
            disabled={loading || isSubmitting}
          >
            {isSubmitting 
              ? 'Please wait...' 
              : isSignUp ? 'Create Account' : 'Sign In'}
          </button>
        </form>
        
        <p className='toggle-text'>
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          <button 
            type='button' 
            onClick={() => { setIsSignUp(!isSignUp); setMessage(''); }}
            className='toggle-btn'
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
}
