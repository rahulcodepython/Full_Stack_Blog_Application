import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html>
            <Head>
                <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Nunito:300,300i,400,400i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i" rel="stylesheet" />

                <link href="/assets/vendor/aos/aos.css" rel="stylesheet" />
                <link href="/assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
                <link href="/assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet" />
                <link href="/assets/vendor/glightbox/css/glightbox.min.css" rel="stylesheet" />
                <link href="/assets/vendor/remixicon/remixicon.css" rel="stylesheet" />
                <link href="/assets/vendor/swiper/swiper-bundle.min.css" rel="stylesheet" />

                <link href="/assets/css/style.css" rel="stylesheet" />
            </Head>
            <body style={{ scrollBehavior: 'smooth' }}>
                <Main />
                <NextScript />
                <a href="#" className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></a>

                {/* <Script src="assets/vendor/purecounter/purecounter_vanilla.js" />
                <Script src="assets/vendor/aos/aos.js" />
                <Script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js" />
                <Script src="assets/vendor/glightbox/js/glightbox.min.js" />
                <Script src="assets/vendor/isotope-layout/isotope.pkgd.min.js" />
                <Script src="assets/vendor/swiper/swiper-bundle.min.js" />
                <Script src="assets/vendor/php-email-form/validate.js" />

                <Script src="assets/js/main.js" /> */}
            </body>
        </Html>
    )
}