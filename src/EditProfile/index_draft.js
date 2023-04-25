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
    Form,
    InputNumber,
  } from "antd";
  import { UserOutlined } from "@ant-design/icons";
  import { Content, Footer, Header } from "antd/es/layout/layout";
  import { redirect, useNavigate } from "react-router-dom";
  import { useEffect, useState } from "react";
  
  const EditProfile = () => {
    const [userId, setUserId] = useState("");
    const navigate = useNavigate();
    const [user, setUser] = useState({
      active_or_not: false,
      fname: "Joy",
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
      major_pref: "same",
      program_pref: "Same",
      year_pref: "Same",
      classes_pref: "Same",
      interests_pref: "Same",
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
    const handleChange = () => {
      return 0;
    };
    const get_temp_UserID = () => {
      return "09155cb4-a9e8-4824-947a-41227da56d62";
    };
    const getUserId = () => {
      fetch(
        "https://u21pmc5zag.execute-api.us-east-1.amazonaws.com/beta/profile/private/123",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: {
            auth: localStorage.getItem("authToken"),
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          const userId = data["userId"];
          setUserId(userId);
          localStorage.setItem("userId", userId);
        });
      return userId;
    };
  
    //initial call to get userId
    // console.log("Initial called");
    useEffect(() => {
      setUserId(get_temp_UserID());
      console.log("userId: " + userId);
    }, [userId]);
  
    // submit Profile after user is saved and updated
    // useEffect(() => {
    //   console.log(user);
    // }, [user]);
  
    // submit profile to backend
    const submitProfile = (newProfileData) => {
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
                userId,
                active_or_not: true,
                fname: "Joy",
                lname: "Doe",
                ...newProfileData,
              },
            },
          }),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log({ newProfile: data });
          // setUser(data);
          // const userId = data["userId"];
          // setUserId(userId);
          // localStorage.setItem("userId", userId);
        });
    };
  
    // save changes to user
    const saveUpdatedProfile = (values) => {
      console.log("saving updated profile to user");
      setUser((prevUser) => ({
        ...prevUser,
        major: values.major,
        program: values.program,
        school_year: values.school_year,
        phone: values.phone,
        email: values.email,
        classes: values.classes,
        interests: values.interests,
      }));
    };
  
    // save changes to user preferences
    const saveUpdatedPreferences = (values) => {
      console.log("saving updated preferences to user");
      setUser((prevUser) => ({
        ...prevUser,
        date_pref: values.date_pref,
        time_pref: values.time_pref,
        location_pref: values.location_pref,
        major_pref: values.major_pref,
        program_pref: values.program_pref,
        year_pref: values.year_pref,
        classes_pref: values.classes_pref,
        interests_pref: values.interests_pref,
      }));
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
  
        <Form
          onFinish={(newProfileData) => {
            // const newProfileData = form.getFieldsValue();
            submitProfile(newProfileData);
          }}
        >
          <Card
            title="Profile"
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
                <Form.Item label="Major" name="major" initialValue={user.major}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Program"
                  name="program"
                  initialValue={user.program}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Year"
                  name="school_year"
                  initialValue={user.school_year}
                >
                  <InputNumber />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <Form.Item label="Phone" name="phone" initialValue={user.phone}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Email" name="email" initialValue={user.email}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8} />
            </Row>
            <Row>
              <Col span={8}>
                <Form.Item
                  label="Classes"
                  name="classes"
                  initialValue={user.classes}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8} />
              <Col span={8} />
            </Row>
            <Row>
              <Col span={8}>
                <Form.Item
                  label="Interests"
                  name="interests"
                  initialValue={user.interests}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8} />
              <Col span={8} />
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Save
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Card>
        
  
        {/* <Card
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
        </Card> */}
          <Card
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
                <Form.Item label="Date" name="date_pref">
                  <Select
                    mode="multiple"
                    placeholder="Select a date"
                    options={dateOptions}
                    allowClear
                    value={user.date}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Time" name="time_pref">
                  <TimePicker format={"HH:mm"} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Location" name="location_pref">
                  <Input placeholder="Please input a location..." />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <Form.Item label="Major" name="major_pref">
                  <Select
                    defaultValue={user.major_pref}
                    // value={user.major_pref}
                    style={{ width: 120 }}
                    options={[
                      { value: "same", label: "same" },
                      { value: "different", label: "different" },
                      { value: "no_preference", label: "no preference" },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Program" name="program_pref">
                  <Select
                    style={{ width: 120 }}
                    options={[
                      { value: "same", label: "same" },
                      { value: "different", label: "different" },
                      { value: "no_preference", label: "no preference" },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Year" name="year_pref">
                  <Select
                    style={{ width: 120 }}
                    options={[
                      { value: "same", label: "same" },
                      { value: "different", label: "different" },
                      { value: "no_preference", label: "no preference" },
                    ]}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <Form.Item label="Classes" name="classes_pref">
                  <Select
                    style={{ width: 120 }}
                    options={[
                      { value: "same", label: "same" },
                      { value: "different", label: "different" },
                      { value: "no_preference", label: "no preference" },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Interests" name="interests_pref">
                  <Select
                    style={{ width: 120 }}
                    options={[
                      { value: "same", label: "same" },
                      { value: "different", label: "different" },
                      { value: "no_preference", label: "no preference" },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={8} />
            </Row>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Card>
        </Form>
      </Layout>
    );
  };
  export default EditProfile;
  