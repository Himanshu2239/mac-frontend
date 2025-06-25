"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function WorkOrderForm({
  workOrderData,
  setWorkOrderData,
  onDraft,
  onNext,
  id = "",
}) {
  const handleInputChange = (field, value) => {
    setWorkOrderData((prev) => ({ ...prev, [field]: value }));
  };


  return (
    <div className="bg-white rounded-3xl border-4 border-green-400 p-8 shadow-lg">
      <h2 className="text-xl font-bold mb-6 text-center">
        Generate Work Order
      </h2>

      <div className="grid grid-cols-2 gap-6">
        {[
          { label: "Customer Name", field: "customerName", type: "text" },
          { label: "Customer PO", field: "customerPo", type: "text" },
          { label: "Customer PO Date", field: "customerPoDate", type: "date" },
          { label: "Customer Model", field: "customerModel", type: "text" },
          { label: "OEM Model", field: "oemModel", type: "text" },
          { label: "ODM Model", field: "odmModel", type: "text" },
          { label: "Item Quantity", field: "itemQuantity", type: "number" },
        ].map(({ label, field, type }) => (
          <div className="space-y-2" key={field}>
            <Label className="text-sm font-semibold text-gray-700 uppercase tracking-wide block">
              {label}
            </Label>
            <Input
              type={type}
              value={workOrderData[field]}
              onChange={(e) => handleInputChange(field, e.target.value)}
              className="h-12 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              placeholder={`Enter ${label.toLowerCase()}`}
            />
          </div>
        ))}

        {/* Item Type */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-gray-700 uppercase tracking-wide block">
            Item Type
          </Label>
          <RadioGroup
            value={workOrderData.itemType}
            onValueChange={(v) => handleInputChange("itemType", v)}
            className="flex gap-4 mt-2"
          >
            {["ONT", "SWITCH"].map((val) => (
              <div className="flex items-center space-x-2" key={val}>
                <RadioGroupItem value={val} id={val} />
                <Label
                  htmlFor={val}
                  className="border-2 border-gray-300 px-6 py-2 rounded-lg cursor-pointer hover:bg-gray-50 font-medium"
                >
                  {val}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 flex justify-center space-x-4">
        <Button onClick={onDraft} className="bg-gray-500 hover:bg-gray-600">
          Save Draft
        </Button>
        <Button onClick={onNext} className="bg-blue-600 hover:bg-blue-700">
          Next
        </Button>
      </div>
    </div>
  );
}
