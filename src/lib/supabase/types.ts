import React from "react";
import { Session } from "@supabase/supabase-js";

import { DbTables, Supabase } from "./database";
import { getOrderById, getUserProfile } from "./queries";

export type Order = NonNullable<
  Awaited<ReturnType<typeof getOrderById>>["data"]
>;

export type UserProfile = Awaited<ReturnType<typeof getUserProfile>>;

export type SupabaseContextType = {
  supabase: Supabase;
  userProfile: UserProfile;
  session: Session | null | undefined;
  setIpcSession: React.Dispatch<
    React.SetStateAction<Session | null | undefined>
  >;
};
