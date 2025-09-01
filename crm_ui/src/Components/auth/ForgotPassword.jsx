import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ModulLoginRegister = () => {
      const navigate = useNavigate();
    
  return (
    <div className="flex h-screen items-center justify-center overflow-hidden">
      {/* Left Side - Form */}
      <div className="flex flex-1 items-center justify-center bg-white p-6">
        <div className="w-full max-w-md text-center">
          <h1 className="text-3xl font-bold text-orange-500">Forgot your password?</h1>
          <p className="text-base text-gray-700 mt-2">
            Enter the email associated with your account and we will send you a link to reset your password.
          </p>

          <div className="mt-6">
            <div className="mb-4 text-left">
              <label className="text-sm text-gray-700">Email</label>
              <input 
                type="email" 
                defaultValue="admin@openhub.ro"
                className="w-full mt-1 p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
          </div>

          <div className="flex justify-between gap-4 mt-4">
            <button className="flex-1 bg-orange-500 text-white p-3 rounded-lg flex items-center justify-center gap-2 opacity-75 cursor-pointer">
              <FaArrowLeft className="text-lg" /> Back
            </button>
            <button 
                className="flex-1 bg-orange-500 text-white p-3 rounded-lg flex items-center justify-center gap-2 cursor-pointer"
                onClick={() => navigate("/SetPassword")}>
                Next <FaArrowRight className="text-lg" />
            </button>
          </div>
        </div>
      </div>

      {/* Right Side - Image (Same as Home.jsx) */}
      <div className="hidden lg:flex flex-1 items-center justify-center overflow-hidden">
        <img 
          className="absolute top-0 right-0 w-1/2 h-screen object-cover" 
          src="./Aside.jpg" 
          alt="Background" 
        />
      </div>
    </div>
  );
};

export default ModulLoginRegister;
