const STORAGE_KEY = "study-progress";

function getProgress() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
}

function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

