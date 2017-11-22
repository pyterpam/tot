var express = require('express')
app = express();
var  twitter = require('ntwitter');
var fs = require('fs');
var server=app.listen(3000);
var io = require('socket.io').listen(server);
var client = new twitter({
  consumer_key: 'your_consumer_key',
  consumer_secret: 'your_consumer_secret',
  access_token_key: 'your_access_token_key',
  access_token_secret: 'your_access_token_secret'
});
var datos={};
client.stream('statuses/filter', {track: ['turismo']}, function(stream) {
  stream.on('data', function (data) {
    datos={};
    datos.created_at=data.created_at;
    datos.text=data.text;
    datos.location=data.user.location;
    datos.time_zone=data.user.time_zone;
    datos.lang=data.lang;
    datos.geo=data.geo;
    datos.place=data.place;
    datos.followers_count=data.user.followers_count;
    datos.friends_count=data.user.friends_count;
    datos.listed_count=data.user.listed_count;
    datos.favourites_count=data.user.favourites_count;
    datos.statuses_count=data.user.favourites_count;
    datos.retweet_count = data.retweet_count;
    datos.reply_count = data.reply_count;
    datos.retweeted=data.retweeted;
    datos=','+ JSON.stringify(datos);
    fs.appendFile('fileTwitter_turismo.json', datos, function (err) {});	
  });
});

