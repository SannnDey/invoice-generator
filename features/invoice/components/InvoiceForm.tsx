"use client";

import { useInvoiceStore } from "../store/invoiceStore";
import { generateInvoiceNumber, saveInvoice } from "../services/invoiceService";
import type { InvoiceData } from "../types/invoice";
import Button from "@/components/Button";
import { formatRupiah, parseNumber } from "@/utils/currency";
import { useRouter } from "next/navigation";

function CustomerInput({
  label,
  value,
  onChange,
  isTextArea = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  isTextArea?: boolean;
}) {
  const baseClass = "w-full p-2 border rounded bg-neutral-800";

  return isTextArea ? (
    <textarea
      className={baseClass}
      placeholder={label}
      rows={2}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  ) : (
    <input
      className={baseClass}
      placeholder={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

function QtyInput({
  value,
  onChange,
}: {
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <div className="flex items-center border rounded bg-neutral-800">
      <button
        type="button"
        className="px-3 py-2 text-lg text-neutral-300 hover:bg-neutral-700"
        onClick={() => onChange(Math.max(0, value - 1))}
      >
        –
      </button>

      <input
        type="text"
        className="w-full p-2 text-center bg-neutral-800"
        placeholder="Qty"
        value={value === 0 ? "" : value}
        onChange={(e) =>
          onChange(Number(e.target.value.replace(/[^0-9]/g, "")) || 0)
        }
      />

      <button
        type="button"
        className="px-3 py-2 text-lg text-neutral-300 hover:bg-neutral-700"
        onClick={() => onChange(value + 1)}
      >
        +
      </button>
    </div>
  );
}

function PriceInput({
  value,
  onChange,
}: {
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <input
      className="p-2 border rounded bg-neutral-800"
      placeholder="Price"
      value={formatRupiah(value)}
      onChange={(e) => onChange(parseNumber(e.target.value))}
    />
  );
}

export default function InvoiceForm() {
  const { invoice, setInvoice, addItem, removeItem, updateItem, markGenerated } =
    useInvoiceStore();

  const router = useRouter();

  if (invoice.items.length === 0) {
    addItem({ name: "", qty: 1, price: 0 });
  }

  const handleGenerate = () => {
    const newInvoice: InvoiceData = {
      ...invoice,
      invoiceNumber: generateInvoiceNumber(),
      invoiceDate: new Date().toLocaleDateString("id-ID"),
    };

    setInvoice(newInvoice);
    markGenerated();
    saveInvoice(newInvoice);
    router.push("/invoice/preview");
  };

  const total = invoice.items.reduce(
    (sum, i) => sum + i.qty * i.price,
    0
  );

  return (
    <div className="border p-6 rounded-lg bg-neutral-900 text-neutral-200 space-y-6">

      <h2 className="text-xl font-bold">Invoice Information</h2>

      <CustomerInput
        label="Customer Name"
        value={invoice.customerName}
        onChange={(v) => setInvoice({ ...invoice, customerName: v })}
      />

      <CustomerInput
        label="Phone"
        value={invoice.customerPhone}
        onChange={(v) => setInvoice({ ...invoice, customerPhone: v })}
      />

      <CustomerInput
        label="Address"
        value={invoice.customerAddress}
        onChange={(v) => setInvoice({ ...invoice, customerAddress: v })}
        isTextArea
      />

      <div className="space-y-2">
        <h3 className="font-semibold">Items</h3>

        {invoice.items.map((item, i) => (
          <div key={i} className="grid grid-cols-4 gap-2 items-center">

            <input
              className="p-2 border rounded bg-neutral-800"
              placeholder="Item"
              value={item.name}
              onChange={(e) => updateItem(i, "name", e.target.value)}
            />

            <QtyInput
              value={item.qty}
              onChange={(n) => updateItem(i, "qty", n)}
            />

            <PriceInput
              value={item.price}
              onChange={(n) => updateItem(i, "price", n)}
            />

            {i > 0 ? (
              <Button
                variant="secondary"
                onClick={() => removeItem(i)}
              >
                ✕
              </Button>
            ) : (
              <div />
            )}
          </div>
        ))}
      </div>

      <div className="border border-neutral-700 rounded p-2 bg-neutral-800">
        <Button
          className="w-full"
          onClick={() => addItem({ name: "", qty: 1, price: 0 })}
        >
          + Add Item
        </Button>
      </div>

      <div className="text-right text-lg font-bold">
        Total: {formatRupiah(total)}
      </div>

      <div className="border border-neutral-700 rounded p-2 bg-neutral-800">
        <Button className="w-full" onClick={handleGenerate}>
          Generate Invoice
        </Button>
      </div>
    </div>
  );
}
