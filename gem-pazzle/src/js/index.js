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
    let dateNow = new Date();
    let min = Math.floor((dateNow - dateBegin)/1000/60);
    let sec = Math.floor((dateNow - dateBegin)/1000) - min*60;
    time.innerHTML = `Time: ${min}: ${sec}`;
    setInterval(()=>{
        dateNow = new Date();    
        min = Math.floor((dateNow - dateBegin)/1000/60);
        sec = Math.floor((dateNow - dateBegin)/1000) - min*60;
        time.innerHTML = `Time: ${min}: ${sec}`;
    },1000);
   
}

function newGame(){
    puzzleWrapper.innerHTML="";
    init();
    //puzzle =  new Puzzle(puzzleWrapper,BackgroundImg ,600);
}




//puzzle.setup();