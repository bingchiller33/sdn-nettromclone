import { useEffect, useMemo, useRef, useState } from "react";
import {
  Button,
  Col,
  OverlayTrigger,
  Row,
  Spinner,
  Tooltip,
} from "react-bootstrap";
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
import { setScrollValue, setValue } from "./boxChatSlice";
import FetchData from "./FetchData";
import HeaderChat from "./headerChat";
import { POST, PUT, header } from "../../../components/common/utilities/type";

const Feedback = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const inputValue = useRef();
  const { sid } = useParams();
  const [value, setValue] = useState("");
  const scrollValue = useSelector((state) => state.feedback.scroll);
  const listFeedback = useSelector((state) => state.listFeedback.data);
  const listUser = useSelector((state) => state.listUser.data);
  const user = userLogedIn();
  const targetDivRef = useRef(null);
  const handleInputChange = (event) => {
    setValue(event.target.value);
  };
  FetchData(listFeedback, sid, value);
  const handleSubmit = () => {
    const regex = /^[\s]*$/;
    if (regex.test(value)) return;
    const feedback = {
      storyId: +sid,
      userId: user.id,
      feedback: value,
      type: "normal",
      timeFeedback: new Date(),
    };
    fetch("http://localhost:9999/feedback", {
      method: POST,
      body: JSON.stringify(feedback),
      headers: header,
    }).then((res) => {
      fetch(
        `http://localhost:9999/feedback?_sort=timeFeedback&_order=desc&_limit=${10}&_start=${0}&storyId=${sid}`
      )
        .then((res) => res.json())
        .then((data) => dispatch(fetchFeedbackSuccess(data)));
      return res.json();
    });
    setValue("");
    inputValue.current.focus();
  };
  const handleScroll = (event) => {
    if (event.target.scrollTop === 0) {
      dispatch(setScrollValue(scrollValue + 10));
      if (scrollValue < listFeedback.length) {
        event.target.scrollTop = 100;
      }
    }
  };
  useEffect(() => {
    dispatch(setScrollValue(20));
  }, [location, dispatch]);
  const ListFeedbackCopy = [...listFeedback];
  const newListFeedback = ListFeedbackCopy.map((fb) => ({
    ...fb,
    userImg: "",
    username: "",
  }));
  useEffect(() => {
    if (targetDivRef.current) {
      targetDivRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [targetDivRef]);
  useEffect(() => {
    listUser.forEach((u) => {
      newListFeedback.forEach((fb) => {
        if (fb.userId === u.id) {
          fb.userImg =
            u.img === ""
              ? "https://cdn.landesa.org/wp-content/uploads/default-user-image.png"
              : u.img;
          fb.username = u.username;
        }
      });
    });
  }, [listUser, newListFeedback]);
  const deleteMss = (feedback) => {
    fetch("http://localhost:9999/feedback/" + sid, {
      method: PUT,
      body: JSON.stringify({ ...feedback, type: "reject" }),
      headers: header,
    }).then((res) => {
      fetch(
        `http://localhost:9999/feedback?_sort=timeFeedback&_order=desc&_limit=${10}&_start=${0}&storyId=${sid}&storyId=${sid}`
      )
        .then((res) => res.json())
        .then((data) => dispatch(fetchFeedbackSuccess(data)));
      return res.json();
    });
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
            <div>
              {listFeedback.length < scrollValue ? (
                ""
              ) : (
                <Row>
                  <Col xs={12} className="text-center mt-1">
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  </Col>
                </Row>
              )}
            </div>
            {newListFeedback.map((feedback, index) => (
              <div
                key={feedback.id}
                ref={
                  newListFeedback.length === index + 1
                    ? targetDivRef
                    : undefined
                }
              >
                <Row>
                  <Col xs={12}>
                    <div
                      className={`${
                        user.id === feedback.userId
                          ? "float-end d-flex justify-content-end me-2"
                          : "float-start d-flex justify-content-start "
                      } ms-2 w-75 ${
                        index === newListFeedback.length - 1 ? "mb-2" : ""
                      }`}
                    >
                      {user.id !== feedback.userId ? (
                        <div className="d-flex align-items-end me-2">
                          <OverlayTrigger
                            key={feedback.id}
                            placement={"left"}
                            overlay={
                              <Tooltip id={feedback.username}>
                                <span>{feedback.username}</span>
                              </Tooltip>
                            }
                          >
                            <img
                              className="rounded-5 border img_32"
                              src={`${feedback.userImg}`}
                              alt=""
                            />
                          </OverlayTrigger>
                        </div>
                      ) : (
                        ""
                      )}
                      <OverlayTrigger
                        key={feedback.id}
                        placement={"left"}
                        overlay={
                          <Tooltip id={`:r3ia:`}>
                            <span>{CalTime(feedback.timeFeedback)}</span>
                          </Tooltip>
                        }
                      >
                        <>
                          {user.id === feedback.userId &&
                          feedback.type === "normal" ? (
                            <span
                              className="custom-cursor px-1 pt-1 pb-1"
                              onClick={() => deleteMss(feedback)}
                            >
                              &times;
                            </span>
                          ) : (
                            ""
                          )}
                          {feedback.type === "normal" ? (
                            <span
                              className={`lh-sm pb-2 pt-1 text-break  bg-primary mt-2 px-4 rounded-5 text-white align-baseline`}
                            >
                              {feedback.feedback}
                            </span>
                          ) : (
                            <span
                              className={`lh-sm pb-2 pt-1 text-break  bg-secondary mt-2 px-4 rounded-5 text-white align-baseline`}
                            >
                              Tin nhắn đã được thu hồi
                            </span>
                          )}
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
