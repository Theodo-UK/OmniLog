import { TagData, ProjectData, LogData, LogDataArray } from "@/types/logDisplayOptions";
import { llmLogs } from "@prisma/client";
import { ProjectsData } from "../prisma/ProjectsData";

export type LogDataFromPrisma = llmLogs & {
    tags: TagData[];
    project: ProjectData | null;
};

export const convertToLogData = (
    log: LogDataFromPrisma,
): LogData => {
    const defaultProject: ProjectData = ProjectsData.getDefaultProject();
    return {
        ...log,
        project: log.project || defaultProject,
        projectId: log.projectId || defaultProject.id,
    };
}

export const convertToLogDataArray = (
    logArray: LogDataFromPrisma[],
): LogDataArray => {
    return logArray.map(convertToLogData);
}
