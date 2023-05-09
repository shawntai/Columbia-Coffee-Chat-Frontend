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
  import { useEffect, useState } from "react";
  import { useParams } from 'react-router-dom';
  
  const PublicProfile = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    console.log("id: ", id);
    const [user, setUser] = useState({
      uuid: "",
      active_or_not: true,
      fname: "",
      lname: "",
      major: "",
      program: "",
      school_year: 0,
      phone: "",
      email: "",
      classes: [],
      interests: [],
      date_pref: [],
      time_pref: [],
      location_pref: [],
      major_pref: "",
      program_pref: "",
      year_pref: "",
      classes_pref: "",
      interests_pref: "",
    });
    useEffect(() => {
      console.log("user updated");
      console.log(user);
    }, [user]);
  
    // Get User Information to load into the page
    const getPublicProfile = () => {
      console.log("Calling public profile...");
      fetch(
        "https://u21pmc5zag.execute-api.us-east-1.amazonaws.com/beta/profile/public/" + id,
        {
          method: "GET",
          headers: {
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("public profile: ", data);
          setUser({
            uuid: data.uuid,
            active_or_not: data.active_or_not,
            fname: data.fname,
            lname: data.lname,
            major: data.major,
            program: data.program,
            school_year: data.school_year,
            phone: data.phone,
            email: data.email,
            classes: data.classes,
            interests: data.interests,
            date_pref: data.date_pref,
            time_pref: data.time_pref,
            location_pref: data.location_pref,
            major_pref: data.major_pref,
            program_pref: data.program_pref,
            year_pref: data.year_pref,
            classes_pref: data.classes_pref,
            interests_pref: data.interests_pref,
          });
        });
    };
    // call getPrivateProfile on page load
    useEffect(() => {
      console.log("useEffect called");
      getPublicProfile();
    }, []);
  
    return (
      <Layout
        style={{
          // background: "#012269"
        }}
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
              onClick={() => navigate("/home")}
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
                Your Match
            </Typography.Text>
          </Col>
          <Col span={4}>
          </Col>
        </Row>
  
        <Card
          title="Profile"
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
              <h2>Name: {user.fname + " " + user.lname}</h2>
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
              <p>{user.school_year}</p>
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
        {/* <Card
          title="Preferences"
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
        </Card> */}
      </Layout>
    );
  };
  
  export default PublicProfile;
  