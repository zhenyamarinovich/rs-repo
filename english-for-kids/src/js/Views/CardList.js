import Card from './Card';

export default class CardList {
    constructor(){
        this.cards = [];
        this.element;
        this.createWrapper();
        this.createPanelAnswer();
        this.createCardBlock();
        this.createStarGameButton();
        this.createRepeatButton();
        this.createAudio();
        this.createSuccessModal();
        this.createErrorModal();
    }

    createWrapper() {
        this.wrapper = document.createElement("div");
        this.wrapper.classList.add("wrapper__card-list");
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
        if(this.cards.length !==0){
            this.cards = [];
        }
        const table =  document.querySelector(".table-container");
        console.log(table);
        if(table !== null){
            document.querySelector(".wrapper__card-list").removeChild(document.querySelector(".wrapper__card-list").lastChild);
        };
        document.querySelector(".card-list").innerHTML = "";
        const switcher = document.querySelector(".switcher");
        switcher.classList.remove("switcher__on");
        switcher.classList.add("switcher__off");
        for (let i=0; i < model.length; i++){
            //console.log(this);
            this.cards.push(new Card(this,model[i],i));
        } 
    }

    createStarGameButton(){
        this.gameButton = document.createElement("div");
        const nameButton = document.createElement("span");
        nameButton.innerText = "Start Game";
        this.gameButton.classList.add("game-button");
        this.gameButton.classList.add("game-button__off");
        this.wrapper.appendChild(this.gameButton);
        this.gameButton.appendChild(nameButton);
    }

    createRepeatButton(){
        this.gameButton = document.createElement("div");
        const nameButton = document.createElement("span");
        nameButton.innerText = "Repeat";
        this.gameButton.classList.add("repeat-button");
        this.gameButton.classList.add("game-button__off");
        this.wrapper.appendChild(this.gameButton);
        this.gameButton.appendChild(nameButton);
    }

    createAudio(){
        const audioCorrect = document.createElement('audio');
        const audioError = document.createElement('audio');
        audioCorrect.classList.add("audio-correct");
        audioError.classList.add("audio-error");
        audioCorrect.innerHTML = `<source src="./assets/audio/correct.mp3" type=\"audio/mpeg\">`;
        audioError.innerHTML = `<source src="./assets/audio/error.mp3" type=\"audio/mpeg\">`;
        this.wrapper.appendChild(audioCorrect);
        this.wrapper.appendChild(audioError);
    }

    createPanelAnswer(){
        const panelAnswer = document.createElement("div");
        panelAnswer.classList.add("game-button__off");
        panelAnswer.classList.add("panel-answer");
        this.wrapper.appendChild(panelAnswer);
    }

    createSuccessModal(){
        const modal = document.createElement("div");
        modal.classList.add("finish-modal__close");
        modal.classList.add("success-modal");
        let img = new Image();
        img.src = 'assets/images/success.jpg';
        document.querySelector("body").appendChild(modal);
        modal.appendChild(img);
        
    }
    createErrorModal(){
        const modal = document.createElement("div");
        modal.classList.add("error-modal");
        let img = new Image();
        img.src = 'assets/images/failure.jpg';
        document.querySelector("body").appendChild(modal);
        modal.appendChild(img);
        modal.classList.add("finish-modal__close");
    }

    renderStatistic(model){
        document.querySelector(".card-list").innerHTML = "";
        if(document.querySelector(".table-container") !== null){
            document.querySelector(".table-container").innerHTML="";
        };
        const div = document.createElement("div");
        div.classList.add("table-container");
        let table = document.createElement('table');
        let th, tr, td, row, cell;

        tr = document.createElement('tr');
        for (let i = 0; i < Object.keys(model).length; i++) {
            th =  document.createElement('th');
            tr.appendChild(th);
            th.innerText = Object.keys(model)[i];
        }
        table.appendChild(tr);
        

        for (row = 0; row < model["word"].length; row++) {
            tr = document.createElement('tr');
            for (cell = 0; cell < Object.keys(model).length; cell++) {
            td = document.createElement('td');
            tr.appendChild(td);
            td.innerText = model[Object.keys(model)[cell]][row];
            }
        table.appendChild(tr);
        }
        div.appendChild(table);
        document.querySelector(".wrapper__card-list").appendChild(div);
    }
}

