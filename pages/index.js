import Head from 'next/head';
import Sidebar from '../components/Sidebar';

export default function Home() {
  return (
    <div>
      <Head>
        <title>One on One Chat</title>
        <meta name='description' content='Next-js One on One Chat' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div>
        <Sidebar />
      </div>
    </div>
  );
}
