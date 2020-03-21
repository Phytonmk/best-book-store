import React, { useState } from "react";
import styles from "./Search.module.css";
import cx from "classnames";
import { Input, List, Avatar, Button } from "antd";

export const Search = () => {
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
                  <Button size="large" className={styles.buyBtn}>
                    {book.price}$
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

const searchedBooks = [
  {
    author: "Mark P. O. Morford",
    imageLink: "http://images.amazon.com/images/P/0195153448.jpg",
    title: "Classical Mythology",
    year: "2002",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    id: "0195153448",
    price: "5.17",
    count: 84
  },
  {
    author: "Mark P. O. Morford",
    imageLink: "http://images.amazon.com/images/P/0195153448.jpg",
    title: "Classical Mythology",
    year: "2002",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    id: "0195153448",
    price: "5.17",
    count: 84
  },
  {
    author: "Mark P. O. Morford",
    imageLink: "http://images.amazon.com/images/P/0195153448.jpg",
    title: "Classical Mythology",
    year: "2002",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    id: "0195153448",
    price: "5.17",
    count: 84
  },
  {
    author: "Mark P. O. Morford",
    imageLink: "http://images.amazon.com/images/P/0195153448.jpg",
    title: "Classical Mythology",
    year: "2002",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    id: "0195153448",
    price: "5.17",
    count: 84
  }
];
