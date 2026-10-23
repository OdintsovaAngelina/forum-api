import express from 'express';

import postRouter from './routers/post.js';

const app = express();

const PORT = 8000;

app.use(express.json());

app.use(postRouter);

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Forum API is working',
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});