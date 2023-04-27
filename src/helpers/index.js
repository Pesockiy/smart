export const smoothScroll = (offset = 0) => {
    window.scrollTo({
      top: offset,
      behavior: "smooth",
    });
  };