import '../css/style.css';
import '../css/style.scss';
import BackgroundImg from '../img/98.jpg';
import SoundOff from '../img/sound-off.jpg';
import SoundOn from '../img/sound-on.jpg';
import Puzzle from './Puzzle';
// import soundfile from '../sound/sound.mp3'; 


const mainContainer = document.createElement("div");
const puzzleWrapper = document.createElement("div");

puzzleWrapper.classList.add("puzzle-wrapper");
mainContainer.classList.add("main-container");
mainContainer.appendChild(puzzleWrapper);
document.querySelector("body").appendChild(mainContainer);



function createSelectElement(panelInfo){
    
    const array = ["3x3","4x4","5x5","6x6","7x7","8x8"];
    const selectList = document.createElement("select");

    panelInfo.classList.add("panel-info");
    selectList.classList.add("select");
    selectList.id = "mySelect";
    panelInfo.appendChild(selectList);

    // Create and append the options
    for (let i = 0; i < array.length; i +=1) {
        const option = document.createElement("option"); // option change [ option ]
        option.value = array[i][0];
        option.text = array[i];
        selectList.appendChild(option);
    }
    
}



function getCurrentTime(dateBegin,time){
    const dateNow = new Date();
    let min = Math.floor((dateNow - dateBegin)/1000/60);
    min = min < 10 ? `0 ${min}`: min;
    let sec = Math.floor((dateNow - dateBegin)/1000) - min*60;
    sec = sec < 10 ? `0 ${sec}`: sec;
    time.innerHTML = `Time: ${min}: ${sec}`;
}

function setTime(time) {
    let dateBegin;
    const dateList = localStorage.getItem('time');
    if(dateList == null){
     dateBegin = new Date();
    localStorage.setItem('time', +dateBegin);
    } else{
        dateBegin = new Date(parseInt(localStorage.getItem('time'),10));
    }
    getCurrentTime(dateBegin,time);
    setInterval(()=>{
        getCurrentTime(dateBegin,time);
    },1000); 
}




function setSound(){
    const sound = document.querySelector(".sound");
    let volume = false;
    sound.style.backgroundImage = `url(../${SoundOff})`;

    if(localStorage.getItem("sound") === "true"){
        volume = true;
        sound.style.backgroundImage = `url(../${SoundOn})`;
    }
    
   
    sound.addEventListener("click", () => {
        if(!volume){
            sound.style.backgroundImage = `url(../${SoundOn})`;
        } else {
            sound.style.backgroundImage = `url(../${SoundOff})`;
           
        }
        /* let audio = new Audio(soundfile);
        audio.play(); */
        volume = !volume;
        localStorage.setItem("sound",volume);
    })

    // return 
}

function newGame(){
    const sizeGame = document.getElementById("mySelect").value;
    const topTen = JSON.parse(localStorage.getItem("topTen"));
    const volume = localStorage.getItem("sound");
    puzzleWrapper.innerHTML="";
    localStorage.clear();
    localStorage.setItem('sizeGame', sizeGame);
    localStorage.setItem("sound",volume);
    localStorage.topTen = JSON.stringify(topTen);
    init();
    // puzzle =  new Puzzle(puzzleWrapper,BackgroundImg ,600);
}

function finishModal(){
    const modal = document.createElement("div");
    modal.classList.add("finish-modal");
    const close = document.createElement("span");
    close.innerHTML = `&times;`;
    close.classList.add("close-modal");
    const info = document.createElement("p");
    info.innerText="You win!!!";
    info.classList.add("info-modal");
    document.querySelector("body").appendChild(modal);
    modal.appendChild(close);
    modal.appendChild(info);
    close.onclick = function() {
        modal.style.transitionDelay = "0s";
        modal.style.transform = "translate(100%)"; 
        newGame();
}

    /* window.onclick = function(event) {
        if (event.target == modal) {  
            console.log(event.target);
            modal.style.transform = "translate(100%)";
            newGame();
        }
    } */
}


function init() {
    const panelInfo = document.createElement("div");
    const newGameBtn =  document.createElement("button");
    const autoSolve =  document.createElement("button");
    const time =  document.createElement("div");
    const countSwap = document.createElement("div");
    const sound = document.createElement("div");
    const topTen = document.createElement("div");

    
    newGameBtn.classList.add("new-game");
    time.classList.add("time");
    countSwap.classList.add("countSwap");
    sound.classList.add("sound");
    topTen.classList.add("topTen");
    autoSolve.classList.add("autoSolve");

    puzzleWrapper.appendChild(panelInfo);
    panelInfo.appendChild(newGameBtn);
    panelInfo.appendChild(autoSolve);
    createSelectElement(panelInfo);
    panelInfo.appendChild(time);
    panelInfo.appendChild(countSwap);
    panelInfo.appendChild(sound);
    panelInfo.appendChild(topTen);
 
    finishModal();
    newGameBtn.innerHTML = "New Game";
    autoSolve.innerHTML = "AutoSolve";
    newGameBtn.addEventListener("click", newGame);
    setTime(time);
    setSound();
    setTop(topTen);

    const puzzle =  new Puzzle(puzzleWrapper,BackgroundImg ,600 , getSizeGame());
    console.log(puzzle);
}


function setTop(topTen){
    const modal = document.createElement("div");
    modal.classList.add("top-modal");
    const close = document.createElement("span");
    close.innerHTML = `&times;`;
    close.classList.add("close-modal-top");
    const info = document.createElement("p");
    info.innerHTML="<h3>Top 10 result by time!</h3>";
    info.classList.add("top-info");
    document.querySelector("body").appendChild(modal);
    modal.appendChild(close);
    modal.appendChild(info);
    if( JSON.parse(localStorage.getItem("topTen")) === null){
    localStorage.topTen = JSON.stringify([]);
    }
    topTen.addEventListener("click", () => {
        modal.style.transform = "translate(0)";
        const topResult = JSON.parse(localStorage.getItem("topTen"));
        topResult.forEach((item, index)  => {
            const min = Math.floor(item/60);
            let sec = item - min*60;
            sec = sec < 10 ? `0 + ${sec}` : sec;
            info.innerHTML += `\n <p>${index+1} place - ${min} min ${sec} sec </p>`;
        })
        // info.innerText = ""+JSON.parse(localStorage.getItem("topTen"));
        });
    close.onclick = function() {
        modal.style.transform = "translate(100%)";
        newGame();
    }
    

    /* window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.transform = "translate(100%)";
            document.querySelector(".finish-modal").style.transform = "translate(100%)";
            newGame();
        }
    } */
}

function getSizeGame(){
    const selectList = document.getElementById("mySelect");
    let size;
    if(localStorage.getItem("sizeGame") !== null) {
        size = localStorage.getItem("sizeGame");
        // console.log( selectList.value)
        selectList.value = size;
        // selectList.text = size;
    } else {
        size = 4;
        selectList.value = size;
    }
    selectList.addEventListener("change", () => {
        localStorage.setItem('sizeGame', selectList.value);
        newGame();
    })
    return size;
}

init();




// puzzle.setup();