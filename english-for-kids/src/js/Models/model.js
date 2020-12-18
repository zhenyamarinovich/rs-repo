import cardsInfo from '../Data/CardsInfo';
export default {
    getPage(value){
        switch(value) {
            case 'ActionA': return cardsInfo[1];
            case 'ActionB': return cardsInfo[2];
            case 'AnimalA': return cardsInfo[3];
            case 'AnimalB': return cardsInfo[4];
            case 'Clothes': return cardsInfo[5];
            case 'Emotions': return cardsInfo[6];
            case 'House': return cardsInfo[7];
            case 'Food': return cardsInfo[8];
            case 'Repeat': return this.getRepeatWords();
        }
    },
    getСategories(){
        return cardsInfo[0];
    },
    getRepeatWords(){
        let repeatArray = [];
        let indexArray = [];
        let repeatWords = [];
        let statistic = JSON.parse(localStorage.getItem("statistic"));
        //console.log(statistic.errors);
        for(let i=0; i < statistic["errors"].length; i++){
            if( statistic["errors"][i] != 0){
                repeatArray.push(Number(statistic["errors"][i]));
                indexArray.push(i);
            }
        }
        while(repeatArray.length > 8){
            let valueMin = Math.min.apply(null, repeatArray);
            let indexMin = repeatArray.indexOf(valueMin);
            repeatArray.splice(indexMin,1);
            indexArray.splice(indexMin,1);
        }
        for(let i=0; i< repeatArray.length; i++){
            repeatArray[i] = (statistic["word"][indexArray[i]]);
        }
        for(let i=1 ; i< cardsInfo.length; i++){
            for(let j=0;j< cardsInfo.length-1; j++){
                if(repeatArray.indexOf(cardsInfo[i][j].word) != -1){
                    repeatWords.push(cardsInfo[i][j]);
                }
            }
         
        }
        return repeatWords;
        
    }
};