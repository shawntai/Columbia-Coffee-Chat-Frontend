import { Col, Row, Space, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import HistoryCard from "./HistoryCard";

const History = () => {
	const navigate = useNavigate();
	return (
		<div>
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
			<Space direction="vertical">
				<HistoryCard />
				<HistoryCard />
				<HistoryCard />
			</Space>
		</div>
	);
};

export default History;
