import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollTop from '@/components/ScrollTop/ScrollTop';
import CustomHead from '@/components/CustomHead/CustomHead';

const Layout = ({ children }) => {
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

export default Layout;
