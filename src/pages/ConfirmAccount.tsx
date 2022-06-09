import {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import CustomAlert from '../components/CustomAlert';
import {CustomAlertProps} from '../interfaces/CustomAlert';
import axiosClient from '../config/axiosClient';

const ConfirmAccount = () => {
  const [alert, setAlert] = useState<CustomAlertProps>({message: '', error: false});
  const [confirmedAccount, setConfirmedAccount] = useState(false);
  const {id} = useParams();
  useEffect(() => {
    axiosClient
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/confirm/${id}`)
      .then(res => {
        setAlert({
          message: res.data.msg,
          error: false,
        });
        setConfirmedAccount(true);
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
    <>
      <h1 className="text-sky-600 font-black text-5xl capitalize">
        Confirm your account on <span className="text-slate-700">Managr</span>
      </h1>
      <div className="py-6">{alert.message && <CustomAlert {...alert} />}</div>
      {confirmedAccount && (
        <nav className="flex flex-1 justify-center px-5">
          <Link to="/" className="block text-center my-5 text-slate-600  text-lg">
            Login
          </Link>
        </nav>
      )}
    </>
  );
};

export default ConfirmAccount;
