import type { InvoiceData } from "../types/invoice";

export const dummyInvoice: InvoiceData = {
  invoiceNumber: "INV-46832",
  invoiceDate: "21/11/2025",
  customerName: "ihsan",
  customerPhone: "081234567890",
  customerAddress: "Bali",
  items: [
    { name: "Celana", qty: 2, price: 20000 },
    { name: "Baju", qty: 1, price: 50000 },
  ],
};
