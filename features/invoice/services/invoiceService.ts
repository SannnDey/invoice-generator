import type { InvoiceData } from "../types/invoice";

export const generateInvoiceNumber = (): string => {
  const random = Math.floor(10000 + Math.random() * 90000);
  return `INV-${random}`;
};

export const saveInvoice = (invoice: InvoiceData) => {
  console.log("Saving invoice:", invoice);
};
