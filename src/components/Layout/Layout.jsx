import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ScrollTop from "@/components/ScrollTop/ScrollTop";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>

      <Footer />
      <ScrollTop />
    </>
  );
};

export default Layout;
