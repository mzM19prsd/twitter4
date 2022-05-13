import express from 'express';
import 'express-async-errors';
import {getTweets, getTweet, createTweet, editTweet, deleteTweet } from "./control/tweet.js";
import { validate, textLength } from './validator/validatior.js';

const router = express.Router();

// GET /tweets
// GET /tweets?username=:username
router.get('/', getTweets);

// GET /tweets/:id
router.get('/:id',getTweet);

// POST /tweeets
router.post('/',[textLength, validate], createTweet);

// PUT /tweets/:id
router.put('/:id',[textLength, validate], editTweet);

// DELETE /tweets/:id
router.delete('/:id', deleteTweet);

export default router;
