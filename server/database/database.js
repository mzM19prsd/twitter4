import {MongoClient} from 'mongodb';
import {config} from '../config.js';

let db;

export const connectDB= () => {
    return new MongoClient(config.db.host).connect().then((client)=> {
        db=client.db()
    })
}

export function getUsers(){
    return db.collection('users');
}

export function getTweets(){
    return db.collection('tweets')
}