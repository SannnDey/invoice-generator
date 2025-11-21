import { create } from "zustand";
import type { InvoiceData, InvoiceItem } from "../types/invoice";

const emptyInvoice: InvoiceData = {
    invoiceNumber: "",
    invoiceDate: "",
    customerName: "",
    customerPhone: "",
    customerAddress: "",
    items: [],
};

interface InvoiceState {
    invoice: InvoiceData;
    isGenerated: boolean;

    setInvoice: (data: InvoiceData) => void;
    markGenerated: () => void;

    addItem: (item: InvoiceItem) => void;
    removeItem: (index: number) => void;

    updateItem: <K extends keyof InvoiceItem>(
        index: number,
        field: K,
        value: InvoiceItem[K]
    ) => void;
}

export const useInvoiceStore = create<InvoiceState>((set) => ({
    invoice: emptyInvoice,
    isGenerated: false,

    setInvoice: (data) => set({ invoice: data }),
    markGenerated: () => set({ isGenerated: true }),

    addItem: (item) =>
        set((state) => ({
            invoice: { ...state.invoice, items: [...state.invoice.items, item] },
        })),

    removeItem: (index) =>
        set((state) => ({
            invoice: {
                ...state.invoice,
                items: state.invoice.items.filter((_, i) => i !== index),
            },
        })),

    updateItem: (index, field, value) =>
        set((state) => {
            const items = [...state.invoice.items];
            const target = items[index];

            if (!target) return { invoice: state.invoice };

            if (field === "qty" || field === "price") {
                target[field] = Number(value) as InvoiceItem[typeof field];
            } else {
                target[field] = value;
            }

            return { invoice: { ...state.invoice, items } };
        }),
}));
