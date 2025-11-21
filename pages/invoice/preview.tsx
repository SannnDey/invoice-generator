"use client";

import InvoicePreview from "@/features/invoice/components/InvoicePreview";
import { useInvoiceStore } from "@/features/invoice/store/invoiceStore";
import { dummyInvoice } from "@/features/invoice/data/invoiceDummy";

export default function PreviewPage() {
  const { invoice, isGenerated } = useInvoiceStore();
  const previewInvoice = isGenerated ? invoice : dummyInvoice;

  return (
    <div className="p-6 max-w-4xl mx-auto text-white bg-neutral-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Preview Invoice</h1>
      <InvoicePreview data={previewInvoice} />
    </div>
  );
}
