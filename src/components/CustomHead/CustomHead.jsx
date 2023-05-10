import Head from 'next/head';
import { useRouter } from 'next/router';

const CustomHead = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
    </>
  );
};

export default CustomHead;
