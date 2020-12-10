import Card from './Card';
import cardsInfo from '../Data/CardsInfo';

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
        // console.log(table);
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
        const audioSuccess = document.createElement('audio');
        const audioFailure = document.createElement('audio');

        audioCorrect.classList.add("audio-correct");
        audioError.classList.add("audio-error");
        audioSuccess.classList.add("audio-success");
        audioFailure.classList.add("audio-failure");

        audioCorrect.innerHTML = `<source src="./assets/audio/correct.mp3" type=\"audio/mpeg\">`;
        audioError.innerHTML = `<source src="./assets/audio/error.mp3" type=\"audio/mpeg\">`;
        audioSuccess.innerHTML = `<source src="./assets/audio/success.mp3" type=\"audio/mpeg\">`;
        audioFailure.innerHTML = `<source src="./assets/audio/failure.mp3" type=\"audio/mpeg\">`;

        this.wrapper.appendChild(audioCorrect);
        this.wrapper.appendChild(audioError);
        this.wrapper.appendChild(audioSuccess);
        this.wrapper.appendChild(audioFailure);
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
        const containerButton = document.createElement("div");
        const resetButton = document.createElement("div");
        const repeatButton = document.createElement("div");
        let link = document.createElement("a");
        link.href = `#Repeat`;

        containerButton.classList.add("button-container");
        resetButton.classList.add("reset-button");
        repeatButton.classList.add("repeatWord-button");
        div.classList.add("table-container");

        resetButton.innerText = "Reset";
        repeatButton.innerText = "Repeat Word";

        div.appendChild(containerButton);
        containerButton.appendChild(link);
        link.appendChild(repeatButton);
        containerButton.appendChild(resetButton);
        


        let table = document.createElement('table');
        table.classList.add("table_sort");
        let th, tr, td, row, cell;
        let thead = document.createElement("thead");
        let tbody = document.createElement("tbody");
        tr = document.createElement('tr');
        for (let i = 0; i < Object.keys(model).length; i++) {
            th =  document.createElement('th');
            tr.appendChild(th);
            th.innerText = Object.keys(model)[i];
        }
        thead.appendChild(tr);
        table.appendChild(thead);
        

        for (row = 0; row < model["word"].length; row++) {
            tr = document.createElement('tr');
            for (cell = 0; cell < Object.keys(model).length; cell++) {
            td = document.createElement('td');
            tr.appendChild(td);
            td.innerText = model[Object.keys(model)[cell]][row];
            }
            tbody.appendChild(tr);
        }
        table.appendChild(tbody);
        div.appendChild(table);
        document.querySelector(".wrapper__card-list").appendChild(div);
        this.sortTable();
        this.createStatistic();
        // this.repeatWords();
    }

    sortTable(){
            const getSort = ({ target }) => {
                const order = (target.dataset.order = -(target.dataset.order || -1));
                const index = [...target.parentNode.cells].indexOf(target);
                const collator = new Intl.Collator(['en', 'ru'], { numeric: true });
                const comparator = (index, order) => (a, b) => order * collator.compare(
                    a.children[index].innerHTML,
                    b.children[index].innerHTML
                );
                
                for(const tBody of target.closest('table').tBodies)
                    tBody.append(...[...tBody.rows].sort(comparator(index, order)));
        
                for(const cell of target.parentNode.cells)
                    cell.classList.toggle('sorted', cell === target);
            };
            
            document.querySelectorAll('.table_sort thead').forEach(tableTH => tableTH.addEventListener('click', () => getSort(event)));
            
    }
    createStatistic(){
        let that = this;
        document.querySelector(".reset-button").onclick = function (){
        localStorage.clear();
        let information = cardsInfo;
        let statistic = {
          word: [],
          translation: [],
          category: [],
          click: [],
          correct: [],
          wrong: [],
          errors: []
        };
        for(let i=1; i< information.length; i++){
          for(let j=0; j<information[i].length;j++){
            statistic["word"].push(information[i][j].word);
            statistic["translation"].push(information[i][j].translation);
            statistic["category"].push(information[0][i-1].name);
            statistic["click"].push(0); 
            statistic["correct"].push(0); 
            statistic["wrong"].push(0); 
            statistic["errors"].push(0); 
          }
        }
        localStorage.setItem("statistic", JSON.stringify(statistic));
        const wrapper = document.querySelector(".wrapper__card-list")
        const container = document.querySelector(".table-container");
        wrapper.removeChild(container);
        that.renderStatistic(JSON.parse(localStorage.getItem("statistic")));
      }
    }

    /*repeatWords(){
        let that = this;
        document.querySelector(".repeatWord-button").onclick = function (){

        }
    }*/
    
}


