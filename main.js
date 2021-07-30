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

// Event Listeners
newActivityForm.addEventListener('click', function(event) {
  event.preventDefault();
  if (event.target.classList.contains('js-activity-button')) {
    changeColor();
  } else if (event.target.classList.contains('js-start-activity-button')) {
    addActivity();
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
      warnings[i].classList.remove('hidden');activeButton = 'study';
    }
  }
}

function addActivity() {
  console.log(minutes, seconds)
  let activity = new Activity(activeButton, intentionTextInput.value, minutes.value, seconds.value, false, (Date.now() + Math.round(Math.random() * 10)));
  // constructor(category, description, minutes, seconds, completed, id)

  activities.push(activity)
}
