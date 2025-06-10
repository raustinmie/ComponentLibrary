import Document, { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

class MyDocument extends Document {
       getInstaFeed = () =>{
          var i,e,d=document,s="script";i=d.createElement("script");i.async=true;i.charset="UTF-8";
          i.src="https://cdn.curator.io/published/01d9a03b-8d03-4d12-bba7-dda11a4abd13.js";
          e=d.getElementsByTagName(s)[0];e.parentNode!.insertBefore(i, e);
          };
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Fonts */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet" />

          {/* Icons & Manifest */}
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" href="/images/logo-dark.png" />
          <link rel="canonical" href="https://harborviewwebdesign.com/" />
          <link rel="manifest" href="/manifest.json" />

          {/* Meta Tags */}
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000" />
          <meta name="robots" content="index, follow" />
          <meta name="description" content="Website design and construction in Whatcom County for small businesses with SEO, hosting, and maintenance." />

          {/* Open Graph */}
          <meta property="og:title" content="Harborview Web Design" />
          <meta property="og:description" content="Website design and construction for small businesses" />
          <meta property="og:image" content="https://harborviewwebdesign.com/WLC-246.jpg" />
          <meta property="og:url" content="https://harborviewwebdesign.com" />
          <meta property="og:type" content="website" />
          <meta property="og:image:type" content="image/jpeg" />

          {/* Twitter Meta */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Harborview Web Design" />
          <meta name="twitter:description" content="Website design and construction for small businesses" />
          <meta name="twitter:image" content="https://harborviewwebdesign.com/WLC-246.jpg" />

          {/* Structured Data (JSON-LD) */}
          <Script
            id="structured-data"
            strategy='afterInteractive'
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "ProfessionalService",
                name: "Harborview Web Design",
                url: "https://harborviewwebdesign.com",
                image: "https://harborviewwebdesign.com/logo-dark.png",
                description:
                  "Website design and construction for small businesses with SEO, hosting, and maintenance.",
                sameAs: [
                  "https://www.facebook.com/harborviewwebdesign",
                  "https://www.instagram.com/harborviewwebdesign",
                ],
              }),
            }}
          />

          {/* CookieYes */}
          <Script
            id="cookieyes"
            type="text/javascript"
            src="https://cdn-cookieyes.com/client_data/aa21b91ed289eb0216365a39/script.js"
            strategy='lazyOnload'
          />
          <script type="text/javascript">
            getInstaFeed();
          </script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;