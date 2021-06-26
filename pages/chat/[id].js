import Head from 'next/head';
import Sidebar from '../../components/Sidebar';
import ChatScreen from '../../components/ChatScreen';
import { auth, db } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import getRecipientEmail from '../../utils/getRecipientEmail';

const ChatRoom = ({ chat, messages }) => {
  const [user] = useAuthState(auth);

  return (
    <div className='flex'>
      <Head>
        <title>Chat with {getRecipientEmail(chat.users, user)}</title>
      </Head>
      <Sidebar />

      <div className='flex-1 overflow-y-scroll h-screen'>
        <ChatScreen chat={chat} messages={messages} />
      </div>
    </div>
  );
};

export default ChatRoom;

export async function getServerSideProps(context) {
  const ref = db.collection('chats').doc(context.query.id);

  const messagesRes = await ref
    .collection('messages')
    .orderBy('timestamp', 'asc')
    .get();

  const messages = messagesRes.docs
    .map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    })
    .map((messages) => ({
      ...messages,
      timestamp: messages.timestamp.toDate().getTime(),
    }));

  const chatRes = await ref.get();
  const chat = {
    id: chatRes.id,
    ...chatRes.data(),
  };

  return {
    props: {
      messages: JSON.stringify(messages),
      chat: chat,
    },
  };
}
