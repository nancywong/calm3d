var myMedia = document.createElement('audio');
$('#player').append(myMedia);
myMedia.id = 'sounds';
playAudio('assets/mp3s/ocean', 1);

function playAudio(fileName, myVolume) {
  var mediaExt = (myMedia.canPlayType('audio/mp3')) ? '.mp3' 
    : (myMedia.canPlayType('audio/ogg')) ? '.ogg' 
    : '';
  if (mediaExt) {
    myMedia.src = fileName + mediaExt;
    myMedia.setAttribute('loop', 'loop');
    setVolume(myVolume);
    myMedia.play();
  }
}

function setVolume(myVolume) {
    var myMedia = document.getElementById('sounds');
    //myMedia.volume = myVolume;
}

$("#volume").slider({
    min: 0,
    max: 100,
    value: 0,
    range: "min",
    animate: true,
    slide: function(event, ui) {
      setVolume((ui.value) / 100);
    }
});