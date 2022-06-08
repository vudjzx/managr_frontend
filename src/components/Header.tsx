import {Link} from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useProjects from '../hooks/useProjects';
import SearchModal from './SearchModal';

const Header = () => {
  const {handleSearchModal, logoutProjects} = useProjects();
  const {logout} = useAuth();

  const handleLogout = () => {
    logout();
    logoutProjects();
  };

  return (
    <header className="px-4 py-5 bg-white border-b">
      <div className="md:flex md:flex-row md:justify-between flex flex-col items-center">
        <Link className="text-4xl text-sky-600 font-black text-center py-2" to="/projects">
          Managr
        </Link>

        <div className="flex flex-col md:flex-row items-center gap-4 py-2">
          <button className="font-bold uppercase" onClick={handleSearchModal}>
            Search project
          </button>
          <Link to="/projects" className="font-bold uppercase">
            Projects
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="text-white text-sm bg-sky-600 rounded-md uppercase font-bold p-3">
            Logout
          </button>
        </div>
      </div>
      <SearchModal />
    </header>
  );
};

export default Header;
