// DOM Elements
const time = document.querySelector('.time'),
  greeting = document.querySelector('.greeting'),
  name = document.querySelector('.name'),
  focus = document.querySelector('.focus'),
  button = document.querySelector(".backgroundImg"),
  fullDate = document.querySelector('.full-date'),
  resetButton  = document.querySelector(".resetImg");


  let days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  let months=['Января',' Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября','Октября', 'Ноября', 'Декабря'];
  let numberPicture = [[11,10,9,8,7,6],[17,16,15,14,13,12],[23,22,21,20,19,18],[1,2,3,4,5,24]];
  for(let i =0; i<numberPicture.length; i++){
    shuffle(numberPicture[i]);
  }
  let pictures = numberPicture.flat();
  let today = new Date();
  let number = today.getHours();

  function showDate() {
    let day = today.getDay(),
    number = today.getDate(),
    month = today.getMonth();
  
    fullDate.innerHTML = `${days[day]}<span>, <span> ${number} ${months[month]}`;
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
    document.body.style.backgroundImage = "url(assets/images/dayImages/"+ picture[number] +".jpg)";
    let hour = today.getHours();
  if (hour < 12 && hour > 6) {
    // Morning
    
    greeting.textContent = 'Доброе утро, ';
  } else if (hour < 18 && hour > 12) {
    // Afternoon
    greeting.textContent = 'Добрый день, ';
  } else if(hour > 18 && hour < 24) {
    // Evening
    greeting.textContent = 'Добрый вечер, ';
    document.body.style.color = 'white';
  } else {
    greeting.textContent = 'Доброй Ночи, ';
    document.body.style.color = 'white';
  }
}
// Get Name
function getName() {
  if (localStorage.getItem('name') === null) {
    name.textContent = '[Enter Name]';
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
    focus.textContent = '[Enter Focus]';
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
  if(number === 24){
    number = 1;
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

// Run
showTime();
showDate();
setBgGreet();
getName();
getFocus();