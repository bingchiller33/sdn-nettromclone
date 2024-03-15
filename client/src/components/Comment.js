import { useEffect, useState } from "react";
import { Container, InputGroup, Form, Button, ListGroup, Image, Pagination } from "react-bootstrap";
import { Chat } from "react-bootstrap-icons";

export default function Comment({ sid }) {
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [changed, setChanged] = useState(false);

  const limit = 5; // Number of comments per page

  useEffect(() => {
    async function getCommentsByStoryId(id, page) {
      const response = await fetch(`http://localhost:9999/comment/story/${id}?page=${page}&limit=${limit}`);
      const data = await response.json();
      setComments(data.comments);
      setTotalPages(data.totalPages);
    }
    getCommentsByStoryId(sid, currentPage);
  }, [sid, currentPage, changed]);

  async function commentHandler(e) {
    //check expired jwt
    e.preventDefault()
    const fd = new FormData(e.target)
    const comment = Object.fromEntries(fd.entries())
    comment.storyId = sid
    const token = localStorage.getItem("token")
    const response = await fetch('http://localhost:9999/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    const user = await response.json()
    comment.userId = user._id || undefined
    console.log(comment)
    //add to database
    async function createComment(comment) {
      const response = await fetch('http://localhost:9999/comment', {
        method: 'POST',
        body: JSON.stringify(comment),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const resData = await response.json()
      setChanged(!changed)
      return resData
    }
    await createComment(comment)
    e.target.reset()
  }

  // Pagination change handler
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
                <p>{comment.comment}</p>
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
