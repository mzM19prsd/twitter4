
import {Alltweets, UsersTweet, IDtweet, create, edit, remove}from "./tweetsData.js";

export function getTweets(req, res, next) {
    const username = req.query.username;
    const data = username ? UsersTweet(username) : Alltweets();
    res.status(200).json(data);   
  }

  export function getTweet(req, res, next) {
    const id = req.params.id;
    const tweet = IDtweet(id)
  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
  }

  export function createTweet(req, res, next) {
    const { text, name, username } = req.body;   
    const tweet= create(text, name, username)
    res.status(201).json(tweet);
  }

  export function editTweet(req, res, next) {
    const id = req.params.id;
    const text = req.body.text;
    const tweet=edit(id, text)
    if (tweet) {
      res.status(200).json(tweet);
    } else {
      res.status(404).json({ message: `Tweet id(${id}) not found` });
    }
  }

  export function deleteTweet(req, res, next) {
    const id = req.params.id;
    remove(id)
    res.sendStatus(204);
  }