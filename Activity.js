class Activity {
  constructor(category, description, minutes, seconds, completed, id) {
    this.category = category;
    this.description = description;
    this.minutes = minutes;
    this.seconds = seconds;
    this.completed = completed;
    this.id = id;
  }

  countDown() {
    if (isTimerActive) {
      return;
    }
    isTimerActive = true;
    let time = parseInt(minutesInput.value * 60) + parseInt(secondsInput.value);
    updateCountdown();
    timerInterval = setInterval(updateCountdown, 1000);
  
    function updateCountdown() {
      if (time <= 0) {
      currentActivity.markComplete();
      }
  
      let minutesRemaining = Math.floor(time / 60);
      let secondsRemaining = time % 60;

      if(minutesRemaining < 10) {
        minutesRemaining = "0" + minutesRemaining;
      }

      if(secondsRemaining < 10) {
        secondsRemaining = "0" + secondsRemaining;
      }
  
      countdownTimer.innerHTML = `${minutesRemaining}:${secondsRemaining}`;
      time--;
    }
  };

  markComplete() {
    countdownTimer.innerText = "00:00";
    startTimerButton.innerText = "COMPLETE!";
    clearInterval(timerInterval);
    logActivityButton.classList.remove('hidden');
    currentActivity.completed = true;
    return;
  };

  saveToStorage() {

  };
}
