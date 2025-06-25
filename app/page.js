// app/page.js
"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";
import LoginForm from "@/components/Dashboard/login-form";

export default function Home() {
  const router = useRouter();

  const handleLogin = async (jobId, password) => {
    try {
      const response = await axios.post("https://mac-backend-two.vercel.app/users/login", {
        jobId,
        password,
      });

      // the API wraps everything under response.data.data
      const { data: payload, message } = response.data;
      const { accessToken, refreshToken } = payload;

      // store tokens
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      // show backend message
      toast.success(message || "Login successful!");

      // navigate once toast is visible
      setTimeout(() => router.push("/dashboard"), 1200);
    } catch (err) {
      const errData = err.response?.data;
      if (errData) {
        // if your backend ever returns an array of messages
        if (Array.isArray(errData.messages)) {
          errData.messages.forEach((m) => toast.error(m));
        } else if (errData.message) {
          toast.error(errData.message);
        } else {
          toast.error("Login failed");
        }
      } else {
        toast.error("Network error. Please try again.");
      }
    }
  };

  return (
    <>
      <Toaster richColors position="top-right" />
      <div className="min-h-screen bg-gray-50">
        <LoginForm onLogin={handleLogin} />
      </div>
    </>
  );
}
