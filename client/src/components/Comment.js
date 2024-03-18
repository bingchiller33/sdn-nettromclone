import { useEffect, useState } from "react";
import { Container, InputGroup, Form, Button, ListGroup, Image, Pagination } from "react-bootstrap";
import { Chat } from "react-bootstrap-icons";
import { toast } from "react-toastify"
import { fetchUserByToken } from '../api/user.js'

export default function Comment({ sid }) {
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [commentCount, setCommentCount] = useState(0); // Changed this for clarity

  const limit = 5;

  useEffect(() => {
    async function getCommentsByStoryId(id, page) {
      try {
        const response = await fetch(`http://localhost:9999/comment/story/${id}?page=${page}&limit=${limit}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setComments(data.comments);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('There was a problem with your fetch operation:', error);
      }
    }
    getCommentsByStoryId(sid, currentPage);
  }, [sid, currentPage, commentCount]);

  async function commentHandler(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const comment = Object.fromEntries(fd.entries());
    comment.storyId = sid;

    try {
      const token = localStorage.getItem("token");
      const user = await fetchUserByToken(token);
      if (!user || !user._id) {
        throw new Error('Invalid user data');
      }
      comment.userId = user._id;

      await createComment(comment);
      e.target.reset();
      setCommentCount(prev => prev + 1); // Update to trigger re-fetch
    } catch (error) {
      console.error('Error posting comment:', error);
      toast.warn('Bạn cần đăng nhập để bình luận');
    }
  }

  async function createComment(comment) {
    try {
      const response = await fetch('http://localhost:9999/comment', {
        method: 'POST',
        body: JSON.stringify(comment),
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const resData = await response.json();
      return resData;
    } catch (error) {
      console.error('Error creating comment:', error);
      throw error; // Re-throw to be caught in commentHandler
    }
  }

  const handlePageChange = (pageNumber) => {
    if (pageNumber !== currentPage) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <Container fluid className="mb-5">
      <h3 className="fw-normal text-info mt-2 pb-1 d-flex border-3 border-bottom border-info">
        <p className="ps-4 m-0"><Chat size={22} /></p>
        <p className="m-0 lh-base ms-1">Bình luận</p>
      </h3>
      <Form onSubmit={commentHandler}>
        <InputGroup className="mb-3">
          <Form.Control
            as="textarea" rows={2}
            name='comment'
            placeholder="Bình luận của bạn"
          />
          <Button type='submit' variant="outline-primary">Comment</Button>
        </InputGroup>
      </Form>
      <ListGroup>
        {comments.map((comment, index) => (
          <ListGroup.Item key={index}>
            <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '20px' }}>
              <Image src={comment.userId.img} style={{ height: '30px', width: '30px', objectFit: 'cover' }} roundedCircle />
              <div>
                <strong>{comment.userId.userName}</strong>
                <p className="mb-0">{comment.comment}</p>
                {/* reply */}
                <Button variant="link" className="ps-0">Trả lời</Button>
              </div>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Pagination className="justify-content-center mt-2">
        {[...Array(totalPages).keys()].map(num => (
          <Pagination.Item key={num + 1} active={num + 1 === currentPage} onClick={() => handlePageChange(num + 1)}>
            {num + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </Container>
  );
}