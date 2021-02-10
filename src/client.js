// const Twitter = require('twit');
const Twitter = require('twit');
const config = require('../config/twitter.config.json');

const client = new Twitter(config);

module.exports = client;