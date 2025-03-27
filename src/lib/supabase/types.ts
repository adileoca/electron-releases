import { getOrderById } from "./queries";

export type Order = NonNullable<Awaited<ReturnType<typeof getOrderById>>["data"]>;
