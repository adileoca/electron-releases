import { DbEnums } from "@/lib/supabase/database";

export const statusConfig: Record<
  DbEnums["order_status_names"],
  { label: string; color: string }
> = {
  placed: { label: "În așteptare", color: "amber" },
  feedback: { label: "Previzualizare", color: "indigo" },
  editing: { label: "În lucru", color: "blue" },
  approved: { label: "Aprobat", color: "green" },
  printed: { label: "Printat", color: "cyan" },
  packaged: { label: "Împachetat", color: "purple" },
  shipped: { label: "Expediat", color: "lime" },
  delivered: { label: "Livrat", color: "neutral" },
  sorted: { label: "Sortat", color: "red" },
  canceled: { label: "Anulat", color: "neutral" },
};
