const express = require('express');
const postsApiRouter = require('./posts.api');
const usersApiRouter = require('./users.api');

const router = express.Router();

router.use('/posts', postsApiRouter);

router.use('/users', usersApiRouter);

module.exports = router;
