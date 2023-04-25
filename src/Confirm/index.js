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

  const Confirm = () => {
    const navigate = useNavigate();
    return (
        <h1>Confirmation Page</h1>
    );
  }
  export default Confirm;
