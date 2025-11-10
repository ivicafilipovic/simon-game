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
