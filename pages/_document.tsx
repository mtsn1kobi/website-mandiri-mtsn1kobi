import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon/favicon.ico" />
        <link href="/assets-driving/css2.css" rel="stylesheet" />

        <link href="/assets-driving/all.min.css" rel="stylesheet" />
        <link href="/assets-driving/bootstrap-icons.css" rel="stylesheet" />

        <link href="/assets-driving/animate.min.css" rel="stylesheet" />
        <link href="/assets-driving/owl.carousel.min.css" rel="stylesheet" />

        <link href="/assets-driving/bootstrap.min.css" rel="stylesheet" />

        <link href="/assets-driving/style.css" rel="stylesheet" />
      </Head>
      <body>
        <Main />
        <div
          dangerouslySetInnerHTML={{
            __html: `
            <script
              src="https://code.jquery.com/jquery-3.4.1.min.js"
              type="be14d61ecad8522dff25ad61-text/javascript"
            ></script>
            <script
              src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js"
              type="be14d61ecad8522dff25ad61-text/javascript"
            ></script>
            <script
              src="/assets-driving/wow.min.js"
              type="be14d61ecad8522dff25ad61-text/javascript"
            ></script>
            <script
              src="/assets-driving/easing.min.js"
              type="be14d61ecad8522dff25ad61-text/javascript"
            ></script>
            <script
              src="/assets-driving/waypoints.min.js"
              type="be14d61ecad8522dff25ad61-text/javascript"
            ></script>
            <script
              src="/assets-driving/owl.carousel.min.js"
              type="be14d61ecad8522dff25ad61-text/javascript"
            ></script>

            <script
              src="/assets-driving/main.js"
              type="be14d61ecad8522dff25ad61-text/javascript"
            ></script>
            <script
              src="/assets-driving/rocket-loader.min.js"
              data-cf-settings="be14d61ecad8522dff25ad61-|49"
              defer
            ></script>
            <script
              type="module"
              src="https://pages-github.b-cdn.net/webcomponents/modules/cs-input.js?v=0.0.1"
            ></script>            
            <cs-modal-wrapper></cs-modal-wrapper>
        `,
          }}
        ></div>
        <NextScript />
      </body>
    </Html>
  );
}
