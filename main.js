// Variables
const categoryError = document.querySelector('.js-category-error-message');
const completedActivitySection = document.querySelector('.js-completed-activity-section');
const countdownTimer = document.querySelector('.js-countdown-timer');
const currentActivitySection = document.querySelector('#jsCurrentActivitySection');
const currentDescription = document.querySelector('.js-current-description');
const createNewActivityButton = document.querySelector('.js-create-new-activity-button');
const description = document.querySelector('.js-description');
const errors = document.querySelectorAll('.js-error-message');
const exerciseButton = document.querySelector('.js-exercise-button');
const exerciseIconActive = document.querySelector('.js-exercise-icon-active');
const exerciseIconInactive = document.querySelector('.js-exercise-icon-inactive');
const inputs = document.querySelectorAll('.js-input');
const logActivityButton = document.querySelector('.js-log-activity-button');
const meditateButton = document.querySelector('.js-meditate-button');
const meditateIconActive = document.querySelector('.js-meditate-icon-active');
const meditateIconInactive = document.querySelector('.js-meditate-icon-inactive');
const minutesInput = document.querySelector('.js-minutes');
const newActivityForm = document.querySelector('.js-new-activity-form');
const pastActivitiesList = document.querySelector('.js-past-activities-list');
const pastActivitiesPlaceholder = document.querySelector('.js-past-activities-placeholder');
const secondsInput = document.querySelector('.js-seconds');
const startActivityButton = document.querySelector('.js-start-activity-button');
const startTimerButton = document.querySelector('.js-start-timer-button');
const studyButton = document.querySelector('.js-study-button');
const studyIconActive = document.querySelector('.js-study-icon-active');
const studyIconInactive = document.querySelector('.js-study-icon-inactive');
let activeButton;
let activities = [];
let currentActivity;
let currentActivityCardMarker;
let isTimerActive = false;
let minutes;
let seconds;
let throwsError = false;
let timerInterval

// Event Listeners
createNewActivityButton.addEventListener('click', showNewActivityForm);
exerciseButton.addEventListener('click', function(event) {changeColor(event)});
logActivityButton.addEventListener('click', logActivity);
meditateButton.addEventListener('click', function(event) {changeColor(event)});
startActivityButton.addEventListener('click', function(event) {
  checkInput(event)
});
studyButton.addEventListener('click', function(event) {changeColor(event)});

window.onload = checkForPastActivities;

function addActivity() {
  currentActivity = new Activity(activeButton, description.value, minutesInput.value, secondsInput.value, false);
  activities.push(currentActivity);
  startTimerButton.addEventListener('click', currentActivity.countDown);
}

function checkForEmptyInput() {
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value === "") {
      errors[i].classList.remove('hidden');
      throwsError = true;
    }
  }
}

function checkForPastActivities() {
  activities = JSON.parse(localStorage.getItem("pastActivities"));
  if(!activities) {
    pastActivitiesPlaceholder.classList.remove('hidden');
    activities = [];
    return;
  }

  pastActivitiesPlaceholder.classList.add('hidden');
  pastActivitiesList.innerHTML = '';
  renderPastActivitiesList();
}

function clearActivity() {
  studyIconInactive.classList.remove('hidden');
  studyIconActive.classList.add('hidden');
  studyButton.classList.remove('study-button-active');
  exerciseIconInactive.classList.remove('hidden');
  exerciseIconActive.classList.add('hidden');
  exerciseButton.classList.remove('exercise-button-active');
  meditateIconInactive.classList.remove('hidden');
  meditateIconActive.classList.add('hidden');
  meditateButton.classList.remove('meditate-button-active');
}

function logActivity() {
  currentActivity.saveToStorage();
  checkForPastActivities();
  completedActivitySection.classList.remove('hidden');
  currentActivitySection.classList.add('hidden');
  logActivityButton.classList.add('hidden');
}

function startActivity(event) {
  event.preventDefault();
  addActivity();
  startTimerButton.innerText = "START";
  newActivityForm.classList.add('hidden');
  currentActivitySection.classList.remove('hidden');
  formatTimerDisplay();
  countdownTimer.innerText = `${minutes}:${seconds}`;
  currentDescription.innerText = description.value;
  applyBorderColor();
}

function formatTimerDisplay() {
  if (secondsInput.value < 10) {
    seconds = 0 + secondsInput.value;
  } else {
    seconds = secondsInput.value;
  }

  if (minutesInput.value < 10) {
    minutes = 0 + minutesInput.value;
  }
}

function applyBorderColor() {
  if (activeButton === "study") {
    showStudyBorder();
  } else if (activeButton === "meditate") {
    showMeditateBorder();
  } else if (activeButton === "exercise") {
    showExerciseBorder();
  }
}

function showStudyBorder() {
  startTimerButton.classList.remove('exercise-border');
  startTimerButton.classList.remove('meditate-border');
  startTimerButton.classList.add('study-border');
}

function showMeditateBorder() {
  startTimerButton.classList.remove('exercise-border');
  startTimerButton.classList.remove('study-border');
  startTimerButton.classList.add('meditate-border');
}

function showExerciseBorder() {
  startTimerButton.classList.remove('study-border');
  startTimerButton.classList.remove('meditate-border');
  startTimerButton.classList.add('exercise-border');
}

function addTimeListeners(input) {
  input.addEventListener("keydown", function(event) {validateMinutesAndSeconds(event)});
}

addTimeListeners(minutesInput);
addTimeListeners(secondsInput);


// Event Handlers

function validateMinutesAndSeconds(event) {
   const invalidChars = ["-", "e", "+", "E"];
    if (invalidChars.includes(event.key)) {
      event.preventDefault();
    }
}

let isStudySelected;
let isMeditateSelected;
let isExerciseSelected;

function changeColor(event) {
  event.preventDefault();
  isActivitySelected();
  if (isStudySelected) {
    handleStudySelection();
  } else if (isMeditateSelected) {
    handleMeditateSelection();
  } else if (isExerciseSelected) {
    handleExerciseSelection();
  }
}

function isActivitySelected() {
  isStudySelected = event.target.matches('.js-study-button')
    || event.target.matches('.js-study-icon-inactive')
    || event.target.matches('.js-study-icon-active');
  isMeditateSelected = event.target.matches('.js-meditate-button')
    || event.target.matches('.js-meditate-icon-inactive')
    || event.target.matches('.js-meditate-icon-active');
  isExerciseSelected = event.target.matches('.js-exercise-button')
    || event.target.matches('.js-exercise-icon-inactive')
    || event.target.matches('.js-exercise-icon-active');
}

function handleStudySelection() {
  if (activeButton === "meditate") {
    toggleMeditate();
  }

  if (activeButton === "exercise") {
    toggleExercise();
  }

  activeButton = "study";
  toggleStudy();
}

function handleMeditateSelection() {
  if (activeButton === "study") {
    toggleStudy();
  }

  if (activeButton === "exercise") {
    toggleExercise();
  }

  activeButton = 'meditate';
  toggleMeditate();
}

function handleExerciseSelection() {
  if (activeButton === "study") {
    toggleStudy();
  }

  if (activeButton === "meditate") {
    toggleMeditate();
  }

  activeButton = 'exercise';
  toggleExercise();
}

function showNewActivityForm() {
  newActivityForm.classList.remove('hidden');
  completedActivitySection.classList.add('hidden');
  resetNewActivityForm();
}

function toggleStudy() {
  studyButton.classList.toggle('study-button-active');
  studyIconInactive.classList.toggle('hidden');
  studyIconActive.classList.toggle('hidden');
}

function toggleMeditate() {
  meditateButton.classList.toggle('meditate-button-active');
  meditateIconInactive.classList.toggle('hidden');
  meditateIconActive.classList.toggle('hidden');
}

function toggleExercise() {
  exerciseButton.classList.toggle('exercise-button-active');
  exerciseIconInactive.classList.toggle('hidden');
  exerciseIconActive.classList.toggle('hidden');
}

function checkInput(event) {
  event.preventDefault();
  if (!activeButton) {
    categoryError.classList.remove('hidden');
  }

  checkForEmptyInput();

  if (!throwsError) {
    startActivity(event);
  }
}

function renderPastActivitiesList() {
  for (let i = 0; i < activities.length; i++) {
    pastActivitiesList.innerHTML += `
    <div class="activity-card">
      <article class="activity-card-content">
        <p class="activity-category">${activities[i].category}</p>
        <p class="activity-time">${activities[i].minutes} MIN ${activities[i].seconds} SECONDS</p>
        <p class="activity-description">${activities[i].description}</p>
      </article>
      <div class="activity-card-marker activity-card-marker-${activities[i].category}" id="${activities[i].category}"></div>
    </div>
    `;

    currentActivityCardMarker = document.getElementById(activities[i].category);
  }
}

function resetNewActivityForm() {
  activeButton = '';
  isTimerActive = false;
  description.value = '';
  minutesInput.value = '';
  secondsInput.value = '';
  clearActivity();
}
