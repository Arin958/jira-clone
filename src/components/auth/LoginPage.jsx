import { useState } from "react";

import LoginForm from "../LoginForm";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
       <LoginForm handleSubmit={handleSubmit} errors={errors} formData={formData} handleChange={handleChange} isLoading={isLoading}/>
      </div>
    </div>
  );
};

export default LoginPage;
