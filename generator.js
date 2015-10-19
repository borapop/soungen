function generate(type, frequency) {



  var Generator = function(type, frequency) {
  


  var audioContext = new window.AudioContext();
  oscillator = audioContext.createOscillator();
  var gainNode = audioContext.createGain();
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  oscillator.type = type; // sine wave — other values are 'square', 'sawtooth', 'triangle' and 'custom'
  oscillator.frequency.value = frequency;
  
  this.start = function() {
    oscillator.start();
    };

  this.stop = function(){
    oscillator.on();
  };

  this.gainValue = function(x) {
    gainNode.gain.value = x;
  };

  this.frequency = function(freq) {
    oscillator.frequency.value = freq;
  };

  this.type = function(type) {
    oscillator.type = type;
  };



  };

  var generator = new Generator(type, frequency);

  generator.start();


  var typeRange = document.getElementById('typeRange');

  typeRange.onchange = function() {

    if (typeRange.value == 1) {
        generator.type('sine');
    } 
    else if (typeRange.value == 2) {
        generator.type('square');
    } 
    else if (typeRange.value == 3) {
          generator.type('sawtooth');
      } 
      else {
          generator.type('triangle');
      }

  };

  var frequencyRange = document.getElementById('frequencyRange');

  frequencyRange.onchange = function() {
    generator.frequency(frequencyRange.value);

  };
  

  var gainRange = document.getElementById('gainRange');

  gainRange.onchange = function() {

    generator.gainValue(gainRange.value);

  };
  
};