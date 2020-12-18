import GameController from './GameController';
import Model from '../Models/model';
import CardList from '../Views/CardList';


const cardList = new CardList();
const gameController = new GameController();
export default {
    MenuRoute(){
        const menu = Model.getСategories();
        cardList.render(menu);
    },
    PageRoute(value){
        const page = Model.getPage(value);
        cardList.render(page);
        gameController.init();
    },
    StatisticRoute(){
        const statistic = JSON.parse(localStorage.getItem("statistic"));
        cardList.renderStatistic(statistic);
    },
}
