import {useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import {io, Socket} from 'socket.io-client';
import {CollaboratorItem} from '../components/CollaboratorItem';
import CustomAlert from '../components/CustomAlert';
import DeleteTaskModal from '../components/DeleteTaskModal';
import {LoadingComponent} from '../components/LoadingComponent';
import {TaskItem} from '../components/TaskItem';
import TaskModal from '../components/TaskModal';
import useAdmin from '../hooks/useAdmin';
import useProjects from '../hooks/useProjects';
import {createDefaultTask} from '../interfaces/Responses';

let socket: Socket;
export const ProjectDetail = () => {
  const params = useParams();
  const {
    getProjectDetails,
    loading,
    project,
    handleTaskEdit,
    alert,
    taskModal,
    submitProjectTask,
    deleteProjectTask,
    updateProjectTask,
    completeProjectTask,
  } = useProjects();
  const isAdmin = useAdmin();

  useEffect(() => {
    if (params.id) {
      void getProjectDetails(params.id);
    }
  }, []);

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL);
    if (params.id) {
      socket.emit('open project', params.id);
    }
  }, []);

  useEffect(() => {
    socket.on('addedTask', task => {
      if (task.project === project._id) {
        submitProjectTask(task);
      }
    });
    socket.on('deletedTask', task => {
      if (task.project === project._id) {
        deleteProjectTask(task);
      }
    });
    socket.on('updatedTask', task => {
      if (task.project._id === project._id) {
        updateProjectTask(task);
      }
    });
    socket.on('completedTask', task => {
      if (task.project._id === project._id) {
        completeProjectTask(task);
      }
    });
  }, [socket, project]);

  if (loading) return <LoadingComponent />;

  if (!loading && project.name === '') return <CustomAlert {...alert} />;

  const Header = () => {
    return (
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-black">{project.name}</h1>
        {isAdmin && (
          <Link
            to={`/projects/edit/${params.id}`}
            className="flex justify-between gap-2 text-gray-500 hover:text-black items-center transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
            <p className="font-bold uppercase">Edit</p>
          </Link>
        )}
      </div>
    );
  };

  const TasksSection = () => {
    return (
      <>
        {isAdmin && (
          <button
            onClick={() => handleTaskEdit(createDefaultTask())}
            className="text-sm uppercase px-5 py-3 md:w-auto w-full rounded-lg font-bold bg-sky-600 text-white text-center mt-5 flex gap-2 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            New task
          </button>
        )}
        <p className="font-bold text-xl mt-10">Project tasks</p>

        <div className="flex justify-center">
          <div className="md:w-1/3 lg:w-1/4">
            {alert.message !== '' && !taskModal ? <CustomAlert {...alert} /> : null}
          </div>
        </div>

        <div className="bg-white shadow mt-10 rounded-lg">
          {project.tasks.length > 0 ? (
            project.tasks.map((task, index) => <TaskItem key={index.toString()} task={task} />)
          ) : (
            <p className="text-center text-gray-500 my-5 p-10">No tasks yet</p>
          )}
        </div>
      </>
    );
  };

  const CollaboratorsSection = () => {
    return (
      <>
        <div className="flex items-center mt-10 justify-between">
          <p className="text-xl font-bold">Collaborators</p>
          {isAdmin && (
            <Link
              to={`/projects/add-collaborator/${params.id}`}
              className="flex justify-between gap-2 text-gray-500 hover:text-black items-center transition-colors">
              <p className="font-bold uppercase">Add collaborator</p>
            </Link>
          )}
        </div>

        <div className="bg-white shadow mt-10 rounded-lg">
          {project.collaborators.length > 0 ? (
            project.collaborators.map((collaborator, index) => (
              <CollaboratorItem key={index.toString()} collaborator={collaborator} />
            ))
          ) : (
            <p className="text-center text-gray-500 my-5 p-10">No collaborators yet</p>
          )}
        </div>
      </>
    );
  };
  return (
    <>
      <Header />
      <TasksSection />
      {isAdmin && <CollaboratorsSection />}
      <TaskModal />
      <DeleteTaskModal />
    </>
  );
};
