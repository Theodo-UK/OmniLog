import { llm_logs } from "@prisma/client";
const dummyData = [
    {
        id: 1,
        datetime_utc: new Date(Date.parse("2023-08-10 16:52:36.72")),
        input_string:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Section 1.10.32 of de Finibus Bonorum et Malorum, written by Cicero in 45 BC Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
        output_string:
            "Hello something esle. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Section 1.10.32 of de Finibus Bonorum et Malorum, written by Cicero in 45 BC Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
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
export const LogsData = {
    getLogs: async (): Promise<llm_logs[]> => {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        return dummyData;
    },
    getLogDetails: async (id: string): Promise<llm_logs> => {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        return dummyData.find((log) => log.id === parseInt(id))!;
    },
};
