import { getPrintById } from "./hooks/usePrintDetailsData";

export type Print = Awaited<ReturnType<typeof getPrintById>>;
