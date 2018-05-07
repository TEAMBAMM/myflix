var Player = require('nodecast-js');

var url = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/big_buck_bunny_1080p.mp4';
var timestamp = 60; // in seconds

var player = new Player();
player.onDevice(function(device) {
  device.onError(function(err) {
    console.log(err);
  });

  console.log(player.getList()); // list of currently discovered devices

  device.play(url, timestamp);
});
player.start();

setTimeout(function() {
  player.destroy(); // destroy your Player
}, 20000);
