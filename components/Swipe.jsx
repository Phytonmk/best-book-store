import React, { useState } from "react";
import { Swipeable, direction } from "react-deck-swiper";
import dynamic from "next/dynamic";
import styles from "./Swipe.module.sass";

// const Swipeable = dynamic(() => import("react-deck-swiper"), {
//   ssr: false
// });

export const Swipe = () => {
  const [cardNumber, setCardNumber] = useState(0);

  const handleOnSwipe = swipeDirection => {
    if (swipeDirection === direction.RIGHT) {
      // handle right swipe
      setCardNumber(cardNumber + 1);
      return;
    }

    if (swipeDirection === direction.LEFT) {
      // handle left swipe
      setCardNumber(cardNumber + 1);
      return;
    }
  };
  return (
    <div>
      <Swipeable onSwipe={handleOnSwipe}>
        {cardNumber < welcomeCards.length ? (
          <div
            className={styles.swipeCard}
            style={{
              backgroundColor: welcomeCards[cardNumber].backgroundColor,
              backgroundImage: welcomeCards[cardNumber].url || null
            }}
          ></div>
        ) : (
          <div
            className={styles.swipeCard}
            style={{
              backgroundColor: "#8FB9A8"
            }}
          >
            There is no any cards
          </div>
        )}
      </Swipeable>
    </div>
  );
};

const welcomeCards = [
  {
    backgroundColor: "#F1828D",
    url: ""
  },
  {
    backgroundColor: "#FCD0BA",
    url: ""
  },
  {
    backgroundColor: "#765D69",
    url: ""
  }
];
