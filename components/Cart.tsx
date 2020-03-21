import React from "react";
import styles from "./Cart.module.sass";
import { List, Avatar, Button } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import cx from "classnames";
import { observer, useObservable, useObserver } from "mobx-react-lite";
import { store, Store } from "./store";
import { toJS } from "mobx";
import { Order } from "./Order";

export const Cart = () => {
  const [isOpen, setIsOpen] = React.useState(true);
  const [orderPage, setOrderPage] = React.useState(true);
  React.useEffect(() => {
    if (isOpen) {
      const handleWindowClick = () => {
        setIsOpen(false);
        setOrderPage(false);
      };
      window.addEventListener("click", handleWindowClick);
      return () => {
        window.removeEventListener("click", handleWindowClick);
      };
    }
  }, [setIsOpen]);
  const handleContainerClick = React.useCallback(
    event => {
      event.nativeEvent.stopImmediatePropagation();
      if (!isOpen) {
        setIsOpen(true);
      }
    },
    [isOpen, setIsOpen]
  );
  useObserver(() => toJS(store, { recurseEverything: true }));
  const sum = store.cart.reduce(
    (sum, item) => sum + parseInt(item.book.price, 10) * item.amount,
    0
  );
  return (
    <div
      className={cx(styles.cart, isOpen && styles.visible)}
      onClick={handleContainerClick}
    >
      {orderPage ? (
        <Order />
      ) : (
        <List
          className={styles.list}
          size="large"
          header={<div>🛒 Cart</div>}
          footer={
            <div>
              <div>{sum}$</div>
              <div>
                <Button
                  disabled={store.cart.length === 0}
                  size="large"
                  type="default"
                  onClick={() => setOrderPage(true)}
                >
                  🛍 Order
                </Button>
              </div>
            </div>
          }
          bordered
          dataSource={store.cart}
          renderItem={(item: Store["cart"][0], index) => (
            <List.Item
              extra={`${parseInt(item.book.price, 10) * item.amount}$`}
            >
              <List.Item.Meta
                avatar={<Avatar size={85} src={item.book.imageLink} />}
                title={`${item.book.title} (${item.book.author})`}
                description={
                  <Button.Group>
                    <Button
                      onClick={() => {
                        if (item.amount === 1) {
                          if (store.cart.length === 1) {
                            setIsOpen(false);
                          }
                          store.cart.splice(index, 1);
                        } else {
                          item.amount--;
                        }
                      }}
                    >
                      {item.amount === 1 ? "🗑" : <MinusOutlined />}
                    </Button>
                    <Button>{item.amount}</Button>
                    <Button onClick={() => item.amount++}>
                      <PlusOutlined />
                    </Button>
                  </Button.Group>
                }
              />
            </List.Item>
          )}
        />
      )}
    </div>
  );
};
