import { Order } from "@/types/logDisplayOptions";

export type Timeframe = {
    lte: Date;
    gte: Date;
};

export type PrismaSort =
    | { id: Order }
    | { datetime_utc: Order }
    | { total_tokens: Order }
    | { cost: { sort: Order; nulls: "last" } };

export type SearchCondition =
    | [
          {
              input_string: { contains: string; mode: "insensitive" };
          },
          {
              output_string: { contains: string; mode: "insensitive" };
          },
      ]
    | undefined;
