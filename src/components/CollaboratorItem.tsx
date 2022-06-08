import useProjects from '../hooks/useProjects';
import {ICollaborator} from '../interfaces/Responses';

export const CollaboratorItem = (props: {collaborator: ICollaborator}) => {
  const {handleDeleteCollaborator} = useProjects();
  const onDeletePress = () => {
    handleDeleteCollaborator(props.collaborator);
  };
  return (
    <>
      <div className="border-b p-5 flex justify-between items-center">
        <div>
          <p>{props.collaborator.name}</p>
          <p className="text-sm text-gray-700">{props.collaborator.email}</p>
        </div>
        <div>
          <button
            onClick={onDeletePress}
            className="bg-red-500 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg">
            Delete
          </button>
        </div>
      </div>
    </>
  );
};
