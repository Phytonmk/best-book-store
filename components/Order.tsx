import React from "react";
import {
  Form,
  Input,
  InputNumber,
  Button,
  Spin,
  notification,
  Result
} from "antd";
import styles from "./Order.module.sass";
import { config } from "../config";
import { store } from "./store";
import { useObserver } from "mobx-react-lite";
import { toJS } from "mobx";
import cx from "classnames";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
};

const validateMessages = {
  required: "This field is required!",
  types: {
    email: "Not a validate email!",
    number: "Not a validate number!"
  },
  number: {
    range: "Must be between ${min} and ${max}"
  }
};

export const Order = () => {
  useObserver(() => toJS(store, { recurseEverything: true }));
  const [submitted, setSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const handleSubmit = React.useCallback(data => {
    setLoading(true);
    const details = `${data.name}, ${data.phone}\n${data.comment || ""}`;
    const formData = new FormData();
    formData.append("user_id", store.userId);
    formData.append(
      "order",
      JSON.stringify(
        store.cart.map(({ amount, book }) => ({ amount, book_id: book.id }))
      )
    );
    formData.append("details", details);
    fetch(`${config.apiUrl}/order`, {
      method: "post",
      body: formData
    })
      .then(() => {
        setSubmitted(true);
        setLoading(false);
        store.cart = [];
        store.searchQuery = "";
      })
      .catch(() => {
        setLoading(false);
        notification.open({
          message: "Our server is being down 🤯",
          description: "Our team of the web monkeys are on the way to fix it"
        });
      });
  }, []);
  React.useEffect(() => {
    if (store.orderVisible) {
      const handleWindowClick = () => {
        store.orderVisible = false;
        setSubmitted(false);
      };
      window.addEventListener("click", handleWindowClick);
      return () => {
        window.removeEventListener("click", handleWindowClick);
      };
    }
  }, [store.orderVisible]);
  const handleContainerClick = React.useCallback(
    event => {
      event.nativeEvent.stopImmediatePropagation();
      if (!store.orderVisible) {
        store.orderVisible = true;
      }
    },
    [store.orderVisible]
  );
  return (
    <div
      onClick={handleContainerClick}
      className={cx(styles.container, store.orderVisible && styles.visible)}
    >
      {submitted ? (
        <Result
          status="success"
          title="You order are being processed 🥳"
          subTitle="We will contact you in a few hours"
        />
      ) : (
        <React.Fragment>
          <h1>🚚 Ordering</h1>
          <Spin spinning={loading}>
            <Form
              {...layout}
              name="nest-messages"
              onFinish={handleSubmit}
              validateMessages={validateMessages}
            >
              <Form.Item
                name={["name"]}
                label="Name"
                rules={[{ required: true }]}
              >
                <Input placeholder="Mikhail Kryuchkov" />
              </Form.Item>
              <Form.Item
                name={["phone"]}
                label="Phone"
                rules={[{ required: true }]}
              >
                <Input placeholder="8 800 555 3535" />
              </Form.Item>
              <Form.Item name={["comment"]} label="Comment">
                <Input.TextArea placeholder="Your special preferences" />
              </Form.Item>
              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Spin>
        </React.Fragment>
      )}
    </div>
  );
};
