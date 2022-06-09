import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import useProjects from '../hooks/useProjects';
import {IProject} from '../interfaces/Responses';
import CustomAlert from './CustomAlert';

const ProjectForm = (props: {editing?: boolean}) => {
  const {showAlert, alert, createProject, project, updateProject} = useProjects();
  const [formData, setFormData] = useState<IProject>({
    name: '',
    description: '',
    deadline: '',
    client: '',
    tasks: [],
    collaborators: [],
    owner: '',
  });
  const params = useParams();
  useEffect(() => {
    if (project && params.id) {
      setFormData({...project, deadline: project.deadline.split('T')[0]});
    }
  }, [params]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if ([formData.name, formData.description, formData.deadline, formData.client].includes('')) {
      showAlert({
        message: 'Please fill in all fields',
        error: true,
      });
      return;
    }
    if (props.editing) {
      await updateProject(formData);
    } else {
      await createProject(formData);
    }
    setFormData({
      name: '',
      description: '',
      deadline: '',
      client: '',
      tasks: [],
      collaborators: [],
      owner: '',
    });
  };

  return (
    <div className="w-full flex justify-center">
      <form className="bg-white py-10 px-5 xl:w-1/2 rounded-lg" onSubmit={handleSubmit}>
        {alert.message && <CustomAlert {...alert} />}

        <div>
          <InputField
            htmlFor="name"
            name="Project name"
            typeof="text"
            placeholder="Project name"
            value={formData.name}
            onChange={(e: any) => setFormData({...formData, name: e.target.value})}
          />
          <InputField
            htmlFor="client"
            name="Client"
            typeof="text"
            placeholder="Client"
            value={formData.client}
            onChange={(e: any) => setFormData({...formData, client: e.target.value})}
          />
          <div className="mb-5">
            <label htmlFor="description" className="text-gray-700 uppercase font-bold text-sm">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50 focus:outline-none focus:shadow"
              placeholder="Project description"
              value={formData.description}
              onChange={(e: any) => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <div className="mb-5">
            <label className="text-gray-700 uppercase font-bold text-sm" htmlFor="deadline">
              Deadline
            </label>
            <input
              type="date"
              id="deadline"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50 focus:outline-none focus:shadow"
              value={formData.deadline}
              onChange={(e: any) => setFormData({...formData, deadline: e.target.value})}
            />
          </div>
          <input
            type="submit"
            value={params.id ? 'Update project' : 'Create project'}
            className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
          />
        </div>
      </form>
    </div>
  );
};

export const InputField = (props: React.HTMLProps<HTMLInputElement>) => {
  return (
    <div className="mb-5">
      <label className="text-gray-700 uppercase font-bold text-sm" htmlFor={props.htmlFor}>
        {props.name}
      </label>
      <input
        id={props.htmlFor}
        className="w-full mt-3 p-3 border rounded-xl bg-gray-50 focus:outline-none focus:shadow"
        {...props}
      />
    </div>
  );
};

export default ProjectForm;
