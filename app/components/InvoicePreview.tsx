import { InvoiceData } from "@/app/model/invoice";
import { formatRupiah } from "@/app/utils/currency";

export default function InvoicePreview({ data }: { data: InvoiceData }) {
  const total = data.items.reduce((s, i) => s + i.qty * i.price, 0);

  return (
    <div className="p-6 rounded-lg shadow-md bg-neutral-900 text-neutral-200 border border-neutral-700">
      <div className="flex justify-between">
        <h2 className="text-xl font-bold text-white">
          Invoice #{data.invoiceNumber}
        </h2>
        <p className="text-neutral-400">{data.invoiceDate}</p>
      </div>

      <div className="mt-3">
        <p className="font-semibold text-white">{data.customerName}</p>
        <p className="text-sm">{data.customerPhone}</p>
        <p className="text-sm opacity-80 whitespace-pre-line">
          {data.customerAddress}
        </p>
      </div>

      <table className="w-full mt-6 border border-neutral-700">
        <thead className="bg-neutral-800 text-neutral-300">
          <tr>
            {["Item", "Qty", "Price", "Subtotal"].map((h) => (
              <th key={h} className="border border-neutral-700 p-2">
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.items.map((item, i) => (
            <tr key={i} className="hover:bg-neutral-800">
              <td className="border p-2">{item.name}</td>
              <td className="border p-2">{item.qty}</td>
              <td className="border p-2">{formatRupiah(item.price)}</td>
              <td className="border p-2">
                {formatRupiah(item.qty * item.price)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-right mt-4 text-xl font-bold text-white">
        Total: {formatRupiah(total)}
      </div>
    </div>
  );
}
