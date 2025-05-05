import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth, UserRole } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { currentUser } = useAuth();
  
  if (!currentUser) {
    // Not logged in, redirect to login
    return <Navigate to="/login" replace />;
  }
  
  if (!allowedRoles.includes(currentUser.role)) {
    // Not authorized for this role, redirect to appropriate dashboard
    switch (currentUser.role) {
      case 'admin':
        return <Navigate to="/dashboard/admin" replace />;
      case 'faculty':
        return <Navigate to="/dashboard/faculty" replace />;
      case 'student':
        return <Navigate to="/dashboard/student" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }
  
  // User is authorized
  return <>{children}</>;
};

export default ProtectedRoute;