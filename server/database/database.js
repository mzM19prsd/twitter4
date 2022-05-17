
import monguuse from 'mongoose'
import {config} from '../config.js';


export const connectDB= () => {
    return monguuse.connect(config.db.host)
}

export function useVirtualId(schema){
schema.virtual('id').get(function(){
    return this._id.toString()
})
schema.set('toJson', {virtuals:true});
schema.set('toObject', {virtuals:true});
}

let db;

export function getTweets(){
    return db.collection('tweets')
}