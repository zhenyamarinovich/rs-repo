import GameController from './GameController';
import Model from './Models/model';
import CardList from './Views/CardList';


const cardList = new CardList();
const gameController = new GameController();
export default {
    MenuRoute(){
        const menu = Model.getСategories();
        cardList.render(menu);
    },
    ActionARoute(){
        const actionsA = Model.getActionA();
        console.log("ActionsA",actionsA);
        cardList.render(actionsA);
        gameController.init();
    },
    ActionBRoute(){
        const actionsB = Model.getActionB();
        console.log("ActionsB",actionsB);
        cardList.render(actionsB);
        gameController.init();
    },
    AnimalARoute(){
        const animalsA = Model.getAnimalA();
        console.log("AnimalA",animalsA);
        cardList.render(animalsA);
        gameController.init();
    },
    AnimalBRoute(){
        const animalsB = Model.getAnimalB();
        console.log("AnimalB", animalsB);
        cardList.render(animalsB);
        gameController.init();
    },
    ClothesRoute(){
        const clothers = Model.getClothes();
        console.log("Clothers", clothers);
        cardList.render(clothers);
        gameController.init();
    },
    EmotionsRoute(){
        const emotions = Model.getEmotions();
        console.log("Emotions", emotions);
        cardList.render(emotions);
        gameController.init();
    },
    FoodRoute(){
        const food = Model.getFood();
        console.log("Food", food);
        cardList.render(food);
        gameController.init();
    },
    HouseRoute(){
        const house = Model.getHouse();
        console.log("House", house);
        cardList.render(house);
        gameController.init();
    },
    StatisticRoute(){
        const statistic = JSON.parse(localStorage.getItem("statistic"));
        console.log(statistic);
        cardList.renderStatistic(statistic);
    }    

}
