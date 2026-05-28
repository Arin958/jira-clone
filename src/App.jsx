import { Routes, Route, Navigate } from "react-router-dom";


import MainLayout from "./layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Board from "./pages/Board";
import LoadingSpinner from "./components/LoadingSpinner";
import LoginPage from "./components/auth/LoginPage";
import RegisterPage from "./components/auth/Register";
import useCustomAuth from "./hooks/useCustomAuth";

function App() {
  const { isAuthenticated, loading } = useCustomAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/dashboard"
        element={
          isAuthenticated ? (
            <MainLayout>
              <Dashboard />
            </MainLayout>
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route
        path="/board/:boardId"
        element={
          isAuthenticated ? (
            <MainLayout>
              <Board />
            </MainLayout>
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
