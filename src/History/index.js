import { Col, Row, Space, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import ChatCard from "./ChatCard";

const History = () => {
	const navigate = useNavigate();
	const matchHistory = [
		{
			match_id: 1,
			name: "Shawn Tai",
			time: new Date(),
			location: "Butler Library",
		},
		{
			match_id: 2,
			name: "Luke Hsu",
			time: new Date(),
			location: "Ferris Booth Commons",
		},
		{
			match_id: 3,
			name: "Curt Cobain",
			time: new Date(),
			location: "Myanmar",
		},
	];
	return (
		<>
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
						My Coffee Chat History
					</Typography.Text>
				</Col>
				<Col span={4} />
			</Row>
			<Space direction="vertical" style={{ width: "100%" }}>
				{matchHistory.map((chat) => (
					<ChatCard chat={chat} />
				))}
			</Space>
		</>
	);
};

export default History;
