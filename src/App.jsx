
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import MainLayout from './layout/MainLayout';
import Dashboard from './pages/Dashboard';
import Board from './pages/Board';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const { isLoading, isAuthenticated } = useAuth0();
  console.log(isAuthenticated);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    
      <Routes>
        <Route path="/" element={
          isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
        } />
        <Route path="/dashboard" element={
          isAuthenticated ? <MainLayout><Dashboard /></MainLayout> : <Navigate to="/" />
        } />
        <Route path="/board/:boardId" element={
          isAuthenticated ? <MainLayout><Board /></MainLayout> : <Navigate to="/" />
        } />
      </Routes>
  );
}

export default App;