import { Col, Row } from "react-bootstrap";
import "../UserDetails.css";
import FollowListDetail from "./FollowListDetail";
import CommentDetail from "./CommentDetail";

const CommonDetail = () => {
  return (
    <div className="user-page">
      <h1 className="postname">thông tin chung</h1>
      <Row>
        <Col xs={12} md={6}>
          <div className="account-info clearfix">
            <h2 className="posttitle">Thông tin tài khoản</h2>
            <a
              className="link"
              href="https://www.nettruyenbb.com/Secure/UserProfile.aspx"
            >
              Chỉnh sửa
            </a>
            <div className="info-detail">
              <div className="group">
                <div className="label">Username</div>
                <div className="detail">32</div>
              </div>
              <div className="group">
                <div className="label">Email</div>
                <div className="detail">32</div>
              </div>
              <div className="group">
                <div className="label">SĐT</div>
                <div className="detail">32</div>
              </div>
            </div>
          </div>
        </Col>
        <Col xs={12} md={6}>
          <div className="account-info clearfix">
            <h2 className="posttitle">Liên kết Tài khoản Google</h2>
            <div className="info-detail">
              <div className="group">
                <div className="label">Trạng thái</div>
                <div className="detail">Đã liên kết</div>
              </div>
              <div className="group">
                <div class="label hidden">3</div>
                <div className="detail">
                  <a
                    onclick="return confirm('Đổi liên kết tài khoản Google sẽ thay đổi địa chỉ email. Bạn vẫn chắn chắn muốn thực hiện?');"
                    id="ctl00_mainContent_lkbLinkGoogle"
                    href=""
                  >
                    Thay đổi
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col xs={12}>
          <FollowListDetail />
        </Col>
        <Col xs={12}>
          <CommentDetail />
        </Col>
      </Row>
    </div>
  );
};

export default CommonDetail;
