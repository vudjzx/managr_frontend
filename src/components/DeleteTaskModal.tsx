import {Fragment, useEffect} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import useProjects from '../hooks/useProjects';
import {createDefaultCollaborator} from '../interfaces/Responses';

const DeleteTaskModal = () => {
  const {
    task,
    deleteModal,
    handleDeleteCollaborator,
    deleteCollabModal,
    handleDeleteModal,
    deleteTask,
    project,
    collaborator,
  } = useProjects();

  const modalTitle = deleteModal ? 'Delete Task' : deleteCollabModal ? 'Delete Collaborator' : '';
  const modalBody = deleteModal
    ? 'Are you sure you want to delete this task?'
    : deleteCollabModal
    ? 'Are you sure you want to remove this collaborator?'
    : '';

  const onConfirmDelete = async () => {
    if (task._id && task._id !== '' && deleteModal) {
      await deleteTask(task._id, 'task');
    }
    if (deleteCollabModal) {
      await deleteTask(project._id, 'collaborator', collaborator._id);
    }
  };

  useEffect(() => {
    if (deleteModal) {
      console.log('delete task modal is open');
    }
    if (deleteCollabModal) {
      console.log('delete collab modal is open');
    }
  }, []);

  const handleClose = () => {
    if (deleteModal) {
      handleDeleteModal();
    }
    if (deleteCollabModal) {
      handleDeleteCollaborator(createDefaultCollaborator());
    }
  };

  return (
    <Transition.Root show={deleteModal || deleteCollabModal} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={handleClose}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={handleClose}>
                  <span className="sr-only">Close</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 md:ml-0 sm:text-left w-full">
                  <Dialog.Title as="h3" className="text-lg leading-6 font-bold text-gray-900">
                    {modalTitle}
                  </Dialog.Title>

                  <div className="flex flex-col md:flex-row items-center mt-5">
                    <div className="p-5 md:mr-5 rounded-full bg-red-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10 "
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="white"
                        strokeWidth={2}>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <h1 className="text-lg mt-2">{modalBody}</h1>
                      <p className="mt-2 text-gray-500">This action cannot be undone.</p>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-5 justify-end">
                    <button
                      onClick={handleClose}
                      className="p-3 rounded-lg text-center text-white bg-sky-500">
                      Close
                    </button>
                    <button
                      onClick={onConfirmDelete}
                      className="p-3 rounded-lg text-center text-white bg-red-500">
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default DeleteTaskModal;
