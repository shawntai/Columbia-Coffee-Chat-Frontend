import {
  Card,
  Button,
  Checkbox,
  Form,
  Input,
  Row,
  Typography,
  Col,
  Space,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";

const Confirm = () => {
  const [state, setState] = useState({
    error: ""
  });
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Success:", values);
    fetch(
      "https://u21pmc5zag.execute-api.us-east-1.amazonaws.com/beta/auth/confirm",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: values.username,
          confirmation_code: values.confirmation_code,
        }),
      }
    )
      .then((response) => {
        if (response.status === 200) {
          navigate("/login");
        } else {
          setState({error: 'something went wrong :('});
          console.log("error");
        }
        return response.json();
      })
      .then((data) => {
        console.log("response:", data);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Row>
        <Col
          span={24}
          style={{
            textAlign: "center",
            color: "#fff",
            backgroundColor: "#012269",
            margin: 0,
          }}
        >
          <Typography.Title level={3} style={{ color: "#fff" }}>
            C-Cube: Columbia Coffee Chat
          </Typography.Title>
        </Col>
      </Row>
      <Row
        style={
          {
            //backgroundImage: `url("https://www.columbia.edu/content/sites/default/files/styles/cu_crop/public/content/Morningside%20Campus%20at%20Dusk%202.jpg?itok=SkwvzD5S")`,
            //height: "100%",
            //width: "100%",
          }
        }
      >
        <Card
          style={{
            width: 600,
            margin: "auto",
            marginTop: 100,
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
          }}
        >
        <Typography.Title level={3}>
            An email with confirmation code has been sent to your email.
        </Typography.Title>
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="UNI"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Confirmation Code"
              name="confirmation_code"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <div style={{color: "red"}}>
                {state.error}
              </div>
            </Form.Item>
          </Form>
        </Card>
      </Row>
    </>
  );
};
export default Confirm;
