import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { Database } from "./database.types";

export const createClient = () =>
  createSupabaseClient<Database>(
    process.env.REACT_APP_SUPABASE_URL!,
    process.env.REACT_APP_SUPABASE_ANON_KEY!
  );
