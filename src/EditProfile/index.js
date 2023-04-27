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
import { useEffect, useState } from "react";

const EditProfile = () => {
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();
  const [user, setUser] = useState({
    uuid: "",
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
  const dateOptions = [
    { label: "Monday", value: "Monday" },
    { label: "Tuesday", value: "Tuesday" },
    { label: "Wednesday", value: "Wednesday" },
    { label: "Thursday", value: "Thursday" },
    { label: "Friday", value: "Friday" },
    { label: "Saturday", value: "Saturday" },
    { label: "Sunday", value: "Sunday" },
  ];
  
  const [userUpdated, setUserUpdated] = useState(false);
  useEffect(() => {
    setUserUpdated(true);
  }, [user]);

  const getPrivateProfile = () => {
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
        // //const userId = data["userId"];
        // //setUserId(userId);
        // // turn data to JSON
        // // data = JSON.parse(data);
        // // console.log(data['active_or_not']);
        // console.log(data['classes']);
        // console.log(data['fname']);
        setUser({
          uuid: data.uuid,
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
        console.log("data:", data.major)
        console.log("user:", user.major)
      });
  };

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
        console.log(data);
      });
  };
  const handleSchoolYearChange = (event) => {
    setUser({ ...user, school_year: event.target.value });
  };

  // Handle changes for all fields
  const handleChange = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
  
    setUser(prevUser => {
      return {
        ...prevUser,
        [fieldName]: fieldValue
      };
    });
  }
  // handle changes for select
  function handleChangeSelect(value, option) {
    const fieldName = option.name;
    setUser(prevUser => {
      return {
        ...prevUser,
        [fieldName]: value
      };
    });
  }
  
  
  

  //initial call
  useEffect(() => {
    console.log("useEffect called");
    getPrivateProfile();
  }, []);

  const submitProfile = () => {
    // TODO: save profile
    console.log("submitting profile");
    const updatedProfile = {
      active_or_not: false,
      fname: "Joey",
      lname: "Doe",
      major: "Computer Science",
      program: "Bachelors",
      school_year: 3,
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
    fetch(
      "https://u21pmc5zag.execute-api.us-east-1.amazonaws.com/beta/profile/edit",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          body: {
            profile: {
              userId,
              ...updatedProfile,
            },
          },
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log({ newProfile: data });
        // const userId = data["userId"];
        // setUserId(userId);
        // localStorage.setItem("userId", userId);
      });
  };
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
        extra={<Button onClick={submitProfile}>Save</Button>}
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
            <Input name="major" value={user.major} onChange={handleChange}/>
          </Col>
          <Col span={8}>
            <Input name = "program" value={user.program} onChange={handleChange}/>
          </Col>
          <Col span={8}>
            <input type="number" name="school_year" value={user.school_year} onChange={handleChange} />
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
                  width: "80%",
                }}
                name = "phone"
                value={user.phone}
                onChange={handleChange}
              />
            </Space.Compact>
          </Col>
          <Col span={8}>
            <Input name="email" value={user.email} onChange={handleChange}/>
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
            <Input name="classes" value={user.classes.join(", ")} onChange={handleChange}/>
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
            <Input name="interests" value={user.interests.join(", ")} onChange={handleChange}/>
          </Col>
          <Col span={8} />
          <Col span={8} />
        </Row>
      </Card>
      <Card
        title="Preferences"
        extra={<Button onClick={submitProfile}>Save</Button>}
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
              name = "date_pref"
              value={user.date_pref}
              onChange={(value) => {
                setUser((prevState) => ({
                  ...prevState,
                  date_pref: value
                }));
              }}
            />
          </Col>
          <Col span={8}>
            {/* <TimePicker format={"HH:mm"} /> */}
            <Input name="time_pref" value={user.time_pref} onChange={handleChange} ></Input>
          </Col>
          <Col span={8}>
            <Input name="location_pref" value={user.location_pref} onChange={handleChange} />
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
              name = "major_pref"
              onChange={(value) => {
                setUser((prevState) => ({
                  ...prevState,
                  major_pref: value
                }));
              }}
              value={user.major_pref}
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
              onChange={(value) => {
                setUser((prevState) => ({
                  ...prevState,
                  program_pref: value
                }));
              }}
              name = "program_pref"
              value = {user.program_pref}
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
              name = "year_pref"
              value = {user.year_pref}
              onChange={(value) => {
                setUser((prevState) => ({
                  ...prevState,
                  year_pref: value
                }));
              }}
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
              name = "classes_pref"
              value = {user.classes_pref}
              onChange={(value) => {
                setUser((prevState) => ({
                  ...prevState,
                  classes_pref: value
                }));
              }}
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
              name = "interests_pref"
              value = {user.interests_pref}
              onChange={(value) => {
                setUser((prevState) => ({
                  ...prevState,
                  interests_pref: value
                }));
              }}
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
      <Button
        onClick={() => {
          getPublicProfile();
        }}
      >
        matches
      </Button>
    </Layout>
  );
};
export default EditProfile;
