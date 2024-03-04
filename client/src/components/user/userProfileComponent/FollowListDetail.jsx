import React from "react";
import "../UserDetails.css";
import { Image, Table } from "react-bootstrap";

const FollowListDetail = () => {
  return (
    <React.Fragment>
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
        <div className="alert alert-success">TRUYỆN ĐỌC XONG RA ĐÂY</div>
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
              </tr>
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
    </React.Fragment>
  );
};

export default FollowListDetail;
