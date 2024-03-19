import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ViewHistoryStories = () => {
  const navigate = useNavigate();
  const [historyContents, setHistoryContents] = useState([]);

  useEffect(() => {
    const chapterHistory =
      JSON.parse(localStorage.getItem("chapterHistory")) || [];
    const recentHistory = chapterHistory.slice(0, 3); // Lấy 3 truyện gần đây nhất

    if (recentHistory.length > 0) {
      Promise.all(
        recentHistory.map(({ storyId, chapterNo }) =>
          fetch(
            `http://localhost:9999/story/content/${storyId}/${chapterNo}`
          ).then((res) => res.json())
        )
      ).then((data) => {
        setHistoryContents(data);
      });
    }
  }, []);

  const handleViewAll = () => {
    navigate("/view_all_history");
  };

  return (
    <Row className={"border"} style={{ marginBottom: "20px" }}>
      <Col className="mt-2 mb-3 pt-1 pb-1 border-bottom border-2 border-info">
        <h5>Truyện Đã Đọc</h5>
      </Col>
      {historyContents.map((content, index) => (
        <Row key={index} className={"pb-3"}>
          <Col
            xs={12}
            onClick={() =>
              navigate(
                `/get_story/${content.storyId}/chapter/${content.chapterNo}`
              )
            }
          >
            <Row>
              <Col xs={4}>
                <img
                  style={{ height: "85%", width: "70%" }}
                  src={content.storyImage}
                  alt={content.storyName}
                />
              </Col>
              <Col xs={8}>
                <div>{content.storyName}</div>
                <div>
                  Chương {content.chapterNo}: {content.chapterName}
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      ))}
      <Button onClick={handleViewAll} variant="primary">
        Xem Tất Cả
      </Button>
    </Row>
  );
};

export default ViewHistoryStories;
