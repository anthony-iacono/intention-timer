// Variables
const studyButton = document.querySelector('.js-study-button');
const studyIconInactive = document.querySelector('.js-study-icon-inactive');
const studyIconActive = document.querySelector('.js-study-icon-active');
const meditateButton = document.querySelector('.js-meditate-button');
const meditateIconInactive = document.querySelector('.js-meditate-icon-inactive');
const meditateIconActive = document.querySelector('.js-meditate-icon-active');
const exerciseButton = document.querySelector('.js-exercise-button');
const exerciseIconInactive = document.querySelector('.js-exercise-icon-inactive');
const exerciseIconActive = document.querySelector('.js-exercise-icon-active');


///////////////////

var pastActivitiesSection = document.querySelector('section');
var startActivityButton = document.querySelector('.js-start-activity-button');
var intention = document.querySelector('.js-intention');
var inputs = document.querySelectorAll('.input');
var errors = document.querySelectorAll('.js-error-message');
var minutes = document.querySelector('.js-minutes');
var seconds = document.querySelector('.js-seconds');

var startTimerButton = document.querySelector('.js-start-timer-button');
var timerSection = document.querySelector('.js-current-activity-section');
var countdownTimer = document.querySelector('.js-countdown-timer');

// Event Listeners
studyButton.addEventListener('click', function(event) {
  changeColor(event);
});
meditateButton.addEventListener('click', function(event) {
  changeColor(event);
});
exerciseButton.addEventListener('click', function(event) {
  changeColor(event);
});

///////////////////

// newActivityFormX.addEventListener('click', function(event) {
//   event.preventDefault();
//   if (event.target.classList.contains('js-activity-button')) {
//     changeColor();
//   } else if (event.target.classList.contains('js-start-activity-button')) {
//     addActivity();
//     document.querySelector('form').classList.add('hidden');
//     document.querySelector('.js-current-activity-section').classList.remove('hidden');
//     // let seconds = seconds.value;
//     countdownTimer.innerText = `${minutes.value}:${seconds.value}`;
//     seconds = seconds < 10 ? '0' + seconds : seconds;
//
//   //if select catergory, this:
//     if (activeButton === "study") {
//       startTimerButton.classList.add('study-border');
//     } else if (activeButton === "meditate") {
//       startTimerButton.classList.add('meditate-border');
//     } else if (activeButton === "exercise") {
//       startTimerButton.classList.add('exercise-border');
//     }
//   }
// })

function addTimeListeners(input) {
  input.addEventListener("keydown", function(event) {
    var invalidChars = ["-", "e", "+", "E"];
    if (invalidChars.includes(event.key)) {
      event.preventDefault();
    }
  })
};

addTimeListeners(minutes);
addTimeListeners(seconds);

startActivityButton.addEventListener('click', function(event) {
  checkInput(event);
});

timerSection.addEventListener('click', function(event) {
  if (event.target.classList.contains('js-start-timer-button'))
    startCountdown();
})

// Event Handlers
function changeColor() {
  event.preventDefault();
  if (event.target.matches('.js-study-button') || event.target.matches('.js-study-icon-inactive') || event.target.matches('.js-study-icon-active')) {
    activeButton = 'study';
    studyButton.classList.toggle('study-button-active');
    studyIconInactive.classList.toggle('hidden');
    studyIconActive.classList.toggle('hidden');
  } else if (event.target.matches('.js-meditate-button') || event.target.matches('.js-meditate-icon-inactive') || event.target.matches('.js-meditate-icon-active')) {
    activeButton = 'meditate';
    meditateButton.classList.toggle('meditate-button-active');
    meditateIconInactive.classList.toggle('hidden');
    meditateIconActive.classList.toggle('hidden');
  } else if (event.target.matches('.js-exercise-button') || event.target.matches('.js-exercise-icon-inactive') || event.target.matches('.js-exercise-icon-active')) {
    activeButton = 'exercise';
    exerciseButton.classList.toggle('exercise-button-active');
    exerciseIconInactive.classList.toggle('hidden');
    exerciseIconActive.classList.toggle('hidden');
  }
};

function checkInput(event) {
  event.preventDefault()
  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].value === "") {
      errors[i].classList.remove('hidden');
    }
  }
}

function addActivity() {
  let activity = new Activity(activeButton, intention.value, minutes.value, seconds.value, false, (Date.now() + Math.round(Math.random() * 10)));
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

// Helper Functions
