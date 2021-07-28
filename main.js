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
var numberInput = document.querySelector('.js-input-number');

//Event Listeners
activityButtons.addEventListener('click', function(event) {
  changeColor(event);
});

numberInput.addEventListener('keydown', funtion() {
  this.value = this.value.replace(/[e\+\-]/gi, "");
});

numberInput.addEventListener("keydown", function(event) {
  if (invalidChars.includes(event.key)) {
    event.preventDefault();
  }
});
  // allowNumbersOnly(event)
// };

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

function allowNumbersOnly(event) {
  var invalidChars = ["-", "e", "+", "E"];
  if (invalidChars.includes(event.key)){
    event.preventDefault();
  }
}


// inputBox.addEventListener("input", function() {
//   this.value = this.value.replace(/[e\+\-]/gi, "");
// });

// inputBox.addEventListener("keydown", function(e) {
//   if (invalidChars.includes(e.key)) {
//     e.preventDefault();
//   }
// });

// ('.js-input-number').keyup(function () {
//     if (!this.value.match(/[0-9]/)) {
//         this.value = this.value.replace(/[^0-9]/g, '');
//     }
// });
// if (!this.value.match(/[0-9]/)) {
//     event.preventDefault();
//     this.value = this.value.replace(/[^0-9]/g, '');
