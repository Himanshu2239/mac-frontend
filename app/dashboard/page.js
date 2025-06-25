// app/dashboard/page.js
"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";
import Dashboard from "@/components/Dashboard/dashboard";

export default function DashboardPage() {
  const router = useRouter();

  // 1) localStorage is only available in the browser, so grab it in a useEffect:
  const [token, setToken] = useState(null);
  useEffect(() => {
    const t = localStorage.getItem("accessToken");
    if (!t) {
      // not logged in—kick back to login
      router.push("/");
      return;
    }
    setToken(t);
  }, [router]);

  // 2) Your lifted state for the WO form:
  const [workOrderData, setWorkOrderData] = useState({
    customerName: "",
    customerPo: "",
    customerPoDate: "",
    itemType: "ONT",
    customerModel: "",
    oemModel: "",
    odmModel: "",
    itemQuantity: "",
  });
  const [workOrderNumber, setWorkOrderNumber] = useState(null);
  const [id, setId] = useState("");
  const [id_new, setId_new] = useState("");

  // 3) Draft handler with Authorization header
  const handleDraft = async () => {
    console.log("handleDraft", workOrderData);
    if (!token) return;
    try {
      const { data } = await axios.post(
        "https://mac-backend-two.vercel.app/macGenerator/new-work-order",
        workOrderData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("draft-data", data);

      if (Array.isArray(data.messages)) {
        data.messages.forEach((m) => toast.success(m));
      } else if (data.message) {
        toast.success(data.message);
      } else {
        toast.success("Draft saved");
      }

      setTimeout(() => router.refresh(), 800);
    } catch (err) {
      const errData = err.response?.data;
      if (errData) {
        if (Array.isArray(errData.messages)) {
          errData.messages.forEach((m) => toast.error(m));
        } else if (errData.message) {
          toast.error(errData.message);
        } else {
          toast.error("Failed to save draft");
        }
      } else {
        toast.error("Network error");
      }
    }
  };

  // 4) Next handler
  const handleNext = async () => {
    if (!token) return;
    console.log("handleNext", workOrderData);
    try {
      const { data } = await axios.post(
        "https://mac-backend-two.vercel.app/macGenerator/new-work-order",
        workOrderData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("next-data", data);

      if (Array.isArray(data.messages)) {
        data.messages.forEach((m) => toast.success(m));
      } else if (data.message) {
        toast.success(data.message);
      } else {
        toast.success("Work order created");
      }
      setId(data?.id || "");
      setWorkOrderNumber(data?.workOrderNumber || "");
    } catch (err) {
      console.log("error", err);
      const errData = err.response?.data;
      if (errData) {
        if (Array.isArray(errData.messages)) {
          errData.messages.forEach((m) => toast.error(m));
        } else if (errData.message) {
          toast.error(errData.message);
        } else {
          toast.error("Failed to create work order");
        }
      } else {
        toast.error("Network error");
      }
    }
  };

  // 3) NEW: generate handler
  const handleGenerate = async (formData) => {
    console.log("id", id);
    if (!token || !id) return;
    try {
      // build the exact API body
      const payload = {
        startMacId: formData.startMacId,
        requiredPerDevice: Number(formData.requireMacPerDevice),
        startHwSnPrefix: formData.startHwSnPrefix,
        startHwSnSuffix: formData.startHwSnSuffix,
        ...(workOrderData.itemType === "ONT"
          ? { startPonSnPrefix: formData.startPonSnPrefix }
          : {}),
        macVendorName: formData.macVendorName,
        macIdRequired: formData.macIdRequired,
      };
      console.log("paylaod of handleGenerate", payload);

      const { data } = await axios.patch(
        `https://mac-backend-two.vercel.app/macGenerator/${id}/generate`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("data of handelGenerate", data);
      setId_new(data?.id);
      console.log("id in hanldeGenerate after response", id);

      toast.success(data.message || "Parameters saved");
      setWorkOrderNumber(data.workOrderNumber || workOrderNumber);
      setId(data.id || id);
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || "Failed to save parameters";
      toast.error(msg);
    }
  };

  // 5) Logout
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    router.push("/");
  };

  return (
    <>
      <Toaster richColors position="top-right" />
      <div className="min-h-screen bg-gray-50">
        <Dashboard
          onLogout={handleLogout}
          workOrderData={workOrderData}
          setWorkOrderData={setWorkOrderData}
          workOrderNumber={workOrderNumber}
          onDraft={handleDraft}
          onNext={handleNext}
          onGenerate={handleGenerate}
          id_new={id_new}
          id={id}
        />
      </div>
    </>
  );
}
