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

const UploadImage = () => {
  const navigate = useNavigate();
  const [base64String, setBase64String] = useState("");

  useEffect(() => {
    console.log("base64String", base64String);
  }, [base64String]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setBase64String(reader.result);
    };
  };

  return (
    <>
      <div>
        <input type="file" onChange={handleImageUpload} />
        {base64String && <img src={base64String} alt="Uploaded Image" />}
      </div>
      <div>
        {<img src={base64String} alt="Uploaded Image" />}
        </div>
    </>
  );
};
export default UploadImage;
