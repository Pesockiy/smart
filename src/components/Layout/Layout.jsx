import { useToggle, useOffsetTop } from "@/hooks";
import { smoothScroll } from "@/helpers";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Modal from "@/common/Modal/Modal";
import ScrollTop from "@/components/ScrollTop/ScrollTop";

const scrollOffset = 20;

const Layout = ({ children }) => {
  const [isVisible] = useOffsetTop(scrollOffset);
  const [isMenuOpen, setIsMenuOpen] = useToggle(false);

  return (
    <>
      <Header openMenuHandler={setIsMenuOpen} />

      <main>{children}</main>

      {isVisible && <ScrollTop onClick={smoothScroll} />}
      <Footer/>
      {isMenuOpen && (
        <Modal isVisible={isMenuOpen} center={true} onClose={setIsMenuOpen} />
      )}
    </>
  );
};

export default Layout;
