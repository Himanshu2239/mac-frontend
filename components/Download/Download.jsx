// components/Download.jsx
"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { Button } from "@/components/ui/button";
import { Toaster, toast } from "sonner";

export default function Download({ id, workOrderNumber }) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!id || !token) return;

    axios
      .get(`https://mac-backend-two.vercel.app/macGenerator/${id}/results`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setResults(res.data.results || []);
      })
      .catch((err) => {
        console.error("Error fetching generation results:", err);
        toast.error("Failed to load data.");
      });
  }, [id]);

  const handleDownloadExcel = () => {
    if (!results.length) {
      toast.error("No data available for download.");
      return;
    }

    // Dynamically get headers from first object
    const headers = Object.keys(results[0]);
    const worksheet = XLSX.utils.json_to_sheet(results, { header: headers });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Results");

    const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([wbout], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `generation_results_${workOrderNumber || id}.xlsx`;
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(a);

    toast.success("Excel download started.");
  };

  return (
    <>
      <Toaster richColors position="top-right" />
      <div className="flex flex-col items-center justify-center h-full p-8 space-y-6 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <h2 className="text-2xl font-semibold text-gray-800">
          Work Order:{" "}
          <span className="font-mono text-purple-600">{workOrderNumber}</span>
        </h2>
        <Button
          onClick={handleDownloadExcel}
          className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full shadow-lg transition-transform transform hover:scale-105"
        >
          Download Excel
        </Button>
      </div>
    </>
  );
}
