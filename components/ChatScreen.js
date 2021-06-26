import { useRouter } from 'next/dist/client/router';
import { useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { auth, db } from '../firebase';
import firebase from 'firebase';
import Message from './Message';
import getRecipientEmail from '../utils/getRecipientEmail';
import TimeAgo from 'timeago-react';

const ChatScreen = ({ chat, messages }) => {
  const [input, setInput] = useState('');
  const router = useRouter();
  const endOfMessagesRef = useRef(null);
  const [user] = useAuthState(auth);
  const [messagesSnapshot] = useCollection(
    db
      .collection('chats')
      .doc(router.query.id)
      .collection('messages')
      .orderBy('timestamp', 'asc')
  );

  const [recipientSnapshot] = useCollection(
    db
      .collection('users')
      .where('email', '==', getRecipientEmail(chat.users, user))
  );

  const scrollToBottom = () => {
    endOfMessagesRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const showMessages = () => {
    if (messagesSnapshot) {
      return messagesSnapshot.docs.map((message) => (
        <Message
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime(),
          }}
        />
      ));
    } else {
      return JSON.parse(messages).map((message) => (
        <Message key={message.id} user={message.user} message={message} />
      ));
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();

    // update last seen
    db.collection('users').doc(user.uid).set(
      {
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    db.collection('chats').doc(router.query.id).collection('messages').add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user.email,
      photoURL: user.photoURL,
    });

    setInput('');

    scrollToBottom();
  };

  const recipientEmail = getRecipientEmail(chat.users, user);
  const recipient = recipientSnapshot?.docs?.[0]?.data();

  return (
    <div>
      <div className='sticky bg-white z-40 top-0 flex p-6 h-20 border-b items-center'>
        <div className='w-8 h-8 m-2 mr-3 bg-gray-300 text-white flex items-center justify-center rounded-full overflow-hidden'>
          <img
            className='w-full object-cover'
            src={recipient?.photoURL}
            alt='avatar'
          />
        </div>
        <div className='ml-2 flex-1'>
          <h3 className='mb-0.5'>{recipientEmail}</h3>
          {recipientSnapshot ? (
            <p className='text-xs text-gray-500'>
              Last active:{' '}
              {recipient?.lastSeen?.toDate() ? (
                <TimeAgo datetime={recipient?.lastSeen?.toDate()} />
              ) : (
                'Unavailable'
              )}
            </p>
          ) : (
            <p className='text-sm'>Loading...</p>
          )}
        </div>
      </div>

      <div className='p-10 bg-indigo-200 min-h-[90vh]'>
        {showMessages()}

        <div className='mb-20' ref={endOfMessagesRef} />
      </div>

      <form className='border flex items-center p-2 sticky bottom-0 bg-white z-50'>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className='w-full flex-1 p-2 sticky bottom-0 bg-gray-100 z-50'
          placeholder='Say Something'
          type='text'
        />
        <button
          hidden
          disabled={!input}
          onClick={sendMessage}
          type='submit'
          className='ml-1 bg-gray-100 p-2 rounded-tr-xl rounded-br-xl'
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatScreen;
