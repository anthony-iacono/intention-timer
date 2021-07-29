// Variables
var studyButton = document.querySelector('.js-study-button');
var meditateButton = document.querySelector('.js-meditate-button');
var exerciseButton = document.querySelector('.js-exercise-button');
// var activityButtons = document.querySelector('.js-activity-buttons');
var meditateActiveImage = document.querySelector('.js-meditate-active-image');
var meditateInactiveImage = document.querySelector('.js-meditate-inactive-image');
var studyActiveImage = document.querySelector('.js-study-active-image');
var studyInactiveImage = document.querySelector('.js-study-inactive-image');
var exerciseActiveImage = document.querySelector('.js-exercise-active-image');
var exerciseInactiveImage = document.querySelector('.js-exercise-inactive-image');
var numberInput = document.querySelectorAll('.js-input-number');
var startActivityButton = document.querySelector('.js-start-activity-button');
var intentionTextInput = document.querySelector('.js-input-text');
var textWarningMessage = document.querySelectorAll('.js-text-warning-message');
var inputs = document.querySelectorAll('.input-box');
var warnings = document.querySelectorAll('.js-warning-message');
var pastActivitiesSection = document.getElementById('js-past-activities-section')
//Event Listeners
activityButtons.addEventListener('click', function(event) {
  changeColor(event);
});

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
function changeColor(event) {
  event.preventDefault()
  if(event.target.classList.contains('js-study-button')) {
    studyActiveImage.classList.toggle('hidden');
    studyInactiveImage.classList.toggle('hidden');
    studyButton.classList.toggle('study-active-button');
  }
  if(event.target.classList.contains('js-meditate-button')) {
    meditateActiveImage.classList.toggle('hidden');
    meditateInactiveImage.classList.toggle('hidden');
    meditateButton.classList.toggle('meditate-active-button');
  }
  if(event.target.classList.contains('js-exercise-button')) {
    exerciseActiveImage.classList.toggle('hidden');
    exerciseInactiveImage.classList.toggle('hidden');
    exerciseButton.classList.toggle('exercise-active-button');
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
