import React from "react";
import { Session } from "@supabase/supabase-js";

import { DbTables, Supabase } from "./database";
import { getOrderById } from "./queries";

export type Order = NonNullable<
  Awaited<ReturnType<typeof getOrderById>>["data"]
>;

export type UserProfile = DbTables["user_profiles"]["Row"] | null;

export type SupabaseContextType = {
  supabase: Supabase;
  userProfile: UserProfile;
  session: Session | null | undefined;
  setIpcSession: React.Dispatch<
    React.SetStateAction<Session | null | undefined>
  >;
};
