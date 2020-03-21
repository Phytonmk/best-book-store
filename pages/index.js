import Head from "next/head";
import { Search } from "../components/Search";
import { Stories } from "../components/Stories";
import { Swipe } from "../components/Swipe";
import { Cart } from "../components/Cart";
import { Order } from "../components/Order";
import { Typography } from "antd";

export default function Index() {
  return (
    <div>
      <Head>
        <title>BestBookStore</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Typography.Title>📚Best Books Store</Typography.Title>
      <Stories />
      <Swipe />
      <Search />
      <Cart />
      <Order />
    </div>
  );
}
