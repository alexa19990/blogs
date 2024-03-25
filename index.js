import express, { response } from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

//1. get all posts
app.get("/posts", (req, res) => {
  res.json(posts);
});

//2. get specific post
app.get("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const itemToGet = posts.find((item) => item.id === id);
  res.json(itemToGet);
});

//3. add post
app.post("/posts", (req, res) => {
  const newPost = {
    id: posts.length + 1,
    postText: req.body.text,
  };
  posts.push(newPost);
  res.json(posts);
});

//4. update existing post PUT

app.put("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const replacePost = {
    id: id,
    jokeText: req.body.text,
  };
  const indexToReplace = posts.findIndex((item) => item.id === id);
  posts[indexToReplace] = replacePost;
  res.json(posts);
});

//5. delete post with specific id

app.delete("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const deleteIndex = posts.findIndex((item) => item.id === id);
  if (deleteIndex > -1) {
    posts.splice(deleteIndex, 1);
    res.sendStatus(200);
  } else {
    res
      .status(404)
      .json({ error: `Joke with id: ${id} not found. No jokes were deleted.` });
  }
});

//6. retrieve specific comment from post GET

app.get("/posts/:id/comments", (req, res) => {
  const id = parseInt(req.params.id);
  const searchItem = posts.find((item) => item.id === id);
  const commentsJoined = searchItem.postText
  res.json(commentsJoined)
});

//7. add comment to specific post

app.post('/posts/:id/comments', (req,res)=>{
  const id = parseInt(req.params.id)
  const newComment = req.body.comment
  const searchItem = posts.find((item) => item.id === id);
  searchItem.postText.push(newComment)
  res.json(posts)
})


//8. Update a comment on a specific blog post.
app.put('/posts/:id/comments/:commentId', (req,res)=>{
  const id = parseInt(req.params.id)
  const commentId = parseInt(req.params.commentId)
  const newComment = req.body.comment
  const searchItem = posts.find((item) => item.id === id);
  searchItem.postText[commentId-1] = newComment
  res.json(posts)
})


//9. Delete a comment from a specific blog post.

app.delete('/posts/:id/comments/:commentId', (req,res)=>{
  const id = parseInt(req.params.id)
  const commentId = parseInt(req.params.commentId)
  const searchItem = posts.find((item) => item.id === id);
  searchItem.postText.splice(commentId-1, 1)
  res.json(posts)
})

app.listen(port, () => {
  console.log(`Successfully started server on port ${port}.`);
});

const posts = [
  { id: 1, postText: ["post 1"] },
  { id: 2, postText:["post 2" ] },
  { id: 3, postText: ["post 3"] },
  { id: 4, postText: ["post 4"] },
  { id: 5, postText: ["post 5"] },
];
