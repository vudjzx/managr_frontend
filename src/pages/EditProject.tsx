import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {LoadingComponent} from '../components/LoadingComponent';
import ProjectForm from '../components/ProjectForm';
import useProjects from '../hooks/useProjects';

export const EditProject = () => {
  const params = useParams();
  const {getProjectDetails, loading, project, deleteProject} = useProjects();
  useEffect(() => {
    if (params.id) {
      void getProjectDetails(params.id);
    }
  }, [params]);

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this project?') && params.id) {
      await deleteProject(params.id);
    }
  };

  if (loading) return <LoadingComponent />;
  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-4xl font-black">Edit: {project.name}</h1>
        <button
          className="flex justify-between gap-2 text-gray-500 hover:text-black items-center"
          onClick={handleDelete}>
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
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          <p className="font-bold uppercase">Delete</p>
        </button>
      </div>

      <div className="mt-10 flex justify-center">
        <ProjectForm editing />
      </div>
    </>
  );
};
