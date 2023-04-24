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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  //const [userInfo, setUserInfo] = useState({});

  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Success:", values);
    fetch(
      "https://u21pmc5zag.execute-api.us-east-1.amazonaws.com/beta/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username_or_email: values.username,
          password: values.password,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("response:", data);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  //   const [userInfo, setUserInfo] = useState({});
  //   useEffect(() => {
  //     console.log(userInfo);
  //     }, [userInfo]);
  //   fetch("http://localhost:3001/login", {
  //     method: "POST",
  //     headers: {
  //         "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(userInfo),
  //     })
  //     .then((response) => response.json())
  //     .then((data) => {
  //         console.log(data);
  //         setUserInfo(data);
  //     });
  return (
    <>
      <Row>
        <Col
          span={24}
          style={{
            textAlign: "center",
            color: "#fff",
            // height: 64,
            // paddingInline: 50,
            // lineHeight: "64px",
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
              label="Username"
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
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </Form>
          <Button onClick={() => navigate("/register")}>Register</Button>
        </Card>
      </Row>
    </>
  );
};
export default Login;
