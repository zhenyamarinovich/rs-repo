/*Отслеживание состояния  тренировки и игры,
 логика игры и тренировки,
 затемнее карточек после нажатия*/


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
        const switcherBlock = document.querySelector(".switcher-block");
        const switcher = document.querySelector(".switcher");
        const allCards = document.querySelectorAll(".card-list__card");
        const gameButton = document.querySelector(".game-button");
        switcherBlock.addEventListener("click", () => {
            if(!this.isGame){
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
           
        })
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
            /*var audio = new Audio();
            audio.preload = 'auto';
            audio.src = audioArray[0];
            audio.play();*/
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
        let audioWord = new Audio();
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
                    setTimeout( () => {
                            if(currentNumberOfSound < audioArray.length){
                            audioWord.play();
                            }
                  
                    },500);
                    panelAnswer.appendChild(imgCorrect);
                   
                }
                else{
                    isError = true;
                    let imgError = new Image(40,40);
                    imgError.src = 'assets/images/star.svg';
                    audioError.play();
                    panelAnswer.appendChild(imgError);
                }

                if(currentNumberOfSound === allCards.length){
                    let modal;
                    if(!isError){
                        modal = document.querySelector(".success-modal");
                    } else{
                        modal = document.querySelector(".error-modal");
                    }
                    modal.classList.remove("finish-modal__close");
                    modal.classList.add("finish-modal__open");  
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