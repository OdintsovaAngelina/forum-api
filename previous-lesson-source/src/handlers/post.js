import {
  getPosts,
  getPostById,
  createPost,
} from '../services/post.js';

export const getAllPosts = (req, res) => {
  const { category, take } = req.query;

  const posts = getPosts(
    category,
    take ? Number(take) : undefined,
  );

  res.status(200).json(posts);
};

export const getPost = (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      message: 'Invalid post id',
    });
  }

  const post = getPostById(id);

  if (!post) {
    return res.status(404).json({
      message: 'Post not found',
    });
  }

  res.status(200).json(post);
};

export const addNewPost = async (req, res) => {
  const { title, content, author, category } = req.body;

  if (
    typeof title !== 'string' ||
    !title.trim() ||
    typeof content !== 'string' ||
    !content.trim() ||
    typeof author !== 'string' ||
    !author.trim() ||
    typeof category !== 'string' ||
    !category.trim()
  ) {
    return res.status(422).json({
      message: 'Invalid post data',
    });
  }

  const newPost = await createPost({
    title: title.trim(),
    content: content.trim(),
    author: author.trim(),
    category: category.trim(),
  });

  res.status(201).json(newPost);
};