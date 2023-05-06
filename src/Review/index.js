import { CalendarOutlined } from "@ant-design/icons";
import { PlaceOutlined } from "@mui/icons-material";
import { Button, Card, Col, Input, Row, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Review = () => {
	// access the id parameter from the URL
	const navigate = useNavigate();
	const { state } = useLocation();
	const chat = state.chat;
	console.log("state: ", state);
	const { id } = useParams();
	// fetch the review from the API
	const [match, setMatch] = useState(null);
	useEffect(() => {
		setMatch({
			match_id: chat.match_id,
			user_id: chat.dater_id,
			user_name: chat.name,
			review: "",
			match_date: chat.time,
			location: "",
		});
	}, [id]);
	// if the review is not loaded yet, show a loading message
	if (!match) {
		return <div>Loading...</div>;
	}
	// Save changes to backend
	const submitReview = () => {
		// TODO: save profile
		console.log("submitting review");
		console.log(match.match_id);
		fetch(
		  "https://u21pmc5zag.execute-api.us-east-1.amazonaws.com/beta/match/submitReview",
		  {
			method: "PUT",
			headers: {
			  Authorization: localStorage.getItem("token"),
			},
			body: JSON.stringify({
				match_id: match.match_id,
				review: match.review,
			}),
		  }
		)
		  .then((response) => response.json())
		  .then((data) => {
			console.log({ data: data });
			// const userId = data["userId"];
			// setUserId(userId);
			// localStorage.setItem("userId", userId);
			//navigate("/history");
		  });
	  };
	// otherwise, show the review
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
						onClick={() => navigate("/history")}
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
						Write a Review
					</Typography.Text>
				</Col>
				<Col span={4} />
			</Row>
			<Card
				title={`Coffee Chat with ${match.user_name}`}
				headStyle={{ background: "#7dbcea" }}
				style={{ width: "100%", margin: 10 }}
			>
				<Space direction="vertical" style={{ width: "100%" }}>
					<Row>
						<Col span={12}>
							<CalendarOutlined />
							{match.match_date.toLocaleString()}
						</Col>
						<Col span={12}>
							<PlaceOutlined />
							{match.location}
						</Col>
					</Row>
					<Row>
						<Input.TextArea
							rows={4}
							placeholder="Write your review here"
						/>
					</Row>
					<Row>
						<Button
							type="primary"
							onClick={() => {
								// update the review property in the match object with api
								// then navigate to the history page
								submitReview();
							}}
						>
							Submit
						</Button>
					</Row>
				</Space>
			</Card>
		</>
	);
};

export default Review;
