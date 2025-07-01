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
