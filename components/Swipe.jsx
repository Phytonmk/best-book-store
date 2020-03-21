import React, { useState } from "react";
import { Swipeable, direction } from "react-deck-swiper";
import dynamic from "next/dynamic";
import styles from "./Swipe.module.sass";
import { config } from "../config";
import { store } from "./store";
import { List, Avatar, notification, Button } from "antd";
import cx from "classnames";

export const Swipe = () => {
  const [cardNumber, setCardNumber] = useState(5);

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
    //  .finally(() => setLoading(false));
  }, []);

  const [book, setBook] = useState(undefined);
  const loadBook = React.useCallback(() => {
    fetch(`${config.apiUrl}/book?user_id=${store.userId}`, { method: "get" })
      .then(data => data.json())
      .then(data => {
        setBook(JSON.parse(data.book));
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
  const handleOnSwipe = swipeDirection => {
    if (swipeDirection === direction.RIGHT) {
      // handle right swipe
      setCardNumber(cardNumber + 1);
      if (cardNumber > welcomeCards.length) loadBook();
      return;
    }

    if (swipeDirection === direction.LEFT) {
      // handle left swipe
      setCardNumber(cardNumber + 1);
      if (cardNumber > welcomeCards.length) loadBook();
      return;
    }
  };
  return (
    <div className={styles.cardContainer}>
      <Swipeable onSwipe={handleOnSwipe}>
        {cardNumber < welcomeCards.length ? (
          <div
            className={styles.swipeCard}
            style={{
              backgroundColor: welcomeCards[cardNumber].color
            }}
          >
            <video
              className={styles.swipeCardVideo}
              autoPlay={true}
              loop={true}
              muted={true}
              src={`${config.staticUrl}/${welcomeCards[cardNumber].url}`}
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
                <Avatar
                  className={styles.avatar}
                  size={200}
                  src={book.imageLink}
                />
                <div
                  className={styles.title}
                >{`${book.author}: ${book.title}`}</div>
                {book.description && (
                  <div className={styles.description}>{book.description}</div>
                )}
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
              </div>
            )}
          </div>
        )}
      </Swipeable>
    </div>
  );
};
