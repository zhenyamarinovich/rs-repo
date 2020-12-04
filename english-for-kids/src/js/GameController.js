/*Отслеживание состояния  тренировки и игры,
 логика игры и тренировки,
 затемнее карточек после нажатия*/


export default class GameController{
    construct(){

    }

    playSoundCard(){
       const allCards = document.querySelectorAll(".card-list__card");
       allCards.forEach(element => {
           element.addEventListener("click", () => {
                element.childNodes[2].play();
           });
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
                    },400);
                  });
        const allCards = document.querySelectorAll(".card-list__card");
            allCards.forEach(element => {
                element.addEventListener("mouseleave", () => {
                    if(element.childNodes[1].childNodes[0].classList.contains("card_title-hidden")){
                        element.classList.add('rotate');
                        setTimeout(() => {
                        element.childNodes[1].childNodes[1].classList.add("card_title-hidden");
                        element.childNodes[1].childNodes[0].classList.remove("card_title-hidden");
                        element.classList.remove('rotate');
                    },400);
                    };
                });
            })        
                //setTimeout(() => {
                    //event.path[1].childNodes[0].classList.remove("card_title-hidden");
                   // event.path[1].childNodes[1].classList.add("card_title-hidden");
                //},1000);
            })
          
    }
}