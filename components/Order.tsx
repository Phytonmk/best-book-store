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
      })
      .catch(() => {
        setLoading(false);
        notification.open({
          message: "Our server is being down 🤯",
          description: "Our team of the web monkeys are on the way to fix it"
        });
      });
  }, []);
  if (submitted) {
    return (
      <Result
        status="success"
        title="You order are being processed 🥳"
        subTitle="We will contact you in a few hours"
      />
    );
  }
  return (
    <div className={styles.container}>
      <h1>🚚 Ordering</h1>
      <Spin spinning={loading}>
        <Form
          {...layout}
          name="nest-messages"
          onFinish={handleSubmit}
          validateMessages={validateMessages}
        >
          <Form.Item name={["name"]} label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name={["phone"]}
            label="Phone"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name={["comment"]} label="Comment">
            <Input.TextArea />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  );
};
