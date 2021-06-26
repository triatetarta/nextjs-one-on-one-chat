import moment from 'moment';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

const Message = ({ user, message }) => {
  const [userLoggedIn] = useAuthState(auth);

  const typeOfMessage =
    user === userLoggedIn.email
      ? 'ml-auto bg-green-400 text-right'
      : 'bg-gray-200 text-left';

  return (
    <div>
      <p
        className={`w-max py-4 px-10 rounded-lg m-3 min-w-[60px] pb-10 relative ${typeOfMessage}`}
      >
        {message.message}
        <span className='text-gray-600 p-3 text-xs absolute bottom-0 right-0 text-right'>
          {message.timestamp ? moment(message.timestamp).format('LT') : '...'}
        </span>
      </p>
    </div>
  );
};

export default Message;
