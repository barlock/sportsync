navigator.getUserMedia = ( navigator.getUserMedia || navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||navigator.msGetUserMedia);

var audioCtx = new (window.AudioContext || window.webkitAudioContext)(),
    source,
    delay = audioCtx.createDelay(45),
    rangeInput = document.querySelector('.range-input'),
    delayLabel = document.querySelector(".delay-label");

rangeInput.oninput = function() {
    delay.delayTime.value = rangeInput.value;
    delayLabel.innerHTML = rangeInput.value;
};

if (navigator.getUserMedia) {
    navigator.getUserMedia({audio: true}, function(stream) {
        source = audioCtx.createMediaStreamSource(stream);
        source.connect(delay);
        delay.connect(audioCtx.destination);
    },function(err) {
        console.log('The following gUM error occured: ' + err);
    });
}