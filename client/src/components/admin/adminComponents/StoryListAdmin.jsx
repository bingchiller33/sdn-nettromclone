import { Button, Table } from "react-bootstrap";
import { BASE_URL } from "../../common/utilities/initials";
import { useEffect, useState } from "react";
import axios from "axios";

const StoryListAdmin = () => {
  const [stories, setStories] = useState([]);
  const [filter, setFilter] = useState("inactive");
  const jwt = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };
  useEffect(() => {
    const fetchStories = async () => {
      let res;
      switch (filter) {
        case "active":
          res = await axios.get(`${BASE_URL}/story/activated`, config);
          break;
        case "inactive":
          res = await axios.get(`${BASE_URL}/story/inactivated`, config);
          break;
      }
      setStories(res.data);
    };
    fetchStories();
  }, [filter]);

  const handleStatusChange = async (id, status) => {
    try {
      await axios.patch(`${BASE_URL}/story/${id}/status`, { status }, config);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Uploader</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {stories.map((story, index) => (
            <tr key={story._id}>
              <td>{index + 1}</td>
              <td>{story.name}</td>
              <td>{story.uploader?.userName}</td>
              <td>
                {filter === "active" ? (
                  <Button
                    variant="danger"
                    onClick={() => handleStatusChange(story._id, 'inactive')}
                  >
                    Deactivate
                  </Button>
                ) : (
                  <Button
                    variant="success"
                    onClick={() => handleStatusChange(story._id, 'active')}
                  >
                    Activate
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default StoryListAdmin;
