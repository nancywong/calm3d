var isMute = false;
var oldSrc = "";

var toggleMute = function () {
  var sounds = document.getElementById('sounds');
  //var $instructions = document.getElementById('$instructions');
  var $instructions = $('#instructions');

  if (isMute) {
    // unmute
    sounds.play();
    $instructions.html('m to mute');
  } else {
    // mute sounds
    sounds.pause();
    $instructions.html('m to unmute');
  }
  isMute = !isMute;
  
}

window.onkeyup = function(e) {
   var key = e.keyCode ? e.keyCode : e.which;

   if (key == 77) {
      console.log('m key pressed');
      toggleMute();
   }
}