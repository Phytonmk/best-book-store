import React, { useState } from "react";
import styles from "./Search.module.css";
import cx from "classnames";
import { Input, List, Avatar, Button } from "antd";
import { config } from "../config";
import { store } from "./store";
import { useObserver } from "mobx-react-lite";
import { toJS } from "mobx";

function debounce(cb, wait = 200) {
  let timeout = 0;
  const callable = (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => cb(...args), wait);
  };
  return callable;
}

export const Search = () => {
  useObserver(() => toJS(store, { recurseEverything: true }));
  const [searchedBooks, setSearchedBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (store.searchVisible) {
      setTimeout(() => {
        if (ref.current) {
          ref.current.input.input.focus();
        }
      }, 500);
    }
  }, [store.searchVisible]);
  React.useEffect(() => {
    if (store.searchVisible) {
      const handleWindowClick = () => {
        store.searchVisible = false;
      };
      window.addEventListener("click", handleWindowClick);
      return () => {
        window.removeEventListener("click", handleWindowClick);
      };
    }
  }, [store.searchVisible]);
  const searchRequest = React.useCallback(
    debounce(query => {
      fetch(`${config.apiUrl}/search?query=${encodeURIComponent(query)}`, {
        method: "get"
      })
        .then(data => data.json())
        .then(data => setSearchedBooks(data))
        .catch(err => {
          console.error(err);
          notification.open({
            message: "Our server is being down 🤯",
            description: "Our team of the web monkeys are on the way to fix it"
          });
        })
        .finally(() => setLoading(false));
    }, 300),
    []
  );
  React.useEffect(() => {
    if (store.searchQuery) {
      setLoading(true);
      searchRequest(store.searchQuery);
    }
  }, [store.searchQuery, searchRequest]);
  return (
    <div
      className={cx(
        styles.searchBlock,
        store.searchVisible ? styles.isSearchingMode : styles.notSearchingMode
      )}
      onClick={event => {
        event.nativeEvent.stopImmediatePropagation();
      }}
    >
      <div
        className={styles.searchInputBlock}
        onClick={event => {
          event.nativeEvent.stopImmediatePropagation();
          store.searchVisible = true;
        }}
      >
        <Input.Search
          ref={ref}
          placeholder="🔍 Search for books"
          className={styles.searchInput}
          size="large"
          disabled={store.searchVisible ? false : true}
          onChange={event => (store.searchQuery = event.target.value)}
          value={store.searchQuery}
        ></Input.Search>
      </div>
      <List
        className={styles.list}
        locale={{
          emptyText: "Try to search 👆🏼✍🏼👀"
        }}
        size="large"
        bordered
        loading={loading}
        dataSource={searchedBooks}
        renderItem={(book, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <div className={styles.meta}>
                  <Avatar size={85} src={book.imageLink} />
                  <Button
                    onClick={() => {
                      const existingBook = store.cart.find(
                        item => item.book.id === book.id
                      );
                      if (!existingBook) {
                        store.cart.push({ book, amount: 1 });
                      } else {
                        existingBook.amount++;
                      }
                      store.cartVisible = true;
                    }}
                    size="large"
                    className={styles.buyBtn}
                  >
                    BUY ({book.price}$)
                  </Button>
                </div>
              }
              title={`${book.author}: ${book.title}`}
              description={book.description}
            />
          </List.Item>
        )}
      />
    </div>
  );
};
