import Fragment from "./Fragment";

export default class Puzzle{
    constructor(parentDiv,image, width , size){
        this.wrapper = parentDiv;
        this.image = image;
        this.width = width;
        this.height = width;
        this.sizeGame = size;
        this.fragments = [];
        this.arrayMoves = [];
        this.countSwap = localStorage.getItem("countSwap");
        this.dragIndex = 0;
        this.autoFlag = false;
        this.init();  
        this.blockContainer.style.width = `${this.width}px`;
        this.blockContainer.style.height = `${this.height}px`;
        this.setup();
    }

    init(){

        this.blockContainer = document.createElement("div");
        this.blockContainer.classList.add("block-container");
        this.wrapper.appendChild(this.blockContainer);
        // this.autoSolve();
    }

    setup(){

        for(let i = 0; i < this.sizeGame * this.sizeGame; i+=1){
            this.fragments.push( new Fragment(this,i));
        }
        const datalist = JSON.parse(localStorage.getItem("arrayMoves"));
        if(datalist == null){
        this.shuffle();
        } else {
            this.arrayMoves = datalist;
            this.autoSolve("reload");
        }
        document.querySelector(".countSwap").innerHTML = localStorage.getItem("countSwap") == null ? "Moves: 0": `Moves: ${localStorage.getItem("countSwap")}`;
        document.querySelector(".autoSolve").addEventListener("click", ()=> {
            this.autoSolve();
            this.autoFlag = true;
        });
    }

    shuffle() {
        // let countSwap = 0;
        for(let i=0; i< this.sizeGame**6; i+=1){
           const emptyY= Math.floor(this.findEmpty() / this.sizeGame);
           const emptyX = this.findEmpty() % this.sizeGame;
           const randomNumber = Math.floor(Math.random() * this.sizeGame * this.sizeGame);           
           const {x,y} =this.fragments[randomNumber].getXY(randomNumber);
           if((x === emptyX  || y === emptyY) &&
           (Math.abs(x - emptyX) === 1 || Math.abs(y - emptyY) === 1)){
                this.arrayMoves.push([this.findPosition(this.fragments[randomNumber].index),this.findEmpty()]);
                this.swapFragment(this.findPosition(this.fragments[randomNumber].index), this.findEmpty());  
                // countSwap++;
           }   
        }
        
        // ходы  туда назад удаляю
        const length = this.arrayMoves.length -1;
        for(let j = length; j > 0 ; j-=1){
            if(this.arrayMoves[j][0] === this.arrayMoves[j-1][1]){
                this.arrayMoves.splice(j-1,2);
                if(j>this.arrayMoves.length -1){
                    j-=1;
                }
            }
        }
        // console.log(this.arrayMoves);
        localStorage.arrayMoves = JSON.stringify(this.arrayMoves);
        // console.log("Количество перемещений "+ countSwap);
    }

    autoSolve(reload){ 
        let delay = 40;
        let array = this.arrayMoves.slice();
        if(reload === "reload"){
            delay = 0;
            array = array.reverse();
        }
        let j=0;
        for(let i = array.length-1; i > -1; i-=1){
            
            const that = this;
            const indexOne = array[i][0];
            const indexTwo = array[i][1];
            setTimeout(function(){
                that.swapFragment(indexOne,indexTwo);
            }, j * delay);
            j+=1;   
        }

    }
    

    swapFragment(i,j){
        [this.fragments[i], this.fragments[j]] = [this.fragments[j], this.fragments[i]];
        this.fragments[i].setPosition(i);
        this.fragments[j].setPosition(j);
        if(this.finish() && (this.countSwap !== null || this.autoFlag)){
            // console.log("win");
            const modal = document.querySelector(".finish-modal");
            // modal.style.display="flex";
            modal.style.transitionDelay = "1s";
            modal.style.transform = "translate(0)";
            
            const info = document.querySelector(".info-modal");
            if(!this.autoFlag){

                let min = localStorage.getItem("min");
                let sec = localStorage.getItem("sec");
                info.innerText = "You win!!!";
                info.innerText += `\nMoves:  ${localStorage.getItem("countSwap")}`;
                info.innerText += `  Time: ${min < 10 ? '0'+min : min} : ${sec < 10 ? '0'+sec : sec}`;
                info.innerText += "\nClose to start new game!";

                const topTen = JSON.parse(localStorage.getItem("topTen"));
                if(topTen.length < 10){
                    topTen.push(Number(min)*60+Number(sec));
                    topTen.sort((a,b) => {
                        return a-b;
                    });
                } else if(topTen[topTen.length-1] > (Number(min)*60+Number(sec))){
                        topTen[topTen.length-1] = Number(min)*60+Number(sec);
                        topTen.sort((a,b) => {
                            return a-b;
                        });
                    
                }
                localStorage.topTen = JSON.stringify(topTen);
            } else {
                info.innerText = "The game has ended automatically!";
                info.innerText += "\nClose to start new game!";
            }

        } 
    }

    // убрать
    findPosition(index){
        return this.fragments.findIndex(fragment => fragment.index === index);
    }

    findEmpty(){
        return this.fragments.findIndex(fragment => fragment.empty);
    }

    finish(){
        for(let i=0; i<this.fragments.length;i+=1){
            if(i !== this.fragments[i].index){
                return false;
            }
        }

        return true;
    }

 
    
}