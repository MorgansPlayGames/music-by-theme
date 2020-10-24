"use strict";

window.onSpotifyWebPlaybackSDKReady = function () {// You can now initialize Spotify.Player and use the SDK
};

var play = function play(_ref) {
  var spotify_uri = _ref.spotify_uri,
      _ref$playerInstance$_ = _ref.playerInstance._options,
      getOAuthToken = _ref$playerInstance$_.getOAuthToken,
      id = _ref$playerInstance$_.id;
  getOAuthToken(function (access_token) {
    fetch("https://api.spotify.com/v1/me/player/play?device_id=".concat(id), {
      method: 'PUT',
      body: JSON.stringify({
        uris: [spotify_uri]
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer ".concat(access_token)
      }
    });
  });
};

play({
  playerInstance: new Spotify.Player({
    name: "..."
  }),
  spotify_uri: 'spotify:track:7xGfFoTpQ2E7fRF5lN10tr'
});