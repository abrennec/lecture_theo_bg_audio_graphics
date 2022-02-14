if (typeof (console) === "undefined") var console = {
  log: function() {}
};
// Toggle between Pause and Play modes.
var pausePlayStop = function(stop) {
  var d = document.getElementById("pausePlayStop");
  if (stop) {
    MIDI.Player.stop();
    d.src = "./assets/play.png";
  } else if (MIDI.Player.playing) {
    d.src = "./assets/play.png";
    MIDI.Player.pause(true);
  } else {
    d.src = "./assets/pause.png";
    MIDI.Player.resume();
  }
};

let piaboKey;
let colorMap;

eventjs.add(window, "load", function(event) {

  /// load up the piano keys
  var colors = document.getElementById("colors");
  var colorElements = [];
  for (var n = 0; n < 88; n++) {
    var d = document.createElement("div");
    d.innerHTML = MIDI.noteToKey[n + 21];
    colorElements.push(d);
    colors.appendChild(d);
  }
  ///


  //colorstuff
  colorMap = MIDI.Synesthesia.map();
  pianoKey = 0;

  MIDI.loader = new sketch.ui.Timer;
  MIDI.loadPlugin({
    soundfontUrl: "./assets/soundfont/",
    onprogress: function(state, progress) {
      MIDI.loader.setValue(progress * 100);
    },
    onsuccess: function() {
      /// this is the language we are running in
      var title = document.getElementById("title");
      title.innerHTML = "Sound being generated with " + MIDI.api + " " + JSON.stringify(MIDI.supports);

      /// this sets up the MIDI.Player and gets things going...
      player = MIDI.Player;
      player.timeWarp = 1.85; // speed the song is played back
      player.loadFile(song[songid++ % song.length], player.start);


      /// control the piano keys colors
      //var colorMap = MIDI.Synesthesia.map();
      colorMap = MIDI.Synesthesia.map();
      console.log(colorMap[0].hex);

      player.addListener(function(data) {
        pianoKey = data.note - 21;
        var d = colorElements[pianoKey];
        console.log(pianoKey);
        if (d) {
          if (data.message === 144) {
            var map = colorMap[data.note - 27];
            if (map) d.style.background = map.hex;
            d.style.color = "#fff";
          } else {
            d.style.background = "";
            d.style.color = "";
          }
        }
      });
      MIDIPlayerPercentage(player);
    }
  });
});

var MIDIPlayerPercentage = function(player) {
  // update the timestamp
  var time1 = document.getElementById("time1");
  var time2 = document.getElementById("time2");
  var capsule = document.getElementById("capsule");
  var timeCursor = document.getElementById("cursor");
  //
  eventjs.add(capsule, "drag", function(event, self) {
    eventjs.cancel(event);
    player.currentTime = (self.x) / 420 * player.endTime;
    if (player.currentTime < 0) player.currentTime = 0;
    if (player.currentTime > player.endTime) player.currentTime = player.endTime;
    if (self.state === "down") {
      player.pause(true);
    } else if (self.state === "up") {
      player.resume();
    }
  });
  //
  function timeFormatting(n) {
    var minutes = n / 60 >> 0;
    var seconds = String(n - (minutes * 60) >> 0);
    if (seconds.length == 1) seconds = "0" + seconds;
    return minutes + ":" + seconds;
  };
  player.getNextSong = function(n) {
    var id = Math.abs((songid += n) % song.length-1);
    player.loadFile(song[id], player.start); // load MIDI
  };
  player.setAnimation(function(data, element) {
    var percent = data.now / data.end;
    var now = data.now >> 0; // where we are now
    var end = data.end >> 0; // end of song
    if (now === end) { // go to next song
      var id = ++songid % song.length;
      player.loadFile(song[id], player.start); // load MIDI
    }
    // display the information to the user
    timeCursor.style.width = (percent * 100) + "%";
    time1.innerHTML = timeFormatting(now);
    time2.innerHTML = "-" + timeFormatting(end - now);
  });
};


// Begin loading indication.
var player;
// MIDI files from Disklavier World
var songid = 0;
var song = [
  // song 0
  "./assets/ravel_jeux_deau_PNO.mid",
  // song 1
  "./assets/mpd218_randomMidiClip.mid",
  // song 2
  "./assets/11_Bach-Kempff_SicilianoInGminor.mid",

];

let radius= 10; // width should be evenly dividable by spacing
let count = 10 ;
function setup() {

  // shaders require WEBGL mode to work
  let canvas = createCanvas(400, 400, WEBGL);
  canvas.GL.getExtension('OES_standard_derivatives');
  
}

function draw() {  
    background(0);
// Go row by row
for (let y = 0; y < count; y += 1)
{
    for (let x = 0; x < count; x += 1)
    {     
        let currentIndex = y*count + x;
        console.log(colorMap.length);
        if (pianoKey == currentIndex){
          fill(colorMap[currentIndex].hex);
        } else {   
          fill(255);
        }
        circle(x*(width -radius)/count - width/2 + width/count/2 + radius/2, y*(height- radius)/count - height/2  + height/count/2 + radius/2, radius);

    }
}
}

// function windowResized(){
//   resizeCanvas(windowWidth, windowHeight);
// }

