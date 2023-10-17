import { ProjectData } from "@/types/logDisplayOptions";

export const ProjectsData = {
    getDefaultProject: (): ProjectData => {
        return {
            id: "default-project-id",
            name: "Default Project",
        };
    },
};
