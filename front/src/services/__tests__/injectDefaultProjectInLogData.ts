import { ProjectData, TagData } from "@/types/logDisplayOptions";
import {
    LogDataFromPrisma,
    injectDefaultProjectInLogData,
} from "../helpers/injectDefaultProjectInLogData";
import { ProjectsData } from "../prisma/ProjectsData";

describe("injectDefaultProjectInLogData", () => {
    const tag: TagData = {
        id: "tag-a",
        name: "Tag A",
    };
    const project: ProjectData = {
        id: "project-1",
        name: "test",
    };
    let defaultProject: ProjectData;

    beforeAll(() => {
        defaultProject = ProjectsData.getDefaultProject();
    });

    it("should convert log from prisma format to logData", () => {
        const log: LogDataFromPrisma = {
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

        const result = injectDefaultProjectInLogData(log);

        expect(result).toEqual(log);
    });
    it("should add a default project to log if one is missing", () => {
        const log: LogDataFromPrisma = {
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

        const result = injectDefaultProjectInLogData(log);

        expect(result).toEqual({
            ...log,
            project: defaultProject,
            projectId: defaultProject.id,
        });
    });
});
