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
        this.init();  
        this.blockContainer.style.width = `${this.width}px`;
        this.blockContainer.style.height = `${this.height}px`;

        this.setup();

       
    }

    init(){

        this.blockContainer = this.createBlockContainer();
        this.blockContainer.classList.add("block-container");
        this.wrapper.appendChild(this.blockContainer);

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
        setTimeout(()=>{},10000);
        console.log(this.fragments);
    }

    shuffle() {
        let countSwap = 0;
        for(let i=0; i< Math.pow(this.sizeGame, 5); i++){
           let emptyY= Math.floor(this.findEmpty() / this.sizeGame);
           let emptyX = this.findEmpty() % this.sizeGame;
           let randomNumber = Math.floor(Math.random() * this.sizeGame * this.sizeGame);           
           const {x,y} =this.fragments[randomNumber].getXY(randomNumber);
           if((x === emptyX  || y === emptyY) &&
           (Math.abs(x - emptyX) === 1 || Math.abs(y - emptyY) === 1)){
                this.arrayMoves.push([this.findPosition(this.fragments[randomNumber].index),this.findEmpty()]);
                this.swapFragment(this.findPosition(this.fragments[randomNumber].index), this.findEmpty());  
                countSwap++;
           }   
        }
        console.log(this.arrayMoves);
        console.log("Количество перемещений "+ countSwap);
    }

    autoSolve(){
        
        document.querySelector(".btn").addEventListener("click", ()=> {
            for(let i = this.arrayMoves.length-1; i > -1; i--){
                this.swapFragment(this.arrayMoves[i][0],this.arrayMoves[i][1]);
            }
            console.log("solve");
        })      
    }

    swapFragment(i,j){
        [this.fragments[i], this.fragments[j]] = [this.fragments[j], this.fragments[i]];
        this.fragments[i].setPosition(i);
        this.fragments[j].setPosition(j);
        if(this.finish()){
            console.log("win");
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
        return true;
    }
}