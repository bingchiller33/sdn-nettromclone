import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Figure,
  Nav,
} from "react-bootstrap";
import "./UserDetails.css";
import {
  BookmarkHeartFill,
  BoxArrowLeft,
  ChatLeftDots,
  ChevronDown,
  ChevronUp,
  InfoCircle,
  ListUl,
  Speedometer,
} from "react-bootstrap-icons";
import CommonDetail from "./userProfileComponent/CommonDetail";
import FollowListDetail from "./userProfileComponent/FollowListDetail";
import CommentDetail from "./userProfileComponent/CommentDetail";

const UserDetails = ({ user }) => {
  const [isNavVisible, setNavVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Container>
      <Row>
        <Col md={3} sm={4}>
          <section className="user-sidebar">
            <div className="userinfo clearfix">
              <Figure
                className="figure-container"
                onClick={() => setNavVisible(!isNavVisible)}
              >
                <Figure.Image
                  className="avatar user-name"
                  width={80}
                  alt="avatar"
                  src="//st.nettruyenbb.com/data/sites/1/useravatars/32046.jpg?v=3781"
                />
                <Figure.Caption>
                  <div className="title">Tài khoản của</div>
                  <div className="user-name">hoangzteg</div>
                </Figure.Caption>
              </Figure>
              <div
                className="chevron-up"
                onClick={() => setNavVisible(!isNavVisible)}
              >
                {isNavVisible ? <ChevronDown /> : <ChevronUp />}
              </div>
            </div>
          </section>
          {isNavVisible && (
            <Nav className="user-sidelink clearfix">
              <ul className="p-0">
                <li
                  className={`hvr-sweep-to-right ${
                    activeTab === 0 ? "active" : ""
                  }`}
                  onClick={() => setActiveTab(0)}
                >
                  <a href="#">
                    <Speedometer></Speedometer> Thông tin chung
                  </a>
                </li>
                <li
                  className={`hvr-sweep-to-right ${
                    activeTab === 1 ? "active" : ""
                  }`}
                  onClick={() => setActiveTab(1)}
                >
                  <a href="#">
                    <InfoCircle></InfoCircle> Thông tin tài khoản
                  </a>
                </li>
                <li
                  className={`hvr-sweep-to-right ${
                    activeTab === 2 ? "active" : ""
                  }`}
                  onClick={() => setActiveTab(2)}
                >
                  <a href="#">
                    <BookmarkHeartFill></BookmarkHeartFill> Truyện theo dõi
                  </a>
                </li>
                <li
                  className={`hvr-sweep-to-right ${
                    activeTab === 3 ? "active" : ""
                  }`}
                  onClick={() => setActiveTab(3)}
                >
                  <a href="#">
                    <ChatLeftDots></ChatLeftDots> Bình luận
                  </a>
                </li>
                <li
                  className={`hvr-sweep-to-right ${
                    activeTab === 4 ? "active" : ""
                  }`}
                  onClick={() => setActiveTab(4)}
                >
                  <a href="#">
                    <ListUl></ListUl> Truyện đã đăng
                  </a>
                </li>
                <li
                  className={`hvr-sweep-to-right ${
                    activeTab === 5 ? "active" : ""
                  }`}
                  onClick={() => setActiveTab(5)}
                >
                  <a href="#">
                    <BoxArrowLeft></BoxArrowLeft> Đăng xuất
                  </a>
                </li>
              </ul>
            </Nav>
          )}
        </Col>
        <Col md={9} sm={8}>
          {activeTab === 0 && <CommonDetail />}
          {activeTab === 1 && <CommonDetail />}
          {activeTab === 2 && <FollowListDetail />}
          {activeTab === 3 && <CommentDetail />}
        </Col>
      </Row>
    </Container>
  );
};

export default UserDetails;
