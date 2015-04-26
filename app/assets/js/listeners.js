var isMute = false;
var oldSrc = "";

var toggleMute = function () {
  var sounds = document.getElementById('sounds');
  if (isMute) {
    setVolume(0);
    oldSrc = sounds.src;
    sounds.src = "";  // stop sounds
  } else {
    sounds.src = oldSrc;
  }
  isMute = !isMute;
  console.log('muted');
}

window.onkeyup = function(e) {
   var key = e.keyCode ? e.keyCode : e.which;

   if (key == 77) {
      console.log('m key pressed');
      toggleMute();
   }
}