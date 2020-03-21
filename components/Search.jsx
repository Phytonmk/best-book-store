import React, { useState } from "react";
import dynamic from "next/dynamic";
import styles from "./Search.module.sass";
import cx from "classnames";

export const Search = () => {
  const [isSearchingMode, setSearchingMode] = useState(true);
  React.useEffect(() => {
    const handleWindowClick = () => {
      setSearchingMode(false);
    };
    window.addEventListener("click", handleWindowClick);
    return () => {
      window.removeEventListener("click", handleWindowClick);
    };
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
        <input
          placeholder="Search for some books"
          className={styles.searchInput}
        ></input>
        <svg
          viewBox="64 64 896 896"
          focusable="false"
          class=""
          data-icon="search"
          width="2em"
          height="2em"
          fill="white"
          aria-hidden="true"
        >
          <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path>
        </svg>
      </div>
      <div className={styles.searchedBooksBlock}>
        {searchedBooks.map((value, index) => {
          return (
            <div className={styles.searchedBook}>
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
                <h4>{value.title}</h4>
                <h5>{value.author}</h5>
                <article>{value.description}</article>
                <span>{value.price}</span>
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
    price: "5.17",
    count: 84
  }
];
