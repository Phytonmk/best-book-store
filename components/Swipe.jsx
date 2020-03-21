import React, { useState } from "react";
import { Swipeable, direction } from "react-deck-swiper";
import dynamic from "next/dynamic";
import styles from "./Swipe.module.sass";
import { config } from "../config";
import { store } from "./store";
import { List, Avatar, notification } from "antd";
import cx from "classnames";
// const Swipeable = dynamic(() => import("react-deck-swiper"), {
//   ssr: false
// });

export const Swipe = () => {
  const [cardNumber, setCardNumber] = useState(0);

  const handleOnSwipe = swipeDirection => {
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
    if (swipeDirection === direction.RIGHT) {
      // handle right swipe
      setCardNumber(cardNumber + 1);
      loadBook;
      return;
    }

    if (swipeDirection === direction.LEFT) {
      // handle left swipe
      setCardNumber(cardNumber + 1);
      loadBook;
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
              muted={true}
              src={`${config.staticUrl}/${welcomeCards[cardNumber].url}`}
            />
          </div>
        ) : (
          <div
            className={cx(styles.swipeCard, styles.recommendedCard)}
            style={{
              backgroundColor: "#8FB9A8"
            }}
          >
            {book && (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <div className={styles.meta}>
                      <Avatar size={85} src={book.imageLink} />
                    </div>
                  }
                  title={`${book.author}: ${book.title}`}
                  description={book.description}
                />
              </List.Item>
            )}
          </div>
        )}
      </Swipeable>
    </div>
  );
};

// const welcomeCards = [
//   {
//     backgroundColor: "#F1828D",
//     url: ""
//   },
//   {
//     backgroundColor: "#FCD0BA",
//     url: ""
//   },
//   {
//     backgroundColor: "#765D69",
//     url: ""
//   }
// ];
