import {useState} from 'react';
import {Link} from 'react-router-dom';
import CustomAlert from '../components/CustomAlert';
import axiosClient from '../config/axiosClient';
import {CustomAlertProps} from '../interfaces/CustomAlert';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [alert, setAlert] = useState<CustomAlertProps>({message: '', error: false});

  const onSubmit = async (e: any) => {
    e.preventDefault();
    if ([name, email, password, password2].includes('')) {
      setAlert({
        message: 'Please fill in all fields',
        error: true,
      });
      return;
    }

    if (password !== password2) {
      setAlert({
        message: 'Passwords do not match',
        error: true,
      });
      return;
    }

    if (password.length < 6) {
      setAlert({
        message: 'Password must be at least 6 characters',
        error: true,
      });
      return;
    }

    try {
      const {data} = await axiosClient.post('users', {
        name,
        email,
        password,
      });
      setAlert({
        message: data.msg,
        error: false,
      });
      setName('');
      setEmail('');
      setPassword('');
      setPassword2('');
    } catch (e: any) {
      const {data} = e.response;
      setAlert({
        message: data.msg,
        error: true,
      });
    }
  };

  const {message} = alert;

  return (
    <div>
      <h1 className="text-sky-600 font-black text-5xl capitalize">
        Create an account and manage your <span className="text-slate-700">projects</span>
      </h1>

      {message && <CustomAlert message={message} error={alert.error} />}

      <form className="bg-white my-10 rounded-lg px-10 py-5 shadow" onSubmit={onSubmit}>
        <div className="flex flex-col -mx-6">
          <div className="w-full mb-6 md:mb-3">
            <label className="text-gray-600 text-xl font-bold mb-5 " htmlFor="name">
              Name
            </label>
            <input
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50 focus:outline-none focus:shadow"
              id="name"
              type="text"
              placeholder="Your name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className="w-full mb-6 md:mb-3">
            <label className="text-gray-600 text-xl font-bold mb-5 " htmlFor="email">
              Email
            </label>
            <input
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50 focus:outline-none focus:shadow"
              id="email"
              type="text"
              placeholder="Your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="w-full mb-6 md:mb-3">
            <label className="text-gray-600 text-xl font-bold  mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50 focus:outline-none focus:shadow"
              id="password"
              type="password"
              placeholder="Your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="w-full mb-6 md:mb-3">
            <label className="text-gray-600 text-xl font-bold  mb-2" htmlFor="password2">
              Confirm password
            </label>
            <input
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50 focus:outline-none focus:shadow"
              id="password2"
              type="password"
              placeholder="Confirm your password"
              value={password2}
              onChange={e => setPassword2(e.target.value)}
            />
          </div>

          <input
            type="submit"
            className="bg-sky-600 text-white text-xl  p-3 rounded-md mt-5 cursor-pointer hover:bg-sky-800 transition-colors focus:outline-none focus:shadow"
            value="Sign up"
          />
        </div>
      </form>
      <nav className="lg:flex lg:justify-between px-5">
        <Link to="/" className="block text-center my-5 text-slate-600  text-lg">
          Already have an account? Sign in
        </Link>
        <Link to="/forgot-password" className="block text-center my-5 text-slate-600  text-lg">
          Forgot password
        </Link>
      </nav>
    </div>
  );
};

export default Register;
