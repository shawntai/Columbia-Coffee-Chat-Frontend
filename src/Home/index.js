import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Layout, Row, Space, Typography } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { redirect, useNavigate } from "react-router-dom";

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
								C-Cube: Columbia Coffee Chat{" "}
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
					<img src="https://www.columbia.edu/content/sites/default/files/styles/cu_crop/public/content/Morningside%20Campus%20at%20Dusk%202.jpg?itok=SkwvzD5S" />
				</Content>
				{/* <Footer style={footerStyle}>Footer</Footer> */}
			</Layout>
		</div>
	);
};

export default Home;
