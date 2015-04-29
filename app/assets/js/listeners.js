var isMute = false;
var oldSrc = "";

var $player = $('#sounds-player');
var $sounds = $('#sounds');

var toggleMute = function () {
  var $player = document.getElementById('sounds-player');
  var $instructions = $('#instructions');

  if (isMute) {
    // unmute
    $player.play();
    $instructions.html('m to mute<br><br>' +
      'click and drag to look around<br>' +
      'arrow keys to pan');
  } else {
    // mute sounds
    $player.pause();
    $instructions.html('m to ummute<br><br>click and drag to look around<br>arrow keys to pan');
  }
  isMute = !isMute;
}

window.onkeyup = function(e) {
   var key = e.keyCode ? e.keyCode : e.which;

   // 'm'
   if (key == 77) {
      console.log('m key pressed');
      toggleMute();
   }
}


// on-click buttons
var toOcean = function () {
  if(scene_s !== OCEAN_S) {
     $('#canvas-clouds').hide();
    // $('#canvas-3d').show();

    $('body').css("background-color","#000");

    $sounds.attr("src", 'assets/mp3s/ocean.mp3');
    $player.load();

    loadOcean();
    scene_s = OCEAN_S;
  }
}

var toClouds = function () {
  if(scene_s !== CLOUDS_S) {
    $('#canvas-3d').hide();
    //$('#canvas-clouds').show();

    $(' body').css("background-color","#1e4877");

    $sounds.attr("src", 'assets/mp3s/wind.wav');
    $player.load();
    
    //CLOUDS.init();
    clouds_init();
    scene_s = CLOUDS_S;
  }
  
}