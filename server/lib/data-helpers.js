"use strict";
const ObjectId = require('mongodb').ObjectID;

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      db.collection("tweets").insertOne(newTweet, callback);
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      db.collection("tweets").find().toArray(callback);
    },

    // Updates the likes when heart button clicks
    likeTweet: function(tweetId, callback) {
      db.collection("tweets").updateOne({"_id" : new ObjectId(tweetId)}, {$inc: {likes: 1}}, () => {
        db.collection('tweets').findOne({"_id" : new ObjectId(tweetId)}, callback);
      });
    }
  };
}
