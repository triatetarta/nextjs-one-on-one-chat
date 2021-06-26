import * as EmailValidator from 'email-validator';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import Chat from './Chat';

const Sidebar = () => {
  const [user] = useAuthState(auth);
  const userChatRef = db
    .collection('chats')
    .where('users', 'array-contains', user.email);
  const [chatsSnapsot] = useCollection(userChatRef);

  const createChat = (e) => {
    e.preventDefault();
    const input = prompt(
      'Please enter an email address for the user you wish to chat with'
    );

    if (!input) return;

    if (
      EmailValidator.validate(input) &&
      !chatAlreadyExists(input) &&
      input !== user.email
    ) {
      db.collection('chats').add({
        users: [user.email, input],
      });
    }
  };

  const chatAlreadyExists = (recipientEmail) =>
    !!chatsSnapsot?.docs.find(
      (chat) =>
        chat.data().users.find((user) => user === recipientEmail)?.length > 0
    );

  const signOut = () => {
    auth.signOut();
  };

  return (
    <div className='flex-[0.45] border-r h-screen min-w-[300px] max-w-[350px]'>
      {/* header */}
      <div className='flex sticky top-0 bg-white z-10 justify-between items-center p-6 h-20 border-b shadow-sm'>
        <div className='w-10 h-10 flex items-center m-[10px] justify-center rounded-full bg-indigo-500 text-white cursor-pointer hover:bg-opacity-90 overflow-hidden'>
          <img
            className='w-full object-cover'
            src={user.photoURL}
            alt='avatar'
          />
        </div>
        <button
          onClick={signOut}
          className='bg-indigo-500 text-white rounded-md p-2'
        >
          Sign Out
        </button>
      </div>

      {/* online user list */}
      <div className='p-6'>
        <button
          onClick={createChat}
          className='uppercase font-medium w-full bg-gray-100 rounded-lg py-1 border-t border-b hover:bg-opacity-50'
        >
          start a new chat
        </button>

        {chatsSnapsot?.docs.map((chat) => {
          return <Chat key={chat.id} id={chat.id} users={chat.data().users} />;
        })}
      </div>
    </div>
  );
};

export default Sidebar;
