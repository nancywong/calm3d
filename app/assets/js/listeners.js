var isMute = false;
var oldSrc = "";

var toggleMute = function () {
  var sounds = document.getElementById('sounds');
  //var $instructions = document.getElementById('$instructions');
  var $instructions = $('#instructions');

  if (isMute) {
    // unmute
//    $('#sounds').get(0).play();
    sounds.play();
    console.log('not muted: ' + sounds.src);
    console.log($instructions.html());
    $instructions.html('m to mute');
    console.log('$instructions read: ' + $instructions.html());
    console.log('?');
  } else {
    // mute sounds
    //$('#sounds').get(0).pause();
    sounds.pause();
    console.log('mmuted src:' + sounds.src);
    $instructions.html('m to unmute');
    console.log('$instructions read: ' + $instructions.html());
    console.log('?');
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