

export default class Fragment {
    constructor(cardList, model, index){
        this.cardList = cardList;
        this.model = model;
        this.index = index;
        this.element = this.createElement();
    }

    createElement() {
        const element = document.createElement("li");
        element.classList.add("card-list__card");
        const title = document.createElement("div");
        let image = document.createElement("img");
        image.setAttribute("src", this.model.image);
        image.classList.add("card__image")
        image.setAttribute("alt", this.model.name);
        element.appendChild(image);
        title.innerText = this.model.name;
        element.appendChild(title);
        this.cardList.element.appendChild(element);
        return element;
    }
}