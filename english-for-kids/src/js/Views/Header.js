import cardsInfo from '../Data/CardsInfo';

export default class Header {
    constructor(model){
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
        this.navigation = document.createElement("nav");
        menuBtn.classList.add("menu-btn");
        menuBtnBurger.classList.add("menu-btn__burger");
        this.navigation.classList.add("menu-btn__navigation", "menu-btn__navigation-unvisible");
        menuBtn.appendChild(menuBtnBurger);
        this.wrapper.appendChild(this.navigation);
        this.wrapper.appendChild(menuBtn);        
    }

    renderMenu(model) {
        const ul = document.createElement("ul");
        ul.classList.add("navigation__menu-list");
        //add link to menu
        const li = document.createElement("li");
        let linkMenu = document.createElement("a");
        linkMenu.appendChild(document.createTextNode("Menu"));
        linkMenu.href = `#Menu`;
        linkMenu.classList.add("menu-list__link");
        li.appendChild(linkMenu);
        ul.appendChild(li);
        // add all category links
        for (let i=0; i < model.length; i++){
            const li = document.createElement("li");
            let linkMenu = document.createElement("a");
            linkMenu.appendChild(document.createTextNode(model[i].name));
            linkMenu.href = `#${model[i].name}`.replace(/set|[\s()]/g, '');
            linkMenu.classList.add("menu-list__link");

            li.appendChild(linkMenu);

            ul.appendChild(li);
        }
        this.navigation.appendChild(ul); 
    }

    createTitle(){
        const title = document.createElement("h1");
        title.innerText = "English for kids";
        this.wrapper.appendChild(title);
    }

    createSwitcher(){
        const switcherBlock = document.createElement("div");
        const switcher = document.createElement("div");
        switcherBlock.classList.add("switcher-block");
        switcher.classList.add("switcher");
        switcher.classList.add("switcher__off");
        switcherBlock.appendChild(switcher);
        this.wrapper.appendChild(switcherBlock);
    }

    getHeaderBLock() {
        return this.element;
    }
}