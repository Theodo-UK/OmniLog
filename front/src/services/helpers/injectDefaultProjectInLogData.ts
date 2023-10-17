import {
    LogData,
    LogDataArray,
    ProjectData,
    TagData,
} from "@/types/logDisplayOptions";
import { llmLogs } from "@prisma/client";
import { ProjectsData } from "../prisma/ProjectsData";

export type LogDataFromPrisma = llmLogs & {
    tags: TagData[];
    project: ProjectData | null;
};

export const injectDefaultProjectInLogData = (
    log: LogDataFromPrisma,
): LogData => {
    const defaultProject: ProjectData = ProjectsData.getDefaultProject();
    return {
        ...log,
        project: log.project || defaultProject,
        projectId: log.projectId || defaultProject.id,
    };
};

export const injectDefaultProjectInLogDataArray = (
    logArray: LogDataFromPrisma[],
): LogDataArray => {
    return logArray.map(injectDefaultProjectInLogData);
};
