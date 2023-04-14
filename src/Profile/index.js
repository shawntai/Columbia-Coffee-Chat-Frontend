import {
  Card,
  Space,
  Row,
  Col,
  Avatar,
  Layout,
  Button,
  Typography,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { redirect, useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const user = {
    name: "John Doe",
    major: "Computer Science",
    program: "Bachelors",
    year: 3,
    phone: "555-555-5555",
    email: "abc@gmail.com",
    classes: ["CS 101", "CS 102", "CS 103"],
    interests: ["Music", "Movies", "Sports"],
    date_pref: ["Monday", "Tuesday", "Sunday"],
    time_pref: ["Afternoon", "Evening"],
    location_pref: ["Butler Library", "Butler Cafe"],
    major_pref: "Same",
    program_pref: "Same",
    year_pref: "Same",
    classes_pref: "Same",
    interests_pref: "Same",
  };
  return (
    <Layout>
      <Row style={{ background: "#7dbcea", padding: 20 }}>
        <Col span={4}>
          <Typography.Text
            strong
            style={{
              color: "#fff",
              fontSize: "18px",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            Back
          </Typography.Text>
        </Col>
        <Col span={16} style={{ textAlign: "center" }}>
          <Typography.Text
            strong
            style={{
              color: "#fff",
              fontSize: "18px",
              textAlign: "center",
            }}
          >
            My Profile
          </Typography.Text>
        </Col>
        <Col span={4}>
          <Typography.Text
            strong
            style={{
              color: "#fff",
              fontSize: "18px",
              cursor: "pointer",
            }}
            onClick={() => navigate("/history")}
          >
            History
          </Typography.Text>
        </Col>
      </Row>

      <Card
        title="Profile"
        extra={<a href="#">Edit</a>}
        style={{
          alignContent: "center",
          margin: "auto",
          marginTop: "20px",
          width: "90%",
        }}
      >
        <Row>
          <Space>
            <Avatar size={24} icon={<UserOutlined />} />
            <h2>Name: {user.name}</h2>
          </Space>
        </Row>
        <Row>
          <Col span={8}>
            <b>Major</b>
          </Col>
          <Col span={8}>
            <b>Program</b>
          </Col>
          <Col span={8}>
            <b>Year</b>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <p>{user.major}</p>
          </Col>
          <Col span={8}>
            <p>{user.program}</p>
          </Col>
          <Col span={8}>
            <p>{user.year}</p>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <b>Phone</b>
          </Col>
          <Col span={8}>
            <b>Email</b>
          </Col>
          <Col span={8} />
        </Row>
        <Row>
          <Col span={8}>
            <p>{user.phone}</p>
          </Col>
          <Col span={8}>
            <p>{user.email}</p>
          </Col>
          <Col span={8} />
        </Row>
        <Row>
          <Col span={8}>
            <b>Classes</b>
          </Col>
          <Col span={8} />
          <Col span={8} />
        </Row>
        <Row>
          <Col span={8}>
            <p>{user.classes.join(", ")}</p>
          </Col>
          <Col span={8} />
          <Col span={8} />
        </Row>
        <Row>
          <Col span={8}>
            <b>Interests</b>
          </Col>
          <Col span={8} />
          <Col span={8} />
        </Row>
        <Row>
          <Col span={8}>
            <p>{user.interests.join(", ")}</p>
          </Col>
          <Col span={8} />
          <Col span={8} />
        </Row>
      </Card>
      <Card
        title="Preferences"
        extra={<a href="">Edit</a>}
        style={{
          margin: "auto",
          marginTop: "20px",
          marginBottom: "20px",
          width: "90%",
        }}
      >
        <Row>
          <Col span={8}>
            <b>Date</b>
          </Col>
          <Col span={8}>
            <b>Time</b>
          </Col>
          <Col span={8}>
            <b>Location</b>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <p>{user.date_pref.join(", ")}</p>
          </Col>
          <Col span={8}>
            <p>{user.time_pref.join(", ")}</p>
          </Col>
          <Col span={8}>
            <p>{user.location_pref.join(", ")}</p>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <b>Major</b>
          </Col>
          <Col span={8}>
            <b>Program</b>
          </Col>
          <Col span={8}>
            <b>Year</b>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <p>{user.major_pref}</p>
          </Col>
          <Col span={8}>
            <p>{user.program_pref}</p>
          </Col>
          <Col span={8}>
            <p>{user.year_pref}</p>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <b>Classes</b>
          </Col>
          <Col span={8}>
            <b>Interests</b>
          </Col>
          <Col span={8} />
        </Row>
        <Row>
          <Col span={8}>
            <p>{user.classes_pref}</p>
          </Col>
          <Col span={8}>
            <p>{user.interests_pref}</p>
          </Col>
          <Col span={8} />
        </Row>
      </Card>
    </Layout>
  );
};

export default Profile;
