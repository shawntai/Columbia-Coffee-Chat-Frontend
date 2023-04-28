import { CalendarOutlined, UserOutlined } from "@ant-design/icons";
import { PlaceOutlined } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Card,
  Col,
  Layout,
  Row,
  Space,
  Typography,
} from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const headerStyle = {
  textAlign: "center",
  color: "#fff",
  // height: 64,
  // paddingInline: 50,
  // lineHeight: "64px",
  backgroundColor: "#012269",
  margin: 0,
};

const contentStyle = {
  textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#6cade5",
};

const footerStyle = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#7dbcea",
};

const Home = () => {
  const navigate = useNavigate();
  const [match, setMatch] = useState({
    this_user_id: "",
    matched_id: "",
    matched_name: "",
    match_date: "",
    location: "TBD",
  });
  useEffect(() => {
    console.log("match updated");
    console.log(match);
  }, [match]);

  const getPublicProfile = () => {
    console.log("Calling public profile...");
    fetch(
      "https://u21pmc5zag.execute-api.us-east-1.amazonaws.com/beta/profile/public/09155cb4-a9e8-4824-947a-41227da56d62",
      {
        method: "GET",
        headers: {},
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("public profile: ", data);
      });
  };

  const fetchMatchedName = (userId) => {
    console.log("Calling public profile...");
    fetch(
      "https://u21pmc5zag.execute-api.us-east-1.amazonaws.com/beta/profile/public/"+userId,
      {
        method: "GET",
        headers: {},
      }
    )
      .then((response) => response.json())
      .then((data) => {
        const fname = data.fname;
        const lname = data.lname;
        console.log(fname + " " + lname);
        setMatch(prevMatch => {
          return ({
            ...prevMatch,
            matched_name: fname + " " + lname,
            })
        })
      });
  };
  useEffect(() => { fetchMatchedName(match.matched_id) }, [match.matched_id]);

  const fetchMyId = () => {
    console.log("Calling private profile...");
    fetch(
      "https://u21pmc5zag.execute-api.us-east-1.amazonaws.com/beta/profile/private/123",
      {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("private profile: ", data);
        setMatch(prevMatch => {
          return ({
            ...prevMatch,
            this_user_id: data.uuid,
            })
        })
      });
  };

  const getmatches = () => {
    console.log("get matches");
    fetch(
      "https://u21pmc5zag.execute-api.us-east-1.amazonaws.com/beta/match/past",
      {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        const thismatch = data["matches"][0];
        console.log(thismatch);
        if (thismatch.user_id1.S !== match.this_user_id) {
          setMatch(prevMatch => {
            return ({
              ...prevMatch,
              matched_id: thismatch.user_id1.S,
              })
          })
        }
        setMatch(prevMatch => {
          return ({ 
            ...prevMatch,
          match_date: new Date(thismatch.match_date.S),
          })
        })
      });
  };
  // call getMatches on page load
  useEffect(() => {
    console.log("useEffect called");
    fetchMyId();
    getmatches();
  }, []);

  return (
    <div className="App">
      <Layout>
        <Header style={headerStyle}>
          <Row>
            <Col span={20}>
              <Typography.Title level={3} style={{ color: "#fff" }}>
                C-Cube: Columbia Coffee Chat
              </Typography.Title>
            </Col>
            <Col span={4}>
              <Button type="primary" onClick={() => navigate("/profile")}>
                <Space size="small">
                  <Avatar size={24} icon={<UserOutlined />} />
                  Profile
                </Space>
              </Button>
            </Col>
          </Row>
        </Header>
        <Content style={contentStyle}>
          <Row>
            <img
              src="https://www.columbia.edu/content/sites/default/files/styles/cu_crop/public/content/Morningside%20Campus%20at%20Dusk%202.jpg?itok=SkwvzD5S"
              width="100%"
            />
          </Row>
          <Row>
            <Typography.Text
              style={{
                color: "white",
                margin: 20,
                fontSize: "20pt",
              }}
            >
              Your Match of the Week
            </Typography.Text>
          </Row>
          <Row>
            <Card style={{ width: "100%", margin: 20 }}
            onClick={() => navigate("/publicprofile")}>
              <Row>
                <Col span={4}>
                  <Avatar size={64} icon={<UserOutlined />} />
                </Col>
                <Col span={10}>
                  <Typography.Text style={{ fontSize: "30px" }}>
                    {match.matched_name}
                  </Typography.Text>
                </Col>
                <Col span={10}>
                  <Row>
                    <Space>
                      <CalendarOutlined style={{ fontSize: 35 }} />
                      <Typography.Text style={{ fontSize: "20px" }}>
                        {match.match_date.toLocaleString()}
                      </Typography.Text>
                    </Space>
                  </Row>
                  <Row>
                    <Space>
                      <PlaceOutlined style={{ fontSize: 35 }} />
                      <Typography.Text style={{ fontSize: "20px" }}>
                        {match.location}
                      </Typography.Text>
                    </Space>
                  </Row>
                </Col>
              </Row>
            </Card>
          </Row>
        </Content>
        {/* <Footer style={footerStyle}>Footer</Footer> */}
      </Layout>
    </div>
  );
};

export default Home;
