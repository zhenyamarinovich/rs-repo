export default class Fragment {
    constructor(puzzle, index){
        this.puzzle = puzzle;
        this.index = index;
        
        this.width = this.puzzle.width/this.puzzle.sizeGame;
        this.height = this.puzzle.height/this.puzzle.sizeGame;

        this.element = this.createElement();
        puzzle.blockContainer.appendChild(this.element); 
    }

    createElement(){
        const element = document.createElement("div");
        element.classList.add("fragment");
        const left = this.width * (this.index % this.puzzle.sizeGame);
        const top = this.height * Math.floor(this.index / this.puzzle.sizeGame);
        element.style.backgroundImage = `url(../${this.puzzle.image})`;
        element.style.backgroundSize = `${this.puzzle.width}px ${this.puzzle.height}px`
        element.style.width = `${this.width}px`;
        element.style.height = `${this.height}px`;
        element.style.left = `${left}px`;
        element.style.top = `${top}px`;
        element.style.backgroundPosition = `-${left}px -${top}px`;
        return element;
    }

    setPosition(index) {
        const  {left, top} = this.getPositionFromIndex(index);
        this.element.style.left = `${left}px`;
        this.element.style.top = `${top}px`;
    }

    getPositionFromIndex(index){
        return {
            left: this.width * (index % this.puzzle.sizeGame),
            top: this.height*Math.floor(index / this.puzzle.sizeGame)

        }
    }
}