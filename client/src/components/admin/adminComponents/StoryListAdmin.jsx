import { Button, Form, FormControl, Row, Table } from "react-bootstrap";
import { BASE_URL } from "../../common/utilities/initials";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const StoryListAdmin = () => {
  const [stories, setStories] = useState([]);
  const [filter, setFilter] = useState("inactive");
  const [searchQuery, setSearchQuery] = useState("");
  const jwt = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };
  useEffect(() => {
    const fetchStories = async () => {
      const url = `${BASE_URL}/story/activate?status=${filter}&search=${searchQuery}`;
      const res = await axios.get(url, config);
      setStories(res.data);
    };
    fetchStories();
  }, [filter, searchQuery]);

  const handleStatusChange = async (id, status) => {
    try {
      await axios.patch(`${BASE_URL}/story/${id}/status`, { status }, config);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1 className="text-center"> Manage Novel</h1>
      <form style={{ display: "flex", justifyContent: "flex-end" }}>
        <div>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th style={{ width: "5%", textAlign: "center" }}>#</th>
            <th style={{ width: "10%" }}>Cover</th>
            <th style={{ width: "50%" }}>Title</th>
            <th style={{ width: "10%" }}>Uploader</th>
            <th style={{ width: "25%" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {stories.map((story, index) => (
            <tr key={story._id}>
              <td className="text-center">{index + 1}</td>
              <td>
                <img
                  src={story.image}
                  alt={story.name}
                  style={{ width: "100px", height: "auto" }}
                />
              </td>
              <td>{story.name}</td>
              <td>{story.uploader?.userName}</td>
              <td>
                {filter === "active" ? (
                  <Button
                    variant="danger"
                    onClick={() => handleStatusChange(story._id, "inactive")}
                  >
                    Deactivate
                  </Button>
                ) : (
                  <Button
                    variant="success"
                    onClick={() => handleStatusChange(story._id, "active")}
                  >
                    Activate
                  </Button>
                )}
                <Link to={`/get_story/${story._id}`} className="ms-3">
                  Review
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default StoryListAdmin;
