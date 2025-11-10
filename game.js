//**Globale Variablen Vorladen*/
let level = 0;
let started = false;
let userClickedPattern = []; // Um später die Farben beim klicken zu pushen.
let gamePattern = [];
const buttonColours = ['red', 'blue', 'green', 'yellow'];
let audioUnlocked = false;
let audioCtx;
//**Globale Sound Vorladen */
const sounds = {
  green: new Audio('./sounds/green.mp3'),
  red: new Audio('./sounds/red.mp3'),
  yellow: new Audio('./sounds/yellow.mp3'),
  blue: new Audio('./sounds/blue.mp3'),
  wrong: new Audio('./sounds/wrong.mp3'),
};

//! Alles lautlos abspielen um zu caching zu aktivieren
function unLockAudio() {
  try {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const buffer = audioCtx.createBuffer(1, 1, 220500);
    const source = audioCtx.createBufferSource();
    SourceBuffer = buffer;
    source.connect(audioCtx.destination);
    source.start(0);
    audioUnlocked = true;
    console.log('AudioContext unlocked');
  } catch (e) {
    console.warn('Audio unlock failed', e);
  }
}
//*Wenn Taste gedrückt wird, startet das Spiel
$(document).on('keydown touchstart pointerdown', function () {
  unLockAudio();
  // damit das Spiel nur einmal auf Keydown oder Bildschirm Touch reagiert
  if (!started) {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    $('#level-title').text('Level  ' + level);
    nextSequence();
    started = true; // true = spiel hat begonnen
  }
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  $('#level-title').text('Level  ' + level);

  let randomNumber = Math.floor(Math.random() * 4);

  let randomChosenColour = buttonColours[randomNumber];

  //*Zufällige Farbe generiert und pushen
  gamePattern.push(randomChosenColour); // Eine zufällige Farbe auswählen zwischen 0-4 (red bis yellow)

  //*Animation für Farben
  $('#' + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);
  SimonClick(randomChosenColour);
}

//*Function für Sound und Blinken, wenn Button geklickt wird
$('.btn').on('pointerdown', function (event) {
  //! Pointerdown um Doppelfeuer zu verhindern//
  unLockAudio();
  event.preventDefault();
  let userChosenColour = $(this).attr('id'); // This um auf Attr, ID zugreifen
  userClickedPattern.push(userChosenColour); // Hier den Push vor Sound erstellen ansonsten funktioniert es nicht
  SimonClick(userChosenColour);
  $('#' + userChosenColour) //  Animation der Clickfunction einfügen
    .fadeOut(100)
    .fadeIn(100);
  animatePressed(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function SimonClick(userChosenColour) {
  if (sounds[userChosenColour]) {
    sounds[userChosenColour].currentTime = 0;
    sounds[userChosenColour].play();
  } else if (userChosenColour === 'wrong') {
    sounds.wrong.currentTime = 0;
    sounds.wrong.play();
  }
}

function animatePressed(currentColour) {
  $('#' + currentColour).addClass('pressed');
  //!Klasse von Css hinzugefügt damit wenn Button gedrückt grau aufleuchtet

  //!Klasse von Css entfernen damit wenn Button gedrückt mit einem Timeout
  setTimeout(function () {
    $('#' + currentColour).removeClass('pressed');
  }, 100);
}

//*Wenn die Sequenz eingegeben wird -> nächstes Level
function checkAnswer(currentIndex) {
  if (gamePattern[currentIndex] === userClickedPattern[currentIndex]) {
    // Wenn die ganze Sequenz eingegen wird -> nächstes Level
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    //!Fehler  -
    //*-> Gamer Over

    SimonClick('wrong');
    $('body').addClass('game-over');
    $('#level-title').text('Game Over, Press Any Key to Restart');

    setTimeout(function () {
      $('body').removeClass('game-over');
    }, 400);

    startOver();
  }
}

//*Ausserhalb von der Function damit es eine Globale Function wird und auch aus
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

//! Damit während mobile Ansicht TAP TO START steht
function updateStartText() {
  const isMobile = window.matchMedia('(max-width: 850px)').matches;
  //!Wenn Touch vorhanden oder Bildschirm klein

  if (isMobile) {
    $('#level-title').text('Tap To Start');
  } else {
    $('#level-title').text('Press A Key to Start');
  }
}

$(document).ready(function () {
  updateStartText(); //! Beim Laden prüfen
  $(window).on('resize orientationchange', function () {
    updateStartText();
  });
});
