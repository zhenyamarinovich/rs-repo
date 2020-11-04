export default class Fragment {
    constructor(puzzle, index){
        this.puzzle = puzzle;
        this.index = index;
        this.empty = false;
        this.width = this.puzzle.width/this.puzzle.sizeGame;
        this.height = this.puzzle.height/this.puzzle.sizeGame;

        this.element = this.createElement();
        puzzle.blockContainer.appendChild(this.element); 
        if(this.index === this.puzzle.sizeGame *this.puzzle.sizeGame - 1 ){
            this.empty = true;
            return;
        }
        this.setImage();
    }

    createElement(){
        const element = document.createElement("div");
        const left = this.width * (this.index % this.puzzle.sizeGame);
        const top = this.height * Math.floor(this.index / this.puzzle.sizeGame);
        element.classList.add("fragment"); 
        element.style.backgroundSize = `${this.puzzle.width}px ${this.puzzle.height}px`
        element.style.width = `${this.width}px`;
        element.style.height = `${this.height}px`;
        element.style.left = `${left}px`;
        element.style.top = `${top}px`;
        element.addEventListener("click", () => {
            
           // console.log(this.index, this.puzzle.findPosition(this.index));
            console.log(this.puzzle.findEmpty());
            const currentIndex = this.puzzle.findPosition(this.index);
            const emptyIndex = this.puzzle.findEmpty();
            const {x,y} = this.getXY(currentIndex);
            const {x:emptyX,y:emptyY} = this.getXY(emptyIndex); 
            console.log(x,y);
            console.log(emptyX,emptyY);
            if((x === emptyX || y === emptyY) &&
             (Math.abs(x - emptyX) === 1 || Math.abs(y - emptyY) === 1)){
                 console.log("swap");
                 this.puzzle.swapFragment(currentIndex,emptyIndex);
                 
             }
        });
        return element;
    }

    setImage(){
        const {x,y} = this.getXY(this.index); 
        const left = this.width * x;
        const top = this.height * y;
        this.element.style.backgroundImage = `url(../${this.puzzle.image})`;
        this.element.style.backgroundPosition = `-${left}px -${top}px`;
    }

    setPosition(index) {
        const {x,y} = this.getXY(this.index); 
        const  {left, top} = {
            left: this.width * (index % this.puzzle.sizeGame),
            top:this.height*Math.floor(index / this.puzzle.sizeGame)
        };
        this.element.style.left = `${left}px`;
        this.element.style.top = `${top}px`;
    }

    getXY(index){
        return {
            x: index % this.puzzle.sizeGame,
            y: Math.floor(index / this.puzzle.sizeGame)
        }
    }
}