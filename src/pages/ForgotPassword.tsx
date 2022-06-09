import {useState} from 'react';
import {Link} from 'react-router-dom';
import CustomAlert from '../components/CustomAlert';
import axiosClient from '../config/axiosClient';
import {CustomAlertProps} from '../interfaces/CustomAlert';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [alert, setAlert] = useState<CustomAlertProps>({message: '', error: false});

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
      const {data} = await axiosClient.post(`/users/reset`, {
        email,
      });
      setAlert({
        message: data.msg,
        error: false,
      });
      setEmail('');
    } catch (err: any) {
      const {data} = err.response;
      setAlert({
        message: data.msg,
        error: true,
      });
    }
  };

  return (
    <div>
      <h1 className="text-sky-600 font-black text-5xl capitalize">
        Recover your <span className="text-slate-700">password</span>
      </h1>
      {alert.message && <CustomAlert message={alert.message} error={alert.error} />}
      <form className="bg-white my-10 rounded-lg px-10 py-5 shadow" onSubmit={handleSubmit}>
        <div className="flex flex-col -mx-6">
          <div className="w-full mb-6 md:mb-3">
            <label className="text-gray-600 text-xl font-bold mb-5 " htmlFor="email">
              Email
            </label>
            <input
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50 focus:outline-none focus:shadow"
              id="email"
              type="text"
              placeholder="Registration email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <input
            type="submit"
            className="bg-sky-600 text-white text-xl  p-3 rounded-md mt-5 cursor-pointer hover:bg-sky-800 transition-colors focus:outline-none focus:shadow"
            value="Send instructions"
          />
        </div>
      </form>
      <nav className="lg:flex lg:justify-between px-5">
        <Link to="/" className="block text-center my-5 text-slate-600  text-lg">
          Already have an account? Sign in
        </Link>
        <Link to="/register" className="block text-center my-5 text-slate-600  text-lg">
          Sign up
        </Link>
      </nav>
    </div>
  );
};

export default ForgotPassword;
