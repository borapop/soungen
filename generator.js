function generate(type, frequency) {



  var Generator = function(type, frequency) {


  if (navigator.userAgent.match(/iPhone|iPad|iPod/i)){

    var audioContext = new window.webkitAudioContext();

  } else {

    var audioContext = new window.AudioContext();

  }
  oscillator = audioContext.createOscillator();


  


  var analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    var bufferLength = analyser.frequencyBinCount;
    console.log(bufferLength);
    var dataArray = new Uint8Array(bufferLength);
    WIDTH = 500;
    HEIGHT = 100;
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
          barHeight = dataArray[i];

          canvasContext.fillStyle = 'rgb(' + (barHeight +150) + ',50,50)';
          canvasContext.fillRect(x,HEIGHT-barHeight,barWidth,barHeight);

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

  this.randomMusic = function() {
    var t = 50;
    setTimeout(function play(){
      t = Math.random() * 4;
      
      oscillator.frequency.value = Math.random() * 1000 //1 * 5000
      setTimeout(play, t);
    }, t);
  }

  this.randomNotes = function(pitch, maxInterval) {

    var notes = [];
    for (i = 0; i <= 36; i++) {
      notes[i] = pitch * Math.pow(2, i/12);
    }

    var t = 0;

    setTimeout(function play() {
      setTimeout(500);
      gainNode.gain.value = Math.floor(Math.random()+1);
      t = Math.random() * maxInterval;
      oscillator.frequency.value = notes[Math.floor(Math.random() * 36)];
      setTimeout(play, t);

    });
  };

  this.octave = function(pitch, interval) {
    var flag = false;
      setTimeout(function play(){
        flag = !flag;
        if (flag) {
          oscillator.frequency.value = pitch / 2;
        } else {
          oscillator.frequency.value = pitch * 2;
        }

      setTimeout(play, interval);
      }, interval);
    
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

  //generator.randomMusic();


  playRandomNotes = false;

  var frequencyRange = document.getElementById('frequencyRange');
  var frequencyNumber = document.getElementById('frequencyNumber');
  var playRandomNotes = false;
  var checkboxRandom = document.getElementById('checkboxRandom');

  this.playR = function() {
    playRandomNotes = true;
  };


  frequencyRange.onchange = function() {

    generator.frequency(frequencyRange.value);
    if (playRandomNotes) {
      generator.randomNotes(frequencyRange.value, 4);
    }
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