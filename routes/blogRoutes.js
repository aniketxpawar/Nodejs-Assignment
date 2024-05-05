const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const {postValidation} = require('../validations/blogValidation')

router.get("/posts", blogController.getAllPosts);

router.get("/posts/:id", blogController.getPostById);

router.post("/posts", postValidation, blogController.createPost);

router.put("/posts/:id", postValidation, blogController.updatePost);

router.delete("/posts/:id", blogController.deletePost);

module.exports = router;
