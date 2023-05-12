import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollTop from '@/components/ScrollTop/ScrollTop';
import CustomHead from '@/components/CustomHead/CustomHead';

import { CONTENT_TYPE_FOOTER, CONTENT_TYPE, getIndexPageData } from '@/contentful/pages';

const Layout = ({ data, children }) => {
  return (
    <>
      <CustomHead />
      <Header />
      <main>{children}</main>

      <Footer />
      <ScrollTop />
    </>
  );
};
export const getServerSideProps = async () => {
  const data = await getIndexPageData(CONTENT_TYPE_FOOTER);

  return { props: { data } };
};

export default Layout;
