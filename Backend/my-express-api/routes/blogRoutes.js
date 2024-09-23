const express = require('express');
const router = express.Router();

let blogPosts = [];
let idCounter = 1;

// Route to create a new blog post
router.post('/', (req, res) => {
    const { title, content, author } = req.body;

    if (!title || !content || !author) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    const newPost = {
        id: idCounter++,
        title,
        content,
        author,
        createdAt: new Date(),
    };

    blogPosts.push(newPost);
    res.status(201).json(newPost);
});

// Route to get all blog posts
router.get('/', (req, res) => {
    res.json(blogPosts);
});

// Route to get a specific blog post by ID
router.get('/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const post = blogPosts.find(p => p.id === postId);

    if (!post) {
        return res.status(404).json({ message: 'Post not found' });
    }

    res.json(post);
});

// Route to update a blog post by ID
router.put('/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const { title, content, author } = req.body;

    const post = blogPosts.find(p => p.id === postId);

    if (!post) {
        return res.status(404).json({ message: 'Post not found' });
    }

    if (title) post.title = title;
    if (content) post.content = content;
    if (author) post.author = author;

    res.json(post);
});

// Route to delete a blog post by ID
router.delete('/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const postIndex = blogPosts.findIndex(p => p.id === postId);

    if (postIndex === -1) {
        return res.status(404).json({ message: 'Post not found' });
    }

    blogPosts.splice(postIndex, 1);
    res.json({ message: 'Post deleted' });
});

module.exports = router;

