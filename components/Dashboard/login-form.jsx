"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, User, Lock, Sparkles } from "lucide-react";

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
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800 relative overflow-hidden">
      {/* Animated BG & particles (unchanged) */}
      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full mb-4 shadow-lg">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-purple-200">Sign in to your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
            {/* Job ID Field */}
            <div className="space-y-2 mb-6">
              <Label htmlFor="jobId" className="text-white font-medium">
                Job ID
              </Label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User
                    className={`h-5 w-5 transition-colors duration-200 ${
                      focusedField === "jobId"
                        ? "text-pink-400"
                        : "text-gray-400"
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
                  className="pl-10 bg-white/20 border-white/30 text-white placeholder-gray-300 focus:border-pink-400 focus:ring-pink-400 rounded-xl h-12 transition-all duration-200 hover:bg-white/25"
                />
                <div
                  className={`absolute inset-0 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 opacity-0 -z-10 transition-opacity duration-200 ${
                    focusedField === "jobId" ? "opacity-20" : ""
                  }`}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2 mb-8">
              <Label htmlFor="password" className="text-white font-medium">
                Password
              </Label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock
                    className={`h-5 w-5 transition-colors duration-200 ${
                      focusedField === "password"
                        ? "text-pink-400"
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
                  className="pl-10 pr-12 bg-white/20 border-white/30 text-white placeholder-gray-300 focus:border-pink-400 focus:ring-pink-400 rounded-xl h-12 transition-all duration-200 hover:bg-white/25"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-pink-400 transition-colors duration-200"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
                <div
                  className={`absolute inset-0 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 opacity-0 -z-10 transition-opacity duration-200 ${
                    focusedField === "password" ? "opacity-20" : ""
                  }`}
                />
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Signing in...</span>
                </div>
              ) : (
                "Sign In"
              )}
            </Button>

            {/* Links */}
            <div className="mt-6 text-center space-y-2">
              <button
                type="button"
                className="text-purple-200 hover:text-white transition-colors duration-200 text-sm"
              >
                Forgot your password?
              </button>
              <div className="text-purple-200 text-sm">
                {"Don't have an account? "}
                <button
                  type="button"
                  className="text-pink-400 hover:text-pink-300 font-medium transition-colors duration-200"
                >
                  Sign up
                </button>
              </div>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-purple-300 text-sm">
            Secure login powered by modern encryption
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-10px) rotate(120deg);
          }
          66% {
            transform: translateY(5px) rotate(240deg);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
