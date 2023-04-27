import React from "react";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Modal from "@/common/Modal/Modal";
import ScrollTop from "@/components/ScrollTop/ScrollTop";

import { useToggle, useOffsetTop } from "@/hooks";
import { smoothScroll } from "@/helpers";

const scrollOffset = 20;

const Layout = ({ children }) => {
  const [isVisible] = useOffsetTop(scrollOffset);
  const [isMenuOpen, setIsMenuOpen] = useToggle(false);

  return (
    <>
      <Header openMenuHandler={setIsMenuOpen} />

      <main>{children}</main>

      {isVisible && <ScrollTop onClick={smoothScroll} />}
      <Footer>fjuh</Footer>
      {isMenuOpen && (
        <Modal
          isVisible={isMenuOpen}
          overlay={true}
          center={true}
          onClose={setIsMenuOpen}
        />
      )}
    </>
  );
};

export default Layout;
