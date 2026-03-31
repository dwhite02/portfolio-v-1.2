import { reactive } from "vue";
import type { Project } from "../types";

export const projectStore = reactive({
  selectedProject: null as Project | null,
  updateActiveProject(project: Project) {
    projectStore.selectedProject = project;
  },
  clearActiveProject() {
    projectStore.selectedProject = null;
  },
});
