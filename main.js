// New Activity Variables
const newActivityForm = document.querySelector('#jsNewActivityForm');
const studyButton = document.querySelector('.js-study-button');
const studyIconInactive = document.querySelector('.js-study-icon-inactive');
const studyIconActive = document.querySelector('.js-study-icon-active');
const meditateButton = document.querySelector('.js-meditate-button');
const meditateIconInactive = document.querySelector('.js-meditate-icon-inactive');
const meditateIconActive = document.querySelector('.js-meditate-icon-active');
const exerciseButton = document.querySelector('.js-exercise-button');
const exerciseIconInactive = document.querySelector('.js-exercise-icon-inactive');
const exerciseIconActive = document.querySelector('.js-exercise-icon-active');
const startActivityButton = document.querySelector('.js-start-activity-button');
const inputs = document.querySelectorAll('.js-input');
const errors = document.querySelectorAll('.js-error-message');
const intention = document.querySelector('.js-intention');
const minutes = document.querySelector('.js-minutes');
let seconds = document.querySelector('.js-seconds');

// Current Activity Variables
const currentActivitySection = document.querySelector('#jsCurrentActivitySection');
const currentIntention = document.querySelector('.js-current-intention');
const countdownTimer = document.querySelector('.js-countdown-timer');
const startTimerButton = document.querySelector('.js-start-timer-button');

// Past Activities Variables
const pastActivitiesSection = document.querySelector('#pastActivitiesSection');

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
startActivityButton.addEventListener('click', function(event) {
  checkInput(event);
});

function startActivity(event) {
  event.preventDefault();
  addActivity();
  newActivityForm.classList.add('hidden');
  currentActivitySection.classList.remove('hidden');
  if (seconds.value < 10) {
    countdownTimer.innerText = `${minutes.value}:0${seconds.value}`;
  } else {
    countdownTimer.innerText = `${minutes.value}:${seconds.value}`;
  }

  currentIntention.innerText = intention.value;

  if (activeButton === "study") {
    startTimerButton.classList.add('study-border');
  } else if (activeButton === "meditate") {
    startTimerButton.classList.add('meditate-border');
  } else if (activeButton === "exercise") {
    startTimerButton.classList.add('exercise-border');
  }
}

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

startTimerButton.addEventListener('click', startCountdown);

// Event Handlers
function changeColor(event) {
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
  var throwsError = false;
  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].value === "") {
      errors[i].classList.remove('hidden');
      throwsError = true;
    } 
  }
  //true means error
  if(!throwsError) {
    startActivity();
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
  let startingSeconds = seconds.value;
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
