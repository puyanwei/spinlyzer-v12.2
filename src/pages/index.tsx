import type { NextPage } from 'next';
import Head from 'next/head';
import { useSession } from 'next-auth/react';
import { trpc } from '../utils/trpc';
import Link from 'next/link';

const Home: NextPage = () => {
  // const hello = trpc.useQuery(['example.getAll']);
  // const mutation = trpc.useMutation(['example.create']);

  // useEffect(() => {
  //   const res = mutation.mutate({ firstName: 'AA', surname: 'MM' });
  //   console.log(res);
  // }, []);

  const { data: session } = useSession();
  console.log('session', session);
  return (
    <>
      <Head>
        <title>Spinlyzer</title>
        <meta name='description' content='Generated by create-t3-app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='grid w-screen min-h-screen p-4 overflow-hidden place-items-center'>
        {session ? (
          <>
            <div>Welcome</div>
            <Link href='/api/auth/signout'>
              <a className='text-blue-400'>Sign Out</a>
            </Link>
          </>
        ) : (
          <Link href='/api/auth/signin'>
            <a className='text-blue-400'>Sign In</a>
          </Link>
        )}
      </div>
    </>
  );
};

export default Home;
