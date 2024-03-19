import { useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchStoriesSuccess } from "../data/dataStory/dataSlice";
import CalTime from "../utilities/calTime";
import axios from "axios";
import { BASE_URL } from "../utilities/initials";
import { setChapterNo } from "../data/dataChapter/dataSlice";

const ViewList = () => {
  const dispatch = useDispatch();
  const {
    data: listStory,
    sort,
    filter,
  } = useSelector((state) => state.listStory);
  const { filterCat } = useSelector((state) => state.listCategory);

  useEffect(() => {
    axios
      .get(
        `${BASE_URL}/story/get_stories?status=${filter || ""}&categoryId=${
          filterCat || ""
        }&item=${sort.type}&order=${sort.payload}`
      )
      .then((res) => dispatch(fetchStoriesSuccess(res.data)))
      .catch((err) => console.log(err.message));
  }, [filterCat, dispatch, sort, filter]);

  const updateChapterHistory = (storyId, chapterNo) => {
    let chapterHistory =
      JSON.parse(localStorage.getItem("chapterHistory")) || [];

    const existingIndex = chapterHistory.findIndex(
      (item) => item.storyId === storyId
    );
    if (existingIndex !== -1) {
      chapterHistory[existingIndex] = { storyId, chapterNo };
    } else {
      chapterHistory.push({ storyId, chapterNo });
    }

    localStorage.setItem("chapterHistory", JSON.stringify(chapterHistory));
  };

  const handleChapterSelection = (storyId, chapterNo) => {
    dispatch(setChapterNo(chapterNo));
    updateChapterHistory(storyId, chapterNo);
  };

  return (
    <Row>
      {listStory.map((story) => (
        <Col key={story._id} xs={3} style={{ marginBottom: "20px" }}>
          <Card
            className="card_slider"
            style={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <Card.Body className="body_card_item" style={{ flexGrow: 1 }}>
              <Link to={`/get_story/${story._id}`}>
                <Card.Img
                  className="img_card_item border border-dark"
                  src={story.image}
                  alt={story.name}
                  style={{ marginBottom: "15px" }}
                />
              </Link>
              <Card.Subtitle
                className="name_card_item fs-6"
                style={{ marginBottom: "10px" }}
              >
                {story.name}
              </Card.Subtitle>
              <ul className="content_header m-0 p-0">
                {story.chapters.map((chapter) => (
                  <li
                    key={chapter._id}
                    className="mx-0 lh-1"
                    style={{ marginBottom: "10px" }}
                  >
                    <Link
                      to={`/get_story/${story._id}/chapter/${chapter.chapterNo}`}
                      className="m-0 pe-2 text-decoration-none text-dark chapter_list_view name_chapter"
                      onClick={() =>
                        handleChapterSelection(story._id, chapter.chapterNo)
                      }
                      style={{
                        color: "#000",
                        textDecoration: "none",
                        display: "block",
                      }}
                    >
                      Chương {chapter.chapterNo}
                      {chapter.name === "" ? "" : `: ${chapter.name}`}
                    </Link>
                    <i
                      className="m-0 time_update fw-lighter chapter_list_view_time"
                      style={{ fontSize: "0.8em", color: "#666" }}
                    >
                      {CalTime(chapter.publishedDate)}
                    </i>
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default ViewList;
