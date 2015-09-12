(function(window) {
  'use strict';

  var AudioContext = window.AudioContext || window.webkitAudioContext;
  if(!AudioContext) return;

  var document = window.document;

  var audioContext = new AudioContext();
  var osc = audioContext.createOscillator();
  var gain = audioContext.createGain();
  osc.connect(gain);
  gain.connect(audioContext.destination);
  gain.gain.value = 0;
  osc.frequency.value = 1;
  osc.start();

  var oldScrollValue = window.scrollY,
      newScrollValue,
      dScroll,
      scrollFreqMod = 20,
      scrollTimeout = null;
  document.addEventListener('scroll', function(e) {
    newScrollValue = window.scrollY;
    dScroll = Math.abs(newScrollValue - oldScrollValue);
    oldScrollValue = newScrollValue;

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(function() {
      gain.gain.value = 0;
      oldScrollValue = window.scrollY;
    }, 50);

    gain.gain.value = 0.8;
    osc.frequency.value = dScroll*scrollFreqMod+50;
  }, false);

})(this);
