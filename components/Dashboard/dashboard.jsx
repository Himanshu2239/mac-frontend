// components/Dashboard/dashboard.jsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import WorkOrderForm from "./work-order-form";
import SearchForm from "./search-form";
import WorkOrderDetails from "./work-order-details";

export default function Dashboard({
  user,
  onLogout,
  workOrderData,
  setWorkOrderData,
  workOrderNumber,
  onDraft,
  onNext,
  onGenerate,
  id,
  id_new,
}) {
  // Stack of views
  const [viewHistory, setViewHistory] = useState(["generate-form"]);
  const currentView = viewHistory[viewHistory.length - 1];

  const pushView = (view) => {
    setViewHistory((h) => [...h, view]);
  };

  const handleGenerateTab = () => pushView("generate-form");
  const handleSearchTab = () => pushView("search");

  const handleNext = (data) => {
    onNext(data);
    pushView("generate-details");
  };

  const handleBack = () => {
    if (viewHistory.length > 1) {
      setViewHistory((h) => {
        const nh = [...h];
        nh.pop();
        return nh;
      });
      // if we return to the blank form, trigger draft-reset
      if (viewHistory[viewHistory.length - 2] === "generate-form") {
        onDraft();
      }
    }
    // else: do nothing
  };

  const isBackDisabled = viewHistory.length <= 1;

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Work Order Management System
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Welcome, Admin</span>

            {/* Back Button */}
            <Button
              onClick={handleBack}
              variant="outline"
              disabled={isBackDisabled}
              className={`flex items-center ${
                isBackDisabled
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-100"
              }`}
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </Button>

            {/* Logout */}
            <Button onClick={onLogout} variant="outline">
              Logout
            </Button>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-80">
            <div className="bg-white rounded-3xl border-4 border-green-400 p-6 shadow-lg">
              <div className="space-y-4">
                <Button
                  onClick={handleGenerateTab}
                  className={`w-full h-12 font-medium rounded-lg ${
                    currentView === "generate-form" ||
                    currentView === "generate-details"
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  }`}
                >
                  GENERATE
                </Button>
                <Button
                  onClick={handleSearchTab}
                  className={`w-full h-12 font-medium rounded-lg ${
                    currentView === "search"
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  }`}
                >
                  SEARCH
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {currentView === "generate-form" && !workOrderNumber && (
              <WorkOrderForm
                workOrderData={workOrderData}
                setWorkOrderData={setWorkOrderData}
                onDraft={onDraft}
                onNext={handleNext}
              />
            )}
            {currentView === "generate-details" && workOrderNumber && (
              <WorkOrderDetails
                workOrderNumber={workOrderNumber}
                workOrderData={workOrderData}
                id={id}
                onGenerate={onGenerate}
                id_new={id_new}
              />
            )}
            {currentView === "search" && <SearchForm id={id} />}
          </div>
        </div>
      </div>
    </div>
  );
}
