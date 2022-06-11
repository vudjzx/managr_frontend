import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import CustomAlert from '../components/CustomAlert';
import {LoadingComponent} from '../components/LoadingComponent';
import {InputField} from '../components/ProjectForm';
import useProjects from '../hooks/useProjects';
import {ICollaborator} from '../interfaces/Responses';

const AddCollaborator = () => {
  const {
    getProjectDetails,
    loading,
    project,
    addCollaborator,
    showAlert,
    alert,
    collaborator,
    searchCollaborator,
  } = useProjects();
  const [collaboratorEmail, setCollaboratorEmail] = useState('');
  const params = useParams();
  useEffect(() => {
    if (params.id) {
      void getProjectDetails(params.id);
    }
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (collaboratorEmail === '') {
      showAlert({
        error: true,
        message: 'Please enter a valid email address',
      });
      return;
    }
    await searchCollaborator(collaboratorEmail);
    // setCollaboratorEmail('');
  };

  return (
    <>
      <h1 className="text-4xl font-black">
        Add collaborator to <span className="text-sky-600">{project.name}</span>
      </h1>
      <div className="w-full flex items-center flex-col">
        <form onSubmit={handleSubmit} className="bg-white py-10 px-5 rounded-lg mt-10 xl:w-1/2">
          {alert.message !== '' && <CustomAlert {...alert} />}

          <InputField
            htmlFor="collaborator"
            name="Collaborator email"
            typeof="text"
            placeholder="example@email.com"
            value={collaboratorEmail}
            onChange={(e: any) => setCollaboratorEmail(e.target.value)}
          />
          <input
            type="submit"
            value="Add collaborator"
            className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
          />
        </form>
        {loading ? (
          <div className="mt-10 w-1/2">
            <LoadingComponent />
          </div>
        ) : (
          <div className="w-full flex mt-10 justify-center">
            <div className="w-3/4 bg-white py-10 px-5 md:w-1/2 rounded-lg shadow">
              <h2 className="text-center mb-10 text-2xl font-bold">Results</h2>
              <CollaboratorComponent
                collaborator={collaborator}
                onPress={() => addCollaborator(project._id, collaborator._id)}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const CollaboratorComponent = (props: {collaborator: ICollaborator; onPress: () => void}) => {
  if (props.collaborator.name === '' || props.collaborator._id === '') return null;
  return (
    <>
      <div className="flex justify-between items-center">
        <p className="text-xl font-bold">{props.collaborator.name}</p>
        <button
          className="py-3 px-5 text-white bg-slate-500 text-sm uppercase font-bold rounded-lg"
          onClick={props.onPress}>
          Add
        </button>
      </div>
    </>
  );
};
export default AddCollaborator;
