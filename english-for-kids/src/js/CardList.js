import Card from './Card';

export default class CardList {
    constructor(){
        this.cards = [];
        this.createCardBlock();
    }

    createCardBlock() {
        this.element = document.createElement("ul");
        const numberCardOnPage = 8;
        for (let i=0; i < numberCardOnPage; i++){
            this.cards.push(new Card(this,i));
        } 
    }
    
    getCardList() {
        return this.element;
    }
}