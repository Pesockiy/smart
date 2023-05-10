import Script from 'next/script';

import * as gtag from '../../lib/gtag';

const CustomScripts = () => {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TOKEN}`}
      />
      <Script
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${gtag.GA_TOKEN}', {
          page_path: window.location.pathname,
        });
      `,
        }}
      />
      {/* <Script
        id="endorsal-scripts"
        strategy="afterInteractive"
        src="https://cdn.endorsal.io/widgets/widget.min.js"
        onReady={() => {
          !(function () {
            window;
            var e,
              t = document;
            (e = function () {
              var e = t.createElement("script");
              (e.defer = !0),
                (e.src = "https://cdn.endorsal.io/widgets/widget.min.js");

              var n = t.getElementsByTagName("script")[0];
              n.parentNode.insertBefore(e, n),
                (e.onload = function () {
                  NDRSL.init("645bc1946a882009ab9efae3");
                });
            }),
              "interactive" === t.readyState || "complete" === t.readyState
                ? e()
                : t.addEventListener("DOMContentLoaded", e());
          })();
        }}
      /> */}
    </>
  );
};

export default CustomScripts;
