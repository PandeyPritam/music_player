const songs = [
  {
    title: "Song One",
    artist: "Artist A",
    src: "assets/audio/song1.mp3"
  },
  {
    title: "Song Two",
    artist: "Artist B",
    src: "assets/audio/song2.mp3"
  }
];

let currentSong = 0;

const audio = document.getElementById('audio');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const progress = document.getElementById('progress');
const currentTime = document.getElementById('current-time');
const duration = document.getElementById('duration');
const volume = document.getElementById('volume');

// Load Song
function loadSong(index) {
  const song = songs[index];
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.src;
}

loadSong(currentSong);

// Play/Pause
let isPlaying = false;

function playSong() {
  audio.play();
  playBtn.textContent = "⏸️";
  isPlaying = true;
}

function pauseSong() {
  audio.pause();
  playBtn.textContent = "▶️";
  isPlaying = false;
}

playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

// Next/Prev
nextBtn.addEventListener("click", () => {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(currentSong);
  playSong();
});

prevBtn.addEventListener("click", () => {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
  playSong();
});

// Progress Bar
audio.addEventListener("timeupdate", () => {
  const { currentTime: curr, duration: dur } = audio;
  progress.value = (curr / dur) * 100;

  currentTime.textContent = formatTime(curr);
  duration.textContent = formatTime(dur);
});

progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

// Format Time
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

// Volume Control
volume.addEventListener("input", () => {
  audio.volume = volume.value;
});
