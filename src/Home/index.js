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
		name: "Luke Hsu",
		time: new Date(),
		location: "Butler Library",
	});
	return (
		<div className="App">
			<Layout>
				<Header style={headerStyle}>
					<Row>
						<Col span={20}>
							<Typography.Title
								level={3}
								style={{ color: "#fff" }}
							>
								C-Cube: Columbia Coffee Chat
							</Typography.Title>
						</Col>
						<Col span={4}>
							<Button
								type="primary"
								onClick={() => navigate("/profile")}
							>
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
						<Card style={{ width: "100%", margin: 20 }}>
							<Row>
								<Col span={4}>
									<Avatar size={64} icon={<UserOutlined />} />
								</Col>
								<Col span={10}>
									<Typography.Text
										style={{ fontSize: "30px" }}
									>
										{match.name}
									</Typography.Text>
								</Col>
								<Col span={10}>
									<Row>
										<Space>
											<CalendarOutlined
												style={{ fontSize: 35 }}
											/>
											<Typography.Text
												style={{ fontSize: "20px" }}
											>
												{match.time.toLocaleString()}
											</Typography.Text>
										</Space>
									</Row>
									<Row>
										<Space>
											<PlaceOutlined
												style={{ fontSize: 35 }}
											/>
											<Typography.Text
												style={{ fontSize: "20px" }}
											>
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
