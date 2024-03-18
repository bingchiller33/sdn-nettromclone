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
      const res = await axios.get(`${BASE_URL}/story/activated`, config);
      setActivatedStories(res.data);
      console.log(res.data);
    };
    fetchActivatedStories();
  }, []);

  const handleApprove = (id) => {
    axios.post(`/api/novels/${id}/approve`)
      // .then(() => setNovels(novels.filter(novel => novel.id !== id)))
      .catch(error => console.error(error));
  };

  const handleReject = (id) => {
    axios.post(`/api/novels/${id}/reject`)
      // .then(() => setNovels(novels.filter(novel => novel.id !== id)))
      .catch(error => console.error(error));
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Actions</th>
        </tr>
        <tbody>
        {activatedStories.map(novel => (
          <tr key={novel._id}>
            <td>{novel.name}</td>
            <td>{novel.author}</td>
            <td>
              <Button variant="success" onClick={() => handleApprove(novel.id)}>Approve</Button>{' '}
              <Button variant="danger" onClick={() => handleReject(novel.id)}>Reject</Button>
            </td>
          </tr>
        ))}
      </tbody>
      </thead>
    </Table>
  );
};

export default StoryListAdmin;
