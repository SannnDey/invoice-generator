// utils/currency.ts
export const formatRupiah = (n: number) =>
  n ? "Rp " + n.toLocaleString("id-ID") : "Rp 0";

export const parseNumber = (s: string) =>
  Number(s.replace(/\D/g, "")) || 0;
