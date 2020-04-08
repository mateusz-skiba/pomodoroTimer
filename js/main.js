const toggler = document.body.querySelector("#check");
const panel = document.body.querySelector("#chooseTimer");
const timers = [...document.body.querySelectorAll(".targetTimer")];
const timer = document.body.querySelector("#timer");
const start = document.body.querySelector("#start");
const reset = document.body.querySelector("#reset");
const sound = new Audio("audio/beep.mp3");

let activeTimer = false;
let time = 25.00;
let choice;
let interval;

// dark mode
const mode = () => {
  if (toggler.checked == true) {
    document.body.style.background = "#222";
    document.body.querySelector("#info").style.background = "#444";
    document.body.querySelector("#info").style.color = "#eee";
    document.body.querySelector(".toggleTrack").style.background = "#444";
    document.body.querySelectorAll(".toggleTrack span").forEach(element => {
      element.style.color = "#eee";
    });
    document.body.querySelector("#chooseTimer").style.background = "#444";
    document.body.querySelector("#chooseTimer").style.color = "#eee";
    timer.style.color = "#ccc";
    document.body.querySelectorAll("#buttons button").forEach(element => {
      element.style.color = "#ccc";
    });
  } else {
    document.body.style.background = "#fff";
    document.body.querySelector("#info").style.background = "#fff";
    document.body.querySelector("#info").style.color = "#888";
    document.body.querySelector(".toggleTrack").style.background = "#ddd";
    document.body.querySelectorAll(".toggleTrack span").forEach(element => {
      element.style.color = "#444";
    });
    document.body.querySelector("#chooseTimer").style.background = "#fff";
    document.body.querySelector("#chooseTimer").style.color = "#444";
    timer.style.color = "#444";
    document.body.querySelectorAll("#buttons button").forEach(element => {
      element.style.color = "#888";
    });
  }
}

// choose timer
const chooseTimer = (e) => {
  document.title = "Pomodoro timer";
  choice = e.target;
  document.body.querySelector("#reset").style.display = "none";
  document.body.querySelector(".activeTimer").classList.remove("activeTimer");
  e.target.classList.add("activeTimer");
  resetTimer();

  if (choice == timers[0]) {
    time = 25.00;
  } else if (choice == timers[1]) {
    time = 5.00;
  } else if (choice == timers[2]) {
    time = 15.00;
  }

  timer.textContent = time.toFixed(2).replace(".", ":");

  if (timer.innerHTML.length == 4) {
    timer.textContent = "0" + timer.textContent;
  }
}

// start button
const startTimer = () => {
  document.body.querySelector("#reset").style.display = "block";
  activeTimer = !activeTimer;
  if (activeTimer) {
    time -= 0.4;
    start.innerHTML = '<i class="fas fa-pause"></i>';
    start.style.paddingLeft = "7px";
    interval = setInterval(count, 1000);
  } else if (!activeTimer) {
    start.innerHTML = '<i class="fas fa-play"></i>';
    start.style.paddingLeft = "13px";
    clearInterval(interval);
  }

  function count() {
    time -= 0.01;
    timer.textContent = time.toFixed(2).replace(".", ":");
    document.title = timer.textContent;

    if (timer.innerHTML.length == 4) {
      timer.textContent = "0" + timer.textContent;
    }

    if (timer.innerHTML[3] == "0" && timer.innerHTML[4] == "0") {
      time -= 0.4;
    }

    if (time < 0) {
      clearInterval(interval);
      timer.textContent = "00:00";
      sound.play();
    }
  }
}

// reset button
const resetTimer = () => {
  document.title = "Pomodoro timer";
  clearInterval(interval);
  start.innerHTML = '<i class="fas fa-play"></i>';
  start.style.paddingLeft = "13px";
  activeTimer = false;
  
  if (choice == timers[0]) {
    timer.textContent = "25:00";
    time = 25.00;
  } else if (choice == timers[1]) {
    timer.textContent = "05:00";
    time = 5.00;
  } else if (choice == timers[2]) {
    timer.textContent = "15:00";
    time = 15.00;
  }
  else {
    timer.textContent = "25:00";
    time = 25.00;
  }
}

toggler.addEventListener("click", mode);
panel.addEventListener("click", chooseTimer);
start.addEventListener("click", startTimer);
reset.addEventListener("click", resetTimer);
