import React from "react";
import { Container, Row, Col, Table, Image, Figure } from "react-bootstrap";
import "./UserDetails.css";

const UserDetails = ({ user }) => {
  return (
    <Container>
      <Row>
        <Col md={3} sm={4}>
          <section className="user-sidebar">
            <div className="userinfo clearfix">
              <Figure className="figure-container">
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
            </div>
          </section>
        </Col>
        <Col md={9} sm={8}>
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
                <div className="position-relative">
                  <h2 className="posttitle">Truyện theo dõi</h2>
                  <a
                    className="link"
                    href="https://www.nettruyenbb.com/Secure/ComicFollowed.aspx"
                  >
                    Xem tất cả
                  </a>
                </div>
                <section className="user-table ckearfix">
                  <div className="alert alert-success">
                    TRUYỆN ĐỌC XONG RA ĐÂY
                  </div>
                  <div className="table-responsive">
                    <Table hover>
                      <thead>
                        <tr>
                          <th></th>
                          <th className="nowrap">Tên truyện</th>
                          <th className="nowrap">Xem gần nhất</th>
                          <th className="nowrap">Chap mới nhất</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="unread">
                          <td>
                            <a
                              className="image"
                              href="/truyen-tranh/tuyet-the-duong-mon-dau-la-dai-luc-2-90980"
                            >
                              <Image
                                src="//st.ntcdntempv3.com/data/comics/138/tuyet-the-duong-mon-dau-la-dai-luc-2.jpg"
                                alt="Tuyệt thế Đường Môn - Đấu La Đại Lục 2"
                              />
                            </a>
                          </td>
                          <td>
                            <a
                              className="comic-name"
                              href="/truyen-tranh/tuyet-the-duong-mon-dau-la-dai-luc-2-90980"
                            >
                              Tuyệt thế Đường Môn - Đấu La Đại Lục 2
                            </a>
                            <div className="follow-action">
                              <a
                                className="mark-as-read"
                                onClick={() => {
                                  /* mark as read action */
                                }}
                              >
                                Đã đọc
                              </a>
                              <a
                                className="follow-link"
                                onClick={() => {
                                  /* unfollow action */
                                }}
                              >
                                Bỏ theo dõi
                              </a>
                            </div>
                          </td>
                          <td className="nowrap chapter">
                            <a
                              className="visited"
                              href="/truyen-tranh/tuyet-the-duong-mon-dau-la-dai-luc-2/chap-376/1022799"
                              title="Chapter 376"
                            >
                              Chapter 376
                            </a>
                            <br />
                            <time className="time">07/07/23</time>
                          </td>
                          <td className="nowrap chapter">
                            <a
                              href="/truyen-tranh/tuyet-the-duong-mon-dau-la-dai-luc-2/chap-429/1135576"
                              title="Chapter 429"
                            >
                              Chapter 429
                            </a>
                            <br />
                            <time className="time">1 giờ trước</time>
                          </td>
                        </tr>{" "}
                        <tr className="unread">
                          <td>
                            <a
                              className="image"
                              href="/truyen-tranh/tuyet-the-duong-mon-dau-la-dai-luc-2-90980"
                            >
                              <Image
                                src="//st.ntcdntempv3.com/data/comics/138/tuyet-the-duong-mon-dau-la-dai-luc-2.jpg"
                                alt="Tuyệt thế Đường Môn - Đấu La Đại Lục 2"
                              />
                            </a>
                          </td>
                          <td>
                            <a
                              className="comic-name"
                              href="/truyen-tranh/tuyet-the-duong-mon-dau-la-dai-luc-2-90980"
                            >
                              Tuyệt thế Đường Môn - Đấu La Đại Lục 2
                            </a>
                            <div className="follow-action">
                              <a
                                className="mark-as-read"
                                onClick={() => {
                                  /* mark as read action */
                                }}
                              >
                                Đã đọc
                              </a>
                              <a
                                className="follow-link"
                                onClick={() => {
                                  /* unfollow action */
                                }}
                              >
                                Bỏ theo dõi
                              </a>
                            </div>
                          </td>
                          <td className="nowrap chapter">
                            <a
                              className="visited"
                              href="/truyen-tranh/tuyet-the-duong-mon-dau-la-dai-luc-2/chap-376/1022799"
                              title="Chapter 376"
                            >
                              Chapter 376
                            </a>
                            <br />
                            <time className="time">07/07/23</time>
                          </td>
                          <td className="nowrap chapter">
                            <a
                              href="/truyen-tranh/tuyet-the-duong-mon-dau-la-dai-luc-2/chap-429/1135576"
                              title="Chapter 429"
                            >
                              Chapter 429
                            </a>
                            <br />
                            <time className="time">1 giờ trước</time>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </section>
              </Col>
              <Col xs={12}>
                <div className="position-relative">
                  <h2 className="posttitle">Bình luận</h2>
                  <a
                    class="link"
                    href="https://www.nettruyenbb.com/Secure/Comments.aspx"
                  >
                    Xem tất cả
                  </a>
                </div>
                <section className="user-table clearfix">
                  <Table responsive>
                    <thead>
                      <tr>
                        <th></th>
                        <th className="nowrap">Tên truyện</th>
                        <th className="nowrap">Thời gian</th>
                        <th className="nowrap">Nội dung</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <a
                            rel="nofollow"
                            class="image"
                            href="https://www.nettruyenbb.com/truyen-tranh/kanojo-mo-kanojo-280221"
                          >
                            <img
                              class="lazy"
                              data-original="//st.nettruyenbb.com/data/comics/118/kanojo-mo-kanojo-6298.jpg"
                              src="//st.nettruyenbb.com/data/comics/118/kanojo-mo-kanojo-6298.jpg"
                            />
                          </a>
                        </td>
                        <td>
                          <a
                            rel="nofollow"
                            href="https://www.nettruyenbb.com/truyen-tranh/kanojo-mo-kanojo-280221"
                          >
                            Kanojo mo Kanojo
                          </a>
                        </td>
                        <td className="nowrap">
                          <time className="time">15:14 02/02</time>
                        </td>
                        <td>
                          <div className="word-wrap">COCK</div>
                        </td>
                      </tr>
                      {/* Rest of the table rows */}
                    </tbody>
                  </Table>
                </section>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default UserDetails;
