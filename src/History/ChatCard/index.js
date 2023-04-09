import { CalendarOutlined } from "@ant-design/icons";
import { PlaceOutlined } from "@mui/icons-material";
import { Button, Card, Col, Row } from "antd";

const ChatCard = ({ chat }) => {
	return (
		<Card
			title={`Coffee Chat with ${chat.name}`}
			headStyle={{ background: "#7dbcea" }}
			style={{ width: "100%", margin: 10 }}
		>
			<Row>
				<Col span={8}>
					<CalendarOutlined />
					{chat.time.toLocaleString()}
				</Col>
				<Col span={8}>
					<PlaceOutlined />
					{chat.location}
				</Col>
				<Col span={8}>
					<Button type="primary">Write a review</Button>
				</Col>
			</Row>
		</Card>
	);
};

export default ChatCard;
