import { useState } from "react";
import { useAuthStore } from "../stores/useAuthStore"; // Assuming correct path
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";


// Placeholder icons for social login (keep as is or update if needed)
const GoogleIcon = () => <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24"><path fill="#EA4335" d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.386-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.85l3.442-3.307C18.254 1.446 15.568 0 12.24 0 5.491 0 0 5.491 0 12s5.491 12 12.24 12c6.957 0 11.518-4.818 11.518-11.756 0-.79-.07-1.579-.199-2.348H12.24z"></path></svg>;
const GitHubIcon = () => <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>;


const SignUpPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signupWithBackend, signupWithFirebase, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      signupWithBackend(formData)
        .catch((error) => {
          console.error("Signup error:", error);
          const message = error?.response?.data?.message || error?.message || "An unexpected error occurred during signup.";
          toast.error(message);
        });
    }
  };

  const handleSocialSignup = (providerName) => {
    const provider =
      providerName === "google"
        ? new GoogleAuthProvider()
        : providerName === "github"
        ? new GithubAuthProvider()
        : null;
  
    if (!provider) {
      return toast.error("Unsupported provider");
    }
  
    signupWithFirebase(provider);
  };

  return (
    // Centered layout, light PINK background
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#fdf6f7] p-4">
       <div className="w-full max-w-md">

        {/* Header Text */}
        <div className="text-center mb-6">
           <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
           <p className="text-gray-600 mt-2">Get started with your free account</p>
        </div>

        {/* Tab Navigation - Active tab RED */}
        <div className="flex border-b border-gray-200 mb-6">
          <Link to="/login" className="flex-1 py-2 px-4 text-center text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none">
            Login
          </Link>
          <button className="flex-1 py-2 px-4 text-center text-sm font-medium text-[#dc3545] border-b-2 border-[#dc3545] focus:outline-none">
            Sign Up
          </button>
        </div>

        {/* Form Container */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="space-y-6">
             {/* Full Name Input */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                Full name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                autoComplete="name"
                // Focus ring RED
                className="w-full placeholder-gray-400 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 sm:text-sm"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
              />
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email-signup" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                type="email"
                id="email-signup"
                name="email"
                autoComplete="email"
                // Focus ring RED
                className="w-full placeholder-gray-400 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 sm:text-sm"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password-signup" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password-signup"
                name="password"
                autoComplete="new-password"
                // Focus ring RED
                className="w-full placeholder-gray-400 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 sm:text-sm"
                placeholder="Create a password (min. 6 characters)"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>

            {/* Submit Button - RED */}
            <button
              type="submit"
              disabled={isSigningUp}
               className={`w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                isSigningUp
                  ? 'bg-red-300 cursor-not-allowed'
                  : 'bg-[#dc3545] hover:bg-[#c82333] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
              }`}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          {/* Separator and Social Login */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or sign up with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div>
                 <button
                   onClick={() => handleSocialSignup('google')}
                   // Focus ring RED
                   className="w-full inline-flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 cursor-pointer"
                 >
                   <GoogleIcon />
                   Google
                 </button>
               </div>
               <div>
                 <button
                   onClick={() => handleSocialSignup('github')}
                   // Focus ring RED
                   className="w-full inline-flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 cursor-pointer"
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
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-red-600 hover:text-red-500">
            Login
          </Link>
        </div>

      </div>
    </div>
  );
};

export default SignUpPage;