function generate(type, frequency) {



  var Generator = function(type, frequency) {
  


  var audioContext = new window.AudioContext() || window.webkitAudioContext();
  oscillator = audioContext.createOscillator();


  


  var analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    var bufferLength = analyser.frequencyBinCount;
    console.log(bufferLength);
    var dataArray = new Uint8Array(bufferLength);
    WIDTH = 
    HEIGHT = 500;
    var canvasContext = document.getElementsByTagName('canvas')[0].getContext('2d');
    canvasContext.clearRect(0, 0, WIDTH, HEIGHT);


  var gainNode = audioContext.createGain();
  oscillator.connect(analyser);
  analyser.connect(gainNode);
  gainNode.connect(audioContext.destination);
  function draw() {
    drawVisual = requestAnimationFrame(draw);

    analyser.getByteFrequencyData(dataArray);

    canvasContext.fillStyle = 'rgb(0, 0, 0)';
    canvasContext.fillRect(0, 0, WIDTH, HEIGHT);
    var barWidth = (WIDTH / bufferLength) * 2.5;
      var barHeight;
      var x = 0;

      for(var i = 0; i < bufferLength; i++) {
          barHeight = dataArray[i]/2;

          canvasContext.fillStyle = 'rgb(' + (barHeight+100) + ',50,50)';
          canvasContext.fillRect(x,HEIGHT-barHeight/2,barWidth,barHeight);

          x += barWidth + 1;
        }
      };

  draw();

  


  oscillator.type = type; // sine wave — other values are 'square', 'sawtooth', 'triangle' and 'custom'
  oscillator.frequency.value = frequency;
  
  this.start = function() {
    oscillator.start();
    };

  this.stop = function() {
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
  var typeString = document.getElementById('typeString');

  typeRange.onchange = function() {
    
    if (typeRange.value == 1) {
        generator.type('sine');
        typeString.innerHTML = 'sine';
    } 
    else if (typeRange.value == 2) {
        generator.type('square');
        typeString.innerHTML = 'square';
    } 
    else if (typeRange.value == 3) {
          generator.type('sawtooth');
          typeString.innerHTML = 'sawtooth';
      } 
      else {
          generator.type('triangle');
          typeString.innerHTML = 'triangle';
      }
  };

  var frequencyRange = document.getElementById('frequencyRange');
  var frequencyNumber = document.getElementById('frequencyNumber');

  frequencyRange.onchange = function() {

    generator.frequency(frequencyRange.value);
    frequencyNumber.value = frequencyRange.value;

  };
 
  frequencyNumber.onchange = function() {

    generator.frequency(frequencyNumber.value);
    frequencyRange.value = frequencyNumber.value;

  };
  

  var gainRange = document.getElementById('gainRange');

  gainRange.onchange = function() {

    generator.gainValue(gainRange.value);

  };
  
};