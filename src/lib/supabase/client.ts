import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { Database } from "./database.types";

export const createClient = () =>
  createSupabaseClient<Database>(
    "https://vrdaoudvtphptybaljqq.supabase.co",
    `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZyZGFvdWR2dHBocHR5YmFsanFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUyNjcxNTEsImV4cCI6MjA0MDg0MzE1MX0.8lxO8TS_CRbWZKafWfKWwRKTOJ15RyaXjmmUIUl0ZJ0`
  );
