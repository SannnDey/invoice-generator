"use client";

import InvoiceForm from "@/features/invoice/components/InvoiceForm";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";

export default function FormPage() {
  const router = useRouter();

  return (
    <div className="p-6 max-w-4xl mx-auto text-white bg-neutral-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Invoice Generator</h1>
      <InvoiceForm />
      <div className="flex justify-center mt-4">
        <Button
          className="border border-neutral-700 rounded px-6 py-2"
          onClick={() => router.push("/invoice/preview")}
        >
          History Preview
        </Button>
      </div>
    </div>
  );
}
