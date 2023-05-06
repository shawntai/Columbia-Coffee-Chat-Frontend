import { Col, Row, Space, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import ChatCard from "./ChatCard";
import { useEffect, useState } from "react";

const History = () => {
  const navigate = useNavigate();
  const [myID, setMyID] = useState({ my_id: "" });
  const [matchHistory, setmatchHistory] = useState([]);
  const fetchMyId = () => {
    console.log("Calling private profile...");
    fetch(
      "https://u21pmc5zag.execute-api.us-east-1.amazonaws.com/beta/profile/private/123",
      {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("private profile: ", data);
        setMyID((prevID) => {
          return {
            my_id: data.uuid,
          };
        });
      });
  };

  const fetchMatchedName = async (userId) => {
    console.log("Calling public profile...");
    const response = await fetch(
      "https://u21pmc5zag.execute-api.us-east-1.amazonaws.com/beta/profile/public/" +
        userId,
      {
        method: "GET",
        headers: {},
      }
    );
    const data = await response.json();
    const fname = data.fname;
    const lname = data.lname;
    const matched_name = fname + " " + lname;
    return matched_name;
  };

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
      .then(async (data) => {
        //console.log("matches: ", data);
        var matches_array = data.matches;
        //console.log("length of matches: ", matches_array.length);
        let all_matches = [];
        for (var i = 0; i < matches_array.length; i++) {
          var thismatch = matches_array[i];
          //console.log("this match: ", thismatch);
          var match_id = thismatch.match_id.S;
          var match_date = thismatch.match_date.S;
          var dater_id = "";
          if (thismatch.user_id1.S === myID["my_id"]) {
            dater_id = thismatch.user_id2.S;
          } else {
            dater_id = thismatch.user_id1.S;
          }
          const dater_name = await fetchMatchedName(dater_id);
		  console.log("dater name: ", dater_name)

          var thismatchInfo = {
            match_id: match_id,
            name: dater_name,
            time: match_date,
            location: "",
          };
          all_matches = all_matches.concat(thismatchInfo);
        }
        console.log("all matches: ", all_matches);
        setmatchHistory(all_matches);
      });
  };
  // call getMatches on page load
  useEffect(() => {
    console.log("useEffect called");
    fetchMyId();
    console.log("fetched my ID:", myID["my_id"]);
    getmatches();
  }, []);

  useEffect(() => {
	console.log("match history changed: ", matchHistory);
  }, [matchHistory]);

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
