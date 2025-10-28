import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { Database } from "./database.types";

export const createClient = () =>
  createSupabaseClient<Database>(
    "https://vrdaoudvtphptybaljqq.supabase.co",
    `sb_publishable_x-zLeLjVPaWy2KaV0Wrsig_B1rrpGU4`
  );
