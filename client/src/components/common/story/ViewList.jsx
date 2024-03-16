import { useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchStoriesSuccess,
  updateViewStory,
} from "../data/dataStory/dataSlice";
import CalTime from "../utilities/calTime";
import axios from "axios";
import { BASE_URL } from "../utilities/initials";

const ViewList = () => {
  const dispatch = useDispatch();
  const {
    data: listStory,
    sort,
    filter,
  } = useSelector((state) => state.listStory);
  const { filterCat } = useSelector((state) => state.listCategory);
  // console.log(
  //   `${BASE_URL}/story/get_stories?status=${filter || ""}&categoryId=${
  //     filterCat || ""
  //   }&item=${sort.type}&order=${sort.payload}`
  // );
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
  return (
    <Row>
      {listStory.map((story) => (
        <Col key={story._id} xs={3}>
          <Card className="card_slider">
            <Card.Body className="body_card_item">
              <Link to={`/get_story/${story._id}`}>
                <Card.Img
                  className="img_card_item border border-dark"
                  src={story.image}
                  alt={story.name}
                />
              </Link>
              <Card.Subtitle className="name_card_item fs-6">
                {story.name}
              </Card.Subtitle>
              <ul className="content_header m-0 p-0">
                {story.chapters.map((chapter) => (
                  <li key={chapter._id} className={`mx-0 lh-1`}>
                    <span onClick={() => dispatch(updateViewStory(story))}>
                      <Link
                        to={`/get_story/${story.id}/chapter/${chapter.id}`}
                        className="m-0 pe-2 text-decoration-none text-dark chapter_list_view name_chapter"
                      >
                        Chương {chapter.chapterNo}
                        {chapter.name === "" ? "" : ` - ${chapter.name}`}
                      </Link>
                    </span>
                    <i className="m-0 time_update fw-lighter chapter_list_view_time">
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
