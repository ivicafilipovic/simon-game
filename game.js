var level = 0;
var started = false;
var userClickedPattern = []; // Um später die Farben beim klicken zu pushen.
var gamePattern = [];
var buttonColours = ['red', 'blue', 'green', 'yellow'];

//Wenn Taste gedrückt wird, startet das Spiel
$(document).on('keydown touchstart', function () {
  if (!started) {
    var unlock = new Audio('./sounds/green.mp3');
    unlock.volume = 0;
    unlock.play().catch(() => {});
    // damit das Spiel nur einmal auf Keydown oder Bildschirm Touch reagiert
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
  level++; // Level erhöhen ABER FUNKTIONIERT NICHT!!
  $('#level-title').text('Level  ' + level);

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[randomNumber];

  // Zufällige Farbe generiert
  gamePattern.push(randomChosenColour); // Eine zufällige Farbe auswählen zwischen 0-4 (red bis yellow)

  //Animation für Farben
  $('#' + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);
  SimonClick(randomChosenColour);
}

// Function für Sound und Blinken, wenn Button geklickt wird
$('.btn').on('pointerdown', function (event) {
  //! Pointerdown um Doppelfeuer zu verhindern//
  event.preventDefault();
  var userChosenColour = $(this).attr('id'); // This um auf Attr, ID zugreifen
  userClickedPattern.push(userChosenColour); // Hier den Push vor Sound erstellen ansonsten funktioniert es nicht
  SimonClick(userChosenColour);
  $('#' + userChosenColour) //  Animation der Clickfunction einfügen
    .fadeOut(100)
    .fadeIn(100);
  animatePressed(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function SimonClick(userChosenColour) {
  // Variable in die Function übergeben
  switch (
    userChosenColour // Switch einschalten mit Variable für Ton
  ) {
    case 'green':
      var greenSound = new Audio('./sounds/green.mp3');
      greenSound.play();
      break;

    case 'red':
      var redSound = new Audio('./sounds/red.mp3');
      redSound.play();

      break;

    case 'yellow':
      var yellowSound = new Audio('./sounds/yellow.mp3');
      yellowSound.play();
      break;

    case 'blue':
      var blueSound = new Audio('./sounds/blue.mp3');
      blueSound.play();
      break;

    default:
      var wrongSound = new Audio('./sounds/wrong.mp3');
      wrongSound.play(); // bei falschen Tastendruck  wird dieser Ton abgespielt
      break;
  }
  var wrongSound = new Audio('./sounds/wrong.mp3');
  wrongSound.play();
}
function animatePressed(currentColour) {
  $('#' + currentColour).addClass('pressed');
  // Klasse von Css hinzugefügt damit wenn Button gedrückt grau aufleuchtet

  // Klasse von Css entfernen damit wenn Button gedrückt mit einem Timeout
  setTimeout(function () {
    $('#' + currentColour).removeClass('pressed');
  }, 100);
}

//Wenn die Sequenz eingegeben wird -> nächstes Level
function checkAnswer(currentIndex) {
  if (gamePattern[currentIndex] === userClickedPattern[currentIndex]) {
    // Wenn die ganze Sequenz eingegen wird -> nächstes Level
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    // Fehler  -
    // -> Gamer Over
    console.log('Play wrong', performance.now());
    SimonClick('wrong');
    wrongSound.addEventListener('play', () => {
      console.log('Sound actually playing', performance.now());
    });
    $('body').addClass('game-over');
    $('#level-title').text('Game Over, Press Any Key to Restart');

    setTimeout(function () {
      $('body').removeClass('game-over');
    }, 400);

    //Hier aufrufen
    startOver();
  }
}

// Ausserhalb von der Function damit es eine Globale Function wird und auch aus
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

//! Damit während mobile Ansicht TAP TO START steht
$(document).ready(function () {
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  if (isTouch) {
    $('#level-title').text('Tap To Start');
  } else {
    $('#level-title').text('Press A Key to Start');
  }
});
