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
    newGameBtn.classList.add("new-game");
    time.classList.add("time");
    countSwap.classList.add("countSwap");

    puzzleWrapper.appendChild(panelInfo);
    panelInfo.appendChild(newGameBtn);
    createSelectElement(panelInfo);
    panelInfo.appendChild(time);
    panelInfo.appendChild(countSwap);
    finishModal();

    newGameBtn.innerHTML = "New Game";
    newGameBtn.addEventListener("click", newGame);
    setTime(time);
    
    let selectList = document.getElementById("mySelect");
    let size;
    if(localStorage.getItem("sizeGame") !== null) {
        size = localStorage.getItem("sizeGame");
        //console.log( selectList.value)
        selectList.value = size;
        //selectList.text = size;
    } else {
        size = 4;
    }
    selectList.addEventListener("change", () => {
        localStorage.setItem('sizeGame', selectList.value);
        newGame();
    })
    
    const puzzle =  new Puzzle(puzzleWrapper,BackgroundImg ,600 , size);
}

function createSelectElement(panelInfo){
    let array = ["3x3","4x4","5x5","6x6","7x7","8x8"];

    let selectList = document.createElement("select");
    selectList.id = "mySelect";
    panelInfo.appendChild(selectList);

    //Create and append the options
    for (var i = 0; i < array.length; i++) {
        var option = document.createElement("option");
        option.value = array[i][0];
        option.text = array[i];
        selectList.appendChild(option);
    }
    
}

function setTime(time) {
    let dateBegin;
    let dateList = localStorage.getItem('time');
    if(dateList == null){
     dateBegin = new Date();
    localStorage.setItem('time', +dateBegin);
    } else{
        dateBegin = new Date(parseInt(localStorage.getItem('time')));
    }
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
    let sizeGame = document.getElementById("mySelect").value
    puzzleWrapper.innerHTML="";
    localStorage.clear();
    localStorage.setItem('sizeGame', sizeGame);
    init();
    //puzzle =  new Puzzle(puzzleWrapper,BackgroundImg ,600);
}

function finishModal(){
    let modal = document.createElement("div");
    modal.classList.add("finish-modal");
    let close = document.createElement("span");
    close.innerHTML = `&times;`;
    close.classList.add("close-modal");
    let info = document.createElement("p");
    info.innerText="You win!!!";
    info.classList.add("info-modal");
    document.querySelector("body").appendChild(modal);
    modal.appendChild(close);
    modal.appendChild(info);
    close.onclick = function() {
        //modal.style.display = "none";
        modal.style.transform = "translate(100%)";
        newGame();
    }

    window.onclick = function(event) {
    if (event.target == modal) {
        //modal.style.display = "none";
        modal.style.transform = "translate(100%)";
        newGame();
    }
    }
}




//puzzle.setup();