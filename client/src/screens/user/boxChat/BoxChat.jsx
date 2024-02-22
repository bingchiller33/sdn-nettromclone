import { useEffect, useRef, useState } from "react";
import { Button, Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import CalTime from "../../../components/common/utilities/calTime";
import {
  deleteFeedback,
  fetchFeedbackSuccess,
} from "../../../components/common/data/dataBoxChat/dataSlice";
import InputField from "../../../components/common/custom-fileds/inputField/index";
import userLogedIn from "../../../components/user/userLogedIn";
import DefaultTemplate from "../../../templates/DefaultTemplate";
import { setScrollValue } from "./boxChatSlice";
import HeaderChat from "./headerChat";
import { PUT, header } from "../../../components/common/utilities/type";
import { setStory } from "../../../app/slices/storiesSlice";
import { BASE_URL } from "../../../components/common/utilities/initials";

const Feedback = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const inputValue = useRef();
  const { sid } = useParams();
  const [value, setValue] = useState("");
  const scrollValue = useSelector((state) => state.feedback.scroll);
  const listFeedback = useSelector((state) => state.listFeedback.data.slice());
  listFeedback.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  const user = userLogedIn();
  const targetDivRef = useRef(null);
  const handleInputChange = (event) => {
    setValue(event.target.value);
  };
  const handleSubmit = () => {
    const regex = /^[\s]*$/;
    if (regex.test(value)) return;
    const feedback = {
      storyId: sid,
      userId: "65d711fe44acd31351cfc507",
      feedback: value,
      status: "normal",
    };
    axios
      .post("http://localhost:9999/feedback/add_new", feedback, {
        headers: header,
      })
      .then(() => {
        axios
          .get(`http://localhost:9999/feedback/${sid}?limit=${30}&skip=${0}`)
          .then((res) => dispatch(fetchFeedbackSuccess(res.data)));
      });
    setValue("");
    inputValue.current.focus();
  };
  const handleScroll = (event) => {
    // if (event.target.scrollTop === 0) {
    //   dispatch(setScrollValue(scrollValue + 10));
    //   if (scrollValue < listFeedback.length) {
    //     event.target.scrollTop = 100;
    //   }
    // }
  };
  useEffect(() => {
    dispatch(setScrollValue(20));
  }, [location, dispatch]);

  useEffect(() => {
    axios
      .get(`http://localhost:9999/feedback/${sid}?limit=${30}&skip=${0}`)
      .then((res) => dispatch(fetchFeedbackSuccess(res.data)))
      .catch((err) => console.log(err));
  }, [sid, dispatch]);
  useEffect(() => {
    axios
      .get(`${BASE_URL}story/get_story/${sid}`)
      .then((res) => dispatch(setStory(res.data)))
      .catch((err) => console.log(err.message));
  }, [sid, dispatch]);
  useEffect(() => {
    if (targetDivRef.current) {
      targetDivRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
    // xử lí cho việc khi mà skip tăng thì không gọi lại hàm này
  }, [listFeedback]);
  const deleteMss = (feedback) => {
    axios
      .patch(
        `${BASE_URL}feedback/" + sid`,
        { status: "reject" },
        { headers: header }
      )
      .then((res) =>
        axios
          .get(`${BASE_URL}feedback/${sid}?limit=${30}&skip=${0}`)
          .then((res) => dispatch(fetchFeedbackSuccess(res.data)))
      );
    dispatch(deleteFeedback(feedback));
  };
  return (
    <DefaultTemplate>
      <div
        className="bc_article d-flex flex-column overflow-hidden"
        style={{ height: "calc(100vh - 112px)" }}
      >
        <HeaderChat />
        <div className="bc_article-chat_view d-flex flex-column flx-1">
          <div
            className="bc_article-message_view flx-1"
            onScroll={handleScroll}
          >
            {listFeedback.map((f, index) => (
              <div
                key={f.id}
                ref={
                  listFeedback.length === index + 1 ? targetDivRef : undefined
                }
              >
                <Row>
                  <Col xs={12}>
                    <div
                      className={`${
                        user.id === f.userId
                          ? "float-end d-flex justify-content-end me-2"
                          : "float-start d-flex justify-content-start "
                      } ms-2 w-75 ${
                        index === listFeedback.length - 1 ? "mb-2" : ""
                      }`}
                    >
                      <div className="d-flex align-items-end me-2">
                        <img
                          className="rounded-5 border img_32"
                          src={`${
                            f.userId.image ||
                            "https://th.bing.com/th/id/OIP.wRtvON_8JKRQghdROw5QvQHaHa?rs=1&pid=ImgDetMain"
                          }`}
                          alt=""
                        />
                      </div>
                      <OverlayTrigger
                        key={f.id}
                        placement={"left"}
                        overlay={
                          <Tooltip id={`:r3ia:`}>
                            <span>{CalTime(f.timeFeedback)}</span>
                          </Tooltip>
                        }
                      >
                        <>
                          {user.id === f.userId && f.status === "normal" ? (
                            <span
                              className="custom-cursor px-1 pt-1 pb-1"
                              onClick={() => deleteMss(f)}
                            >
                              &times;
                            </span>
                          ) : (
                            ""
                          )}
                          <span
                            style={{ minWidth: "100px" }}
                            className={`lh-sm pb-2 pt-1 text-break ${
                              f.status === "normal"
                                ? "bg-primary"
                                : "bg-secondary"
                            } mt-2 px-3 rounded-5 text-white align-baseline`}
                          >
                            {f.status === "normal"
                              ? f.feedback
                              : "Tin nhắn đã được thu hồi"}
                          </span>
                        </>
                      </OverlayTrigger>
                    </div>
                  </Col>
                </Row>
              </div>
            ))}
          </div>
          <div>
            <div
              className="d-flex justify-content-center border rounded align-items-center mb-1"
              style={{ gap: "1.5rem", margin: "0 46px", height: "56px" }}
            >
              <div className="flx-1">
                <InputField
                  handleInputChange={handleInputChange}
                  placeholder="Aa..."
                  value={value}
                  ref={inputValue}
                  className={"bc-group_input"}
                />
              </div>
              <div className="custom-cursor">
                <Button
                  disabled={value === ""}
                  className="bg-white text-info"
                  style={{ outline: "none", border: "none" }}
                  onClick={handleSubmit}
                >
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultTemplate>
  );
};

export default Feedback;
