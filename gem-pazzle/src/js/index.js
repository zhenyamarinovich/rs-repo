import '../css/style.css';
import '../css/style.scss';
import BackgroundImg from '../img/99.jpg';
import Puzzle from './Puzzle.js';

const puzzleWrapper = document.createElement("div");
puzzleWrapper.classList.add("puzzle-wrapper");
document.querySelector("body").appendChild(puzzleWrapper);

const puzzle =  new Puzzle(puzzleWrapper,BackgroundImg ,600);

//puzzle.setup();