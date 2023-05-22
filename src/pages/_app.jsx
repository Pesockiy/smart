import Head from 'next/head';

import Layout from '@/components/Layout/Layout';
import CustomScripts from '@/components/CustomScripts/CustomScripts';

import '@/styles/index.sass';

const App = ({ Component, pageProps }) => {
  const renderWithLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <CustomScripts />

      {renderWithLayout(<Component {...pageProps} />)}
    </>
  );
};

export default App;