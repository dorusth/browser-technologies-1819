var features = {
	localStorage: false,
	eventListener: false
}

var currentMatch = {
	matchName: undefined,
	team1:{
		name: undefined,
		score: 0
	},
	team2:{
		name: undefined,
		score: 0
	}
}

//=============== timer===================//
var timeinterval
function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  return {
    'total': t,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

function initializeClock(id) {
  var endtime = new Date(Date.parse(new Date()) + 90 * 60 * 1000);
  var clock = document.querySelector('.timer');
  var hoursSpan = clock.querySelector('.hours');
  var minutesSpan = clock.querySelector('.minutes');
  var secondsSpan = clock.querySelector('.seconds');

  function updateClock() {
    var t = getTimeRemaining(endtime);
    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }

  updateClock();
  timeinterval = setInterval(updateClock, 1000);
}


//===============feature detect===================//
if (window.addEventListener) {
	features.eventListener = true
	renderContent();
	addEvents();
}

if(window.localStorage){
	features.localStorage = true
	if(window.localStorage.currentMatch){
		currentMatch = JSON.parse(localStorage.currentMatch);
		document.querySelector(".team1_naam").value = currentMatch.team1.name
		document.querySelector(".team1_score").value = currentMatch.team1.score

		document.querySelector(".team2_naam").value = currentMatch.team2.name
		document.querySelector(".team2_score").value = currentMatch.team2.score
	}
}
document.querySelector(".reset").addEventListener("click", function(){
	localStorage.clear();
	console.log("joe");
})
console.log(features);


//===============js content===================//
function renderContent() {
	document.querySelector(".team1").innerHTML += `
		<div>
			<button type="button" name="score up" class="up">+</button>
			<button type="button" name="score down" class="down">-</button>
		</div>
	`

	document.querySelector(".team2").innerHTML += `
		<div>
			<button type="button" name="score up" class="up">+</button>
			<button type="button" name="score down" class="down">-</button>
		</div>
	`

	document.querySelector("main").innerHTML += `
		<section class="timer">
			<button type="button" name="Start timer" class="timer_start">start match timer</button>
		</section>
	`
}

function addEvents() {
	document.querySelector(".timer_start").addEventListener("click",()=>{
			document.querySelector(".timer").innerHTML = `
				<div>
					<p class="hours"></p>
					<p class="minutes"></p>
					<p class="seconds"></p>
				</div>
			`
			initializeClock('clockdiv');
	})

	document.querySelector(".team1 div button.up").addEventListener("click", function(){
		document.querySelector(".team1 .team1_score").value++;
		storeScore();
	})

	document.querySelector(".team1 div button.down").addEventListener("click", function(){
		document.querySelector(".team1 .team1_score").value--;
		storeScore();
	})

	document.querySelector(".team2 div button.up").addEventListener("click", function(){
		document.querySelector(".team2 .team2_score").value++;
		storeScore();
	})

	document.querySelector(".team2 div button.down").addEventListener("click", function(){
		document.querySelector(".team2 .team2_score").value--;
		storeScore();
	})
}

function storeScore() {
	currentMatch.team1.name = document.querySelector(".team1_naam").value.charAt(0).toUpperCase() + document.querySelector(".team1_naam").value.slice(1);
	currentMatch.team1.score = document.querySelector(".team1_score").value;
	currentMatch.team2.name = document.querySelector(".team2_naam").value.charAt(0).toUpperCase() + document.querySelector(".team2_naam").value.slice(1);;
	currentMatch.team2.score = document.querySelector(".team2_score").value;
	currentMatch.matchName = currentMatch.team1.name + " - " + currentMatch.team2.name;

	if(features.localStorage === true){
		localStorage.setItem('currentMatch', JSON.stringify(currentMatch));
	}
}
