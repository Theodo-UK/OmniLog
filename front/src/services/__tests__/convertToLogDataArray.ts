import { ProjectData, TagData } from "@/types/logDisplayOptions";
import {
    LogDataFromPrisma,
    convertToLogDataArray,
} from "../helpers/convertToLogData";
import { ProjectsData } from "../prisma/ProjectsData";

describe("convertToLogData", () => {
    const tag: TagData = {
        id: "tag-a",
        name: "Tag A",
    };
    const project: ProjectData = {
        id: "project-1",
        name: "test",
    };
    const logWithProject: LogDataFromPrisma = {
        id: "1",
        datetime_utc: new Date(),
        input_string: "test",
        output_string: "test",
        total_tokens: 1,
        cost: 1,
        projectId: "project-1",
        project,
        tags: [tag],
    };
    const logWithoutProject: LogDataFromPrisma = {
        id: "1",
        datetime_utc: new Date(),
        input_string: "test",
        output_string: "test",
        total_tokens: 1,
        cost: 1,
        projectId: null,
        project: null,
        tags: [tag],
    };

    let defaultProject: ProjectData;

    beforeAll(() => {
        defaultProject = ProjectsData.getDefaultProject();
    });

    it("should convert a list of logs from prisma format to logDataArray", () => {
        const logs: LogDataFromPrisma[] = [logWithProject];

        const result = convertToLogDataArray(logs);

        expect(result).toEqual(logs);
    });
    it("should add a default project to log if one is missing", () => {
        const logs: LogDataFromPrisma[] = [logWithoutProject];

        const result = convertToLogDataArray(logs);

        expect(result).toEqual([
            {
                ...logWithoutProject,
                project: defaultProject,
                projectId: defaultProject.id,
            },
        ]);
    });
    it("should accept an empty array", () => {
        const logs: LogDataFromPrisma[] = [];

        const result = convertToLogDataArray(logs);

        expect(result).toEqual([]);
    });
    it("should accept a large array", () => {
        const logs: LogDataFromPrisma[] = Array(100).fill(logWithProject);

        const result = convertToLogDataArray(logs);

        expect(result).toEqual(logs);
    });
});
