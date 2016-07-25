var request = require('request'); // "Request" library

var client_id = process.env.SPOTPEPP_CLIENT_ID; // Your client id
var client_secret = process.env.SPOTPEPP_CLIENT_SECRET; // Your secret

var playlists = [
  "05FrPmv2oz4oO3BRAvJEm5",
  "6sLdH3TF4lHBODR5YF2vTz",
  "14TuiUwbVWav03pFmsGnLt",
  "3lvq98RVr183ECZMiHOX7f",
  "7BMO1DEG5ctOpijDwbDjvs",
  "5rgp37181Pup1ghNXf0JuL",
  "4uHpAgHW7t38mxhYF9JMDk",
  "0RPjmScL4VVP9YeouXPKwl",
  "3ByBLCO0QqOJKtosxvEW5d",
  "59ukgH9WMyZVW5H5xlYFff",
  "5Fzzh00GylK3Ver8rz2oqh",
  "0K6nAs4B4r9daQkYvShTwZ",
  "39II92fao0D8aq5MSKDD29",
  "1DBHkertP83bs9Zn5WMR1i",
  "5pFbi0EFQd1qXbHC5ppnKg",
  "0c0JfABc0sgYvKZdQ2cjOF",
  "5TZyZNuoYbseiphgRh3WC1",
  "1WEypNJeG7tBXA6gBrZUwQ",
  "72RtNTgRVZOj5C7glKs2vS",
  "2D8wMJ8O3GeNWDmb9BcAVq",
  "4vFvwCkbD08FsBRRBShM4S",
  "0hiTeh7gVfXPAh8CC8sZhh",
  "5oiiQBqlA1eVBQJRw05E9s",
  "0i0j3aBuSTbZe191kbT6ab",
  "6VSRN2pssDRgk8BGDMAwF0",
  "2wTneFHoTGsxjPZZJMiiHy",
  "38Ks64Ka50i8GSU3eF7kZT",
  "50wfz46PdUXTycmcbnZ62n",
  "3GFcvF81GxgYsBgsyW6viZ",
  "6r718WjvEgCO2F8L9OoY06",
  "5LEBmYWpfkaQZ3hDqKJAyB"
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
        url: 'https://api.spotify.com/v1/users/doversten/playlists/'+playlist,
        headers: {
          'Authorization': 'Bearer ' + token
        },
        json: true
      };
      request.get(options, function(error, response, body) {
        if (!error)
          console.log(body.name);

          for(var item in body.tracks.items) {
            var track = body.tracks.items[item].track;
            var artists = track.artists;
            for(var artist in artists) {
              //process.stdout.write(artists[artist].name + ', ');
            }
            console.log(track.id);
            //console.log(' - ' + track.name);
          }

          //console.log();
          callback();
      });
    }
  });
}

for(var playlist in playlists) {
  getTracksOfPlaylist(playlists[playlist], function(){
  });
}
