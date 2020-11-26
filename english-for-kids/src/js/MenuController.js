


/*обработка выезда меню и скрытия,
 изменение состояния активнных ссылок,
 перерисовка поля из файла по клику на нужную категорию,
 добавление каттегорий в меню*/

import cardsInfo from './Data/CardsInfo';
export default class MenuController{
    constructor() {
        this.addClick();
        this.category = null;
        this.setCategory();
    }

    setCategory() {
        console.log(cardsInfo);
        const linkList = document.querySelectorAll(".menu-list__link");
        linkList.forEach((element, index) => {
            element.innerHTML = `${cardsInfo[0][index]}`;
        });
        console.log(linkList);
    }


    addClick(){
        const menuBtn = document.querySelector(".menu-btn");
        const navigation = document.querySelector("nav");
        let menuOpen = false;
        menuBtn.addEventListener('click', () => {
            if(!menuOpen) {
                navigation.classList.remove("menu-btn__navigation-unvisible");
                navigation.classList.add("menu-btn__navigation-visible");
                menuBtn.classList.add('open');
                menuOpen = true;
            } else {
                navigation.classList.remove("menu-btn__navigation-visible");
                navigation.classList.add("menu-btn__navigation-unvisible");
                menuBtn.classList.remove('open');
                menuOpen = false;
            }
        });
        const menuBtnBurger = document.querySelector('.menu-btn__burger');
    }
}




