export {};

import { Session } from "@supabase/supabase-js";
import { on } from "events";
import { send } from "process";

declare global {
  interface Window {
    electron: {
      invoke: (channel: string, data?: any) => Promise<any>;
      openLink: (url) => void;
      uploadFile: (params: {
        filename: string;
        bucketPath: string;
        accessToken: string;
      }) => Promise<{ error: string | null }>;
      setSession: (session: Session | null) => void;
      send: (channel: string, data?: any) => void;
      on: (channel: string, callback: (...args: any[]) => void) => void;
      removeListener: (channel: any, func: any) => void;
      event: (eventName: string, data?: any) => void;
      createShipment: (params: {
        order_id: string;
        session: any;
      }) => Promise<{ error: string | null; url: string | null }>;
    };
  }
}
