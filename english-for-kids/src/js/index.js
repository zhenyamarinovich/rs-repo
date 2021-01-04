import '../css/style.css';
import '../css/style.scss';
import Header from './Views/Header';
import CardList from './Views/CardList';
import MenuController from './BurgerController';
import Model from './Models/model';
import Router from './router';
import Footer from './Views/Footer';

/*var req = require.context("../assets/images/", false, /\.(png|jpe?g|svg)$/);
let images = req.keys().forEach(function(key){
    req(key);
});*/
function importAll(r) {
    return r.keys().map(r);
  }
  
const images = importAll(require.context('../assets/images/', false, /\.(png|jpe?g|svg)$/));
const audio = importAll(require.context('../assets/audio/', false, /\.(mp3)$/));


const body = document.querySelector("body");
const header = new Header();
const cardList = new CardList();
const footer = new Footer();

//const model = new Model();
//console.log(images);
body.appendChild(header.getHeaderBLock());
body.appendChild(cardList.getCardList());
body.appendChild(footer.getFooterBLock());

const menu = Model.getСategories();
header.renderMenu(menu);
cardList.render(menu);
Router.init();
const menuController = new MenuController();
menuController.addClick();
createStatistic();



function createStatistic(){
  const value = JSON.parse(localStorage.getItem("statistic"));
  if(value) return;

  let information = Model.getFullInformation();
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
}



