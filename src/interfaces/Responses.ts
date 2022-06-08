import {CustomAlertProps} from './CustomAlert';

export interface UserCreatedResponse {
  msg: string;
}

export interface IProject {
  _id?: string;
  name: string;
  description: string;
  owner: string;
  client: string;
  deadline: string;
  tasks: ITask[];
  collaborators: ICollaborator[];
}

export interface IDetailedProject extends IProject {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export function createEmptyDetailedProject(): IDetailedProject {
  return {
    _id: '',
    name: '',
    description: '',
    client: '',
    deadline: '',
    createdAt: '',
    updatedAt: '',
    tasks: [],
    collaborators: [],
    owner: '',
  };
}

export interface IProjectsResponse {
  data: IProjectsData;
}

export interface IProjectDetailsResponse {
  data: ICreatedProjectResponse;
}

export interface IProjectsData {
  msg: string;
  projects: IProject[];
}

export interface ICreatedProjectResponse {
  msg: string;
  project: IDetailedProject;
}

export interface ITask {
  _id?: string;
  name: string;
  completed: boolean;
  description: string;
  priority: string;
  deadline: string;
  project: string;
  completedBy?: ICollaborator;
}

export interface ICollaborator {
  _id: string;
  name: string;
  email: string;
}

export function createDefaultCollaborator(): ICollaborator {
  return {
    _id: '',
    name: '',
    email: '',
  };
}

export function createDefaultProject(): IDetailedProject {
  return {
    _id: '',
    name: '',
    description: '',
    client: '',
    deadline: '',
    createdAt: '',
    updatedAt: '',
    tasks: [],
    owner: '',
    collaborators: [],
  };
}

export interface IProjectContext {
  projects: any[];
  showAlert(props: CustomAlertProps): void;
  alert: CustomAlertProps;
  createProject: (project: IProject) => Promise<any>;
  getProjectDetails: (id: string) => Promise<any>;
  loading: boolean;
  project: IDetailedProject;
  updateProject: (project: IProject) => Promise<any>;
  deleteProject: (id: string) => Promise<any>;
  taskModal: boolean;
  handleTaskModal: (type?: string) => void;
  addTask: (task: ITask) => Promise<any>;
  task: ITask;
  setTask: (task: ITask) => void;
  handleTaskEdit: (task: ITask) => void;
  deleteTask: (id: string, type: string, collaboratorId?: string) => Promise<any>;
  editTask: (task: ITask) => Promise<any>;
  handleDeleteModal: (task?: ITask) => void;
  deleteModal: boolean;
  addCollaborator: (projectId: string, email: string) => Promise<any>;
  searchCollaborator: (email: string) => Promise<any>;
  collaborator: ICollaborator;
  deleteCollabModal: boolean;
  handleDeleteCollaborator: (collaborator?: ICollaborator) => void;
  changeTaskStatus: (id: string) => Promise<any>;
  handleSearchModal: () => void;
  searchModal: boolean;
  submitProjectTask: (task: ITask) => void;
  deleteProjectTask: (task: ITask) => void;
  updateProjectTask: (task: ITask) => void;
  completeProjectTask: (task: ITask) => void;
  logoutProjects: () => void;
}

export function createDefaultContext(): IProjectContext {
  return {
    handleDeleteCollaborator: () => {},
    projects: [],
    showAlert: (props: CustomAlertProps) => {
      console.log(props);
    },
    alert: {
      message: '',
      error: false,
    },
    createProject: async (project: IProject) => {
      console.log(project);
    },
    getProjectDetails: async (id: string) => {
      console.log(id);
    },
    loading: false,
    project: createDefaultProject(),
    updateProject: async (project: IProject) => {
      console.log(project);
    },
    deleteProject: async (id: string) => {
      console.log(id);
    },
    taskModal: false,
    handleTaskModal: () => {
      console.log('handleTaskModal');
    },
    addTask: async (task: ITask) => {
      console.log(task);
    },
    task: {
      _id: '',
      name: '',
      description: '',
      deadline: '',
      project: '',
      completed: false,
      priority: '',
    },
    setTask: (task: ITask) => {
      console.log(task);
    },
    handleTaskEdit: (task: ITask) => {
      console.log(task);
    },
    editTask: async (task: ITask) => {
      console.log(task);
    },
    handleDeleteModal: () => {
      console.log('handleDeleteModal');
    },
    deleteModal: false,
    deleteTask: async (id: string, type: string) => {
      console.log(id);
    },
    addCollaborator: async (projectId: string, email: string) => {
      console.log(email);
      console.log(projectId);
    },
    collaborator: createDefaultCollaborator(),
    searchCollaborator: async (email: string) => {
      console.log(email);
    },
    deleteCollabModal: false,
    changeTaskStatus: async (id: string) => {
      console.log(id);
    },
    handleSearchModal: () => {
      console.log('handleSearchModal');
    },
    searchModal: false,
    submitProjectTask: (task: ITask) => {
      console.log(task);
    },
    deleteProjectTask: (task: ITask) => {
      console.log(task._id);
    },
    updateProjectTask: (task: ITask) => {
      console.log(task);
    },
    completeProjectTask: (task: ITask) => {
      console.log(task);
    },
    logoutProjects: () => {
      console.log('logoutProjects');
    },
  };
}

export const createDefaultTask = (): ITask => {
  return {
    _id: '',
    name: '',
    description: '',
    deadline: '',
    project: '',
    completed: false,
    priority: '',
  };
};
