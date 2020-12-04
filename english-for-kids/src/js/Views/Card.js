

export default class Fragment {
    constructor(cardList, model, index){
        this.cardList = cardList;
        this.model = model;
        this.index = index;
        this.element;
        this.init();
    }

    init(){
        // console.log(this.model);
        if(this.model.name){
            this.createMenu();
        }
        else{
            this.createWords();
        }
    }

    createMenu() {
        const element = document.createElement("li");
        element.classList.add("card-list__card");
        let linkMenu = document.createElement("a");
        linkMenu.href = `#${this.model.name}`.replace(/set|[\s()]/g, '');
        linkMenu.classList.add("card__link");
        element.appendChild(linkMenu);

        const title = document.createElement("div");
        let image = document.createElement("img");
        image.setAttribute("src", this.model.image);
        image.classList.add("card__image")
        image.setAttribute("alt", this.model.name);
        linkMenu.appendChild(image);
        title.innerText = this.model.name;
        linkMenu.appendChild(title);
        document.querySelector(".card-list").appendChild(element);
        this.element = element;
    }

    createWords(){
        const element = document.createElement("li");
        element.classList.add("card-list__card");
        const container = document.createElement("div");
        container.classList.add("card-list__container")
        const title = document.createElement("span");
        const imageTurn = document.createElement("img");
        const russianTitle = document.createElement("span"); 
        let image = document.createElement("img");
        image.setAttribute("src", this.model.image);
        image.classList.add("card__image")
        image.setAttribute("alt", this.model.word);

        imageTurn.setAttribute("src", './assets/images/rotate.svg');
        imageTurn.classList.add("card__imageTurn")
        imageTurn.setAttribute("alt", "turn");

        element.appendChild(image);
        title.innerText = this.model.word;
        russianTitle.innerText = this.model.translation;
        russianTitle.classList.add("card_title-hidden");
        element.appendChild(container);
        container.appendChild(title);
        container.appendChild(russianTitle);
        container.appendChild(imageTurn);
        


        let audio = document.createElement('audio');
        audio.innerHTML = `<source src=${this.model.audioSrc} type=\"audio/mpeg\">`;
        element.appendChild(audio);

        document.querySelector(".card-list").appendChild(element);
        this.element = element;
    }
}