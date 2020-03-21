import React, { useState } from "react";
import styles from "./Search.module.sass";
import cx from "classnames";
import { Input } from "antd";

export const Search = () => {
  const [isSearchingMode, setSearchingMode] = useState(false);
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
          placeholder="Search for books"
          className={styles.searchInput}
          size="large"
        ></Input.Search>
      </div>
      <div className={styles.searchedBooksBlock}>
        {searchedBooks.map((value, index) => {
          return (
            <div key={value.title} className={styles.searchedBook}>
              <div
                className={styles.bookImage}
                style={{
                  backgroundImage: `url( ${value.imageLink} )`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center"
                }}
              ></div>
              <div className={styles.bookDescription}>
                <span className={styles.title}>{value.title}</span>
                <span className={styles.author}>{value.author}</span>
                <article>{value.description}</article>
                <span className={styles.buyBlock}>
                  <span className={styles.price}>{value.price}</span>
                  <button className={styles.buyButton}>Buy</button>
                </span>
              </div>
            </div>
          );
        })}
      </div>
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
    price: "5.17$",
    count: 84
  }
];
