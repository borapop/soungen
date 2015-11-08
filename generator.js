
  var Generator = function(type, frequency) {


  if (navigator.userAgent.match(/iPhone|iPad|iPod/i)){

    var audioContext = new window.webkitAudioContext();

  } else {

    var audioContext = new window.AudioContext();
  }
  oscillator = audioContext.createOscillator();




  var gainNode = audioContext.createGain();
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);


  //draw();

  


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
      {
        
      }
      
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

  var note = [];

  for (i = 0; i <= 36; i++) {
      note[i] = 440 * Math.pow(2, i/12);
    }

  this.playNote = function(octave, noteNumber) {
    noteNumber += 2;
    oscillator.frequency.value = note[octave * 12 + noteNumber];

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

  var generator = new Generator('sine', 1)
;
  generator.start();

  function drawPiano(whiteKeys, size) {
    var c = document.getElementById("piano-keys");
    var ctx = c.getContext("2d");
    var n = 0;
    for (i = 0; i < whiteKeys; i++) {
      ctx.rect(size + n + i*size*3, size*2, size*3, size*10);
      if (!((i % 7 == 2) || (i % 7 == 6))) {
        ctx.fillRect(size*3 + n + i*size*3, size*2, size*2, size*6);
      }
    }
    ctx.stroke();
    c.onclick = function(event) {
      x = event.pageX - c.offsetLeft;
      y = event.pageY - c.offsetTop;
      console.log(x, y);
      if ((y < size * 8) && (( (x / size) % 3 >  0) && ((x / size) % 3 < 2)) &&
                            !((((x / size) % 21 > 0) && ((x / size) % 21 <2)) ||
                            (((x / size) % 21 > 9) && ((x / size) % 21 < 11))) ) {
        
        if (          ((x / size) % 21 > 3) && ((x / size) % 21 < 5) ) {
            generator.playNote( Math.floor(x / (22 * size)) , 2);
          } else if ( ((x / size) % 21 > 6) && ((x / size) % 21 < 8) ) {
            generator.playNote( Math.floor(x / (22 * size)) , 4);
          } else if ( ((x / size) % 21 > 12) && ((x / size) % 21 < 14) ) {
            generator.playNote( Math.floor(x / (22 * size)) , 7);
          } else if ( ((x / size) % 21 > 15) && ((x / size) % 21 < 17) ) {
            generator.playNote( Math.floor(x / (22 * size)) , 9);
          } else if ( ((x / size) % 21 > 18) && ((x / size) % 21 < 20) ) {
            generator.playNote( Math.floor(x / (22 * size)) , 11);
          } 



      } else {
        if (y < 120 * size ) {

        if (          ((x / size) % 21 > 1) && ((x / size) % 21 < 4) ) {
            generator.playNote( Math.floor(x / (22 * size)) , 1);
          } else if ( ((x / size) % 21 > 4) && ((x / size) % 21 < 7) ) {
            generator.playNote( Math.floor(x / (22 * size)) , 3);
          } else if ( ((x / size) % 21 > 7) && ((x / size) % 21 < 10) ) {
            generator.playNote( Math.floor(x / (22 * size)) , 5);
          } else if ( ((x / size) % 21 > 10) && ((x / size) % 21 < 13) ) {
            generator.playNote( Math.floor(x / (22 * size)) , 6);
          } else if ( ((x / size) % 21 > 13) && ((x / size) % 21 < 16) ) {
            generator.playNote( Math.floor(x / (22 * size)) , 8);
          } else if ( ((x / size) % 21 > 16) && ((x / size) % 21 < 19) ) {
            generator.playNote( Math.floor(x / (22 * size)) , 10);
          } else if ( ((x / size) % 21 > 19) || ((x / size) % 21 < 1) ) {
            generator.playNote( Math.floor(x / (22 * size)) , 12);
          }
        }


      }

    };
  };

  drawPiano(15, 10);

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

  /*
  var notesRange = document.getElementById('notesRange');

  var keyboardScale = document.getElementById('keyboardScale');

  
  notesRange.onchange = function () {
    var c = document.getElementById("piano-keys");
    var ctx = c.getContext("2d");
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, c.width, c.height);
    drawPiano(notesRange.value, keyboardScale.value);
  };

  keyboardScale.onchange = function () {
    var c = document.getElementById("piano-keys");
    var ctx = c.getContext("2d");
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, c.width, c.height);
    drawPiano(notesRange.value, keyboardScale.value);
  };
  */
  /*

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
  */
  

  var gainRange = document.getElementById('gainRange');

  gainRange.onchange = function() {

    generator.gainValue(gainRange.value);

  };
  