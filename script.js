let timer; // To hold the setInterval reference
let isRunning = false;
let startTime;
let elapsedTime = 0;
let laps = [];

function formatTime(milliseconds) {
  const date = new Date(milliseconds);
  return date.toISOString().substr(11, 12);
}

function displayTime() {
  document.getElementById('display').textContent = formatTime(elapsedTime);
}

function startStop() {
  const startStopButton = document.getElementById('startStop');
  const lapResetButton = document.getElementById('lapReset');

  if (isRunning) {
    clearInterval(timer);
    startStopButton.textContent = 'Start';
    lapResetButton.textContent = 'Reset';
    isRunning = false;
  } else {
    startTime = Date.now() - elapsedTime;
    timer = setInterval(function () {
      elapsedTime = Date.now() - startTime;
      displayTime();
    }, 10);
    startStopButton.textContent = 'Pause';
    lapResetButton.textContent = 'Interval';
    isRunning = true;
  }
}

function lapReset() {
  const startStopButton = document.getElementById('startStop');
  const lapResetButton = document.getElementById('lapReset');

  if (isRunning) {
    // Add lap time
    laps.push(formatTime(elapsedTime));

    // Display lap times
    const lapsList = document.getElementById('lapsList');
    const lapItem = document.createElement('li');
    lapItem.textContent = laps[laps.length - 1];
    lapsList.appendChild(lapItem);
  } else {
    // Reset the stopwatch
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    laps = [];
    displayTime();
    startStopButton.textContent = 'Start';
    lapResetButton.textContent = 'Reset';
    document.getElementById('lapsList').innerHTML = '';
  }
}

// Event listeners for buttons
document.getElementById('startStop').addEventListener('click', startStop);
document.getElementById('lapReset').addEventListener('click', lapReset);
