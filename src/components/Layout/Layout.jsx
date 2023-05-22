import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollTop from '@/components/ScrollTop/ScrollTop';
import CustomHead from '@/components/CustomHead/CustomHead';

const Layout = ({ children, hasHeader = true, hasFooter = true }) => {
  return (
    <>
      <CustomHead />

      {hasHeader && <Header />}

      <main>{children}</main>

      {hasFooter && <Footer />}

      <ScrollTop />
    </>
  );
};
export const getServerSideProps = async () => {
  const data = await getIndexPageData(CONTENT_TYPE_FOOTER);

  return { props: { data } };
};

export default Layout;
