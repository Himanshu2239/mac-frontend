"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Download as DownloadIcon } from "lucide-react";
import { Toaster, toast } from "sonner";
import SearchNextForm from "../UpdateForm/SearchNextForm";
import Download from "../Download/Download";

const filterOptions = [
  { key: "workOrderNumber", label: "Work Order Number" },
  { key: "date", label: "Date" },
];

// ➤ Format createdAt to "04 Jul 2025" (Asia/Kolkata)
function formatDateKolkata(isoDate) {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(isoDate));
}

// ➤ Calculate next MAC ID without colons (e.g., "84F1D00925E8")
function getNextMacId(startMacId, requiredPerDevice, itemQuantity) {
  try {
    const macInt = parseInt(startMacId, 16);
    const increment = requiredPerDevice * itemQuantity;
    const nextMacInt = macInt + increment;
    return nextMacInt.toString(16).toUpperCase().padStart(12, "0");
  } catch {
    return "Invalid MAC";
  }
}

export default function MacGeneratorSearch() {
  const [results, setResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("date");
  const [dateSortOrder, setDateSortOrder] = useState("latest");
  const [workOrderData, setWorkOrderData] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [newId, setNewId] = useState("");
  const [downloadProps, setDownloadProps] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 10;

  const fetchResults = async (payload) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        "https://mac-backend-two.vercel.app/macGenerator/search",
        { ...payload, page, limit },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response of fetchResults", response.data);
      setResults(response.data.data || []);
    } catch (err) {
      console.error("Fetch error:", err);
      setResults([]);
    }
  };

  const handleValidate = async (id) => {
    try {
      const token = localStorage.getItem("accessToken");
      const resp = await axios.get(
        `https://mac-backend-two.vercel.app/macGenerator/${id}/validate`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const { upToDate, message, workOrderData } = resp.data;
      setWorkOrderData(workOrderData);
      setSubmitted(message.includes("Navigating to form component"));
      setNewId(id);
      upToDate ? toast.success(message) : toast.error(message);
    } catch (err) {
      console.error("Validation error:", err);
      toast.error("Unable to validate work-order.");
    }
  };

  useEffect(() => {
    if (selectedFilter === "date") {
      fetchResults({ date: dateSortOrder });
    } else if (searchQuery.trim()) {
      fetchResults({ [selectedFilter]: searchQuery.trim() });
    } else {
      setResults([]);
    }
  }, [searchQuery, selectedFilter, dateSortOrder, page]);

  const handleFilterClick = (key) => {
    setSelectedFilter(key);
    setSearchQuery("");
    setPage(1);
  };

  const toggleDateSort = () => {
    setDateSortOrder((d) => (d === "latest" ? "oldest" : "latest"));
    setPage(1);
  };

  const placeholder = `Search by ${
    filterOptions.find((f) => f.key === selectedFilter).label
  }`;

  if (downloadProps) {
    return (
      <Download
        id={downloadProps.id}
        workOrderNumber={downloadProps.workOrderNumber}
      />
    );
  }

  if (submitted) {
    return <SearchNextForm id={newId} workOrderData={workOrderData} />;
  }

  return (
    <div className="p-8">
      <Toaster position="top-right" />
      <h1 className="text-2xl font-bold mb-4">Search Work Orders</h1>

      <div className="space-y-4 mb-6">
        <div className="flex flex-wrap gap-2">
          {filterOptions.map((opt) => (
            <button
              key={opt.key}
              className={`px-3 py-1 rounded ${
                selectedFilter === opt.key
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => handleFilterClick(opt.key)}
            >
              {opt.label}
            </button>
          ))}
          {selectedFilter === "date" && (
            <button
              className="px-3 py-1 bg-gray-200 rounded"
              onClick={toggleDateSort}
            >
              {dateSortOrder === "latest" ? "Latest" : "Oldest"}
            </button>
          )}
        </div>

        {selectedFilter !== "date" && (
          <Input
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(1);
            }}
            placeholder={placeholder}
          />
        )}
      </div>

      <div className="space-y-4">
        {results.map((r, idx) => (
          <Card
            key={idx}
            className="relative cursor-pointer transform transition hover:scale-105 active:scale-95"
            onClick={() => handleValidate(r._id)}
          >
            <Button
              variant="ghost"
              className="absolute top-2 right-2 flex items-center px-2 py-1"
              onClick={(e) => {
                e.stopPropagation();
                setDownloadProps({
                  id: r._id,
                  workOrderNumber: r.workOrderNumber,
                });
              }}
            >
              <DownloadIcon className="h-8 w-8 mr-2" />
              Download
            </Button>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <Label>Work Order No.</Label>
                  <p>{r.workOrderNumber}</p>
                </div>
                <div>
                  <Label>Customer</Label>
                  <p>{r.customerName}</p>
                </div>
                <div>
                  <Label>Created At</Label>
                  <p>{formatDateKolkata(r.createdAt)}</p>
                </div>
                <div>
                  <Label>Next MAC ID</Label>
                  <p className="font-mono">
                    {getNextMacId(
                      r.startMacId,
                      r.requiredPerDevice,
                      r.itemQuantity
                    )}
                  </p>
                </div>
                {r.macId && (
                  <div>
                    <Label>MAC ID</Label>
                    <p className="font-mono">{r.macId}</p>
                  </div>
                )}
                {r.hwSn && (
                  <div>
                    <Label>HW-SN</Label>
                    <p>{r.hwSn}</p>
                  </div>
                )}
                {r.ponSn && (
                  <div>
                    <Label>PON-SN</Label>
                    <p>{r.ponSn}</p>
                  </div>
                )}
                {r.macKey && (
                  <div>
                    <Label>MAC-KEY</Label>
                    <p className="font-mono break-all">{r.macKey}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center items-center mt-6 space-x-4">
        <Button
          variant="outline"
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </Button>
        <span>Page {page}</span>
        <Button
          variant="outline"
          onClick={() => setPage((p) => p + 1)}
          disabled={results.length < limit}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
