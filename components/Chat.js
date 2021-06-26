import { useRouter } from 'next/dist/client/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { auth, db } from '../firebase';
import getRecipientEmail from '../utils/getRecipientEmail';

const Chat = ({ id, users }) => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [recipientSnapshot] = useCollection(
    db.collection('users').where('email', '==', getRecipientEmail(users, user))
  );

  const enterChat = () => {
    router.push(`/chat/${id}`);
  };

  const recipient = recipientSnapshot?.docs?.[0]?.data();
  const recipientEmail = getRecipientEmail(users, user);

  return (
    <div
      onClick={enterChat}
      className='flex items-center p-2 break-words cursor-pointer hover:bg-gray-100'
    >
      {recipient ? (
        <img
          className='w-8 h-8 object-cover rounded-full mr-1'
          src={recipient?.photoURL}
          alt='avatar'
        />
      ) : (
        <div className='w-8 h-8 m-2 mr-3 bg-gray-300 text-white flex items-center justify-center rounded-full'>
          D
        </div>
      )}

      <p>{recipientEmail}</p>
    </div>
  );
};

export default Chat;
