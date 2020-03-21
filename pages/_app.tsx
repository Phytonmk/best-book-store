import styles from "./_app.module.sass";
import Head from "next/head";
import stylesheet from "antd/dist/antd.min.css";
import "./styles.css";

const MyApp = ({ Component, pageProps }: any) => (
  <div className={styles.app}>
    <Head>
      <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
    </Head>
    <div className={styles.inner}>
      <Component {...pageProps} />
    </div>
  </div>
);

export default MyApp;
