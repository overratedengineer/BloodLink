import { useState } from "react";
import { useAuthStore } from "../stores/useAuthStore"; // Assuming correct path
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { GoogleAuthProvider, GithubAuthProvider  } from "firebase/auth";

// Placeholder icons for social login (keep as is or update if needed)
const GoogleIcon = () => <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24"><path fill="#EA4335" d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.386-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.85l3.442-3.307C18.254 1.446 15.568 0 12.24 0 5.491 0 0 5.491 0 12s5.491 12 12.24 12c6.957 0 11.518-4.818 11.518-11.756 0-.79-.07-1.579-.199-2.348H12.24z"></path></svg>;
const GitHubIcon = () => <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>;

const LoginPage = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      alert("Please enter both email and password.");
      return;
    }
    login(formData, null);
  };

  const handleSocialLogin = async (providerName) => {
    try {
      let provider;
      if (providerName === "google") {
        provider = new GoogleAuthProvider();
      } else if (providerName === "github") {
        provider = new GithubAuthProvider();
      }
      
      // Call the login method from your store with null data and the provider
      login(null, provider);
    } catch (error) {
      console.error("Social login error:", error.message);
      alert("Social login failed: " + error.message);
    }
  };

  return (
    // Centered layout, light PINK background
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#fdf6f7] p-4">
      <div className="w-full max-w-md">

        {/* Header Text */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back</h1>
          <p className="text-gray-600 mt-2">Please login to your account</p> {/* Changed text */}
        </div>

        {/* Tab Navigation - Active tab RED */}
        <div className="flex border-b border-gray-200 mb-6">
          <button className="flex-1 py-2 px-4 text-center text-sm font-medium text-[#dc3545] border-b-2 border-[#dc3545] focus:outline-none">
            Login
          </button>
          <Link to="/signup" className="flex-1 py-2 px-4 text-center text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none">
            Sign Up
          </Link>
        </div>

        {/* Form Container */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                // Focus ring RED
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none placeholder-gray-400 focus:bg-gray-100 text-black focus:ring-1 focus:ring-red-500 focus:border-red-500 sm:text-sm"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                autoComplete="current-password"
                 // Focus ring RED
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none placeholder-gray-400 focus:bg-gray-100 text-black focus:ring-1 focus:ring-red-500 focus:border-red-500 sm:text-sm"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>

            {/* Remember Me / Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                   // Checkbox color RED
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                 {/* Link color RED */}
                <a href="#" className="font-medium text-red-600 hover:text-red-500">
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Submit Button - RED */}
            <button
              type="submit"
              disabled={isLoggingIn}
               className={`w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                isLoggingIn
                  ? 'bg-red-300 cursor-not-allowed' // Lighter red/gray for disabled
                  : 'bg-[#dc3545] hover:bg-[#c82333] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
              }`}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Logging In...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>

          {/* Separator */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            {/* Social Login Buttons - Keep gray/white border */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div>
                <button
                  onClick={() => handleSocialLogin('google')}
                   // Focus ring RED
                  className="w-full inline-flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <GoogleIcon />
                  Google
                </button>
              </div>
              <div>
                <button
                  onClick={() => handleSocialLogin('github')}
                   // Focus ring RED
                  className="w-full inline-flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                   <GitHubIcon />
                  GitHub
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Link - RED */}
        <div className="mt-8 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="font-medium text-red-600 hover:text-red-500">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;