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
const categoryError = document.querySelector('.js-category-error-message');
const intention = document.querySelector('.js-intention');
let minutes = document.querySelector('.js-minutes');
let seconds = document.querySelector('.js-seconds');

// Current Activity Variables
const currentActivitySection = document.querySelector('#jsCurrentActivitySection');
const currentIntention = document.querySelector('.js-current-intention');
const countdownTimer = document.querySelector('.js-countdown-timer');
const startTimerButton = document.querySelector('.js-start-timer-button');

// Past Activities Variables
const pastActivitiesSection = document.querySelector('#pastActivitiesBox');

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
    seconds = 0 + seconds.value
  }
  if (minutes.value < 10) {
    minutes = 0 + minutes.value
  }
  countdownTimer.innerText = `${minutes}:${seconds}`;

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

  var isStudySelected = event.target.matches('.js-study-button') || event.target.matches('.js-study-icon-inactive') || event.target.matches('.js-study-icon-active');
  var isMeditateSelected = event.target.matches('.js-meditate-button') || event.target.matches('.js-meditate-icon-inactive') || event.target.matches('.js-meditate-icon-active');
  var isExerciseSelected = event.target.matches('.js-exercise-button') || event.target.matches('.js-exercise-icon-inactive') || event.target.matches('.js-exercise-icon-active');

  if (isStudySelected) {
    handleStudySelection();
  } else if (isMeditateSelected) {
    handleMeditateSelection();
  } else if (isExerciseSelected) {
    handleExerciseSelection();
  }
};

function handleStudySelection() {
  if (activeButton === "meditate") {
    toggleMeditate();
  }
  if (activeButton === "exercise") {
    toggleExercise();
  }

  activeButton = "study";
  toggleStudy();
};

function handleMeditateSelection() {
  if (activeButton === "study") {
    toggleStudy();
  }
  if (activeButton === "exercise") {
    toggleExercise();
  }

  activeButton = 'meditate';
  toggleMeditate();
};

function handleExerciseSelection() {
  if (activeButton === "study") {
    toggleStudy();
  }
  if (activeButton === "meditate") {
    toggleMeditate();
  }

  activeButton = 'exercise';
  toggleExercise();
};

function toggleStudy() {
  studyButton.classList.toggle('study-button-active');
  studyIconInactive.classList.toggle('hidden');
  studyIconActive.classList.toggle('hidden');
};

function toggleMeditate() {
  meditateButton.classList.toggle('meditate-button-active');
  meditateIconInactive.classList.toggle('hidden');
  meditateIconActive.classList.toggle('hidden');
};

function toggleExercise() {
  exerciseButton.classList.toggle('exercise-button-active');
  exerciseIconInactive.classList.toggle('hidden');
  exerciseIconActive.classList.toggle('hidden');
};


//create one function for each category (toggleStudy, toggleMeditate, toggleExercise....do not need to pass event)

function checkInput(event) {
  event.preventDefault()
  var throwsError = false;
  if (!activeButton) {
    categoryError.classList.remove('hidden');
    //throw error message but also move onto loop for addtl errors
  }
  // active button not asigned (falsy) to anything OR if the following if "", throw error
  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].value === "") {
      errors[i].classList.remove('hidden');
      throwsError = true;
    }
  }

  if (!throwsError) {
    startActivity(event);
  }
}

function addActivity() {
  let activity = new Activity(activeButton, intention.value, minutes.value, seconds.value, false, (Date.now() + Math.round(Math.random() * 10)));
  activities.push(activity);
}

// Countdown Timer
// REFACTOR: PREVENT START BUTTON FROM BEING CLICKED MORE THAN ONCE
// ADJUST START DELAY TIME (COUNT IN SECONDS FOR ALL NUMBERS 9 AND 2)
function startCountdown() {
  let timerInterval = setInterval(updateCountdown, 1000);

  let time = parseInt(minutes * 60) + parseInt(seconds);

  function updateCountdown() {

    if (time < 0) {
      countdownTimer.innerText = "00:00";
      alert("Times up! Activity completed.");
      clearInterval(timerInterval);
      return;
    }

    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    countdownTimer.innerHTML = `${minutes}:${seconds}`;
    time--;
  }
}

// Helper Functions
