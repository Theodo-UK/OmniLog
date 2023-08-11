import { llm_logs } from "@prisma/client";

export const LogsData = {
    getLogs: async (): Promise<llm_logs[]> => {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        return [
            {
                id: 1,
                datetime_utc: new Date(Date.parse("2023-08-10 16:52:36.72")),
                input_string: "hello",
                output_string: "world",
                total_tokens: 1,
            },
            {
                id: 2,
                datetime_utc: new Date(Date.parse("2023-08-11 10:12:45.23")),
                input_string: "how are you",
                output_string: "I'm fine, thank you",
                total_tokens: 3,
            },
            {
                id: 3,
                datetime_utc: new Date(Date.parse("2023-08-12 18:30:15.91")),
                input_string: "what's your name",
                output_string: "My name is LLM Bot",
                total_tokens: 2,
            },
            {
                id: 4,
                datetime_utc: new Date(Date.parse("2023-08-13 07:05:59.14")),
                input_string: "can you help me",
                output_string: "Of course, what do you need help with?",
                total_tokens: 4,
            },
            {
                id: 5,
                datetime_utc: new Date(Date.parse("2023-08-14 22:17:30.87")),
                input_string: "thank you",
                output_string: "You're welcome!",
                total_tokens: 1,
            },
        ];
    },
};
