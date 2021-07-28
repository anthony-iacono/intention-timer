// Variables
var studyButton = document.querySelector('.js-study-button');
var meditateButton = document.querySelector('.js-meditate-button');
var exerciseButton = document.querySelector('.js-exercise-button');
var activityButtons = document.querySelector('.js-activity-buttons');
var meditateActiveImage = document.querySelector('.js-meditate-active-image');
var meditateInactiveImage = document.querySelector('.js-meditate-inactive-image');
var studyActiveImage = document.querySelector('.js-study-active-image');
var studyInactiveImage = document.querySelector('.js-study-inactive-image');
var exerciseActiveImage = document.querySelector('.js-exercise-active-image');
var exerciseInactiveImage = document.querySelector('.js-exercise-inactive-image');


//Event Listeners
activityButtons.addEventListener('click', function(event) {
  changeColor(event);
});

//Event Handlers
function changeColor(event) {
  event.preventDefault()

  if(event.target.parentNode.classList.contains('js-study-button')) {
    studyActiveImage.classList.toggle('hidden');
    studyInactiveImage.classList.toggle('hidden');
    studyButton.classList.toggle('study-active-button');

  }
  //on click, add remove classes defined in css that are specific to that activity category
};