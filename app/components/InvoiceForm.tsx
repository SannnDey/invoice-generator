"use client";

import { useState } from "react";
import type { InvoiceData, InvoiceItem } from "@/app/model/invoice";
import { formatRupiah, parseNumber } from "@/app/utils/currency";

interface InvoiceFormProps {
  onGenerate: (data: Omit<InvoiceData, "invoiceNumber" | "invoiceDate">) => void;
}

type FormState = Omit<InvoiceData, "invoiceNumber" | "invoiceDate">;

export default function InvoiceForm({ onGenerate }: InvoiceFormProps) {
  const [form, setForm] = useState<FormState>({
    customerName: "",
    customerPhone: "",
    customerAddress: "",
    items: [{ name: "", qty: 0, price: 0 }],
  });

  const updateItem = (index: number, field: keyof InvoiceItem, value: any) => {
    const items = [...form.items];
    const target = items[index];

    if (field === "price") target.price = parseNumber(value);
    else if (field === "qty") target.qty = Number(value);
    else target.name = value;

    setForm({ ...form, items });
  };

  const addItem = () => {
    setForm({
      ...form,
      items: [...form.items, { name: "", qty: 0, price: 0 }],
    });
  };

  const removeItem = (index: number) => {
    setForm({
      ...form,
      items: form.items.filter((_, i) => i !== index),
    });
  };

  const total = form.items.reduce((sum, item) => sum + item.qty * item.price, 0);

  return (
    <div className="border border-neutral-700 p-6 rounded-lg bg-neutral-900 shadow-md text-neutral-200">
      <h2 className="text-xl font-semibold mb-4 text-white">Invoice Information</h2>

      <div className="grid grid-cols-2 gap-4">
        {["customerName", "customerPhone"].map((field) => (
          <input
            key={field}
            className="border border-neutral-700 bg-neutral-800 text-neutral-200 p-3 rounded"
            placeholder={field === "customerName" ? "Customer Name" : "Phone Number"}
            value={form[field as keyof FormState] as string}
            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
          />
        ))}
      </div>

      <textarea
        className="border border-neutral-700 bg-neutral-800 text-neutral-200 p-3 rounded w-full mt-4"
        placeholder="Customer Address"
        value={form.customerAddress}
        onChange={(e) =>
          setForm({ ...form, customerAddress: e.target.value })
        }
      />

      <h3 className="mt-6 font-semibold text-white">Items</h3>

      {form.items.map((item, i) => (
        <div key={i} className="grid grid-cols-4 gap-4 mt-3 items-center">
          <input
            className="border bg-neutral-800 p-2 rounded"
            placeholder="Item Name"
            value={item.name}
            onChange={(e) => updateItem(i, "name", e.target.value)}
          />

          <input
            className="border bg-neutral-800 p-2 rounded"
            type="number"
            min={1}
            placeholder="Qty"
            value={item.qty || ""}
            onChange={(e) => updateItem(i, "qty", e.target.value)}
          />

          <input
            className="border bg-neutral-800 p-2 rounded"
            placeholder="Price (Rp)"
            value={formatRupiah(item.price)}
            onChange={(e) => updateItem(i, "price", e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addItem();
              }
            }}
          />

          <button
            onClick={() => removeItem(i)}
            className="text-red-400 hover:text-red-300"
          >
            ✕ Remove
          </button>
        </div>
      ))}

      <button
        className="mt-3 bg-neutral-700 hover:bg-neutral-600 text-white px-4 py-2 rounded w-full"
        onClick={addItem}
      >
        + Add Item
      </button>

      <div className="text-right text-lg font-semibold mt-4 text-white">
        Total: <span className="text-green-400">{formatRupiah(total)}</span>
      </div>

      <button
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg w-full"
        onClick={() => onGenerate(form)}
      >
        Generate Invoice
      </button>
    </div>
  );
}
