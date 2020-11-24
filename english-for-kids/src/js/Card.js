export default class Fragment {
    constructor(cardList, index){
        this.cardList = cardList;
        this.index = index;
        this.element = this.createElement();
    }

    createElement() {
        const element = document.createElement("li");
        this.cardList.element.appendChild(element);
        return element;
    }
}