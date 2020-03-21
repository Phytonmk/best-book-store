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
  cart: {
    book: Book;
    amount: number;
  }[];
};

export const store = observable<Store>({
  userId: "unknown",
  cartVisible: false,
  cart: [
    {
      book: {
        author: "Mark P. O. Morford",
        imageLink: "http://images.amazon.com/images/P/0195153448.jpg",
        title: "Classical Mythology",
        year: "2002",
        description: "...",
        id: "0195153448",
        price: "5.17",
        count: 84
      },
      amount: 16
    }
  ]
});

if (process.browser) {
  fingerprint.getV18(userId => {
    store.userId = userId;
  });
}

autorun(() => console.log(toJS(store, { recurseEverything: true })));
