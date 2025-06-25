"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Download from "../Download/Download";

export default function WorkOrderDetails({
  workOrderNumber,
  workOrderData,
  id = "",
  onGenerate,
  id_new = "",
}) {
  const isOnt = workOrderData.itemType === "ONT";
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    startMacId: "",
    requireMacPerDevice: "",
    startHwSnPrefix: "",
    startHwSnSuffix: "",
    startPonSnPrefix: "",
    macVendorName: "",
    macIdRequired: false,
  });

  const handleInputChange = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSubmitAndCreate = async () => {
    await onGenerate(formData);
    setSubmitted(true);
  };

  if (submitted) return <Download id={id} workOrderNumber={workOrderNumber} />;

  return (
    <div className="flex gap-6 p-6 bg-gray-50">
      <div className="flex-1 bg-white rounded-xl border-2 border-green-400 p-6 shadow">
        <h2 className="text-lg font-semibold text-center mb-4">
          MAC Configuration
        </h2>
        <div className="space-y-4">
          {/* Start MAC ID */}
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="startMacId">Start MAC ID</Label>
            <Input
              id="startMacId"
              value={formData.startMacId}
              onChange={(e) => handleInputChange("startMacId", e.target.value)}
              placeholder="eg. 00:11:22:33:44:55"
            />
          </div>

          {/* Require MAC Per Device */}
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="requireMacPerDevice">Require MAC Per Device</Label>
            <Input
              id="requireMacPerDevice"
              type="number"
              value={formData.requireMacPerDevice}
              onChange={(e) =>
                handleInputChange("requireMacPerDevice", e.target.value)
              }
              placeholder="Number"
            />
          </div>

          {/* Start HW SN */}
          <div className="grid grid-cols-2 items-center gap-4">
            <Label>Start HW SN</Label>
            <div className="flex gap-2">
              <Input
                placeholder="PREFIX"
                value={formData.startHwSnPrefix}
                onChange={(e) =>
                  handleInputChange("startHwSnPrefix", e.target.value)
                }
              />
              <Input
                placeholder="SUFFIX"
                value={formData.startHwSnSuffix}
                onChange={(e) =>
                  handleInputChange("startHwSnSuffix", e.target.value)
                }
              />
            </div>
          </div>

          {/* Start PON SN Prefix – only for ONT */}
          {isOnt && (
            <div className="grid grid-cols-2 items-center gap-4">
              <Label htmlFor="startPonSnPrefix">Start PON SN (Prefix)</Label>
              <Input
                id="startPonSnPrefix"
                placeholder="PREFIX"
                value={formData.startPonSnPrefix}
                onChange={(e) =>
                  handleInputChange("startPonSnPrefix", e.target.value)
                }
              />
            </div>
          )}

          {/* MAC Vendor Name */}
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="macVendorName">MAC Vendor Name</Label>
            <Input
              id="macVendorName"
              value={formData.macVendorName}
              onChange={(e) =>
                handleInputChange("macVendorName", e.target.value)
              }
              placeholder="Vendor"
            />
          </div>

          {/* MAC Key Required? */}
          <div className="grid grid-cols-2 items-center gap-4">
            <Label>Include MAC-KEY?</Label>
            <div className="flex items-center gap-6">
              <div className="flex items-center">
                <Input
                  id="macIdRequiredYes"
                  type="radio"
                  name="macIdRequired"
                  value="true"
                  checked={formData.macIdRequired === true}
                  onChange={(e) =>
                    handleInputChange(
                      "macIdRequired",
                      e.target.value === "true"
                    )
                  }
                />
                <Label htmlFor="macIdRequiredYes" className="ml-2">
                  Yes
                </Label>
              </div>
              <div className="flex items-center">
                <Input
                  id="macIdRequiredNo"
                  type="radio"
                  name="macIdRequired"
                  value="false"
                  checked={formData.macIdRequired === false}
                  onChange={(e) =>
                    handleInputChange(
                      "macIdRequired",
                      e.target.value === "true"
                    )
                  }
                />
                <Label htmlFor="macIdRequiredNo" className="ml-2">
                  No
                </Label>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center mt-6">
          <Button onClick={handleSubmitAndCreate}>Submit</Button>
        </div>
      </div>
    </div>
  );
}

// // components/Dashboard/work-order-details.jsx
// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import Download from "../Download/Download";

// export default function WorkOrderDetails({
//   workOrderNumber,
//   workOrderData,
//   id = "",
//   onGenerate,
//   id_new=""
// }) {
//   const isOnt = workOrderData.itemType === "ONT";
//   const [submitted, setSubmitted] = useState(false);
//   const [formData, setFormData] = useState({
//     startMacId: "",
//     requireMacPerDevice: "",
//     startHwSnPrefix: "",
//     startHwSnSuffix: "",
//     startPonSnPrefix: "",
//     macVendorName: "",
//   });

//   const handleInputChange = (field, value) =>
//     setFormData((p) => ({ ...p, [field]: value }));

//   const handleSubmitAndCreate = async () => {
//     await onGenerate(formData);
//     setSubmitted(true);
//   };

//   if (submitted) return <Download id={id} workOrderNumber={workOrderNumber}/>;

//   return (
//     <div className="flex gap-6 p-6 bg-gray-50">
//       <div className="flex-1 bg-white rounded-xl border-2 border-green-400 p-6 shadow">
//         <h2 className="text-lg font-semibold text-center mb-4">
//           MAC Configuration
//         </h2>
//         <div className="space-y-4">
//           {/* Start MAC ID */}
//           <div className="grid grid-cols-2 items-center gap-4">
//             <Label htmlFor="startMacId">Start MAC ID</Label>
//             <Input
//               id="startMacId"
//               value={formData.startMacId}
//               onChange={(e) => handleInputChange("startMacId", e.target.value)}
//               placeholder="eg. 00:11:22:33:44:55"
//             />
//           </div>

//           {/* Require MAC Per Device */}
//           <div className="grid grid-cols-2 items-center gap-4">
//             <Label htmlFor="requireMacPerDevice">Require MAC Per Device</Label>
//             <Input
//               id="requireMacPerDevice"
//               value={formData.requireMacPerDevice}
//               onChange={(e) =>
//                 handleInputChange("requireMacPerDevice", e.target.value)
//               }
//               placeholder="Number"
//             />
//           </div>

//           {/* Start HW SN */}
//           <div className="grid grid-cols-2 items-center gap-4">
//             <Label>Start HW SN</Label>
//             <div className="flex gap-2">
//               <Input
//                 placeholder="PREFIX"
//                 value={formData.startHwSnPrefix}
//                 onChange={(e) =>
//                   handleInputChange("startHwSnPrefix", e.target.value)
//                 }
//               />
//               <Input
//                 placeholder="SUFFIX"
//                 value={formData.startHwSnSuffix}
//                 onChange={(e) =>
//                   handleInputChange("startHwSnSuffix", e.target.value)
//                 }
//               />
//             </div>
//           </div>

//           {/* Start PON SN Prefix – only for ONT */}
//           {isOnt && (
//             <div className="grid grid-cols-2 items-center gap-4">
//               <Label htmlFor="startPonSnPrefix">Start PON SN (Prefix)</Label>
//               <Input
//                 id="startPonSnPrefix"
//                 placeholder="PREFIX"
//                 value={formData.startPonSnPrefix}
//                 onChange={(e) =>
//                   handleInputChange("startPonSnPrefix", e.target.value)
//                 }
//               />
//             </div>
//           )}

//           {/* MAC Vendor Name */}
//           <div className="grid grid-cols-2 items-center gap-4">
//             <Label htmlFor="macVendorName">MAC Vendor Name</Label>
//             <Input
//               id="macVendorName"
//               value={formData.macVendorName}
//               onChange={(e) =>
//                 handleInputChange("macVendorName", e.target.value)
//               }
//               placeholder="Vendor"
//             />
//           </div>
//         </div>

//         {/* Submit Button */}
//         <div className="text-center mt-6">
//           <Button onClick={handleSubmitAndCreate}>Submit</Button>
//         </div>
//       </div>
//     </div>
//   );
// }
