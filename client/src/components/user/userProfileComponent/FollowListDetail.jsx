import React, { useEffect, useState } from "react";
import "../UserDetails.css";
import { Image, Table } from "react-bootstrap";
import { BookmarkHeart, BookmarkHeartFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../common/utilities/initials";

const FollowListDetail = () => {
  const [followList, setFollowList] = useState([]);
  const [followed, setFollowed] = useState("");
  const jwt = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}/story/follows`, config)
      .then((response) => {
        setFollowList(response.data);
        setFollowed(response.data.map(() => true));
      })

      .catch((e) => console.log(e.message));
  }, []);

  const handleFollow = (storyId, index) => {
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
      .post(url, {}, config)
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
                      <Link
                        className="image"
                        to={`/get_story/${story.storyId._id}`}
                      >
                        <Image src={story.storyId.image} />
                      </Link>
                    </td>
                    <td>
                      <Link
                        className="comic-name"
                        to={`/get_story/${story.storyId._id}`}
                      >
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
                        <button
                          className={`following-btn ${
                            followed[index] ? "unfollow-btn" : "follow-btn"
                          }`}
                          onClick={() => handleFollow(story.storyId._id, index)}
                        >
                          {followed[index] ? (
                            <BookmarkHeartFill />
                          ) : (
                            <BookmarkHeart />
                          )}
                          {followed[index] ? "Unfollow" : "Follow"}
                        </button>
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
