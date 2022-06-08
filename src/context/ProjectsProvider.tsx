import {AxiosRequestConfig} from 'axios';
import {useState, createContext, useEffect} from 'react';
import axiosClient from '../config/axiosClient';
import {CustomAlertProps} from '../interfaces/CustomAlert';
import {
  createDefaultCollaborator,
  createDefaultContext,
  createDefaultProject,
  createDefaultTask,
  ICollaborator,
  IDetailedProject,
  IProject,
  IProjectContext,
  IProjectDetailsResponse,
  IProjectsResponse,
  ITask,
} from '../interfaces/Responses';
import {io, Socket} from 'socket.io-client';
import useAuth from '../hooks/useAuth';

let socket: Socket;

export const ProjectsContext = createContext<IProjectContext>(createDefaultContext());

export const ProjectsProvider: React.FC = ({children}) => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [task, setTask] = useState<ITask>(createDefaultTask());
  const [alert, setAlert] = useState<CustomAlertProps>({message: '', error: false});
  const [loading, setLoading] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [collaborator, setCollaborator] = useState<ICollaborator>(createDefaultCollaborator());
  const [project, setProject] = useState<IDetailedProject>(createDefaultProject());
  const [taskModal, setTaskModal] = useState<boolean>(false);
  const [deleteCollabModal, setDeleteCollabModal] = useState<boolean>(false);
  const [searchModal, setSearchModal] = useState<boolean>(false);
  const {auth} = useAuth();

  const handleSearchModal = () => {
    setSearchModal(!searchModal);
  };

  const handleTaskModal = () => {
    setTaskModal(!taskModal);
  };

  const showAlert = (alert: CustomAlertProps) => {
    setAlert(alert);
    setTimeout(() => {
      setAlert({message: '', error: false});
    }, 3000);
  };

  useEffect(() => {
    const getProjects = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const config: AxiosRequestConfig = {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        };
        const {data}: IProjectsResponse = await axiosClient.get('/projects', config);
        setProjects(data.projects);
      } catch (error) {
        console.log(error);
      }
    };
    void getProjects();
  }, [auth]);

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL);
  }, []);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const config: AxiosRequestConfig = {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        };
        const {data}: IProjectsResponse = await axiosClient.get('/projects', config);
        setProjects(data.projects);
      } catch (error) {
        console.log(error);
      }
    };
    void getProjects();
  }, [localStorage.getItem('token')]);

  const createProject = async (project: IProject) => {
    try {
      const token = localStorage.getItem('token');
      const config: AxiosRequestConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      const {data} = await axiosClient.post('/projects', project, config);
      setProjects([...projects, data.storedProject]);
      showAlert({
        message: 'Project created successfully',
        error: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateProject = async (project: IProject) => {
    try {
      const token = localStorage.getItem('token');
      const config: AxiosRequestConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      const {data} = await axiosClient.put(`/projects/${project._id}`, project, config);
      setProjects(projects.map(p => (p._id === project._id ? data.updatedProject : p)));
      showAlert({
        message: 'Project updated successfully',
        error: false,
      });
    } catch (error) {
      showAlert({
        message: 'Something went wrong',
        error: true,
      });
    }
  };

  const deleteProject = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      const config: AxiosRequestConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      const {data} = await axiosClient.delete(`/projects/${id}`, config);
      setProjects(projects.filter(p => p._id !== id));
      showAlert({
        message: data.msg,
        error: false,
      });
    } catch (error) {
      showAlert({
        message: 'Something went wrong',
        error: true,
      });
    }
  };

  const getProjectDetails = async (id: string) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const config: AxiosRequestConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      const {data}: IProjectDetailsResponse = await axiosClient.get(`/projects/${id}`, config);
      setProject(data.project);
      setAlert({
        message: '',
        error: false,
      });
    } catch (error: any) {
      setProject(createDefaultProject());
      setAlert({
        message: error.response.data.msg,
        error: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (task: ITask) => {
    try {
      const token = localStorage.getItem('token');
      const config: AxiosRequestConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      const {data} = await axiosClient.post('/tasks', task, config);
      socket.emit('addedTask', data.storedTask);
      showAlert({
        message: 'Task added successfully',
        error: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleTaskEdit = (task: ITask) => {
    setTask(task);
    setTaskModal(true);
  };

  const editTask = async (task: ITask) => {
    try {
      const token = localStorage.getItem('token');
      const config: AxiosRequestConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      const {data} = await axiosClient.put(`/tasks/${task._id}`, task, config);
      showAlert({
        message: 'Task updated successfully',
        error: false,
      });
      setTaskModal(false);
      socket.emit('updatedTask', data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCollaborator = (collaborator?: ICollaborator) => {
    if (collaborator) {
      setCollaborator(collaborator);
    }
    setDeleteCollabModal(!deleteCollabModal);
  };
  const handleDeleteModal = (task?: ITask) => {
    if (task) {
      setTask(task);
    }
    setDeleteModal(!deleteModal);
  };

  const deleteTask = async (id: string, type: string, collaboratorId?: string) => {
    try {
      const token = localStorage.getItem('token');
      const config: AxiosRequestConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      if (type === 'task') {
        const {data} = await axiosClient.delete(`/tasks/${id}`, config);
        socket.emit('deletedTask', task);
        showAlert({
          message: data.msg,
          error: true,
        });
      } else if (type === 'collaborator' && collaboratorId) {
        const {data} = await axiosClient.post(
          `/projects/delete-collaborator/${id}`,
          {id: collaboratorId},
          config,
        );
        setProject({
          ...project,
          collaborators: project.collaborators.filter(c => c._id !== collaboratorId),
        });
        showAlert({
          message: data.msg,
          error: true,
        });
        setCollaborator(createDefaultCollaborator());
      }
    } catch (error: any) {
      console.log(error.response);
    } finally {
      setDeleteModal(false);
      setDeleteCollabModal(false);
    }
  };

  const searchCollaborator = async (collaborator: string) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const config: AxiosRequestConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      const {data} = await axiosClient.post(
        `/projects/collaborator`,
        {email: collaborator},
        config,
      );
      setCollaborator(data.user);
    } catch (error: any) {
      showAlert({
        message: error.response.data.msg,
        error: true,
      });
      setCollaborator(createDefaultCollaborator());
    } finally {
      setLoading(false);
    }
  };

  const addCollaborator = async (projectId: string, email: string) => {
    try {
      const token = localStorage.getItem('token');
      const config: AxiosRequestConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      const {data} = await axiosClient.post(
        `/projects/add-collaborator/${projectId}`,
        {id: email},
        config,
      );
      showAlert({
        message: data.msg,
        error: false,
      });
      setCollaborator(createDefaultCollaborator());
    } catch (error: any) {
      showAlert({
        message: error.response.data.msg,
        error: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const changeTaskStatus = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      const config: AxiosRequestConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      const {data} = await axiosClient.post(`/tasks/${id}/complete`, {}, config);
      socket.emit('completedTask', data);
    } catch (error: any) {
      showAlert({
        message: error.response.data.msg,
        error: true,
      });
    }
  };

  const submitProjectTask = (task: ITask) => {
    setProject({...project, tasks: [...project.tasks, task]});
    setTaskModal(false);
  };

  const deleteProjectTask = (task: ITask) => {
    setProject({
      ...project,
      tasks: project.tasks.filter(t => t._id !== task._id),
    });
  };

  const updateProjectTask = (task: any) => {
    setProject({
      ...project,
      tasks: project.tasks.map(t =>
        t._id === task._id ? {...task, project: task.project._id} : t,
      ),
    });
  };

  const completeProjectTask = (task: any) => {
    setProject({
      ...project,
      tasks: project.tasks.map(t =>
        t._id === task._id ? {...task, project: task.project._id} : t,
      ),
    });
  };

  const logoutProjects = () => {
    setProjects([]);
    setProject(createDefaultProject());
    setAlert({
      message: '',
      error: false,
    });
  };

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        updateProject,
        showAlert,
        alert,
        createProject,
        getProjectDetails,
        project,
        loading,
        deleteProject,
        handleTaskModal,
        taskModal,
        addTask,
        task,
        handleTaskEdit,
        editTask,
        setTask,
        handleDeleteModal,
        deleteModal,
        deleteTask,
        searchCollaborator,
        collaborator,
        addCollaborator,
        handleDeleteCollaborator,
        deleteCollabModal,
        changeTaskStatus,
        handleSearchModal,
        searchModal,
        submitProjectTask,
        deleteProjectTask,
        updateProjectTask,
        completeProjectTask,
        logoutProjects,
      }}>
      {children}
    </ProjectsContext.Provider>
  );
};

export default ProjectsContext;
