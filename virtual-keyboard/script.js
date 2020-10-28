const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: []
  },

  eventHandlers: {
    oninput: null,
    onclose: null
  },

  properties: {
    value: "",
    russianLanguage: false,
    capsLock: false,
    shift: false
  },

  init() {
    // Create main elements
    this.elements.main = document.createElement("div");
    this.elements.keysContainer = document.createElement("div");

    // Setup main elements
    this.elements.main.classList.add("keyboard", "keyboard--hidden");
    this.elements.keysContainer.classList.add("keyboard__keys");
    this.elements.keysContainer.appendChild(this._createKeys());

    this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

    // Add to DOM
    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);

    // Automatically use keyboard for elements with .use-keyboard-input
    document.querySelectorAll(".use-keyboard-input").forEach(element => {
      element.addEventListener("focus", () => {
        this.open(element.value, currentValue => {
          element.value = currentValue;
        });
      });
    });
  },

  _createKeys() {
    let indexLang = this.properties.russianLanguage ? 1 : 0;
    const fragment = document.createDocumentFragment();
    let notLetters = [",",".","/","`",";","'","[","]"]; 
    const keyLayout = [
      ["`","ё","~"],["1","!"], ["2","@","\""], ["3","#","№"], ["4","$",";"], ["5","%"], ["6","^",":"], ["7", "&","?"], ["8", "*"], ["9", "("], ["0",")"], ["backspace"],
      ["q","й"], ["w","ц"], ["e","у"], ["r","к"], ["t","е"], ["y","н"], ["u","г"], ["i","ш"], ["o","щ"], ["p","з"],["[","х","{"], ["]","ъ","}"],
      ["caps"], ["a","ф"], ["s","ы"], ["d","в"], ["f","а"], ["g","п"], ["h","р"], ["j","о"], ["k","л"], ["l","д"], [";","ж",":"], ["'","э","\""],["enter"],
      ["shift"], ["z","я"], ["x","ч"], ["c","с"], ["v","м"], ["b","и"], ["n","т"], ["m","ь"], [",","б","<"], [".","ю",">"], ["/",".","?",","],
      ["en","ru"],["space"],["done"]
    ];
    /*const keyLayout = [
       "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
      "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
      "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
      "done", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?",
      "en/ru","space"
    ];*/

    // Creates HTML for an icon
    const createIconHTML = (icon_name) => {
      return `<i class="material-icons">${icon_name}</i>`;
    };

    keyLayout.forEach(key => {
      const keyElement = document.createElement("button");
      //const insertLineBreak = [].indexOf(key) !== -1;
      const insertLineBreakMass = ["]", "/","backspace", "enter"].indexOf(key[0]) !== -1;
      

      // Add attributes/classes
      keyElement.setAttribute("type", "button");
      keyElement.classList.add("keyboard__key");

      switch (key[0]) {
        case "backspace":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("backspace");

          keyElement.addEventListener("click", () => {
            this.properties.value =  document.querySelector(".use-keyboard-input").value;
            this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
            this._triggerEvent("oninput");
          });

          break;

        case "caps":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
          if(this.properties.capsLock){
            keyElement.classList.add("keyboard__key--active");
          }
         
          keyElement.innerHTML = createIconHTML("keyboard_capslock");

          keyElement.addEventListener("click", () => {
            this._toggleCapsLock("caps");
            keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
          });

          break;

        case "shift":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
          keyElement.classList.toggle("keyboard__key--active", this.properties.shift);
          keyElement.textContent = key[0].toLowerCase();
          keyElement.addEventListener("click", () => {
            this._toggleShift();
            
          });

          break;

        case "enter":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("keyboard_return");

          keyElement.addEventListener("click", () => {
            this.properties.value =  document.querySelector(".use-keyboard-input").value;
            this.properties.value += "\n";
            this._triggerEvent("oninput");
          });

          break;

        case "space":
          keyElement.classList.add("keyboard__key--extra-wide");
          keyElement.innerHTML = createIconHTML("space_bar");

          keyElement.addEventListener("click", () => {
            this.properties.value =  document.querySelector(".use-keyboard-input").value;
            this.properties.value += " ";
            this._triggerEvent("oninput");
          });

          break;

        case "done":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
          keyElement.innerHTML = createIconHTML("check_circle");

          keyElement.addEventListener("click", () => {
            this.close();
            this._triggerEvent("onclose");
          });

          break;

        case "en":  
            keyElement.classList.add("keyboard__key--wide");
            keyElement.textContent = key[indexLang].toLowerCase();
            keyElement.addEventListener("click", () => {
              /*this.properties.shift =  false;
              this.properties.capsLock = false;*/
              this._toggleLanguage();
              //keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
            });

          break;

        default:
          let index = indexLang;
          //RU + shift клавиши доп
          if(this.properties.russianLanguage && (!isNaN(key[0]) || key[length-1] === ",") && this.properties.shift){
            index = key.length-1;
          }
          //проверка клавиш где есть русские буквы, а английских нету
          else if(!this.properties.russianLanguage && this.properties.shift && notLetters.indexOf(key[0])!=-1){
            index = 2;
          }
          //чтобы не перезаписывало цифры при смене языка RU/EN
          else if(indexLang === 1 &&  !isNaN(key[0])){
            index = 0;
            //проверка на зажатый shift
          } else if(this.properties.shift && (!isNaN(key[0]) || !key[0].match(/[a-z]/i))){
            index = 1;
          }
          else{
            index = indexLang;
          }
          keyElement.textContent = key[index].toLowerCase();
          keyElement.addEventListener("click", () => {
            this.properties.value =  document.querySelector(".use-keyboard-input").value;
            this.properties.value += this.properties.capsLock ? key[index].toUpperCase() : key[index].toLowerCase();
            this._triggerEvent("oninput");
          });

          break;
      }


      fragment.appendChild(keyElement);

      if (insertLineBreakMass) {
        fragment.appendChild(document.createElement("br"));
      }
    });

    return fragment;
  },

  _triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] == "function") {
      this.eventHandlers[handlerName](this.properties.value);
    }
    //add focus on virtual
    if(handlerName === "oninput"){
      document.querySelector(".use-keyboard-input").focus();
    }
  },

  _toggleCapsLock(nameBtn) {
    if(nameBtn === "caps"){
      this.properties.capsLock = !this.properties.capsLock;
    }
   
    for (const key of this.elements.keys) {
      if (key.childElementCount === 0 && key.innerHTML !== "ru"
       && key.innerHTML !== "en" && key.innerHTML !== "shift") {
        if(this.properties.capsLock === false && this.properties.shift === false){
          key.textContent = key.textContent.toLowerCase();
        } else if(this.properties.capsLock === true && this.properties.shift === true){
          key.textContent = key.textContent.toLowerCase();
        } else {
          key.textContent = key.textContent.toUpperCase();
        }
      
      }
    }
  },

  
  _toggleShift() {
    this.properties.shift = !this.properties.shift;
    document.querySelector(".keyboard__keys").innerHTML = "";
    this.elements.keysContainer.appendChild(this._createKeys());
    this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");
    this._toggleCapsLock("shift");
  },


  _toggleLanguage(){
    this.properties.russianLanguage = !this.properties.russianLanguage;
    document.querySelector(".keyboard__keys").innerHTML = "";
    this.elements.keysContainer.appendChild(this._createKeys());
    this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");
    if((this.properties.capsLock && !this.properties.shift) || (!this.properties.capsLock && this.properties.shift)){
      this._toggleCapsLock();
    }
  },

  open(initialValue, oninput, onclose) {
    this.properties.value = initialValue || "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.remove("keyboard--hidden");
  },

  close() {
    this.properties.value = "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.add("keyboard--hidden");
  }
};

window.addEventListener("DOMContentLoaded", function () {
  Keyboard.init();
});