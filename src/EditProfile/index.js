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
  const navigate = useNavigate();
  const [base64String, setBase64String] = useState("");
  const [user, setUser] = useState({
    uuid: "",
    active_or_not: false,
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
    avatar_pic_base64: "",
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
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setBase64String(reader.result);
      setUser({
        ...user,
        avatar_pic_base64: reader.result,
      })
    };
  };
  // Get User Information to load into the page
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
        console.log("private profile data: ", data);
        console.log(data.uuid);
        setUser({
          ...user,
          uuid: data.uuid,
          active_or_not: data.active_or_not,
          fname: data.fname || user.fname,
          lname: data.lname || user.lname,
          major: data.major || user.major,
          program: data.program || user.program,
          school_year: data.school_year || user.school_year,
          phone: data.phone || user.phone,
          email: data.email || user.email,
          classes: data.classes || user.classes,
          interests: data.interests || user.interests,
          date_pref: data.date_pref || user.date_pref,
          time_pref: data.time_pref || user.time_pref,
          location_pref: data.location_pref || user.location_pref,
          major_pref: data.major_pref || user.major_pref,
          program_pref: data.program_pref || user.program_pref,
          year_pref: data.year_pref || user.year_pref,
          classes_pref: data.classes_pref || user.classes_pref,
          interests_pref: data.interests_pref || user.interests_pref,
          avatar_pic_base64: data.avatar_pic_base64 || user.avatar_pic_base64,
        });
      });
  };
  // call getPrivateProfile on page load
  useEffect(() => {
    console.log("useEffect called");
    getPrivateProfile();
  }, []);

  // Handle changes for all fields
  const handleChange = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    if (fieldName == "classes" || fieldName == "interests" || fieldName=="time_pref" || fieldName=="location_pref") {
      //remove whitespace and split by comma
      const newarr = fieldValue.replace(/\s/g, "").split(",");
      setUser(prevUser => {
        return {
          ...prevUser,
          [fieldName]: newarr
        };
      });
    } 
    else {
      setUser(prevUser => {
        return {
          ...prevUser,
          [fieldName]: fieldValue
        };
      });
    }
  };


  // Save changes to backend
  const submitProfile = () => {
    // TODO: save profile
    console.log("submitting profile");
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
              userId: user.uuid,
              active_or_not: user.active_or_not,
              fname: user.fname,
              lname: user.lname,
              major: user.major,
              program: user.program,
              school_year: user.school_year,
              phone: user.phone,
              email: user.email,
              classes: user.classes,
              interests: user.interests,
              date_pref: user.date_pref,
              time_pref: user.time_pref,
              location_pref: user.location_pref,
              major_pref: user.major_pref,
              program_pref: user.program_pref,
              year_pref: user.year_pref,
              classes_pref: user.classes_pref,
              interests_pref: user.interests_pref,
              avatar_pic_base64: user.avatar_pic_base64,
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
        console.log("response: ", data);
        navigate("/profile");
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
          <Col span={8}>
            <b>Active</b>
          </Col>
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
          <Col span={8}>
          <Select
              style={{ width: 120 }}
              name = "active_or_not"
              onChange={(value) => {
                setUser((prevState) => ({
                  ...prevState,
                  active_or_not: value,
                }));
              }}
              value={user.active_or_not}
              options={[
                { value: true, label: "true" },
                { value: false, label: "false" },
              ]}
            />
          </Col>
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
        <Row>
          <b> Upload Profile Picture</b>
        </Row>
        <Row>
          <input type="file" onChange={handleImageUpload} />
          {user.avatar_pic_base64 && <img src={user.avatar_pic_base64} alt="No profile Image" />}
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
        {/* <Row>
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
            <Input name="time_pref" value={user.time_pref} onChange={handleChange} ></Input>
          </Col>
          <Col span={8}>
            <Input name="location_pref" value={user.location_pref} onChange={handleChange} />
          </Col>
        </Row> */}
        {/* <Row>
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
        </Row> */}
        <Row>
          <Col span={8}>
            <b>Match Preference</b>
          </Col>
          <Col span={8}>
          </Col>
          <Col span={8}>
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
              ]}
            />
          </Col>
        </Row>
      </Card>
    </Layout>
  );
};
export default EditProfile;
