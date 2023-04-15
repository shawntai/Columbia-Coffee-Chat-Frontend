import {
  Card,
  Space,
  Row,
  Col,
  Avatar,
  Layout,
  Button,
  Typography,
  Input,
  Select,
  TimePicker,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { redirect, useNavigate } from "react-router-dom";

const EditProfile = () => {
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
  const dateOptions = [
    { label: "Monday", value: "Monday" },
    { label: "Tuesday", value: "Tuesday" },
    { label: "Wednesday", value: "Wednesday" },
    { label: "Thursday", value: "Thursday" },
    { label: "Friday", value: "Friday" },
    { label: "Saturday", value: "Saturday" },
    { label: "Sunday", value: "Sunday" },
  ];
  const handleChange=()=>{
	return 0;
  }
  return (
    <Layout
      style={
        {
          // background: "#012269"
        }
      }
    >
      <Row style={{ background: "#7dbcea", padding: 20 }}>
        <Col span={4}>
          <Typography.Text
            strong
            style={{
              color: "#fff",
              fontSize: "18px",
              cursor: "pointer",
            }}
            onClick={() => navigate("/profile")}
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
            Edit My Profile
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
        extra={<a href="#">Save</a>}
        headStyle={{ background: "#7dbcea" }}
        style={{
          alignContent: "center",
          margin: "auto",
          marginTop: "20px",
          width: "90%",
          boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
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
            <Input defaultValue={user.major} />
          </Col>
          <Col span={8}>
            <Input defaultValue={user.program} />
          </Col>
          <Col span={8}>
            <Input defaultValue={user.year} />
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
            <Space.Compact>
              <Input
                style={{
                  width: "20%",
                }}
                defaultValue="+1"
              />
              <Input
                style={{
                  width: "80%",
                }}
                defaultValue={user.phone}
              />
            </Space.Compact>
          </Col>
          <Col span={8}>
            <Input defaultValue={user.email} />
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
            <Input defaultValue={user.classes.join(", ")} />
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
            <Input defaultValue={user.interests.join(", ")} />
          </Col>
          <Col span={8} />
          <Col span={8} />
        </Row>
      </Card>
      <Card
        title="Preferences"
        extra={<a href="">Save</a>}
        headStyle={{ background: "#7dbcea" }}
        style={{
          margin: "auto",
          marginTop: "20px",
          marginBottom: "20px",
          width: "90%",
          boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
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
            <Select
              mode="multiple"
              placeholder="Select a date"
              options={dateOptions}
              allowClear
              style={{
                width: "100%",
              }}
            />
          </Col>
          <Col span={8}>
            <TimePicker format={"HH:mm"} />
          </Col>
          <Col span={8}>
            <Input placeholder="Please input a location..." />
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
            <Select
              style={{ width: 120 }}
              onChange={handleChange}
              options={[
                { value: "same", label: "same" },
                { value: "different", label: "different" },
                { value: "no_preference", label: "no preference" },
              ]}
            />
          </Col>
          <Col span={8}>
            <Select
              style={{ width: 120 }}
              onChange={handleChange}
              options={[
                { value: "same", label: "same" },
                { value: "different", label: "different" },
                { value: "no_preference", label: "no preference" },
              ]}
            />
          </Col>
          <Col span={8}>
            <Select
              style={{ width: 120 }}
              onChange={handleChange}
              options={[
                { value: "same", label: "same" },
                { value: "different", label: "different" },
                { value: "no_preference", label: "no preference" },
              ]}
            />
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
            <Select
              style={{ width: 120 }}
              onChange={handleChange}
              options={[
                { value: "same", label: "same" },
                { value: "different", label: "different" },
                { value: "no_preference", label: "no preference" },
              ]}
            />
          </Col>
          <Col span={8}>
            <Select
              style={{ width: 120 }}
              onChange={handleChange}
              options={[
                { value: "same", label: "same" },
                { value: "different", label: "different" },
                { value: "no_preference", label: "no preference" },
              ]}
            />
          </Col>
          <Col span={8} />
        </Row>
      </Card>
    </Layout>
  );
};
export default EditProfile;
