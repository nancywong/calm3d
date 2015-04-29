var isMute = false;
var oldSrc = "";

var toggleMute = function () {
  var sounds = document.getElementById('sounds');
  //var $instructions = document.getElementById('$instructions');
  var $instructions = $('#instructions');

  if (isMute) {
    // unmute
    sounds.play();
    $instructions.html('m to mute<br><br>' +
      'click and drag to look around<br>' +
      'arrow keys to pan');
  } else {
    // mute sounds
    sounds.pause();
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