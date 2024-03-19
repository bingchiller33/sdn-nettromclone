import { Button, Table } from "react-bootstrap";
import { BASE_URL } from "../../common/utilities/initials";
import { useEffect, useState } from "react";
import axios from "axios";

const StoryListAdmin = () => {
  const [activatedStories, setActivatedStories] = useState([]);
  const jwt = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };
  useEffect(() => {
    const fetchActivatedStories = async () => {
      const res = await axios.get(`${BASE_URL}/story/inactivated`, config);
      setActivatedStories(res.data);
    };
    fetchActivatedStories();
  }, []);

  const handleApprove = async (id) => {
    try {
      await axios.patch(`${BASE_URL}/story/${id}/active`, config);
    } catch (error) {
      console.error(error);
    }
  };

  const handleReject = (id) => {
    axios
      .post(`/api/novels/${id}/reject`)
      // .then(() => setNovels(novels.filter(novel => novel.id !== id)))
      .catch((error) => console.error(error));
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Title</th>
          <th>Uploader</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {activatedStories.map((story) => (
          <tr key={story._id}>
            <td>{story.name}</td>
            <td>{story.uploader?.userName}</td>
            <td>
              <Button variant="success" onClick={() => handleApprove(story._id)}>
                Approve
              </Button>
              <Button variant="danger" onClick={() => handleReject(story.id)}>
                Reject
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default StoryListAdmin;
