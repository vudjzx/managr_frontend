import useAdmin from '../hooks/useAdmin';
import useProjects from '../hooks/useProjects';
import {ITask} from '../interfaces/Responses';
import {formatDate} from '../utils/functions';

export const TaskItem = (props: {task: ITask}) => {
  const {handleTaskEdit, handleDeleteModal, changeTaskStatus} = useProjects();
  const isAdmin = useAdmin();

  const updateTask = async () => {
    if (props.task._id) {
      await changeTaskStatus(props.task._id);
    }
  };

  const taskStatusText = () => {
    if (props.task.completed) return 'Completed';
    return 'Incomplete';
  };

  return (
    <div className="border-b p-5 flex flex-row justify-between items-center gap-4">
      <div className="flex flex-col items-start">
        <p className="mb-2 text-xl">{props.task.name}</p>
        <p className="mb-2 text-sm text-gray-500 uppercase">{props.task.description}</p>
        <p className="mb-2 text-lg">{formatDate(props.task.deadline)}</p>
        <p className="mb-2 text-gray-600">{props.task.priority}</p>
        {props.task.completed && (
          <p className="text-xs font-bold text-center bg-green-600 uppercase p-1 rounded-lg text-white">{`Completed by: ${props.task.completedBy?.name}`}</p>
        )}
      </div>
      <div className="flex flex-col lg:flex-row gap-2">
        {isAdmin && (
          <button
            onClick={() => handleTaskEdit(props.task)}
            className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg">
            Edit
          </button>
        )}

        <button
          className={`bg-${
            props.task.completed ? 'sky' : 'gray'
          }-500 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg`}
          onClick={updateTask}>
          {taskStatusText()}
        </button>

        {isAdmin && (
          <button
            onClick={() => handleDeleteModal(props.task)}
            className="bg-red-500 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg">
            Delete
          </button>
        )}
      </div>
    </div>
  );
};
