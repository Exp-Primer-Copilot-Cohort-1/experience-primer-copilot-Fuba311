// Create web server

const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');

const app = express();

// Parse incoming json data
app.use(bodyParser.json());

// Store comments
const commentsByPostId = {};

// Get comments
app.get('/posts/:id/comments', (req, res) => {
  // Send back comments for post id or empty array
  res.send(commentsByPostId[req.params.id] || []);
});

// Create comment
app.post('/posts/:id/comments', (req, res) => {
  // Generate random id
  const commentId = randomBytes(4).toString('hex');
  // Get request body
  const { content } = req.body;
  // Get comments for post id or empty array
  const comments = commentsByPostId[req.params.id] || [];
  // Push new comment
  comments.push({ id: commentId, content });
  // Set comments for post id
  commentsByPostId[req.params.id] = comments;
  // Send back new comment
  res.status(201).send(comments);
});

// Listen for requests
app.listen(4001, () => {
  console.log('Listening on 4001');
});
