import MongoDb from 'mongodb';
import { getTweets } from '../database/database.js';
import * as userRepository from './auth.js';
const ObjectId=MongoDb.ObjectId;

let tweets = [
  {
    id: '1',
    text: '드림코더분들 화이팅!',
    createdAt: new Date().toString(),
    userId: '1',
  },
  {
    id: '2',
    text: '안뇽!',
    createdAt: new Date().toString(),
    userId: '1',
  },
];

export async function getAll() {
  return getTweets()
  .find()
  .sort({createdAt:-1})
  .toArray()
  .then(mapTweet)
}

export async function getAllByUsername(username) {
  return getTweets()
  .find({username})
  .sort({createdAt:-1})
  .toArray()
  .then(mapTweet)
}

export async function getById(id) {
 return getTweets()
 .findOne({_id:new ObjectId(id)})
 .then(mapTweetID)
}

export async function create(text, userId) {
  const {name, username, url}= await userRepository.findById(userId)
  const tweet = {
    text:text,
    createdAt: new Date(),
    userId,
    name:name,
    username:username,
    url:url,
  };
  return getTweets()
  .insertOne(tweet)
  .then(mapTweetID)
}

export async function update(id, text) {
 return getTweets()
 .findOneAndUpdate(
   {_id: new ObjectId(id)},
   {$set:{text}},
   {returnDocument:'after'}
 )
 .then((res)=> res.value)
 .then(mapTweetID)
}

export async function remove(id) {
  return getTweets().deleteOne({_id: new ObjectId(id)})
}

function mapTweetID(tweet){
  return tweet ? {...tweet, id:tweet._id.toString()} : tweet
}

function mapTweet(tweets){
  return tweets.map((tweet)=> mapTweetID(tweet))
}
