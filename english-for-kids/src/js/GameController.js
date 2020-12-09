const audioWord = new Audio();

export default class GameController{
    construct(){
        this.isGame;
        this.init();   
    }

    init(){
        this.isGame = false;
        this.playSoundCard();
        this.rotateCard();
        this.changeGameMode();
        this.startGame();
    }

    playSoundCard(){
       const allCards = document.querySelectorAll(".card-list__card");
       allCards.forEach(element => {
           element.onclick = function(){
                element.childNodes[2].play();
                let statistic = JSON.parse(localStorage.getItem("statistic"));
                for(let i=0; i< statistic["word"].length;i++){
                    if(element.childNodes[1].innerText === statistic["word"][i]){
                        statistic["click"][i] +=1;
                    }
                }
                localStorage.setItem("statistic", JSON.stringify(statistic));
           }
           
          
       })
    }
    rotateCard(){
        const allImageTurn = document.querySelectorAll(".card__imageTurn");
            allImageTurn.forEach(element => {
                element.addEventListener('click', (event) => {
                    event.path[2].classList.add('rotate');
                    setTimeout(() => {
                        event.path[1].childNodes[0].classList.add("card_title-hidden");
                        event.path[1].childNodes[1].classList.remove("card_title-hidden");
                        event.path[2].classList.remove('rotate');
                    },100);
                    setTimeout(() => {
                        event.path[1].childNodes[0].classList.add("russianTitle");
                    },150);
                  });
        const allCards = document.querySelectorAll(".card-list__card");
            allCards.forEach(element => {
                element.addEventListener("mouseleave", () => {
                    if(element.childNodes[1].childNodes[0].classList.contains("russianTitle")){
                        element.classList.add('rotate');
                        setTimeout(() => {
                        element.childNodes[1].childNodes[1].classList.add("card_title-hidden");
                        element.childNodes[1].childNodes[0].classList.remove("card_title-hidden");
                        element.childNodes[1].childNodes[0].classList.remove("russianTitle");
                        element.classList.remove('rotate');
                        },200);
                    };
                });
            })        
               
        })
          
    }
    changeGameMode(){
        const repeatButton = document.querySelector(".repeat-button");
        const panelAnswer = document.querySelector(".panel-answer");

        repeatButton.classList.add("game-button__off");
        repeatButton.classList.remove("game-button__on");
        panelAnswer.classList.add("game-button__off");
        panelAnswer.classList.remove("panel-answer__on");

        const switcherBlock = document.querySelector(".switcher-block");
        const switcher = document.querySelector(".switcher");
        const allCards = document.querySelectorAll(".card-list__card");
        const gameButton = document.querySelector(".game-button");
        switcher.classList.remove("switcher__on");
        switcher.classList.add("switcher__off");
        switcherBlock.onclick = function () {
            if(location.hash === "#Menu") return;
            if(switcher.classList.contains("switcher__off")){
                switcher.classList.remove("switcher__off");
                switcher.classList.add("switcher__on");
                gameButton.classList.add("game-button__on");
                gameButton.classList.remove("game-button__off");
                allCards.forEach(element => {
                    element.onclick = null;
                    element.classList.add("card__game-mode");
                    element.classList.remove("card__train-mode");
                    element.childNodes[1].classList.add("card-list__container-none");
                    element.childNodes[1].classList.remove("card-list__container-flex");
                    element.childNodes[0].classList.add("card_image-game");
                })
            } else {
                switcher.classList.add("switcher__off");
                switcher.classList.remove("switcher__on");
                gameButton.classList.remove("game-button__on");
                gameButton.classList.add("game-button__off");
                allCards.forEach(element => {
                    element.onclick = function(){
                        element.childNodes[2].play();
                    }
                    element.classList.add("card__train-mode");
                    element.classList.remove("card__game-mode");
                    element.childNodes[1].classList.remove("card-list__container-none");
                    element.childNodes[1].classList.add("card-list__container-flex");
                    element.childNodes[0].classList.remove("card_image-game");

                })
            }
            this.isGame = !this.isGame;
           
        }
    }

    startGame(){
        const gameButton = document.querySelector(".game-button");
        const allCards = document.querySelectorAll(".card-list__card");
        gameButton.addEventListener("click", () => {
            gameButton.classList.remove("game-button__on");
            gameButton.classList.add("game-button__off");
            let audioArray = [];
            allCards.forEach(element => {
                audioArray.push(element.childNodes[2].firstElementChild.attributes[0].nodeValue);
            });
            this.shuffle(audioArray);
            this.repeateWord(audioArray);
        });
    }

    repeateWord(audioArray){
        const repeatButton = document.querySelector(".repeat-button");
        const allCards = document.querySelectorAll(".card-list__card");
        const audioCorrect = document.querySelector(".audio-correct");
        const audioError = document.querySelector(".audio-error");
        const panelAnswer = document.querySelector(".panel-answer");



        repeatButton.classList.remove("game-button__off");
        repeatButton.classList.add("game-button__on");
        panelAnswer.classList.remove("game-button__off");
        panelAnswer.classList.add("panel-answer__on");


        let currentNumberOfSound = 0;
        let isError = false;
        audioWord.preload = 'auto';
        audioWord.src = audioArray[currentNumberOfSound];
        audioWord.play();
      

        repeatButton.onclick = function () {
            audioWord.play();
        }

        allCards.forEach(element => {
            element.onclick = function () {
                if(element.childNodes[2].firstElementChild.attributes[0].nodeValue === audioArray[currentNumberOfSound]){
                    element.classList.add("card__correct");
                    let imgCorrect = new Image(40,40);
                    imgCorrect.src = 'assets/images/star-win.svg';
                    currentNumberOfSound ++;
                    audioWord.src = audioArray[currentNumberOfSound];
                    audioCorrect.play();
                    if(currentNumberOfSound < audioArray.length){
                        setTimeout( () => {
                            audioWord.play();
                        },500);
                    }
                    panelAnswer.appendChild(imgCorrect);
                    let statistic = JSON.parse(localStorage.getItem("statistic"));
                    for(let i=0; i< statistic["word"].length;i++){
                        if(element.childNodes[1].firstChild.innerText === statistic["word"][i]){
                            statistic["correct"][i] +=1;
                            if( statistic["wrong"][i] == 0){
                                statistic["errors"][i] = 0;
                            }else{
                                statistic["errors"][i] = (statistic["wrong"][i]/(statistic["correct"][i] + statistic["wrong"][i])*100).toFixed(1);
                            }
                            
                        }
                    }
                    localStorage.setItem("statistic", JSON.stringify(statistic));
                   
                }
                else{
                    isError = true;
                    let imgError = new Image(40,40);
                    imgError.src = 'assets/images/star.svg';
                    audioError.play();
                    panelAnswer.appendChild(imgError);
                    let statistic = JSON.parse(localStorage.getItem("statistic"));
                    for(let i=0; i< statistic["word"].length;i++){
                        if(element.childNodes[1].firstChild.innerText === statistic["word"][i]){
                            statistic["wrong"][i] +=1;
                            statistic["errors"][i] = (statistic["wrong"][i]/(statistic["correct"][i] + statistic["wrong"][i])*100).toFixed(3);
                            
                        }
                    }
                    localStorage.setItem("statistic", JSON.stringify(statistic));
                }


                if(currentNumberOfSound === allCards.length){
                    let modal;
                    if(!isError){
                        modal = document.querySelector(".success-modal");
                    } else{
                        modal = document.querySelector(".error-modal");
                    }
                    repeatButton.onclick = null;
                    modal.classList.remove("finish-modal__close");
                    modal.classList.add("finish-modal__open");
                    setTimeout(()=>{
                        modal.classList.add("finish-modal__close");  
                        repeatButton.classList.add("game-button__off");
                        repeatButton.classList.remove("game-button__on");
                        panelAnswer.classList.add("game-button__off");
                        panelAnswer.classList.remove("panel-answer__on");
                        panelAnswer.innerHTML = "";
                        modal.classList.remove("finish-modal__open");  
                    },2000)
                    setTimeout('window.location=""',2000);
                    this.isGame = !this.isGame;
                }

         
            }
        })
    }

    shuffle(arr){
        var j, temp;
        for(var i = arr.length - 1; i > 0; i--){
            j = Math.floor(Math.random()*(i + 1));
            temp = arr[j];
            arr[j] = arr[i];
            arr[i] = temp;
        }
        return arr;
    }


}