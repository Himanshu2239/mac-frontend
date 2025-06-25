// components/Dashboard/dashboard.jsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
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
  id_new
}) {
  const [activeTab, setActiveTab] = useState("generate");

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Work Order Management System
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Welcome, {user || "Guest"}</span>
            <Button onClick={onLogout} variant="outline">
              Logout
            </Button>
          </div>
        </div>

        <div className="flex gap-6">
          <div className="w-80">
            <div className="bg-white rounded-3xl border-4 border-green-400 p-6 shadow-lg">
              <div className="space-y-4">
                <Button
                  onClick={() => setActiveTab("generate")}
                  className={`w-full h-12 font-medium rounded-lg ${
                    activeTab === "generate"
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  }`}
                >
                  GENERATE
                </Button>
                <Button
                  onClick={() => setActiveTab("search")}
                  className={`w-full h-12 font-medium rounded-lg ${
                    activeTab === "search"
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  }`}
                >
                  SEARCH
                </Button>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="flex-1">
            {activeTab === "generate" && !workOrderNumber && (
              <WorkOrderForm
                workOrderData={workOrderData}
                setWorkOrderData={setWorkOrderData}
                onDraft={onDraft}
                onNext={onNext}
              />
            )}
            {activeTab === "generate" && workOrderNumber && (
              <WorkOrderDetails
                workOrderNumber={workOrderNumber}
                workOrderData={workOrderData}
                id={id}
                onGenerate={onGenerate}
                id_new={id_new}
              />
            )}
            {activeTab === "search" && <SearchForm id={id} />}
          </div>
        </div>
      </div>
    </div>
  );
}
