let stopwatch;
let isRunning = false;
let lapCounter = 1;
let lapTimes = [];
let isStopwatchMode = true;
let customLapDisplay = '';

// Add function to toggle between stopwatch and countdown timer modes
function toggleMode() {
    if (isRunning) {
        alert("Please stop the stopwatch before changing modes.");
        return;
    }

    isStopwatchMode = !isStopwatchMode;
    const modeButton = document.querySelectorAll('#controls button')[3];
    modeButton.innerText = isStopwatchMode ? 'Stopwatch' : 'Countdown Timer';
    reset(); // Reset the stopwatch/timer when mode changes
}

// Add function to set custom lap display
function setCustomLapDisplay() {
    customLapDisplay = document.getElementById('customLapDisplay').value;
    document.getElementById('customLapDisplay').value = '';
}

// Modify lap function to handle custom lap display
function lap() {
    if (isRunning) {
        const lapTime = document.getElementById('stopwatch').innerText;
        const displayText = customLapDisplay !== '' ? customLapDisplay : `Lap ${lapCounter}`;
        lapTimes.push(`${displayText}: ${lapTime}`);
        lapCounter++;
        updateLapTimes();
    }
}

// Add function to play alert sound
function playAlertSound() {
    const alertSound = document.getElementById('alertSound');
    alertSound.play();
}

// Modify reset function to stop alert sound
function reset() {
    clearInterval(stopwatch);
    isRunning = false;
    document.querySelector('button').innerText = 'Start';
    document.getElementById('stopwatch').innerText = '00:00:00';
    lapCounter = 1;
    lapTimes = [];
    updateLapTimes();
    stopAlertSound();
}

// Add function to stop alert sound
function stopAlertSound() {
    const alertSound = document.getElementById('alertSound');
    alertSound.pause();
    alertSound.currentTime = 0;
}

// Modify updateTime function to handle sound alerts
function updateTime() {
    const stopwatchElement = document.getElementById('stopwatch');
    const time = stopwatchElement.innerText.split(':');
    let hours = parseInt(time[0]);
    let minutes = parseInt(time[1]);
    let seconds = parseInt(time[2]);

    if (isStopwatchMode) {
        seconds++;

        if (seconds === 60) {
            seconds = 0;
            minutes++;

            if (minutes === 60) {
                minutes = 0;
                hours++;
            }
        }
    } else {
        if (seconds === 0 && minutes === 0 && hours === 0) {
            clearInterval(stopwatch);
            isRunning = false;
            alert("Countdown timer has ended!");
            playAlertSound();
            reset();
            return;
        }

        if (seconds === 0) {
            seconds = 59;

            if (minutes > 0) {
                minutes--;

                if (minutes === 0 && hours > 0) {
                    hours--;
                }
            }
        } else {
            seconds--;
        }
    }

    stopwatchElement.innerText =
        (hours < 10 ? '0' + hours : hours) + ':' +
        (minutes < 10 ? '0' + minutes : minutes) + ':' +
        (seconds < 10 ? '0' + seconds : seconds);

    // Play alert sound when timer reaches 00:00:00
    if (isStopwatchMode && hours === 0 && minutes === 0 && seconds === 0) {
        playAlertSound();
    }
}

// Add function to update lap times
function updateLapTimes() {
    const lapTimesElement = document.getElementById('lapTimes');
    lapTimesElement.innerHTML = lapTimes.join('<br>');
}

// Add event listener for custom lap display input
document.getElementById('customLapDisplay').addEventListener('change', setCustomLapDisplay);
