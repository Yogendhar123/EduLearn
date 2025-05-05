import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, UserRole } from '../contexts/AuthContext';
import { UserPlus, Mail, User, EyeOff, Eye, CheckCircle, XCircle } from 'lucide-react';

const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { register, currentUser } = useAuth();
  const navigate = useNavigate();
  
  // Password strength checker
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    hasMinLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecialChar: false
  });
  
  useEffect(() => {
    // Update document title
    document.title = 'Register - EduLearn';
    
    // Redirect if already logged in
    if (currentUser) {
      // Redirect based on user role
      switch (currentUser.role) {
        case 'admin':
          navigate('/dashboard/admin');
          break;
        case 'faculty':
          navigate('/dashboard/faculty');
          break;
        case 'student':
          navigate('/dashboard/student');
          break;
        default:
          navigate('/');
      }
    }
  }, [currentUser, navigate]);
  
  // Check password strength whenever password changes
  useEffect(() => {
    const strength = {
      score: 0,
      hasMinLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[^A-Za-z0-9]/.test(password)
    };
    
    // Calculate score
    let score = 0;
    if (strength.hasMinLength) score++;
    if (strength.hasUppercase) score++;
    if (strength.hasLowercase) score++;
    if (strength.hasNumber) score++;
    if (strength.hasSpecialChar) score++;
    
    strength.score = score;
    setPasswordStrength(strength);
  }, [password]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);
    
    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
      setError('All fields are required');
      setIsLoading(false);
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }
    
    if (passwordStrength.score < 3) {
      setError('Please use a stronger password');
      setIsLoading(false);
      return;
    }
    
    // Attempt registration
    const result = register(name, email, password, role);
    
    if (result.success) {
      setSuccess('Registration successful! You can now login.');
      // Reset form
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setRole('student');
    } else {
      setError(result.message);
    }
    
    setIsLoading(false);
  };

  // If already logged in, don't render form
  if (currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 pb-12 px-4 bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Create an Account</h1>
          <p className="text-gray-600">
            Join EduLearn to start your learning journey
          </p>
        </div>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 text-sm">
            {error}
          </div>
        )}
        
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-4 text-sm">
            {success}
          </div>
        )}
        
        <div className="bg-white p-8 rounded-lg shadow-md">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="John Doe"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full pl-3 pr-10 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="•••••••••••"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
              
              {/* Password strength indicator */}
              <div className="mt-2">
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-gray-600">Password strength:</span>
                  <span className="text-xs font-medium text-gray-600">
                    {passwordStrength.score === 0 && 'Very Weak'}
                    {passwordStrength.score === 1 && 'Weak'}
                    {passwordStrength.score === 2 && 'Fair'}
                    {passwordStrength.score === 3 && 'Good'}
                    {passwordStrength.score === 4 && 'Strong'}
                    {passwordStrength.score === 5 && 'Very Strong'}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className={`h-1.5 rounded-full ${
                      passwordStrength.score === 0 ? 'bg-gray-300 w-0' :
                      passwordStrength.score === 1 ? 'bg-red-500 w-1/5' :
                      passwordStrength.score === 2 ? 'bg-orange-500 w-2/5' :
                      passwordStrength.score === 3 ? 'bg-yellow-500 w-3/5' :
                      passwordStrength.score === 4 ? 'bg-green-400 w-4/5' :
                      'bg-green-600 w-full'
                    }`}
                  ></div>
                </div>
              </div>
              
              {/* Password requirements */}
              <div className="mt-2 space-y-1 text-xs">
                <div className="flex items-center text-gray-600">
                  {passwordStrength.hasMinLength ? (
                    <CheckCircle className="h-3.5 w-3.5 text-green-500 mr-1.5" />
                  ) : (
                    <XCircle className="h-3.5 w-3.5 text-gray-400 mr-1.5" />
                  )}
                  <span>At least 8 characters</span>
                </div>
                <div className="flex items-center text-gray-600">
                  {passwordStrength.hasUppercase ? (
                    <CheckCircle className="h-3.5 w-3.5 text-green-500 mr-1.5" />
                  ) : (
                    <XCircle className="h-3.5 w-3.5 text-gray-400 mr-1.5" />
                  )}
                  <span>At least one uppercase letter</span>
                </div>
                <div className="flex items-center text-gray-600">
                  {passwordStrength.hasLowercase ? (
                    <CheckCircle className="h-3.5 w-3.5 text-green-500 mr-1.5" />
                  ) : (
                    <XCircle className="h-3.5 w-3.5 text-gray-400 mr-1.5" />
                  )}
                  <span>At least one lowercase letter</span>
                </div>
                <div className="flex items-center text-gray-600">
                  {passwordStrength.hasNumber ? (
                    <CheckCircle className="h-3.5 w-3.5 text-green-500 mr-1.5" />
                  ) : (
                    <XCircle className="h-3.5 w-3.5 text-gray-400 mr-1.5" />
                  )}
                  <span>At least one number</span>
                </div>
                <div className="flex items-center text-gray-600">
                  {passwordStrength.hasSpecialChar ? (
                    <CheckCircle className="h-3.5 w-3.5 text-green-500 mr-1.5" />
                  ) : (
                    <XCircle className="h-3.5 w-3.5 text-gray-400 mr-1.5" />
                  )}
                  <span>At least one special character</span>
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className={`block w-full pl-3 pr-10 py-3 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                    confirmPassword && confirmPassword !== password
                      ? 'border-red-300'
                      : 'border-gray-300'
                  }`}
                  placeholder="•••••••••••"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
              {confirmPassword && confirmPassword !== password && (
                <p className="mt-1 text-sm text-red-600">Passwords do not match</p>
              )}
            </div>
            
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                I want to register as:
              </label>
              <div className="mt-1 rounded-md shadow-sm">
                <select
                  id="role"
                  name="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value as UserRole)}
                  className="block w-full pl-3 pr-10 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="student">Student</option>
                  <option value="faculty">Faculty</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>
            </div>
            
            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                I agree to the{' '}
                <a href="#" className="text-blue-600 hover:text-blue-500">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-blue-600 hover:text-blue-500">
                  Privacy Policy
                </a>
              </label>
            </div>
            
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  isLoading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  'Registering...'
                ) : (
                  <>
                    <UserPlus className="h-5 w-5 mr-2" />
                    Register
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
        
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;