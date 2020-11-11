import Fragment from "./Fragment.js";

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
        this.init();  
        this.blockContainer.style.width = `${this.width}px`;
        this.blockContainer.style.height = `${this.height}px`;
        this.setup();
    }

    init(){

        this.blockContainer = this.createBlockContainer();
        this.blockContainer.classList.add("block-container");
        this.wrapper.appendChild(this.blockContainer);
        //this.autoSolve();

    }

    createBlockContainer(){
        
        const blockContainer = document.createElement("div");
        return blockContainer;
    }

    setup(){

        for(let i = 0; i < this.sizeGame * this.sizeGame; i++){
            this.fragments.push( new Fragment(this,i));
        }
        let datalist = JSON.parse(localStorage.getItem("arrayMoves"));
        if(datalist == null){
        this.shuffle();
        } else {
            this.arrayMoves = datalist;
            this.autoSolve("reload");
        }
        document.querySelector(".countSwap").innerHTML = localStorage.getItem("countSwap") == null ? "Moves: 0": "Moves: " + localStorage.getItem("countSwap");
    }

    shuffle() {
        //let countSwap = 0;
        for(let i=0; i< Math.pow(this.sizeGame, 6); i++){
           let emptyY= Math.floor(this.findEmpty() / this.sizeGame);
           let emptyX = this.findEmpty() % this.sizeGame;
           let randomNumber = Math.floor(Math.random() * this.sizeGame * this.sizeGame);           
           const {x,y} =this.fragments[randomNumber].getXY(randomNumber);
           if((x === emptyX  || y === emptyY) &&
           (Math.abs(x - emptyX) === 1 || Math.abs(y - emptyY) === 1)){
                this.arrayMoves.push([this.findPosition(this.fragments[randomNumber].index),this.findEmpty()]);
                this.swapFragment(this.findPosition(this.fragments[randomNumber].index), this.findEmpty());  
                //countSwap++;
           }   
        }
        
        //ходы  туда назад удаляю
        let length = this.arrayMoves.length -1;
        for(let j = length; j > 0 ; j--){
            if(this.arrayMoves[j][0] === this.arrayMoves[j-1][1]){
                this.arrayMoves.splice(j-1,2);
                if(j>this.arrayMoves.length -1){
                    j--;
                }
            }
        }
        console.log(this.arrayMoves);
        localStorage["arrayMoves"] = JSON.stringify(this.arrayMoves);
        //console.log("Количество перемещений "+ countSwap);
    }

    autoSolve(reload){
        
        //document.querySelector(".btn").addEventListener("click", ()=> {
            let delay = 40;
            let array = this.arrayMoves.slice();
            if(reload === "reload"){
                delay = 0;
                array = array.reverse();
            }
            let j=0;
            for(let i = array.length-1; i > -1; i--){
                //setTimeout( function() {
                //console.log(this.arrayMoves);
                
                let that = this;
                let indexOne = array[i][0];
                let indexTwo = array[i][1];
                
                //console.log("i: "+this.arrayMoves[i][0] + " j :" + this.arrayMoves[i][1]);
                //setTimeout(()=> {}, 500);
                   j++; 
                    (function(j){
                        setTimeout(function(){
                        //this.swapFragment(this.arrayMoves[j][0],this.arrayMoves[j][1]);
                        that.swapFragment(indexOne,indexTwo);
                        //that.countSwap ++;
                        //localStorage.setItem("countSwap",that.countSwap);
                        //console.log("qwer" + that.fragments);
                        }, j * delay);
                        }(j));       
                //}, i*1000);        
            }
            console.log("solve");

        //});
    }
    

    swapFragment(i,j){
        [this.fragments[i], this.fragments[j]] = [this.fragments[j], this.fragments[i]];
        this.fragments[i].setPosition(i);
        this.fragments[j].setPosition(j);
        if(this.finish() && this.countSwap !== null){
            console.log("win");
            var modal = document.querySelector(".finish-modal");
            //modal.style.display="flex";
            modal.style.transform = "translate(0)";
            var info = document.querySelector(".info-modal");
            let dateBegin = new Date(parseInt(localStorage.getItem('time')));
            let dateNow = new Date();
            let min = Math.floor((dateNow - dateBegin)/1000/60);
            min = min < 10 ? "0" + min : min;
            let sec = Math.floor((dateNow - dateBegin)/1000) - min*60;
            sec = sec < 10 ? "0" + sec : sec;

            info.innerText = "You win!!!";
            info.innerText += "\nMoves: " + localStorage.getItem("countSwap");
            info.innerText += `   Time: ${min}: ${sec}`;
            info.innerText += "\nClose to start new game!"


            
// When the user clicks on <span> (x), close the modal
           
            //let min = Math.floor((this.endTime - this.startTime)/1000/60);
            //let sec = Math.floor((this.endTime - this.startTime)/1000) - min*60;
            //console.log("win : " + min +" min " + sec +" sec");
            //console.log("countSwap: "+ this.countSwap);
        }
    }

    //убрать
    findPosition(index){
        return this.fragments.findIndex(fragment => fragment.index === index);
    }

    findEmpty(){
        return this.fragments.findIndex(fragment => fragment.empty);
    }

    finish(){
        for(let i=0; i<this.fragments.length;i++){
            if(i !== this.fragments[i].index){
                return false;
            }
        }
        //this.endTime = new Date();
        return true;
    }
    
}