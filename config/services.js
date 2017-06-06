'use strict'

var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: 'empwHXzDIRRNDDK4R7pSZ17fR',
  consumer_secret: 'w6pasmeHCljBikfja8C3fTKrY6dAnTSHWt2dLiPWB5vuV4aB2d',
  access_token_key: '871436352776151040-5ZuvufMTH2HqfXnxZUGAVSYJOuFm98F',
  access_token_secret: 'IwNPKcAkhOJguVQvapIky8X5wSkPCuCprPHKiTp1e3gAr'
});

var params = {screen_name: 'gibrex_'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});
