if (audioUnlocked) return;
Object.values(sounds).forEach((sound) => {
  sound.muted = true; //! Started stumm
  sound.play().catch(() => {});
  sound.pause();
  sound.currentTime = 0;
  sound.muted = false; //! Wieder hörbar
});
audioUnlocked = true;
console.log('Audio unlocked');

let audioUnlocked = false;
let audioCtx;
//**Globale Sound Vorladen */

//* Keine Verzögerung beim Ton abspielen
function unLockAudio() {
  if (audioUnlocked) return; //! Falls audioUnlock in einer Function aufgerufen wird dann,
  try {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)(); //! Erstellt Audio Engine im Browser, WEBKIT für ältere SafariBrowser al Fallback
    const buffer = audioCtx.createBuffer(1, 1, 22050); //! nur einen Frame lang damit unhörbar
    const source = audioCtx.createBufferSource(); //! Erstellt Audio-Quelle = eine Art Player
    source.buffer = buffer; //! Verbindet Audio-Signal mit dem Player also Tonpuffer
    source.connect(audioCtx.destination); //! Verbindet Audio-Ausgang mit den "Lautsprechern"
    source.start(0);
    warmupSound();
    audioUnlocked = true;
    console.log('AudioContext unlocked');
  } catch (e) {
    console.warn('Audio unlock failed', e);
  }
}

unLockAudio();

function warmupSound() {
  Object.values(sounds).forEach((sound) => {
    sound.volume = 0;
    sound.play().catch(() => {});
    setTimeout(() => {
      sound.pause();
      sound.currentTime = 0;
      sound.volume = 1;
    }, 300);
  });
  console.log('Warmup completed');
}
