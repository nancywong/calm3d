var isMute = false;
var oldSrc = "";

var toggleMute = function () {
  var sounds = document.getElementById('sounds');
  if (isMute) {
    sounds.src = oldSrc;
    sounds.volume = 1;
    console.log('not muted: ' + sounds.src);
    
  } else {
    setVolume(0);
    oldSrc = sounds.src;
    sounds.volume = 0;
    sounds.src = "";  // stop sounds
    console.log('mmuted src:' + sounds.src);
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