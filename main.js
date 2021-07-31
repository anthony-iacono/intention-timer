// Variables
var newActivityForm = document.querySelector('form');
var pastActivitiesSection = document.querySelector('section');

var numberInput = document.querySelectorAll('.js-input-number');
var startActivityButton = document.querySelector('.js-start-activity-button');
var intentionTextInput = document.querySelector('.js-input-text');
var textWarningMessage = document.querySelectorAll('.js-text-warning-message');
var inputs = document.querySelectorAll('.input-box');
var warnings = document.querySelectorAll('.js-warning-message');
var minutes = document.querySelector('.js-minutes');
var seconds = document.querySelector('.js-seconds');

var startTimerButton = document.querySelector('.js-start-timer-button');
var timerSection = document.querySelector('.js-timer-section');
var countdownTimer = document.querySelector('.js-countdown-timer');
var activeButton

// Event Listeners
newActivityForm.addEventListener('click', function(event) {
  event.preventDefault();
  if (event.target.classList.contains('js-activity-button')) {
    changeColor();
  } else if (event.target.classList.contains('js-start-activity-button')) {
    addActivity();
    document.querySelector('form').classList.add('hidden');
    document.querySelector('.js-timer-section').classList.remove('hidden');
    // let seconds = seconds.value;
    countdownTimer.innerText = `${minutes.value}:${seconds.value}`;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    
  //if select catergory, this:
    if (activeButton === "study") {
      startTimerButton.classList.add('study-border');
    } else if (activeButton === "meditate") {
      startTimerButton.classList.add('meditate-border');
    } else if (activeButton === "exercise") {
      startTimerButton.classList.add('exercise-border');
    }
  }
})

numberInput.forEach(addNumberListeners)
function addNumberListeners(input) {
  input.addEventListener("keydown", function(event) {
    var invalidChars = ["-", "e", "+", "E"];
    if (invalidChars.includes(event.key)) {
      event.preventDefault();
    }
  })
};

startActivityButton.addEventListener('click', function(event){
  checkInput(event);
});

timerSection.addEventListener('click', function(event) {
  if (event.target.classList.contains('js-start-timer-button'))
    startCountdown();
})

//Event Handlers
function changeColor() {
  if (event.target.classList.contains('js-study-button')) {
    document.querySelectorAll('.js-study-image').forEach(
      icon => icon.classList.toggle('hidden')
    );
    document.querySelector('.js-study-button').classList.toggle('study-active-button');
    activeButton = 'study';
  } else if (event.target.classList.contains('js-meditate-button')) {
    document.querySelectorAll('.js-meditate-image').forEach(
      icon => icon.classList.toggle('hidden')
    );
    document.querySelector('.js-meditate-button').classList.toggle('meditate-active-button');
    activeButton = 'meditate';
  } else if (event.target.classList.contains('js-exercise-button')) {
    document.querySelectorAll('.js-exercise-image').forEach(
      icon => icon.classList.toggle('hidden')
    );
    document.querySelector('.js-exercise-button').classList.toggle('exercise-active-button');
    activeButton = 'exercise';
  }
};

function checkInput(event) {
  event.preventDefault()
  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].value === "") {
      warnings[i].classList.remove('hidden');
    }
  }
}

function addActivity() {
  let activity = new Activity(activeButton, intentionTextInput.value, minutes.value, seconds.value, false, (Date.now() + Math.round(Math.random() * 10)));
  activities.push(activity);
}

// Countdown Timer
function startCountdown() {
  setInterval(updateCountdown, 1000);
  let startingMinutes = minutes.value;
  let startingSeconds = seconds.value
  let time = parseInt(startingMinutes * 60) + parseInt(startingSeconds);

  function updateCountdown() {
    if (time < 0) {
      return;
    }

    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    seconds = seconds < 10 ? '0' + seconds : seconds;

    countdownTimer.innerHTML = `${minutes}:${seconds}`;
    time--;
  }
}
