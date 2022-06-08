import {CustomAlertProps} from '../interfaces/CustomAlert';

const CustomAlert = (props: CustomAlertProps) => {
  const backgroundColor = props.error ? 'from-red-400 to-red-600' : 'from-sky-400 to-sky-600';

  return (
    <div
      className={`${backgroundColor} bg-gradient-to-br text-center p-3 rounded-xl text-white font-bold text-base my-10`}>
      {props.message}
    </div>
  );
};

export default CustomAlert;
