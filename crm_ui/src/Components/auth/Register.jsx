import { useState } from "react";
import { FaArrowRight, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const navigate = useNavigate();

  // State variables for all input fields
  const [companyName, setCompanyName] = useState("Thecon");
  const [registrationCode, setRegistrationCode] = useState("19302026");
  const [firstName, setFirstName] = useState("Bogdan");
  const [lastName, setLastName] = useState("Pana");
  const [email, setEmail] = useState("pana.bogdan@thecon.ro");
  const [phoneNumber, setPhoneNumber] = useState("0770 123 456");
  const [password, setPassword] = useState("**********");
  const [confirmPassword, setConfirmPassword] = useState("**********");

  // State variables for toggling password visibility
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);

  return (
    <div className="flex h-screen">
      {/* Left Side - Centered Form */}
      <div className="w-1/2 flex justify-center items-center px-12">
        <div className="w-full max-w-md">
          <div className="mb-6 text-center">
            <h2 className="text-3xl font-bold">Create Account</h2>
            <p className="text-gray-600 mt-2">
              Already have an account?{" "}
              <span className="text-orange-400 font-bold cursor-pointer">Log in</span>
            </p>
          </div>

          <div className="p-3 rounded-lg flex space-x-2">
            <button className="w-1/2 py-2 text-orange-400 font-bold rounded-lg">
              Representative
            </button>
            <button
              className="w-1/2 py-2 text-black font-bold rounded-lg cursor-pointer"
              onClick={() => navigate("/Client")}
            >
              Client/Supplier
            </button>
          </div>

          <p className="text-black mt-4 text-center">
            Are you the representative of a company you want to register in the Cluster? Fill in the details below.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600 font-semibold">Company Name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-gray-600 font-semibold">Unique Registration Code</label>
              <input
                type="text"
                value={registrationCode}
                onChange={(e) => setRegistrationCode(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-lg"
              />
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600 font-semibold">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-gray-600 font-semibold">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-lg"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-gray-600 font-semibold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-lg"
            />
          </div>

          <div className="mt-4">
            <label className="block text-gray-600 font-semibold">Phone Number</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-lg"
            />
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600 font-semibold">Password</label>
              {/* Wrapping input in a relative container for the eye icon */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded-lg"
                />
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>
            <div>
              <label className="block text-gray-600 font-semibold">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded-lg"
                />
                <div
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>
          </div>

          <button
            className="w-full bg-orange-400 text-white font-bold py-2 mt-6 rounded-lg flex items-center justify-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            Continue <span className="ml-2"><FaArrowRight /></span>
          </button>

          <div className="mt-4 text-center text-gray-600">
            <span className="cursor-pointer font-bold">Privacy</span> |{" "}
            <span className="cursor-pointer font-bold">Terms and Conditions</span>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-1/2 h-screen fixed top-0 right-0">
        <img
          className="w-full h-full object-cover"
          src="/Aside.jpg"
          alt="Background"
        />
      </div>
    </div>
  );
};

export default Form;
