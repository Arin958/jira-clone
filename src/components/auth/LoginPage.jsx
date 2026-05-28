import { useState } from "react";

import LoginForm from "../LoginForm";
import { useNavigate } from "react-router-dom";
import useCustomAuth from "../../hooks/useCustomAuth";

const LoginPage = () => {
   const navigate = useNavigate();
  const { 
    loginWithCustomForm, 
    loginWithRedirect, 
    loading, 
    isAuthenticated 
  } = useCustomAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  // Redirect if already authenticated
  if (isAuthenticated) {
    navigate('/dashboard');
    return null;
  }

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    return newErrors;
  };

  // Handle custom login with email/password
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setServerError('');
    setErrors({});

    const result = await loginWithCustomForm(formData.email, formData.password);
    
    if (result.success) {
      console.log('Custom login successful!');
      navigate('/dashboard');
    } else {
      setServerError(result.error);
    }
  };

  // Handle Auth0 Google login
  const handleGoogleLogin = () => {
    console.log('Redirecting to Auth0 Google login...');
    loginWithRedirect();
  };

  // Handle Auth0 with specific provider
  const handleAuth0Login = (provider) => {
    console.log(`Redirecting to Auth0 ${provider} login...`);
    loginWithRedirect({
      authorizationParams: {
        connection: provider // 'google-oauth2', 'github', 'facebook', etc.
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  return (
    <div className="min-h-screen flex">
      {/* Left side */}
      <div className="hidden md:flex md:w-1/2 bg-linear-to-br from-gray-900 via-black to-gray-800 text-white items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl"></div>
        </div>

        <div className="relative z-10 text-center px-12">
          <h2 className="text-4xl font-bold mb-4 tracking-tight">
            Welcome to Jira
          </h2>
          <p className="text-gray-300 text-lg">
            The #1 software development tool used by agile teams
          </p>
        </div>
      </div>
      {/* Righ Side */}

      <div className="flex flex-col items-center justify-center bg-linear-to-br from-amber-50 to-amber-100 md:w-1/2 w-full px-6 py-12">
        <LoginForm
          handleSubmit={handleSubmit}
          errors={errors}
          formData={formData}
          handleChange={handleChange}
          isLoading={loading}
          serverError={serverError}
          onGoogleLogin={handleGoogleLogin}
          onAuth0Login={handleAuth0Login}

        />
      </div>
    </div>
  );
};

export default LoginPage;
