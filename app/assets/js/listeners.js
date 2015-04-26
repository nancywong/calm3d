var isMute = false;
var oldSrc = "";

var toggleMute = function () {
  var sounds = document.getElementById('sounds');

  if (isMute) {
    // unmute
//    $('#sounds').get(0).play();
    sounds.play();
    console.log('not muted: ' + sounds.src);
    
  } else {
    // mute sounds
    //$('#sounds').get(0).pause();
    sounds.pause();
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