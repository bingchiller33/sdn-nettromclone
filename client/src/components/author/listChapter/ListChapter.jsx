import React, { memo, useEffect, useRef, useState } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import { Pen } from "react-bootstrap-icons";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FetchData from "./FetchData";
import CheckBox from "../../common/custom-fileds/CheckboxField";
import InputFiled from "../../common/custom-fileds/inputField";
import calTime from "../../common/utilities/calTime";
import {
  activeChapter,
  fetchChapterSuccess,
  setChapterNo,
  updateNameChapter,
} from "../../common/data/dataChapter/dataSlice";
import { createContent } from "../../common/data/dataContent/dataSlice";
import axios from "axios";
import { BASE_URL } from "../../common/utilities/initials";
import { fetchStorySuccess } from "../../common/data/dataStory/dataSlice";

const ListChapter = () => {
  const dispatch = useDispatch();
  const inputRef = useRef("");
  const { sid } = useParams();
  const [user, setUser] = useState({});
  const listChapter = useSelector((state) => state.listChapter.data);
  const chapter = useSelector((state) => state.listChapter.chapter);
  const story = useSelector((state) => state.listStory.story);
  const listContent = useSelector((state) => state.content.data);
  const [chapterId, setChapterId] = useState(0);
  const [value, setValue] = useState("");
  let limit = 10;
  const jwt = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };
  console.log({ story, user });
  useEffect(() => {
    axios
      .get(`${BASE_URL}/users`, config)
      .then((res) => dispatch(setUser(res.data)))
      .catch((err) => console.log(err.message));
  }, []);
  useEffect(() => {
    axios
      .get(`${BASE_URL}/story/get_story/${sid}`)
      .then((res) => dispatch(fetchStorySuccess(res.data)))
      .catch((err) => console.log(err.message));
    axios
      .get(`${BASE_URL}/chapter/${sid}/story?limit=${limit}`)
      .then((res) => dispatch(fetchChapterSuccess(res.data)))
      .catch((err) => console.log(err.message));
  }, [sid]);
  FetchData(sid, chapterId);
  const handleInputChange = (e) => {
    setValue(e.target.value);
  };
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [chapterId]);
  const handleNewName = (id, name) => {
    setChapterId(id);
    setValue(name);
  };
  const handleSubmit = () => {
    setChapterId(0);
    dispatch(
      updateNameChapter({
        ...chapter,
        name: value,
      })
    );
  };
  const handleCreateContetChapter = (chapter) => {
    let count = listContent.reduce((acc, content) => {
      if (chapter.id === content.chapterId) {
        acc += 1;
      }
      return acc;
    }, 0);
    if (count === 0) {
      dispatch(createContent({ storyId: +sid, chapterId: chapter.id }));
    }
  };
  return (
    <Row>
      {listChapter && listChapter?.length > 0 ? (
        <Col xs={12}>
          <Row>
            <Col xs={12}>
              <Table
                striped
                bordered
                size="sm"
                className={`align-middle text-center content_header border mb-0 p-0`}
              >
                <thead>
                  <tr className="text-center">
                    <th>#</th>
                    <th>Số chương</th>
                    {user.role === 3 ? <th>Mã truyện</th> : ""}
                    <th>Tên chương</th>
                    <th>Ngày phát hành</th>
                    {user._id === story.author && (
                      <>
                        <th>Kích hoạt</th>
                        <th>Hành động</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {listChapter.map((chapter, index) => (
                    <tr
                      key={chapter.id}
                      className={`Content_header_List_item pt-2 pb-2 mx-4 px-2 ${
                        index === listChapter?.length - 1 ? "last_item" : ""
                      }`}
                    >
                      <td>{index + 1}</td>
                      <td>
                        <Link
                          className="name_chapter text-dark"
                          onClick={() =>
                            dispatch(setChapterNo(chapter.chapterNo))
                          }
                          to={`/detail/${sid}/chapter/${chapter.id}`}
                        >
                          Chương {chapter.chapterNo}
                        </Link>
                      </td>
                      {user.role === 3 && <td>{chapter._id}</td>}
                      <td
                        onClick={() => handleNewName(chapter._id, chapter.name)}
                        className={`${
                          chapterId === chapter._id &&
                          user._id === story.author &&
                          !chapter.active &&
                          "d-none"
                        } ${
                          user._id === story.author && !chapter.active
                            ? "custom-cursor text-primary"
                            : ""
                        }`}
                      >
                        {chapter.name?.length === 0 && user._id === story.author
                          ? "+"
                          : chapter.name}
                      </td>
                      {chapterId === chapter._id &&
                      user._id === story.author &&
                      !chapter.isActive ? (
                        <td className={`d-flex justify-content-center`}>
                          <InputFiled
                            handleInputChange={handleInputChange}
                            placeholder="Aa"
                            value={value}
                            xs={9}
                            ref={inputRef}
                          />
                          <Button
                            onClick={() => handleSubmit()}
                            className="ms-2"
                          >
                            Lưu
                          </Button>
                        </td>
                      ) : (
                        ""
                      )}
                      <td>
                        {!chapter.active
                          ? "Chưa được phát hành"
                          : calTime(chapter.publishedDate)}
                      </td>
                      {user._id === story.author ? (
                        <>
                          <td>
                            <CheckBox
                              name="active"
                              required={false}
                              disabled={chapter.active}
                              checked={chapter.active}
                              id={chapter}
                              handleOnchange={activeChapter}
                            />
                          </td>
                          <td>
                            {chapter.active ? (
                              ""
                            ) : (
                              <Link
                                onClick={() =>
                                  handleCreateContetChapter(chapter)
                                }
                                to={`/author/mystory/listchapter/${sid}/content/${chapter.id}`}
                              >
                                <Pen color="black" className="pb-1" size={22} />
                              </Link>
                            )}
                          </td>
                        </>
                      ) : (
                        ""
                      )}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Col>
      ) : (
        <Row>
          <Col xs={12} className="text-center border-0">
            {/* <h2 className="m-0">
                                    Đang Cập Nhật
                                </h2> */}
          </Col>
        </Row>
      )}
    </Row>
  );
};

export default memo(ListChapter);
