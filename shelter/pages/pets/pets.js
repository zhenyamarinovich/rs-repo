const logo = document.getElementById('logo');
const menu = document.querySelector(".nav-menu");
const background = document.querySelector(".dark-background");
const menuCloseItem = document.querySelector(".header__nav-close");
const burgerItem = document.querySelector(".burger");
const body =document.querySelector('body');

const modal = document.getElementById("pet-model");
const cards = document.querySelectorAll(".card");
const closeModal = document.querySelector(".close-model");

const lastPage= document.querySelector(".last-page");
const nextPage= document.querySelector(".next-page");
const prevPage= document.querySelector(".prev-page");
const firstPage= document.querySelector(".first-page");

const petsArray = [
  {
    "name": "Jennifer",
    "img": "../../assets/images/pets-jennifer-min.png",
    "type": "Dog",
    "breed": "Labrador",
    "description": "Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.",
    "age": "2 months",
    "inoculations": ["none"],
    "diseases": ["none"],
    "parasites": ["none"]
  },
  {
    "name": "Sophia",
    "img": "../../assets/images/pets-sophia-min.jpg",
    "type": "Dog",
    "breed": "Shih tzu",
    "description": "Sophia here and I'm looking for my forever home to live out the best years of my life. I am full of energy. Everyday I'm learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.",
    "age": "1 month",
    "inoculations": ["parvovirus"],
    "diseases": ["none"],
    "parasites": ["none"]
  },
  {
    "name": "Woody",
    "img": "../../assets/images/pets-woody-min.png",
    "type": "Dog",
    "breed": "Golden Retriever",
    "description": "Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.",
    "age": "3 years 6 months",
    "inoculations": ["adenovirus", "distemper"],
    "diseases": ["right back leg mobility reduced"],
    "parasites": ["none"]
  },
  {
    "name": "Scarlett",
    "img": "../../assets/images/pets-scarlet-min.png",
    "type": "Dog",
    "breed": "Jack Russell Terrier",
    "description": "Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.",
    "age": "3 months",
    "inoculations": ["parainfluenza"],
    "diseases": ["none"],
    "parasites": ["none"]
  },
  {
    "name": "Katrine",
    "img": "../../assets/images/pets-katrine-min.png",
    "type": "Cat",
    "breed": "British Shorthair",
    "description": "Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.",
    "age": "6 months",
    "inoculations": ["panleukopenia"],
    "diseases": ["none"],
    "parasites": ["none"]
  },
  {
    "name": "Timmy",
    "img": "../../assets/images/pets-timmy-min.png",
    "type": "Cat",
    "breed": "British Shorthair",
    "description": "Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.",
    "age": "2 years 3 months",
    "inoculations": ["calicivirus", "viral rhinotracheitis"],
    "diseases": ["kidney stones"],
    "parasites": ["none"]
  },
  {
    "name": "Freddie",
    "img": "../../assets/images/pets-freddie-min.png",
    "type": "Cat",
    "breed": "British Shorthair",
    "description": "Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.",
    "age": "2 months",
    "inoculations": ["rabies"],
    "diseases": ["none"],
    "parasites": ["none"]
  },
  {
    "name": "Charly",
    "img": "../../assets/images/pets-charly-min.jpg",
    "type": "Dog",
    "breed": "Jack Russell Terrier",
    "description": "This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.",
    "age": "8 years",
    "inoculations": ["bordetella bronchiseptica", "leptospirosis"],
    "diseases": ["deafness", "blindness"],
    "parasites": ["lice", "fleas"]
  }
];

let paginationArray = [];
let pageNumber = 1;
let countPage768 = 16;
let countPage1280 = 8;
let countPageMaxWidth = 6;


const sortForSix = (mass) => {
  let length = mass.length;

  for(let i=0; i< (length/6); i++){
    const stepList = mass.slice(i*6, (i*6)+6);
  
  for(let j=0; j<6; j++){
    const duplicatedItem = stepList.find((item,ind) => {
      return item.name === stepList[j].name && (ind != j);
    });

    if(duplicatedItem !== undefined){
      const ind = (i*6)+j;
      const whichOfList = Math.trunc(ind/8);

      mass.splice(whichOfList*8, 0, mass.splice(ind,1)[0]);
      i-=2;
      break;
    }
  }
}
  
  return mass;
}

for(let i=0; i< 6; i++){
 paginationArray.push(shuffle(petsArray.slice(0)));
}
let pageArray = sortForSix(paginationArray.flat());







getCardOnPage(pageNumber);


function getCardOnPage(pageNumberLocal){
  let petCards = document.querySelectorAll(".card");
  let activePage = document.querySelector(".active_page-card");

  let countPets;
  let maxPage;
  const screenWidth = window.screen.width;
  if(screenWidth <1280 && screenWidth >768){
    countPets = 6;
    maxPage = 8;
    if(pageNumberLocal > 8){
      pageNumber = 8;
      pageNumberLocal = 8;
    }
    
  } else if(screenWidth <768){
    countPets = 3;
    maxPage = 16;
    if(pageNumberLocal > 16){
      pageNumber = 16;
      pageNumberLocal = 16;
    }
    
  }else{
    countPets = 8;
    maxPage = 6;
    if(pageNumberLocal > 6){
      pageNumber = 6;
      pageNumberLocal = 6;
    }
  }

  activePage.children[0].innerHTML = pageNumber;
  

  if(pageNumberLocal === 1){
    prevPage.classList.add("inactive_page-card");
    prevPage.classList.remove("next_page-card");
    firstPage.classList.add("inactive_page-card");
    firstPage.classList.remove("next_page-card");
    lastPage.classList.remove("inactive_page-card");
    lastPage.classList.add("next_page-card");
    nextPage.classList.remove("inactive_page-card");
    nextPage.classList.add("next_page-card");
  }
  else if(pageNumberLocal === maxPage){
    lastPage.classList.add("inactive_page-card");
    lastPage.classList.remove("next_page-card");
    nextPage.classList.add("inactive_page-card");
    nextPage.classList.remove("next_page-card");
    prevPage.classList.remove("inactive_page-card");
    prevPage.classList.add("next_page-card");
    firstPage.classList.remove("inactive_page-card");
    firstPage.classList.add("next_page-card");
  } else {
    lastPage.classList.remove("inactive_page-card");
    lastPage.classList.add("next_page-card");
    nextPage.classList.remove("inactive_page-card");
    nextPage.classList.add("next_page-card");
    prevPage.classList.remove("inactive_page-card");
    prevPage.classList.add("next_page-card");
    firstPage.classList.remove("inactive_page-card");
    firstPage.classList.add("next_page-card");
  }
  
  let j=0;
  petCards.forEach(element => {
    element.classList.add("fadeOut");
  })
  setTimeout(function() {
  for(let i=(pageNumberLocal-1)*countPets; i <countPets*pageNumberLocal;i++){
   
    
    
    petCards[j].children[1].innerHTML = pageArray[i].name; 
    petCards[j].children[0].alt = pageArray[i].name;
    petCards[j].children[0].src = pageArray[i].img;
    petCards[j].classList.remove("fadeOut");
    j++;
  }
    },1000);
  }
  j=0;


lastPage.onclick= function() {
  const screenWidth = window.screen.width;
  if(screenWidth <1280 && screenWidth >768){
    pageNumber = countPage1280;
  } else if(screenWidth <768){
    pageNumber = countPage768;
  }else{
    pageNumber = countPageMaxWidth;
  }
  getCardOnPage(pageNumber);
}

nextPage.onclick=function() {
  pageNumber++;
  getCardOnPage(pageNumber);
}

prevPage.onclick=function() {
  pageNumber--;
  getCardOnPage(pageNumber);
}

firstPage.onclick= function() {
  pageNumber = 1;
  getCardOnPage(pageNumber);
}

window.onresize = function( event ) {
  getCardOnPage(pageNumber );
};

//рандомная сортировка
function shuffle(arr){
	var j, temp;
	for(var i = arr.length - 1; i > 0; i--){
		j = Math.floor(Math.random()*(i + 1));
		temp = arr[j];
		arr[j] = arr[i];
		arr[i] = temp;
	}
	return arr;
}

(function () {
  burgerItem.addEventListener("click", () => {
    menu.classList.add("nav-menu_active");
    background.classList.add("dark-background_active");
    logo.style.visibility = "hidden";
    menuCloseItem.classList.add("header__nav-animation");

    });
  menuCloseItem.addEventListener("click", () => {
    removeInfo();
  });
  body.addEventListener("click", () => {
    if(document.documentElement.clientWidth - 320 > event.clientX){
      removeInfo();
    }
  })
})();

function removeInfo(){
  menu.classList.remove("nav-menu_active");
  background.classList.remove("dark-background_active");
  logo.style.visibility = "visible";
  menuCloseItem.classList.remove("header__nav-animation");
}

cards.forEach(card => {
  card.addEventListener("click", () => {
    let titleCard = card.children[1].innerHTML;
    for(let i=0; i<petsArray.length; i++){
      if(petsArray[i].name === titleCard){
        document.querySelector(".modal-image").src = petsArray[i].img;
        document.querySelector(".modal-image").alt = petsArray[i].name;
        document.querySelector(".modal-title").innerHTML = petsArray[i].name;
        document.querySelector(".modal-subtitle").innerHTML = petsArray[i].type + " - " + petsArray[i].breed;
        document.querySelector(".modal-description").innerHTML = petsArray[i].description;
        document.querySelector(".age").innerHTML = " "+ petsArray[i].age;
        document.querySelector(".diseases").innerHTML =" "+ petsArray[i].diseases;
        document.querySelector(".inoculations").innerHTML =" "+ petsArray[i].inoculations;
        document.querySelector(".parasites").innerHTML = " "+ petsArray[i].parasites;
      }
    }
    modal.style.display = "flex";
  })
})
  
closeModal.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event){
  if (event.target == modal){
    modal.style.display="none";
  }
}

