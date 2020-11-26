import Card from './Card';

export default class CardList {
    constructor(){
        this.cards = [];
        this.createWrapper();
        this.createCardBlock();
    }

    createWrapper() {
        this.wrapper = document.createElement("div");
        this.wrapper.classList.add("wrapper");
    }

    createCardBlock() {
        this.element = document.createElement("ul");
        this.element.classList.add("card-list");
        this.wrapper.appendChild(this.element);
    }
    
    getCardList() {
        return this.wrapper;
    }

    render(model) {
        for (let i=0; i < model.length; i++){
            this.cards.push(new Card(this,model[i],i));
        } 
    }
}