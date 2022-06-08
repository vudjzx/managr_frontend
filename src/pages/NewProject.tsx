import {useEffect} from 'react';
import ProjectForm from '../components/ProjectForm';
import useProjects from '../hooks/useProjects';

const NewProject = () => {
  const {showAlert} = useProjects();
  useEffect(() => {
    showAlert({
      message: '',
      error: false,
    });
  }, []);
  return (
    <>
      <h1 className="text-4xl font-black">Create project</h1>
      <div className="mt-10 flex justify-center">
        <ProjectForm />
      </div>
    </>
  );
};

export default NewProject;
