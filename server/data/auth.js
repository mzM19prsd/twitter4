import { getUsers } from "../database/database.js";
import MongoDb from 'mongodb';

export async function findByUsername(username) {
  return getUsers()
  .findOne({username})
  .then((data)=>{return mapUser(data)})
} 

export async function findById(id) {
  return getUsers()
  .findOne({_id: new MongoDb.ObjectId(id)})
  .then((data)=>{return mapUser(data)})
}

export async function createUser(user) {
 return getUsers()
 .insertOne(user)
 .then((data)=> {
   return data.insertedId.toString()
 })
}

function mapUser(user){
  return user ? {...user, id:user._id} : user
}
