"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Toaster, toast } from "sonner";
import SearchNextForm from "../UpdateForm/SearchNextForm";

const filterOptions = [
  { key: "workOrderNumber", label: "Work Order Number" },
  { key: "date", label: "Date" },
];

export default function MacGeneratorSearch() {
  const [results, setResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("workOrderNumber");
  const [dateSortOrder, setDateSortOrder] = useState("latest");
  const [workOrderData, setWorkOrderData] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [newId, setNewId] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  const fetchResults = async (payload) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        "http://127.0.0.1:8000/macGenerator/search",
        { ...payload, page, limit },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
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
        `http://127.0.0.1:8000/macGenerator/${id}/validate`,
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

  // Fetch when filters, sorting or page changes
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
              size="icon"
              className="absolute top-2 right-2"
              onClick={(e) => {
                e.stopPropagation();
                const blob = new Blob([JSON.stringify(r, null, 2)], {
                  type: "application/json",
                });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `${r.workOrderNumber}.json`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
              }}
            >
              <Download className="h-5 w-5" />
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

      {/* Pagination Controls */}
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

// // components/Dashboard/MacGeneratorSearch.jsx
// "use client";

// import { useState, useEffect, useCallback } from "react";
// import axios from "axios";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { Download, ArrowRight } from "lucide-react";
// import { Toaster, toast } from "sonner";
// import SearchNextForm from "../UpdateForm/SearchNextForm";

// const filterOptions = [
//   { key: "workOrderNumber", label: "Work Order Number" },
//   // { key: "customerName", label: "Customer Name" },
//   // { key: "itemType", label: "Item Type" },
//   // { key: "startMacId", label: "Start MAC ID" },
//   { key: "date", label: "Date" },
// ];

// export default function MacGeneratorSearch() {
//   const [results, setResults] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedFilter, setSelectedFilter] = useState("workOrderNumber");
//   const [dateSortOrder, setDateSortOrder] = useState("latest");
//   const [workOrderData, setWorkOrderData] = useState("");
//   const [submitted, setSubmitted] = useState(false);
//   const [newId, setNewId] = useState("");

//   const fetchResults = async (payload) => {
//     console.log("paylaod", payload);
//     try {
//       const token = localStorage.getItem("accessToken");
//       const response = await axios.post(
//         "http://127.0.0.1:8000/macGenerator/search",
//         payload,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       console.log("response of fetchResults", response);
//       setResults(response.data.data || []);
//     } catch (err) {
//       console.error("Fetch error:", err);
//       setResults([]);
//     }
//   };

//   const handleValidate = async (id) => {
//     try {
//       const token = localStorage.getItem("accessToken");
//       const resp = await axios.get(
//         `http://127.0.0.1:8000/macGenerator/${id}/validate`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       const { upToDate, message } = resp.data;
//       setWorkOrderData(resp.data.workOrderData);
//       if (resp.data.message === "Work-order is up to date.") {
//         setSubmitted(false);
//       }
//       if (
//         resp.data.message ===
//         "Navigating to form component: Please update the work-order to generate excel file."
//       ) {
//         setSubmitted(true);
//       }

//       setNewId(id);
//       if (upToDate) toast.success(message);
//       else toast.error(message);
//     } catch (err) {
//       console.error("Validation error:", err);
//       toast.error("Unable to validate work-order.");
//     }
//   };

//   useEffect(() => {
//     if (selectedFilter === "date") {
//       fetchResults({ date: dateSortOrder });
//     } else if (searchQuery.trim()) {
//       fetchResults({ [selectedFilter]: searchQuery.trim() });
//     } else {
//       setResults([]);
//     }
//   }, [searchQuery, selectedFilter, dateSortOrder]);

//   const placeholder = `Search by ${
//     filterOptions.find((f) => f.key === selectedFilter).label
//   }`;
//   if (submitted)
//     return <SearchNextForm id={newId} workOrderData={workOrderData} />;

//   return (
//     <div className="p-8">
//       <Toaster position="top-right" />
//       <h1 className="text-2xl font-bold mb-4">Search Work Orders</h1>

//       <div className="space-y-4 mb-6">
//         <div className="flex flex-wrap gap-2">
//           {filterOptions.map((opt) => (
//             <button
//               key={opt.key}
//               className={`px-3 py-1 rounded ${
//                 selectedFilter === opt.key
//                   ? "bg-blue-600 text-white"
//                   : "bg-gray-200"
//               }`}
//               onClick={() => {
//                 setSelectedFilter(opt.key);
//                 setSearchQuery("");
//               }}
//             >
//               {opt.label}
//             </button>
//           ))}
//           {selectedFilter === "date" && (
//             <button
//               className="px-3 py-1 bg-gray-200 rounded"
//               onClick={() =>
//                 setDateSortOrder((d) => (d === "latest" ? "oldest" : "latest"))
//               }
//             >
//               {dateSortOrder === "latest" ? "Latest" : "Oldest"}
//             </button>
//           )}
//         </div>

//         {selectedFilter !== "date" && (
//           <Input
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             placeholder={placeholder}
//           />
//         )}
//       </div>

//       <div className="space-y-4">
//         {results.map((r, idx) => (
//           <Card
//             key={idx}
//             className="relative cursor-pointer transform transition hover:scale-105 active:scale-95"
//             onClick={() => handleValidate(r._id)}
//           >
//             <Button
//               variant="ghost"
//               size="icon"
//               className="absolute top-2 right-2"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 const blob = new Blob([JSON.stringify(r, null, 2)], {
//                   type: "application/json",
//                 });
//                 const url = URL.createObjectURL(blob);
//                 const a = document.createElement("a");
//                 a.href = url;
//                 a.download = `${r.workOrderNumber}.json`;
//                 document.body.appendChild(a);
//                 a.click();
//                 document.body.removeChild(a);
//                 URL.revokeObjectURL(url);
//               }}
//             >
//               <Download className="h-5 w-5" />
//             </Button>
//             <CardContent>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                 <div>
//                   <Label>Work Order No.</Label>
//                   <p>{r.workOrderNumber}</p>
//                 </div>
//                 <div>
//                   <Label>Customer</Label>
//                   <p>{r.customerName}</p>
//                 </div>
//                 {r.macId && (
//                   <div>
//                     <Label>MAC ID</Label>
//                     <p className="font-mono">{r.macId}</p>
//                   </div>
//                 )}
//                 {r.hwSn && (
//                   <div>
//                     <Label>HW-SN</Label>
//                     <p>{r.hwSn}</p>
//                   </div>
//                 )}
//                 {r.ponSn && (
//                   <div>
//                     <Label>PON-SN</Label>
//                     <p>{r.ponSn}</p>
//                   </div>
//                 )}
//                 {r.macKey && (
//                   <div>
//                     <Label>MAC-KEY</Label>
//                     <p className="font-mono break-all">{r.macKey}</p>
//                   </div>
//                 )}
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }
