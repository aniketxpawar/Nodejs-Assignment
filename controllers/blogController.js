const { Post } = require('../models');

const getAllPosts = async (req, res) => {
    try {
      const posts = await Post.findAll();
      res.json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

const getPostById = async (req, res) => {
    try {
      const postId = req.params.id;
      const post = await Post.findByPk(postId);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.json(post);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

const createPost = async (req, res) => {
    try {
      const { title, content } = req.body;
      const userId = req.user.id;
  
      const newPost = await Post.create({ title, content, UserId: userId });
      res.status(201).json(newPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

const updatePost = async (req, res) => {
    try {
      const postId = req.params.id;
      const { title, content } = req.body;
  
      const post = await Post.findByPk(postId);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
  
      if (post.UserId !== req.user.id) {
        return res
          .status(403)
          .json({ message: "You are not authorized to update this post" });
      }
  
      await post.update({ title, content });
      res.json(post);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

const deletePost = async (req, res) => {
    try {
      const postId = req.params.id;
  
      const post = await Post.findByPk(postId);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
  
      if (post.UserId !== req.user.id) {
        return res
          .status(403)
          .json({ message: "You are not authorized to delete this post" });
      }
  
      await post.destroy();
      res.status(200).json({message:"Post Deleted Successfully!"});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

module.exports = { getAllPosts, getPostById, createPost, updatePost, deletePost }