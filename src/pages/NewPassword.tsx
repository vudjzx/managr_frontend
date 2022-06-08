import {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import CustomAlert from '../components/CustomAlert';
import {CustomAlertProps} from '../interfaces/CustomAlert';
import axiosClient from '../config/axiosClient';

const NewPassword = () => {
  const [alert, setAlert] = useState<CustomAlertProps>({message: '', error: false});
  const [isValidToken, setIsValidToken] = useState(false);
  const {token} = useParams();
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [showLogin, setShowLogin] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if ([password, passwordConfirm].some(p => p.length < 6)) {
      setAlert({
        message: 'Password must be at least 6 characters long',
        error: true,
      });
      return;
    }
    if (password !== passwordConfirm) {
      setAlert({
        message: 'Passwords do not match',
        error: true,
      });
      return;
    }
    await axiosClient
      .post(`/users/reset/${token}`, {
        password,
      })
      .then(res => {
        setAlert({
          message: res.data.msg,
          error: false,
        });
        setShowLogin(true);
        setPassword('');
        setPasswordConfirm('');
      })
      .catch(err => {
        const {data} = err.response;
        setAlert({
          message: data.msg,
          error: true,
        });
      });
  };

  useEffect(() => {
    axiosClient
      .get(`/users/reset/${token}`)
      .then(() => {
        setIsValidToken(true);
      })
      .catch(err => {
        const {data} = err.response;
        setAlert({
          message: data.msg,
          error: true,
        });
      });
  }, []);

  return (
    <div>
      <h1 className="text-sky-600 font-black text-5xl capitalize">
        Recover your <span className="text-slate-700">account</span>
      </h1>
      {alert.message && <CustomAlert {...alert} />}
      {isValidToken && (
        <form className="bg-white my-10 rounded-lg px-10 py-5 shadow" onSubmit={handleSubmit}>
          <div className="flex flex-col -mx-6">
            <div className="w-full mb-6 md:mb-3">
              <label className="text-gray-600 text-xl font-bold  mb-2" htmlFor="password">
                New password
              </label>
              <input
                className="w-full mt-3 p-3 border rounded-xl bg-gray-50 focus:outline-none focus:shadow"
                id="password"
                type="password"
                placeholder="Your new password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <div className="w-full mb-6 md:mb-3">
              <label className="text-gray-600 text-xl font-bold  mb-2" htmlFor="password2">
                Confirm new password
              </label>
              <input
                className="w-full mt-3 p-3 border rounded-xl bg-gray-50 focus:outline-none focus:shadow"
                id="password2"
                type="password"
                placeholder="Confirm your new password"
                value={passwordConfirm}
                onChange={e => setPasswordConfirm(e.target.value)}
              />
            </div>

            <input
              type="submit"
              className="bg-sky-700 text-white text-xl  p-3 rounded-md mt-5 cursor-pointer hover:bg-sky-800 transition-colors focus:outline-none focus:shadow"
              value="Confirm"
            />
          </div>
        </form>
      )}
      {showLogin && (
        <nav className="flex flex-1 justify-center px-5">
          <Link to="/" className="block text-center my-5 text-slate-600  text-lg">
            Login
          </Link>
        </nav>
      )}
    </div>
  );
};

export default NewPassword;
