import React, { useState } from "react";
import { Swipeable, direction } from "react-deck-swiper";
import dynamic from "next/dynamic";
import styles from "./Swipe.module.sass";
import { config } from "../config";
import { store } from "./store";
import { List, Avatar, notification, Button } from "antd";
import cx from "classnames";

const Card = ({ introCard = false, color, url, book }) => {
  return introCard ? (
    <div
      className={styles.swipeCard}
      style={{
        backgroundColor: color
      }}
    >
      <video
        className={styles.swipeCardVideo}
        autoPlay={true}
        loop={true}
        muted={true}
        src={url}
      />
    </div>
  ) : (
    <div
      className={styles.swipeCard}
      style={{
        backgroundColor: "#8FB9A8"
      }}
    >
      {book && (
        <div className={styles.recommendedBook}>
          <Avatar className={styles.avatar} size={200} src={book.imageLink} />
          <div className={styles.title}>
            {" "}
            {book.author ? `${book.author}: ${book.title}` : " "}
          </div>
          {book.description && (
            <div className={styles.description}>{book.description}</div>
          )}
          {!dataIsTrue ? (
            <Button
              shape="round"
              size="large"
              type="ghost"
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
            >
              BUY ({book.price}$)
            </Button>
          ) : (
            <div>{"\n"}</div>
          )}
        </div>
      )}
    </div>
  );
};

export const Swipe = () => {
  const [cardNumber, setCardNumber] = useState(0);

  const [welcomeCards, setWelcomeCards] = useState([]);
  React.useEffect(() => {
    fetch(`${config.apiUrl}/cards`, { method: "get" })
      .then(data => data.json())
      .then(setWelcomeCards)
      .catch(err => {
        console.error(err);
        notification.open({
          message: "Our server is being down 🤯",
          description: "Our team of the web monkeys are on the way to fix it"
        });
      });
  }, []);

  const [books, setBooks] = useState([]);
  const [dataIsTrue, setDataIsTrue] = useState(true);
  const loadBook = React.useCallback(() => {
    fetch(`${config.apiUrl}/book?user_id=${store.userId}`, { method: "get" })
      .then(data => data.json())
      .then(data => {
        data.found === true
          ? setBooks(books => [JSON.parse(data.book), ...books])
          : setBooks([
              {
                imageLink:
                  "https://cdn.pixabay.com/photo/2018/02/17/17/33/sorry-3160426_960_720.png",
                description:
                  "Sorry, you have watched all the books recommended to you. You can use searching now"
              },
              ...books
            ]) && setDataIsTrue(false);
      })
      .catch(err => {
        console.error(err);
        notification.open({
          message: "Our server is being down 🤯",
          description: "Our team of the web monkeys are on the way to fix it"
        });
      });
    //  .finally(() => setLoading(false));
  }, []);

  React.useEffect(loadBook, []);
  const sendRate = React.useCallback(
    isGood => {
      const formData = new FormData();
      formData.append("user_id", store.userId.toString());
      formData.append("book_id", book.id);
      formData.append("good", isGood);
      fetch(`${config.apiUrl}/rate`, {
        method: "post",
        body: formData
      })
        .then(() => {
          setSubmitted(true);
          setLoading(false);
        })
        .catch(() => {
          // setLoading(false);
          notification.open({
            message: "Our server is being down 🤯",
            description: "Our team of the web monkeys are on the way to fix it"
          });
        });
    },
    [book]
  );
  const handleOnSwipe = swipeDirection => {
    if (swipeDirection === direction.RIGHT) {
      // handle right swipe
      sendRate(true);
    }

    if (swipeDirection === direction.LEFT) {
      // handle left swipe
      sendRate(false);
    }

    setCardNumber(cardNumber + 1);
    if (cardNumber >= welcomeCards.length - 2) loadBook();
  };

  return (
    <div className={styles.cardContainer}>
      <div className={styles.nextCard}>
        <Card
          introCard={Boolean(welcomeCards[cardNumber + 1])}
          color={
            welcomeCards[cardNumber + 1] && welcomeCards[cardNumber + 1].color
          }
          url={
            welcomeCards[cardNumber + 1] &&
            `${config.staticUrl}/${welcomeCards[cardNumber + 1].url}`
          }
          book={books[0]}
        />
      </div>
      <Swipeable
        key={cardNumber}
        onSwipe={() => console.log("swipe")}
        onBeforeSwipe={() => console.log("before swipe")}
        onBeforeSwipe={() => {
          console.log("after swipe");
          handleSwipe();
        }}
      >
        <Card
          introCard={Boolean(welcomeCards[cardNumber])}
          color={welcomeCards[cardNumber] && welcomeCards[cardNumber].color}
          url={
            welcomeCards[cardNumber] &&
            `${config.staticUrl}/${welcomeCards[cardNumber].url}`
          }
          book={books[1]}
        />
      </Swipeable>
    </div>
  );
};
