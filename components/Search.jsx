import React, { useState } from "react";
import styles from "./Search.module.css";
import cx from "classnames";
import { Input, List, Avatar, Button } from "antd";
import { config } from "../config";
import { store } from "./store";

function debounce(cb, wait = 200) {
  let h = 0;
  let callable = (...args) => {
    clearTimeout(h);
    h = setTimeout(() => cb(...args), wait);
  };
  return callable;
}

export const Search = () => {
  const [searchedBooks, setSearchedBooks] = useState([]);
  const [isSearchingMode, setSearchingMode] = useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (isSearchingMode) {
      setTimeout(() => {
        if (!ref.current) {
          return;
        }
        const input = ref.current.input.input;
        const touchHandler = () => {
          input.focus();
        };
        input.addEventListener("touchstart", touchHandler);
        input.dispatchEvent(new Event("touchstart"));
        input.removeEventListener("touchstart", touchHandler);
      }, 500);
    }
  }, [isSearchingMode]);
  React.useEffect(() => {
    if (isSearchingMode) {
      const handleWindowClick = () => {
        setSearchingMode(false);
      };
      window.addEventListener("click", handleWindowClick);
      return () => {
        window.removeEventListener("click", handleWindowClick);
      };
    }
  }, [isSearchingMode, setSearchingMode]);
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = React.useCallback(event => {
    setInputValue(event.target.value);
    fetch(
      `${config.apiUrl}/search?query=${encodeURIComponent(event.target.value)}`,
      { method: "get" }
    )
      .then(data => data.json())
      .then(data => setSearchedBooks(data))
      .catch(err => {
        console.error(err);
        notification.open({
          message: "Our server is being down 🤯",
          description: "Our team of the web monkeys are on the way to fix it"
        });
      });
    // .finally(() => setLoading(false));
  });
  return (
    <div
      className={cx(
        styles.searchBlock,
        isSearchingMode ? styles.isSearchingMode : styles.notSearchingMode
      )}
      onClick={event => {
        event.nativeEvent.stopImmediatePropagation();
      }}
    >
      <div
        className={styles.searchInputBlock}
        onClick={event => {
          event.nativeEvent.stopImmediatePropagation();
          setSearchingMode(true);
        }}
      >
        <Input.Search
          ref={ref}
          placeholder="Search for books"
          className={styles.searchInput}
          size="large"
          disabled={isSearchingMode ? false : true}
          onChange={handleInputChange}
        ></Input.Search>
      </div>
      <List
        className={styles.list}
        size="large"
        bordered
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
                      } else existingBook.amount++;
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

// const searchedBooks = [
//   {
//     author: "Mark P. O. Morford",
//     imageLink: "http://images.amazon.com/images/P/0195153448.jpg",
//     title: "Classical Mythology",
//     year: "2002",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
//     id: "0195153448",
//     price: "5.17",
//     count: 84
//   },
//   {
//     author: "Mark P. O. Morford",
//     imageLink: "http://images.amazon.com/images/P/0195153448.jpg",
//     title: "Classical Mythology",
//     year: "2002",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
//     id: "0195153448",
//     price: "5.17",
//     count: 84
//   },
//   {
//     author: "Mark P. O. Morford",
//     imageLink: "http://images.amazon.com/images/P/0195153448.jpg",
//     title: "Classical Mythology",
//     year: "2002",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
//     id: "0195153448",
//     price: "5.17",
//     count: 84
//   },
//   {
//     author: "Mark P. O. Morford",
//     imageLink: "http://images.amazon.com/images/P/0195153448.jpg",
//     title: "Classical Mythology",
//     year: "2002",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
//     id: "0195153448",
//     price: "5.17",
//     count: 84
//   }
// ];
