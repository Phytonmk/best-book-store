import { observable, autorun, toJS } from "mobx";
import fingerprint from "fingerprintjs2";
type Book = {
  author: string;
  imageLink: string;
  title: string;
  year: string;
  description: string;
  id: string;
  price: string;
  count: number;
};
export type Store = {
  userId: string;
  cartVisible: boolean;
  searchVisible: boolean;
  searchQuery: string;
  orderVisible: boolean;
  cart: {
    book: Book;
    amount: number;
  }[];
};

export const store = observable<Store>({
  userId: "unknown",
  cartVisible: false,
  searchVisible: false,
  orderVisible: false,
  searchQuery: "",
  cart: []
});

if (process.browser) {
  fingerprint.getV18(userId => {
    store.userId = userId;
  });
}

autorun(() => console.log(toJS(store, { recurseEverything: true })));
