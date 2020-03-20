import Head from "next/head";
import { Search } from "../components/Search";
import { Stories } from "../components/Stories";
import { Swipe } from "../components/Swipe";
import { Cart } from "../components/Cart";

export default function Index() {
  return (
    <div>
      <Head>
        <title>My page title</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Stories />
      <Swipe />
      <Search />
      <Cart />
    </div>
  );
}
