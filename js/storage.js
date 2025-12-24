const STORAGE_KEY = "study-progress";

function getProgress() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
}

function toggleItem(id) {
  const progress = getProgress();
  progress[id] = !progress[id];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}
