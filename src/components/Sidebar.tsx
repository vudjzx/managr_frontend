import {Link} from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Sidebar = () => {
  const {auth} = useAuth();
  return (
    <aside className="px-5 py-10 md:w-1/3 lg:w-1/5 xl:w-1/6">
      <h1 className="text-xl font-bold">{`Hello ${auth.name}`}</h1>
      <Link
        to="create-project"
        className="block w-full p-3 mt-5 font-bold text-center text-white uppercase bg-sky-600 rounded-md">
        New Project
      </Link>
    </aside>
  );
};

export default Sidebar;
