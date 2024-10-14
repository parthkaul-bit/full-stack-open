import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addComment, likeBlog } from "../redux/blogSlice";
import { Card, Button, Form, ListGroup, Alert } from "react-bootstrap"; // Importing required Bootstrap components

const BlogDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const blog = useSelector((state) => state.blogs.find((b) => b.id === id));
  const [comment, setComment] = useState("");

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    dispatch(addComment({ id, comment }));
    setComment("");
  };

  const handleLike = (event) => {
    event.preventDefault();
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    dispatch(likeBlog(updatedBlog));
  };

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="my-4">
      <Card.Body>
        <Card.Title>{blog.title}</Card.Title>
        <Card.Link href={blog.url} target="_blank">
          {blog.url}
        </Card.Link>
        <Card.Text className="mt-3">
          {blog.likes} likes{" "}
          <Button variant="outline-primary" onClick={handleLike}>
            Like
          </Button>
        </Card.Text>
        <Card.Text>Added by {blog.author}</Card.Text>

        <h3>Comments</h3>
        <ListGroup variant="flush">
          {blog.comments && blog.comments.length > 0 ? (
            blog.comments.map((comment, index) => (
              <ListGroup.Item key={index}>{comment}</ListGroup.Item>
            ))
          ) : (
            <Alert variant="info">No comments yet</Alert>
          )}
        </ListGroup>

        <Form onSubmit={handleCommentSubmit} className="mt-3">
          <Form.Group controlId="comment">
            <Form.Control
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment"
            />
          </Form.Group>
          <Button type="submit" variant="primary">
            Add Comment
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default BlogDetail;
