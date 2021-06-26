import * as EmailValidator from 'email-validator';
import { auth } from '../firebase';

const Sidebar = () => {
  const createChat = (e) => {
    e.preventDefault();
    const input = prompt(
      'Please enter an email address for the user you wish to chat with'
    );

    if (!input) return;

    if (EmailValidator.validate(input)) {
      // we need to add the chat into the db 'chats' collection
    }
  };

  const signOut = () => {
    auth.signOut();
  };

  return (
    <div className=''>
      {/* header */}
      <div className='flex sticky top-0 bg-white z-10 justify-between items-center p-6 h-20 border-b shadow-sm'>
        <div className='w-10 h-10 flex items-center m-[10px] justify-center rounded-full bg-indigo-500 text-white cursor-pointer hover:bg-opacity-90'>
          D
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
        <ul>
          <li>User</li>
          <li>User</li>
          <li>User</li>
          <li>User</li>
          <li>User</li>
          <li>User</li>
          <li>User</li>
          <li>User</li>
          <li>User</li>
          <li>User</li>
          <li>User</li>
          <li>User</li>
          <li>User</li>
          <li>User</li>
          <li>User</li>
          <li>User</li>
          <li>User</li>
          <li>User</li>
          <li>User</li>
          <li>User</li>
          <li>User</li>
          <li>User</li>
          <li>User</li>
          <li>User</li>
          <li>User</li>
          <li>User</li>
          <li>User</li>
          <li>User</li>
          <li>User</li>
          <li>User</li>
          <li>User</li>
          <li>User</li>
          <li>User</li>
          <li>User</li>
          <li>User</li>
          <li>User</li>
          <li>User</li>
          <li>User</li>
          <li>User</li>
          <li>User</li>
          <li>User</li>
          <li>User</li>
          <li>User</li>
          <li>User</li>
          <li>User</li>
          <li>User</li>
          <li>User</li>
          <li>User</li>
          <li>User</li>
          <li>User</li>
          <li>User</li>
          <li>User</li>
          <li>User</li>
          <li>User</li>
          <li>User</li>
          <li>User</li>
          <li>User</li>
          <li>User</li>
          <li>User</li>
          <li>User</li>
          <li>User</li>
          <li>User</li>
          <li>User</li>
          <li>User</li>
          <li>User</li>
          <li>User</li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
