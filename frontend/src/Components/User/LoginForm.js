import React, { useEffect, useState } from "react";
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { authClearError, loginUser } from "../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const dispatch = useDispatch()
  const location = useLocation();

  const {loading,error,isAuthenticated} = useSelector(state=>state.authState)
  const redirect = location.search?'/'+location.search.split('=')[1]:'/';

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(email,password));
    console.log("Form submitted");
  };

  useEffect(() => {
    if(isAuthenticated){
      navigate(redirect)
    }
    if (error) {
      toast(error, {
        position: 'top-right',
        type:'error',
        onOpen:()=>{dispatch(authClearError)}
      });
      return
    }
  }, [error, isAuthenticated, dispatch, navigate,redirect]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-6 text-center">Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Please enter your Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Please enter your password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="w-full p-3 mb-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 cursor-pointer text-gray-500"
            >
              👁️
            </span>
          </div>

          <div className="flex justify-end mb-4">
            <Link
              to="/forgot/password"
              className="text-sm text-blue-500 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded hover:bg-orange-600 transition"
            disabled={loading}
          >
            LOGIN
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link to={'/register'} className="text-blue-500 cursor-pointer hover:underline">
            Sign up
          </Link>
        </p>

        <div className="my-4 text-center text-gray-500">Or, login with</div>

        <div className="flex justify-center space-x-6">
          <button
            type="button"
            className="flex items-center space-x-2 border px-4 py-2 rounded hover:bg-gray-100"
          >
            <FcGoogle size={20} />
            <span>Google</span>
          </button>
          <button
            type="button"
            className="flex items-center space-x-2 border px-4 py-2 rounded hover:bg-gray-100"
          >
            <FaFacebookF className="text-blue-600" size={20} />
            <span>Facebook</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
