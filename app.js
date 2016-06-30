var request = require('request'); // "Request" library

var client_id = process.env.SPOTPEPP_CLIENT_ID; // Your client id
var client_secret = process.env.SPOTPEPP_CLIENT_SECRET; // Your secret

// var playlists = [
//   "spotify:user:doversten:playlist:3lvq98RVr183ECZMiHOX7f",
//   "spotify:user:doversten:playlist:7BMO1DEG5ctOpijDwbDjvs",
//   "spotify:user:doversten:playlist:5rgp37181Pup1ghNXf0JuL"
// ]

var playlists = [
  "3lvq98RVr183ECZMiHOX7f",
  "7BMO1DEG5ctOpijDwbDjvs",
  "5rgp37181Pup1ghNXf0JuL"
]

// your application requests authorization
var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

var getTracksOfPlaylist = function(playlist, callback){
  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {

      // use the access token to access the Spotify Web API
      var token = body.access_token;
      var options = {
        url: 'https://api.spotify.com/v1/users/doversten/playlists/'+playlist+'/tracks',
        headers: {
          'Authorization': 'Bearer ' + token
        },
        json: true
      };
      request.get(options, function(error, response, body) {
        if (!error)
          for(var item in body.items) {
            var track = body.items[item].track;
            var artists = track.artists;
            console.log(track.id + ", " + artists[0] + ' - ' + track.name);
          }
          callback();
      });
    }
  });
}

for(var playlist in playlists) {
  getTracksOfPlaylist(playlists[playlist], function(){
  });
}
