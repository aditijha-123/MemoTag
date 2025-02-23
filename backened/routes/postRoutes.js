const express = require("express");
const authMiddleware = require("../middleware/authMiddleware"); 
const Post = require("../models/Post");

const router = express.Router();

// Create Post
router.post("/", authMiddleware.protect, async (req, res) => {
  try {
    const newPost = new Post({ content: req.body.content, user: req.user.id });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: "Error creating post", error });
  }
});

// Get All Posts (For SuperAdmin)
router.get("/pending-posts", authMiddleware.protect, authMiddleware.superAdminOnly, async (req, res) => {
  try {
    const posts = await Post.find({ status: "pending" });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Approve or Reject Post (SuperAdmin)
router.put("/update-post/:id", authMiddleware.protect, authMiddleware.superAdminOnly, async (req, res) => {
  
    try {
    const { status } = req.body;
    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    await Post.findByIdAndUpdate(req.params.id, { status });
    res.json({ message: `Post ${status} successfully` });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});
// Get Approved Posts (For Common Users)
router.get("/approved-posts", authMiddleware.protect, async (req, res) => {
    try {
        // Fetch approved posts only
        const posts = await Post.find({
           
                status: "approved"
         
        });
        console.log(posts);

        // Return the posts
        res.json(posts);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Server error" });
        
    }
});


module.exports = router;
