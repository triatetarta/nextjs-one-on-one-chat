import Head from 'next/head';
import { auth, provider } from '../firebase';

const Login = () => {
  const signIn = () => {
    auth.signInWithPopup(provider).catch((err) => console.log(err));
  };

  return (
    <div className='grid place-items-center h-screen bg-gray-100'>
      <Head>
        <title>Login</title>
      </Head>

      <div className='flex flex-col px-16 py-32 bg-white rounded-2xl shadow-md'>
        <div className='text-center mb-8 bg-blue-500 text-white rounded-full px-2 py-10 text-2xl'>
          My Chat
        </div>
        <button onClick={signIn} className='bg-gray-100 py-2 px-3'>
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
