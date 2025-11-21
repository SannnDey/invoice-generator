"use client";

import InvoiceForm from "@/app/components/InvoiceForm";
import InvoicePreview from "@/app/components/InvoicePreview";
import { useState } from "react";
import type { InvoiceData } from "@/app/model/invoice";

export default function InvoicePage() {
  const [data, setData] = useState<InvoiceData | null>(null);

const generateInvoiceNumber = () => {
  const random = Math.floor(10000 + Math.random() * 90000); // 5 digit acak
  return `INV-${random}`;
};

  const handleGenerate = (form: Omit<InvoiceData, "invoiceNumber" | "invoiceDate">) => {
    const invoice: InvoiceData = {
      ...form,
      invoiceNumber: generateInvoiceNumber(),
      invoiceDate: new Date().toLocaleDateString("id-ID"),
    };
    setData(invoice);
  };

  return (
    <div className="p-10 max-w-4xl mx-auto text-neutral-200">
      <h1 className="text-3xl font-bold mb-6 text-white">Invoice Generator</h1>

      <InvoiceForm onGenerate={handleGenerate} />

      {data && (
        <div className="mt-10">
          <InvoicePreview data={data} />
        </div>
      )}
    </div>
  );
}
