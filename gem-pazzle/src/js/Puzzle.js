import Fragment from "./Fragment.js";

export default class Puzzle{
    constructor(parentDiv,image, width){
        this.wrapper = parentDiv;
        this.image = image;
        this.width = width;
        this.height = width;
        this.sizeGame = 3;
        this.fragments = [];

        this.init();  
        this.blockContainer.style.width = `${this.width}px`;
        this.blockContainer.style.height = `${this.height}px`;
        
        this.setup();
        /*const img = new Image();
        img.onload = () => {
            this.height = img.height * this.width/ img.width;
            this.blockContainer.style.width = `${this.width}px`;
            this.blockContainer.style.height = `${this.height}px`;*/   
        /*};
        img.src = "../"+this.image;*/ 
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

        for(let i = 0; i < this.sizeGame * this.sizeGame -1; i++){
            this.fragments.push( new Fragment(this,i));
        }
        this.shuffle();
        console.log(this.fragments);
    }

    shuffle() {
        for (let i = this.fragments.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.fragments[i], this.fragments[j]] = [this.fragments[j], this.fragments[i]];
            this.fragments[i].setPosition(i);
            this.fragments[j].setPosition(j);
        }
       
    }
}