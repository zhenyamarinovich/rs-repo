import '../css/style.css';
import '../css/style.scss';
import BackgroundImg from '../img/98.jpg';
import SoundOff from '../img/sound-off.jpg';
import SoundOn from '../img/sound-on.jpg';
import Puzzle from './Puzzle';

const mainContainer = document.createElement("div");
const puzzleWrapper = document.createElement("div");
let interval;
let widthBlock = 600;

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
        const option = document.createElement("option");
        option.value = array[i][0];
        option.text = array[i];
        selectList.appendChild(option);
    }
    
}

function getCurrentTime(time){
    let min = localStorage.getItem("min");
    let sec = localStorage.getItem("sec");
    if(sec == null){
        min = 0;
        sec = 0;
        localStorage.setItem('min', min);
        localStorage.setItem('sec', sec);
    }
    sec++;
    if(sec === 60){
        sec = 0;
        min++;
    }
    localStorage.setItem('min', min);
    localStorage.setItem('sec', sec);
    time.innerHTML = `Time: ${min < 10 ? '0'+min : min} : ${sec < 10 ? '0'+sec : sec}`;
}

function setSound(){
    const sound = document.querySelector(".sound");
    let volume = false;
    //sound.style.backgroundImage = `url(../${SoundOff})`;
    sound.style.backgroundImage = `url(${SoundOff})`;

    if(localStorage.getItem("sound") === "true"){
        volume = true;
        //sound.style.backgroundImage = `url(../${SoundOn})`;
        sound.style.backgroundImage = `url(${SoundOn})`;
    }
     
    sound.addEventListener("click", () => {
        if(!volume){
           // sound.style.backgroundImage = `url(../${SoundOn})`;
           sound.style.backgroundImage = `url(${SoundOn})`;
        } else {
           // sound.style.backgroundImage = `url(../${SoundOff})`;
           sound.style.backgroundImage = `url(${SoundOff})`;

           
        }
        /* let audio = new Audio(soundfile);
        audio.play(); */
        volume = !volume;
        localStorage.setItem("sound",volume);
    })

    // return 
}

function newGame(){
    clearInterval(interval);
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
    // localStorage.clear();
    getCurrentTime(time);
    interval = setInterval(()=>{
        getCurrentTime(time);
    },1000);
    setSound();
    setTop(topTen);

    const puzzle =  new Puzzle(puzzleWrapper,BackgroundImg ,widthBlock, getSizeGame());
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
            sec = sec < 10 ? `0${sec}` : sec;
            info.innerHTML += `\n <p>${index+1} place - ${min} min ${sec} sec </p>`;
        })
        // info.innerText = ""+JSON.parse(localStorage.getItem("topTen"));
        });
    close.onclick = function() {
        modal.style.transform = "translate(100%)";
        newGame();
    }
    
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

window.onresize = function( event ) {
    const screenWidth = window.screen.width;
    if(screenWidth < 730 && screenWidth > 530){
       widthBlock = 450;
        clearInterval(interval);
        puzzleWrapper.innerHTML="";
        init();
    } else if(screenWidth < 530){
        widthBlock = 300;
        clearInterval(interval);
        puzzleWrapper.innerHTML="";
        init();
    }
};


init();




// puzzle.setup();