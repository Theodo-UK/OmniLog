import { Order } from "@/types/logDisplayOptions";

export type Timeframe = {
    lte: Date;
    gte: Date;
};

export type PrismaSort =
    | { id: Order }
    | { datetime_utc: Order }
    | { total_tokens: Order };

export type SearchCondition = [
    {
        input_string: { contains: string };
    },
    {
        output_string: { contains: string };
    },
];
