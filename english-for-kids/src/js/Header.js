import cardsInfo from './CardsInfo';

export default class Header {
    constructor(){
        this.init();
    }

    init() {
        this.createHeader();
        this.createWrapper();
        this.createBurgerMenu();
        this.createTitle();
        this.createSwitcher();
    }

    createHeader() {
        this.element = document.createElement("header");
        this.element.classList.add("header");  
    }

    createWrapper() {
        this.wrapper = document.createElement("div");
        this.element.appendChild(this.wrapper);
        this.wrapper.classList.add("wrapper");
    }

    createBurgerMenu(){
        const menuBtn = document.createElement("div");
        const menuBtnBurger = document.createElement("div");
        const navigation = document.createElement("nav");

        menuBtn.classList.add("menu-btn");
        menuBtnBurger.classList.add("menu-btn__burger");
        navigation.classList.add("menu-btn__navigation", "menu-btn__navigation-unvisible");
        navigation.appendChild(this.fillNavigation());
        menuBtn.appendChild(menuBtnBurger);
        this.wrapper.appendChild(navigation);
        this.wrapper.appendChild(menuBtn);        
    }

    fillNavigation() {
        const ul = document.createElement("ul");
        ul.classList.add("navigation__menu-list");
        for (let i=0; i < cardsInfo[0].length; i++){
            const li = document.createElement("li");
            let linkMenu = document.createElement("a");
            linkMenu.appendChild(document.createTextNode("Ссылка на сайт"));
            linkMenu.href = "#";
            linkMenu.classList.add("menu-list__link");

            li.appendChild(linkMenu);

            ul.appendChild(li);
        } 
        return ul; 
    }

    createTitle(){
        const title = document.createElement("h1");
        title.innerText = "English for kids";
        this.wrapper.appendChild(title);
    }

    createSwitcher(){
        const switcher = document.createElement("span");
        const input = document.createElement("input");
        const label = document.createElement("label");

        switcher.classList.add("c-toggle");
        input.setAttribute("type", "checkbox");
        input.id = "toggle";
        label.setAttribute("for","toggle");

        switcher.appendChild(input);
        switcher.appendChild(label);
        this.wrapper.appendChild(switcher);
    }

    getHeaderBLock() {
        return this.element;
    }
}