import {Navigate, Outlet} from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import useAuth from '../hooks/useAuth';
const PrivateLayout = () => {
  const {auth, loading} = useAuth();

  if (loading) {
    return (
      <>
        <div>loading...</div>
      </>
    );
  }

  return (
    <div>
      {auth._id !== '' ? (
        <div>
          <Header />
          <div className="md:flex md:min-h-screen">
            <Sidebar />
            <main className="flex-1 p-10">
              <Outlet />
            </main>
          </div>
        </div>
      ) : (
        <Navigate to={'/'} />
      )}
    </div>
  );
};

export default PrivateLayout;
