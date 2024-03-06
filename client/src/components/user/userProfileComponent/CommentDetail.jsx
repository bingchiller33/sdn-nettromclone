import React from "react";
import { Table } from "react-bootstrap";
import "../UserDetails.css";
import { Link } from "react-router-dom";

const CommentDetail = ({ setActiveTab }) => {
  return (
    <React.Fragment>
      <div className="position-relative">
        <h2 className="posttitle">Bình luận</h2>
        <Link className="link" onClick={() => setActiveTab(3)}>
          Xem tất cả
        </Link>
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
                  className="image"
                  href="https://www.nettruyenbb.com/truyen-tranh/kanojo-mo-kanojo-280221"
                >
                  <img
                    className="lazy"
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
          </tbody>
        </Table>
      </section>
    </React.Fragment>
  );
};

export default CommentDetail;
