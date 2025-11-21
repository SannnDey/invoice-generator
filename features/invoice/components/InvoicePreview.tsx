"use client";

import { useInvoiceStore } from "../store/invoiceStore";
import { formatRupiah } from "@/utils/currency";
import type { InvoiceData } from "../types/invoice";

interface InvoicePreviewProps {
  data?: InvoiceData;
}

function TableRow({
  name,
  qty,
  price,
}: {
  name: string;
  qty: number;
  price: number;
}) {
  return (
    <tr className="hover:bg-neutral-800">
      <td className="border p-2">{name}</td>
      <td className="border p-2 text-center">{qty}</td>
      <td className="border p-2">{formatRupiah(price)}</td>
      <td className="border p-2">{formatRupiah(qty * price)}</td>
    </tr>
  );
}

export default function InvoicePreview({ data }: InvoicePreviewProps) {
  const { invoice } = useInvoiceStore();

  const current = data || invoice;
  const total = current.items.reduce((sum, i) => sum + i.qty * i.price, 0);

  return (
    <div className="border p-6 rounded-lg bg-neutral-900 text-neutral-200 mt-6">

      <h2 className="text-xl font-bold mb-2">
        Invoice #{current.invoiceNumber || "—"}
      </h2>
      <p>{current.invoiceDate}</p>
      <p>{current.customerName}</p>
      <p>{current.customerPhone}</p>
      <p>{current.customerAddress}</p>

      <table className="w-full mt-4 border-collapse border border-neutral-700">
        <thead className="bg-neutral-800 text-neutral-300">
          <tr>
            <th className="border p-2">Item</th>
            <th className="border p-2">Qty</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Subtotal</th>
          </tr>
        </thead>

        <tbody>
          {current.items.map((item, i) => (
            <TableRow
              key={i}
              name={item.name}
              qty={item.qty}
              price={item.price}
            />
          ))}
        </tbody>
      </table>

      <p className="text-right font-bold mt-2">
        Total: {formatRupiah(total)}
      </p>
    </div>
  );
}
