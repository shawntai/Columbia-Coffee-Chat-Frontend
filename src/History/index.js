import { Col, Row, Space, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import ChatCard from "./ChatCard";
import { useEffect, useState } from "react";

const History = () => {
	const navigate = useNavigate();
	const [matchHistory, setmatchHistory] = useState([
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
	]);
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
			console.log("matches: ", data);
		  });
	  };
	  // call getMatches on page load
	  useEffect(() => {
		console.log("useEffect called");
		//fetchMyId();
		getmatches();
	  }, []);


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
