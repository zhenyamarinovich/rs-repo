import Fragment from "./Fragment.js";

export default class Puzzle{
    constructor(parentDiv,image, width){
        this.wrapper = parentDiv;
        this.image = image;
        this.width = width;
        this.height = width;
        this.sizeGame = 3;
        this.fragments = [];
        this.arrayMoves = [];
        this.countSwap = 0;
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

        this.autoSolve();

    }

    createBlockContainer(){
        
        const blockContainer = document.createElement("div");
        return blockContainer;
    }

    setup(){

        for(let i = 0; i < this.sizeGame * this.sizeGame; i++){
            this.fragments.push( new Fragment(this,i));
        }
        this.shuffle();
        //this.startTime =  new Date();
        //setTimeout(()=>{},10000);
        //console.log(this.arrayMoves);
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
        //console.log("Количество перемещений "+ countSwap);
    }

    autoSolve(){
        
        /*document.querySelector(".btn").addEventListener("click", ()=> {
            let j=0;
            for(let i = this.arrayMoves.length-1; i > -1; i--){
                //setTimeout( function() {
                //console.log(this.arrayMoves);
                
                let that = this;
                let indexOne = that.arrayMoves[i][0];
                let indexTwo = that.arrayMoves[i][1];
                
                //console.log("i: "+this.arrayMoves[i][0] + " j :" + this.arrayMoves[i][1]);
                //setTimeout(()=> {}, 500);
                   j++; 
                    (function(j){
                        setTimeout(function(){
                        //this.swapFragment(this.arrayMoves[j][0],this.arrayMoves[j][1]);
                        that.swapFragment(indexOne,indexTwo);
                        that.countSwap ++;
                        //console.log("qwer" + that.fragments);
                        }, j * 20);
                        }(j));       
                //}, i*1000);        
            }
            console.log("solve");

        });*/
    }
    

    swapFragment(i,j){
        [this.fragments[i], this.fragments[j]] = [this.fragments[j], this.fragments[i]];
        this.fragments[i].setPosition(i);
        this.fragments[j].setPosition(j);
        if(this.finish()){
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