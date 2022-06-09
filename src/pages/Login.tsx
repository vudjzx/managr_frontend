import {useState} from 'react';
import {Link, Navigate, useNavigate} from 'react-router-dom';
import {CustomAlertProps} from '../interfaces/CustomAlert';
import axiosClient from '../config/axiosClient';
import CustomAlert from '../components/CustomAlert';
import useAuth from '../hooks/useAuth';
import {ILoginRes} from '../interfaces/IAuth';
import {LoadingComponent} from '../components/LoadingComponent';
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [alert, setAlert] = useState<CustomAlertProps>({message: '', error: false});
  const {auth, setAuth, loading} = useAuth();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (email === '' || email.length < 6) {
      setAlert({
        message: 'Please fill in all fields',
        error: true,
      });
      return;
    }

    try {
      const {data}: ILoginRes = await axiosClient.post(`/users/login`, {
        email,
        password,
      });
      setAlert({
        message: '',
        error: false,
      });
      setEmail('');
      setPassword('');
      localStorage.setItem('token', data.token);
      setAuth(data);
      navigate('/projects');
    } catch (err: any) {
      const {data} = err.response;
      setAlert({
        message: data.msg,
        error: true,
      });
    }
  };

  if (loading) {
    return (
      <>
        <LoadingComponent />
      </>
    );
  }
  if (!loading && auth._id !== '') {
    return <Navigate to={'/projects'} />;
  }
  return (
    <>
      {auth._id !== '' ? (
        <Navigate to={'/projects'} />
      ) : (
        <div>
          <h1 className="text-sky-600 font-black text-5xl capitalize">
            Login and manage your <span className="text-slate-700">projects</span>
          </h1>
          {alert.message && <CustomAlert message={alert.message} error={alert.error} />}
          <form className="bg-white my-10 rounded-lg px-10 py-5 shadow" onSubmit={handleSubmit}>
            <div className="flex flex-col -mx-6">
              <div className="w-full mb-6 md:mb-3">
                <label className="text-gray-600 text-xl font-bold mb-5 " htmlFor="grid-first-name">
                  Email
                </label>
                <input
                  className="w-full mt-3 p-3 border rounded-xl bg-gray-50 focus:outline-none focus:shadow"
                  id="grid-first-name"
                  type="text"
                  placeholder="user@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div className="w-full mb-6 md:mb-3">
                <label className="text-gray-600 text-xl font-bold  mb-2" htmlFor="grid-last-name">
                  Password
                </label>
                <input
                  className="w-full mt-3 p-3 border rounded-xl bg-gray-50 focus:outline-none focus:shadow"
                  id="grid-last-name"
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>

              <input
                type="submit"
                className="bg-sky-600 text-white text-xl  p-3 rounded-md mt-5 cursor-pointer hover:bg-sky-800 transition-colors focus:outline-none focus:shadow"
                value="Login"
              />
            </div>
          </form>
          <nav className="lg:flex lg:justify-between px-5">
            <Link to="/register" className="block text-center my-5 text-slate-600  text-lg">
              Sign up
            </Link>
            <Link to="/forgot-password" className="block text-center my-5 text-slate-600  text-lg">
              Forgot password
            </Link>
          </nav>
        </div>
      )}
    </>
  );
};

export default Login;
