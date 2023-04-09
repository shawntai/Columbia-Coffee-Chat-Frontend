import { Card, Space, Row, Col, Avatar, Layout, Button } from "antd";
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
  };
  return (
    <Layout>
      <Header>
		<Row>
		<Col span={3}>
          <Button onClick={() => navigate("/")}>
            <Space size="small">Back</Space>
          </Button>
        </Col>
        <Col span={3}>
          <Button onClick={() => navigate("/history")}>
            <Space size="small">History</Space>
          </Button>
        </Col>
		</Row>
        
      </Header>
      <Content>
          <Card
            title="Profile"
            extra={<a href="#">Edit</a>}
            style={{
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
			  <Col span={8}/>
            </Row>
            <Row>
              <Col span={8}>
                <p>{user.phone}</p>
              </Col>
              <Col span={8}>
                <p>{user.email}</p>
              </Col>
			  <Col span={8}/>
            </Row>
			<Row>
				<Col span={8}>
					<b>Classes</b>
				</Col>
				<Col span={8}/>
				<Col span={8}/>
			</Row>
			<Row>
				<Col span={8}>
					<p>{user.classes}</p>
				</Col>
				<Col span={8}/>
				<Col span={8}/>
			</Row>
          </Card>
          <Card
            size="small"
            title="Small size card"
            extra={<a href="#">More</a>}
            style={{
              width: 300,
            }}
          >
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
      </Content>
    </Layout>
  );
};

export default Profile;
