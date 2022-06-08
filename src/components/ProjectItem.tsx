import {Link} from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import {IProject} from '../interfaces/Responses';

export const ProjectItem = (props: {project: IProject}) => {
  const {auth} = useAuth();
  const isCollaborator = props.project.owner !== auth._id;
  return (
    <div className="border-b p-5 flex flex-col md:flex-row justify-between">
      <div className="flex-1 flex flex-row items-center">
        <p>
          {props.project.name}{' '}
          <span className="text-sm text-gray-400 uppercase font-bold">{props.project.client}</span>
        </p>
        {isCollaborator && (
          <p className="mx-1 p-1 bg-green-500 text-white text-xs font-bold uppercase rounded-lg">
            Collaborator
          </p>
        )}
      </div>
      <Link
        className="text-sm text-gray-600 hover:text-gray-800 font-bold"
        to={`${props.project._id}`}>
        See details
      </Link>
    </div>
  );
};
