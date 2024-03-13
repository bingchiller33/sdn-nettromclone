import { memo, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ViewHistoryStories = () => {
  const navigate = useNavigate();
  const [historyContents, setHistoryContents] = useState([]);
  useEffect(() => {
    const chapterHistory =
      JSON.parse(localStorage.getItem("chapterHistory")) || [];
    if (chapterHistory.length > 0) {
      Promise.all(
        chapterHistory.map((item) =>
          fetch(`http://localhost:9999/story/content/${item.chapterId}`).then(
            (res) => res.json()
          )
        )
      ).then((data) => {
        setHistoryContents(data.filter((item) => item && item.storyId));
      });
    }
  }, []);

  const handleOnclickTop = (storyId) => {
    navigate(`/detail/${storyId}`);
  };

  return (
    <Row className={"border"}>
      <Col className="mt-2 mb-3 pt-1 pb-1 border-bottom border-2 border-info">
        <h5>Truyện Đã Đọc</h5>
      </Col>
      <Col
        xs={12}
        style={{
          maxHeight: "180px",
          overflowY: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {historyContents.length > 0 ? (
          historyContents.map((content, index) => (
            <Row key={content._id + "_" + index} className={"pb-3"}>
              <Col
                xs={12}
                onClick={() => handleOnclickTop(content.storyId._id)}
              >
                <Row>
                  <Col xs={4} className="top_container_img">
                    <img
                      className="top_img_item"
                      src={content.storyId.image}
                      alt={content.storyId.name}
                    ></img>
                  </Col>
                  <Col xs={8}>
                    <ul className="top_container_detail p-0 m-0">
                      <li className="top_name_item pb-2 pt-1">
                        {content.storyId.name}
                      </li>
                      <li>Chương: {content.name}</li>
                    </ul>
                  </Col>
                </Row>
              </Col>
            </Row>
          ))
        ) : (
          <Row>
            <Col xs={12} className="text-center mb-2">
              Chưa có dữ liệu.
            </Col>
          </Row>
        )}
      </Col>
    </Row>
  );
};

export default memo(ViewHistoryStories);
