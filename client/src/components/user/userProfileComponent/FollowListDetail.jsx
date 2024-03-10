import React, { useEffect, useState } from "react";
import "../UserDetails.css";
import { Button, Image, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../common/utilities/initials";

const FollowListDetail = ({ setActiveTab }) => {
  const [followList, setFollowList] = useState([]);
  const [followed, setFollowed] = useState(followList.map(() => true));
  useEffect(() => {
    const jwt = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    };
    axios
      .get(`${BASE_URL}/story/follows`, config)
      .then((response) => {
        setFollowList(response.data);
        console.log(response.data);
      })

      .catch((e) => console.log(e.message));
  }, []);

  const handleUnfollow = (storyId, index) => {
    const jwt = localStorage.getItem("token");
    const url = followed[index]
      ? `${BASE_URL}/story/unfollow/${storyId}`
      : `${BASE_URL}/story/follow/${storyId}`;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    };
    axios
      .post(`${BASE_URL}/story/unfollow/${storyId}`, config)
      .then((response) => {
        setFollowed((prevFollowed) => {
          const newFollowed = [...prevFollowed];
          newFollowed[index] = !newFollowed[index];
          return newFollowed;
        });
      })
      .catch((e) => console.log(e.message));
  };

  return (
    <React.Fragment>
      <div className="position-relative">
        <h2 className="posttitle">Truyện theo dõi</h2>
        <Link
          className="link"
          to=""
          onClick={(e) => {
            e.preventDefault();
            setActiveTab(2);
          }}
        >
          Xem tất cả
        </Link>
      </div>
      <section className="user-table clearfix">
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
              {followList.map((story, index) => {
                return (
                  <tr key={story._id}>
                    <td>
                      <Link className="image" to={`/story/${story._id}`}>
                        <Image src={story.storyId.image} />
                      </Link>
                    </td>
                    <td>
                      <Link className="comic-name" to={`/story/${story._id}`}>
                        {story.storyId.name}
                      </Link>
                      <div className="follow-action">
                        <a
                          className="mark-as-read"
                          onClick={() => {
                            /* mark as read action */
                          }}
                        >
                          Đã đọc
                        </a>
                        <Button
                          className="follow-btn"
                          onClick={() => handleUnfollow(story.storyId._id, index)}
                        >
                          {followed[index] ? "Unfollow" : "Follow"}
                        </Button>
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
                );
              })}
            </tbody>
          </Table>
        </div>
      </section>
    </React.Fragment>
  );
};

export default FollowListDetail;
