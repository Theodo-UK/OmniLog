import { Order } from "./sort";

export type Timeframe = {
    lte: Date;
    gte: Date;
};

export type PrismaSort =
    | { id: Order }
    | { datetime_utc: Order }
    | { total_tokens: Order };
