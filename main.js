let activeButton;

let activities = [];

let isTimerActive = false;


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
const minutesInput = document.querySelector('.js-minutes');
const secondsInput = document.querySelector('.js-seconds');
let minutes;
let seconds;

// Current Activity Variables
const currentActivitySection = document.querySelector('#jsCurrentActivitySection');
const currentIntention = document.querySelector('.js-current-intention');
const countdownTimer = document.querySelector('.js-countdown-timer');
const startTimerButton = document.querySelector('.js-start-timer-button');
const logActivityButton = document.querySelector('.js-log-activity-button');
let currentActivity;
let timerInterval

// Past Activities Variables
const pastActivitiesList = document.querySelector('#jsPastActivitiesList');
const pastActivitiesPlaceHolder = document.querySelector('.js-past-activities-list-place-holder');

// Completed Activity Variables
const completedActivitySection = document.querySelector('.js-completed-activity-section');
const createNewActivityButton = document.querySelector('.js-create-new-activity-button');

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
logActivityButton.addEventListener('click', logActivity);

createNewActivityButton.addEventListener('click', showNewActivityForm);

window.addEventListener('load', checkForPastActivities);

function showNewActivityForm(event) {
  event.preventDefault();
  newActivityForm.classList.remove('hidden');
  completedActivitySection.classList.add('hidden');

  if (isStudySelected) {
    toggleStudy();
  } else if (isMeditateSelected) {
    toggleMeditate();
  } else if (isExerciseSelected) {
    toggleExercise();
  }

  activeButton = '';
  isTimerActive = false;
  intention.value = '';
  minutesInput.value = '';
  secondsInput.value = '';
}

function logActivity() {
  checkForPastActivities();
  currentActivity.saveToStorage();
  console.log(currentActivity, "current activity");
  // currentActivity = activities[activities.length -1];

  jsPastActivitiesList.innerHTML += `
  <div class="activity-card">
    <article class="activity-card-content">
      <p class="activity-category">${currentActivity.category}</p>
      <p class="activity-time">${currentActivity.minutes} MIN ${currentActivity.seconds} SECONDS</p>
      <p class="activity-description">${currentActivity.description}</p>
    </article>
    <div class="activity-card-marker" id="${currentActivity.category}"></div>
  </div>
  `

  let currentActivityCardMarker = document.getElementById(currentActivity.category);

  if (activeButton === "study") {
    currentActivityCardMarker.classList.add('activity-card-marker-study');
  } else if (activeButton === "meditate") {
    currentActivityCardMarker.classList.add('activity-card-marker-meditate');
  } else if (activeButton === "exercise") {
    currentActivityCardMarker.classList.add('activity-card-marker-exercise');
  }

  completedActivitySection.classList.remove('hidden');
  currentActivitySection.classList.add('hidden');
}

function startActivity(event) {
  event.preventDefault();
  addActivity();
  startTimerButton.innerText = "START";
  newActivityForm.classList.add('hidden');
  currentActivitySection.classList.remove('hidden');
  if (secondsInput.value < 10) {
    seconds = 0 + secondsInput.value
  } else {
    seconds = secondsInput.value;
  }
  if (minutesInput.value < 10) {
    minutes = 0 + minutesInput.value
  }
  countdownTimer.innerText = `${minutes}:${seconds}`;

  currentIntention.innerText = intention.value;

  if (activeButton === "study") {
    startTimerButton.classList.remove('exercise-border');
    startTimerButton.classList.remove('meditate-border');
    startTimerButton.classList.add('study-border');
  } else if (activeButton === "meditate") {
    startTimerButton.classList.remove('exercise-border');
    startTimerButton.classList.remove('study-border');
    startTimerButton.classList.add('meditate-border');
  } else if (activeButton === "exercise") {
    startTimerButton.classList.remove('study-border');
    startTimerButton.classList.remove('meditate-border');
    startTimerButton.classList.add('exercise-border');
  }
}

function addTimeListeners(input) {
  input.addEventListener("keydown", function(event) {validateMinutesAndSeconds(event)});
};

addTimeListeners(minutesInput);
addTimeListeners(secondsInput);


// Event Handlers

function validateMinutesAndSeconds(event) {
   var invalidChars = ["-", "e", "+", "E"];
    if (invalidChars.includes(event.key)) {
      event.preventDefault();
    }
}

var isStudySelected;
var isMeditateSelected;
var isExerciseSelected;

function changeColor(event) {
  event.preventDefault();

  isStudySelected = event.target.matches('.js-study-button') || event.target.matches('.js-study-icon-inactive') || event.target.matches('.js-study-icon-active');
  isMeditateSelected = event.target.matches('.js-meditate-button') || event.target.matches('.js-meditate-icon-inactive') || event.target.matches('.js-meditate-icon-active');
  isExerciseSelected = event.target.matches('.js-exercise-button') || event.target.matches('.js-exercise-icon-inactive') || event.target.matches('.js-exercise-icon-active');

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
  }

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
  currentActivity = new Activity(activeButton, intention.value, minutesInput.value, secondsInput.value, false, (Date.now() + Math.round(Math.random() * 10)));
  activities.push(currentActivity);
  // add event listener
  startTimerButton.addEventListener('click', currentActivity.countDown);
}

function checkForPastActivities() {
  activities = JSON.parse(localStorage.getItem("pastActivities"));
  if(!activities) {
    pastActivitiesPlaceHolder.classList.remove('hidden');
    activities = [];
    return;
  }

  for (var i = 0; i < activities.length; i++) {
    jsPastActivitiesList.innerHTML += `
    <div class="activity-card">
      <article class="activity-card-content">
        <p class="activity-category">${activities[i].category}</p>
        <p class="activity-time">${activities[i].minutes} MIN ${activities[i].seconds} SECONDS</p>
        <p class="activity-description">${activities[i].description}</p>
      </article>
      <div class="activity-card-marker" id="${activities[i].category}"></div>
    </div>
    `

    let currentActivityCardMarker = document.getElementById(activities[i].category);

    if (activeButton === "study") {
      currentActivityCardMarker.classList.add('activity-card-marker-study');
    } else if (activeButton === "meditate") {
      currentActivityCardMarker.classList.add('activity-card-marker-meditate');
    } else if (activeButton === "exercise") {
      currentActivityCardMarker.classList.add('activity-card-marker-exercise');
    }
  }
  pastActivitiesPlaceHolder.classList.add('hidden');
};

// Helper Functions
