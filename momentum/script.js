// DOM Elements
const time = document.querySelector('.time'),
  greeting = document.querySelector('.greeting'),
  name = document.querySelector('.name'),
  focus = document.querySelector('.focus'),
  button = document.querySelector(".backgroundImg"),
  fullDate = document.querySelector('.full-date'),
  resetButton  = document.querySelector(".resetImg");
  mainText = document.querySelector(".main-text");

  //погода
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');


  let days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  let months=['Января',' Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября','Октября', 'Ноября', 'Декабря'];
  let numberPicture = [[0,1,2,3,4,5],[6,7,8,9,10,11],[12,13,14,15,16,17],[18,19,20,21,22,23]];
  for(let i =0; i<numberPicture.length; i++){
    shuffle(numberPicture[i]);
  }
  let pictures = numberPicture.flat();
  let today = new Date();
  let number = today.getHours();

  function showDate() {
    let today = new Date();
    let day = today.getDay(),
    date = today.getDate(),
    month = today.getMonth();

    fullDate.innerHTML = `${days[day]}<br>${date} ${months[month]}`;
    setTimeout(showDate, 1000);
    
  }

// Options
//const showAmPm = true;
//рандомная сортировка
function shuffle(arr){
	var j, temp;
	for(var i = arr.length - 1; i > 0; i--){
		j = Math.floor(Math.random()*(i + 1));
		temp = arr[j];
		arr[j] = arr[i];
		arr[i] = temp;
	}
	return arr;
}
// Show Time
function showTime() {
  let today = new Date();
  let hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

  // Set AM or PM
 /* const amPm = hour >= 12 ? 'PM' : 'AM';*/

  // 12hr Format
  //hour = hour % 12 || 12;

  // Output Time
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;//${showAmPm ? amPm : ''}

  setTimeout(showTime, 1000);
}

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Set Background and Greeting
function setBgGreet() {
    let hour = today.getHours();
  if (hour < 12 && hour > 6) {
    // Morning
    greeting.textContent = 'Доброе утро, ';
  } else if (hour < 18 && hour > 12) {
    // Afternoon

    greeting.textContent = 'Добрый день, ';
  } else if(hour > 18 && hour < 24) {
    // Evening
    greeting.textContent = 'Добрый Вечер, ';
    //document.body.style.color = 'white';
  } else {
    greeting.textContent = 'Доброй Ночи, ';
   // document.body.style.color = 'white';
  }
  if(number<6){
    document.body.style.backgroundImage = "url(assets/images/dayImages/"+ pictures[number+18] +".jpg)";
  } else {
    document.body.style.backgroundImage = "url(assets/images/dayImages/"+ pictures[number-6] +".jpg)";
  }
  button.disabled = true;
  setTimeout(function() { button.disabled = false }, 1200);
}
// Get Name
function getName() {
  if (localStorage.getItem('name') === null) {
    name.textContent = ' [Ввести имя]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

// Set Name
function setName(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('name', e.target.innerText);
      name.blur();
    }
  } else {
    if(e.target.innerText !== ""){
    localStorage.setItem('name', e.target.innerText);
    }
    getName();
  }
}

// Get Focus
function getFocus() {
  if (localStorage.getItem('focus') === null) {
    focus.textContent = ' [Ввести цель]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}

// Set Focus
function setFocus(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('focus', e.target.innerText);
      focus.blur();
    }
  } else {
    if(e.target.innerText !== ""){
    localStorage.setItem('focus', e.target.innerText);
    }
    getFocus();
  }
}

button.onclick = function(e) {
  //button.disabled = true;
  if(number === 24){
    number = 0;
  } else {
    number++;
  }

  setBgGreet();
}

resetButton.onclick = function(e) {
  number = today.getHours();
  setBgGreet();
}

name.onclick = function(e){
  name.textContent = "";
}
focus.onclick = function(e){
  focus.textContent = "";
}

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

function setCity(event) {
  if (event.code === 'Enter') {
    getWeather();
    city.blur();
  }
}

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=ru&appid=4ef3e71e8efa4e55502e87818da3fa2e&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  weatherIcon.className = 'weather-icon owf';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp}°C`;
  weatherDescription.textContent = `${data.weather[0].description},скорость ветра: ${data.wind.speed} м/с, влажность ${data.main.humidity} %`;
}
document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);





// Run
showTime();
showDate();
setBgGreet();
getName();
getFocus();
getWeather()

