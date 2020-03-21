import styles from "./_app.module.sass";
import Head from "next/head";
const MyApp = ({ Component, pageProps }: any) => (
  <div className={styles.app}>
    <Head>
      <link
        href="https://fonts.googleapis.com/css?family=Baloo+2&display=swap"
        rel="stylesheet"
      />
    </Head>
    <div className={styles.inner}>
      <Component {...pageProps} />
    </div>
  </div>
);

export default MyApp;
