"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, User, Lock } from "lucide-react";

export default function LoginForm({ onLogin }) {
  const [jobId, setJobId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onLogin(jobId, password);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      {/* Subtle background shapes */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-teal-400 rounded-full mix-blend-multiply filter blur-2xl opacity-15"></div>

      <div className="relative z-10 w-full max-w-sm p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4 shadow-md">
            <User className="w-8 h-8 text-gray-700" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Please sign in to continue
          </p>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white bg-opacity-80 backdrop-blur-sm rounded-xl p-6 shadow-lg"
        >
          {/* Job ID Field */}
          <div className="space-y-1">
            <Label htmlFor="jobId" className="text-gray-700 dark:text-gray-200">
              Job ID
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User
                  className={`h-5 w-5 transition-colors duration-200 ${
                    focusedField === "jobId" ? "text-blue-500" : "text-gray-400"
                  }`}
                />
              </div>
              <Input
                id="jobId"
                type="text"
                value={jobId}
                onChange={(e) => setJobId(e.target.value)}
                onFocus={() => setFocusedField("jobId")}
                onBlur={() => setFocusedField(null)}
                placeholder="Enter your Job ID"
                required
                className="pl-10 h-10 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-1">
            <Label
              htmlFor="password"
              className="text-gray-700 dark:text-gray-200"
            >
              Password
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock
                  className={`h-5 w-5 transition-colors duration-200 ${
                    focusedField === "password"
                      ? "text-blue-500"
                      : "text-gray-400"
                  }`}
                />
              </div>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
                placeholder="Enter your password"
                required
                className="pl-10 pr-10 h-10 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>

          {/* Links */}
          <div className="flex justify-between text-sm">
            <button
              type="button"
              className="text-gray-600 dark:text-gray-400 hover:underline"
            >
              Forgot password?
            </button>
            <button type="button" className="text-blue-600 hover:underline">
              Sign up
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-gray-500 text-xs">
            Secure login with modern encryption standards
          </p>
        </div>
      </div>
    </div>
  );
}

// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Eye, EyeOff, User, Lock, Sparkles } from "lucide-react";

// export default function LoginForm({ onLogin }) {
//   const [jobId, setJobId] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [focusedField, setFocusedField] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     try {
//       await onLogin(jobId, password);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800 relative overflow-hidden">
//       {/* Animated BG & particles (unchanged) */}
//       <div className="relative z-10 w-full max-w-md">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full mb-4 shadow-lg">
//             <Sparkles className="w-8 h-8 text-white" />
//           </div>
//           <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
//           <p className="text-purple-200">Sign in to your account</p>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
//             {/* Job ID Field */}
//             <div className="space-y-2 mb-6">
//               <Label htmlFor="jobId" className="text-white font-medium">
//                 Job ID
//               </Label>
//               <div className="relative group">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <User
//                     className={`h-5 w-5 transition-colors duration-200 ${
//                       focusedField === "jobId"
//                         ? "text-pink-400"
//                         : "text-gray-400"
//                     }`}
//                   />
//                 </div>
//                 <Input
//                   id="jobId"
//                   type="text"
//                   value={jobId}
//                   onChange={(e) => setJobId(e.target.value)}
//                   onFocus={() => setFocusedField("jobId")}
//                   onBlur={() => setFocusedField(null)}
//                   placeholder="Enter your Job ID"
//                   required
//                   className="pl-10 bg-white/20 border-white/30 text-white placeholder-gray-300 focus:border-pink-400 focus:ring-pink-400 rounded-xl h-12 transition-all duration-200 hover:bg-white/25"
//                 />
//                 <div
//                   className={`absolute inset-0 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 opacity-0 -z-10 transition-opacity duration-200 ${
//                     focusedField === "jobId" ? "opacity-20" : ""
//                   }`}
//                 />
//               </div>
//             </div>

//             {/* Password Field */}
//             <div className="space-y-2 mb-8">
//               <Label htmlFor="password" className="text-white font-medium">
//                 Password
//               </Label>
//               <div className="relative group">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Lock
//                     className={`h-5 w-5 transition-colors duration-200 ${
//                       focusedField === "password"
//                         ? "text-pink-400"
//                         : "text-gray-400"
//                     }`}
//                   />
//                 </div>
//                 <Input
//                   id="password"
//                   type={showPassword ? "text" : "password"}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   onFocus={() => setFocusedField("password")}
//                   onBlur={() => setFocusedField(null)}
//                   placeholder="Enter your password"
//                   required
//                   className="pl-10 pr-12 bg-white/20 border-white/30 text-white placeholder-gray-300 focus:border-pink-400 focus:ring-pink-400 rounded-xl h-12 transition-all duration-200 hover:bg-white/25"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-pink-400 transition-colors duration-200"
//                 >
//                   {showPassword ? (
//                     <EyeOff className="h-5 w-5" />
//                   ) : (
//                     <Eye className="h-5 w-5" />
//                   )}
//                 </button>
//                 <div
//                   className={`absolute inset-0 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 opacity-0 -z-10 transition-opacity duration-200 ${
//                     focusedField === "password" ? "opacity-20" : ""
//                   }`}
//                 />
//               </div>
//             </div>

//             {/* Submit */}
//             <Button
//               type="submit"
//               disabled={isLoading}
//               className="w-full h-12 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
//             >
//               {isLoading ? (
//                 <div className="flex items-center justify-center space-x-2">
//                   <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                   <span>Signing in...</span>
//                 </div>
//               ) : (
//                 "Sign In"
//               )}
//             </Button>

//             {/* Links */}
//             <div className="mt-6 text-center space-y-2">
//               <button
//                 type="button"
//                 className="text-purple-200 hover:text-white transition-colors duration-200 text-sm"
//               >
//                 Forgot your password?
//               </button>
//               <div className="text-purple-200 text-sm">
//                 {"Don't have an account? "}
//                 <button
//                   type="button"
//                   className="text-pink-400 hover:text-pink-300 font-medium transition-colors duration-200"
//                 >
//                   Sign up
//                 </button>
//               </div>
//             </div>
//           </div>
//         </form>

//         {/* Footer */}
//         <div className="text-center mt-8">
//           <p className="text-purple-300 text-sm">
//             Secure login powered by modern encryption
//           </p>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes float {
//           0%,
//           100% {
//             transform: translateY(0px) rotate(0deg);
//           }
//           33% {
//             transform: translateY(-10px) rotate(120deg);
//           }
//           66% {
//             transform: translateY(5px) rotate(240deg);
//           }
//         }
//         .animate-float {
//           animation: float 6s ease-in-out infinite;
//         }
//         .animation-delay-2000 {
//           animation-delay: 2s;
//         }
//         .animation-delay-4000 {
//           animation-delay: 4s;
//         }
//       `}</style>
//     </div>
//   );
// }
