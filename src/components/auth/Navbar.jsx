import AuthNav from "./auth-nav";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex">
      {/* Left side */}
      <div className="w-1/2 bg-black text-white items-center justify-center hidden md:flex">
         <h2 className="text-3xl font-bold uppercase ">Welcome to Jira</h2>
      </div>
      {/* Right side */}
      <div className="flex flex-col items-center justify-center bg-amber-300 md:w-1/2 w-full ">
      {/* form */}
      <h2 className="text-3xl font-bold uppercase mb-4">
        Log In into Jira
      </h2>
      <form action="">
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />  
        </div>
      </form>
        <div className="text-center">

          <AuthNav />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
