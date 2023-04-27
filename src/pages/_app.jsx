import Layout from "@/components/Layout/Layout";
import "@/styles/index.sass";

const App = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default App;
