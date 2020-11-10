import '../css/style.css';
import '../css/style.scss';
import BackgroundImg from '../img/99.jpg';
import Puzzle from './Puzzle.js';



const mainContainer = document.createElement("div");
const puzzleWrapper = document.createElement("div");

puzzleWrapper.classList.add("puzzle-wrapper");
mainContainer.classList.add("main-container");
mainContainer.appendChild(puzzleWrapper);
document.querySelector("body").appendChild(mainContainer);
init();



function init() {
    const panelInfo = document.createElement("div");
    const newGameBtn =  document.createElement("button");
    const time =  document.createElement("div");
    const countSwap = document.createElement("div");

    panelInfo.classList.add("panel-info");
    puzzleWrapper.appendChild(panelInfo);
    panelInfo.appendChild(newGameBtn);
    newGameBtn.classList.add("new-game");
    panelInfo.appendChild(time);
    time.classList.add("time");
    panelInfo.appendChild(countSwap);
    countSwap.classList.add("countSwap");
    countSwap.innerHTML ="Moves: 0";
    newGameBtn.innerHTML = "New Game";
    setTime(time);

    newGameBtn.addEventListener("click", newGame);
    const puzzle =  new Puzzle(puzzleWrapper,BackgroundImg ,600);
}

function setTime(time) {
    let dateBegin = new Date();
    getCurrentTime(dateBegin,time);
    setInterval(()=>{
        getCurrentTime(dateBegin,time);
    },1000); 
}

function getCurrentTime(dateBegin,time){
    let dateNow = new Date();
    let min = Math.floor((dateNow - dateBegin)/1000/60);
    min = min < 10 ? "0" + min : min;
    let sec = Math.floor((dateNow - dateBegin)/1000) - min*60;
    sec = sec < 10 ? "0" + sec : sec;
    time.innerHTML = `Time: ${min}: ${sec}`;
}

function newGame(){
    puzzleWrapper.innerHTML="";
    localStorage.clear();
    init();
    //puzzle =  new Puzzle(puzzleWrapper,BackgroundImg ,600);
}




//puzzle.setup();