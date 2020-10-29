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
      ["CapsLock"], ["a","ф"], ["s","ы"], ["d","в"], ["f","а"], ["g","п"], ["h","р"], ["j","о"], ["k","л"], ["l","д"], [";","ж",":"], ["'","э","\""],["enter"],
      ["Shift"], ["z","я"], ["x","ч"], ["c","с"], ["v","м"], ["b","и"], ["n","т"], ["m","ь"], [",","б","<"], [".","ю",">"], ["/",".","?",","],
      ["en","ru"],["space"],["done"],["left-arrow"],["right-arrow"]
    ];
    /*const KeysValuesMaps = new Set([
      [192, ["`","ё","~"]], [49, ["1","!"]], [50, ["2","@","\""]], [51, ["3","#","№"]], [52, ["4","$",";"]], [53, ["5","%"]], [54, ["6","^",":"]], [55, ["7", "&","?"]],
      [56, ["8", "*"]], [57, ["9", "("]], [48, ["0",")"]], [8, ["backspace"]],
      [81,  ["q","й"]],
      [87, ["w","ц"]],
      [69, ["e","у"]],
      [82, ["r","к"]],
      [84, ["t","е"]],
      [89, ["y","н"]],
      [85, ["u","г"]],
      [73, ["i","ш"]],
      [79, ["o","щ"]],
      [80, ["p","з"]],
      [219, ["[","х","{"]],
      [221, ["]","ъ","}"]],
      [0, ["CapsLock"]],
      [65, ["a","ф"]],
      [83, ["s","ы"]],
      [68, ["d","в"]],
      [70, ["f","а"]],
      [71, ["g","п"]],
      [72, ["h","р"]],
      [74, ["j","о"]],
      [75, ["k","л"]],
      [76, ['l', 'L', 'д', 'Д']],
      [186, [';', ':', 'ж', 'Ж']],
      [222, ["'", '"', 'э', 'Э']],
      [13, { name: 'enter', icon: '' }],
      [301, { name: 'close', icon: '' }],
      [90, ['z', 'Z', 'я', 'Я']],
      [88, ['x', 'X', 'ч', 'Ч']],
      [67, ['c', 'C', 'с', 'С']],
      [86, ['v', 'V', 'м', 'М']],
      [66, ['b', 'B', 'и', 'И']],
      [78, ['n', 'N', 'т', 'Т']],
      [77, ['m', 'M', 'ь', 'Ь']],
      [188, [',', '<', 'б', 'Б']],
      [190, ['.', '>', 'ю', 'Ю']],
      [191, ['/', '?', '.', ',']],
      [16, { name: 'shift', icon: '' }],
      [302, { name: 'language', icon: '' }],
      [32, { name: 'space', icon: '' }],
      [1, { name: 'left', icon: '' }],
      [2, { name: 'right', icon: '' }],
     ]);*/
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

   
      document.querySelector(".use-keyboard-input").addEventListener("blur", () => {
        document.querySelector(".use-keyboard-input").focus();
      });
  

      switch (key[0]) {
        case "backspace":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("backspace");

          keyElement.addEventListener("click", () => {
            let element =  document.querySelector(".use-keyboard-input");
            let length = this.properties.value.length;
            let position = element.selectionEnd;
            let beginString =  element.value;
            this.properties.value = beginString.substring(0, position - 1);
            this.properties.value += beginString.substring(position, length);
            this._triggerEvent("oninput");
            element.selectionEnd = position - 1;
          });

          break;
        case "left-arrow":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("keyboard_arrow_left");

          keyElement.addEventListener("click", () => {
            let element =  document.querySelector(".use-keyboard-input");
            if( element.selectionStart !== 0){
            element.selectionEnd= element.selectionEnd-1;
            }
            /*document.querySelector(".use-keyboard-input").focus();
            document.querySelector(".use-keyboard-input").selectionStart = position -1 ;*/
            this._triggerEvent("oninput");
          });

          break;

        case "right-arrow":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("keyboard_arrow_right");

          keyElement.addEventListener("click", () => {
            let element =  document.querySelector(".use-keyboard-input");
            element.selectionStart = element.selectionEnd+1;
              
              
            /*this.properties.value =  document.querySelector(".use-keyboard-input").value;
            this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);*/
            this._triggerEvent("oninput");
          });

          break;

        case "CapsLock":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
          if(this.properties.capsLock){
            keyElement.classList.add("keyboard__key--active");
          }
          
          keyElement.innerHTML = createIconHTML("keyboard_capslock");

          document.querySelector(".use-keyboard-input").addEventListener('keydown', function(event) {
            let code = event.key;
            if(key[0] === code){  
              Keyboard._toggleCapsLock("caps");
              keyElement.classList.toggle("keyboard__key--active", Keyboard.properties.capsLock);
            }
          });

          keyElement.addEventListener("click", () => {
            this._toggleCapsLock("caps");
            keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
          });

          break;

        case "Shift":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
          keyElement.classList.toggle("keyboard__key--active", this.properties.shift);
          keyElement.textContent = key[0].toLowerCase();

          document.querySelector(".use-keyboard-input").addEventListener('keydown', function(event) {
            if(!keyElement.classList.contains("keyboard__key--active")){
              let code = event.key;
              if(key[0] === code){  
                Keyboard._toggleShift();
                
                keyElement.classList.add("keyboard__key--active");
              }
            }
          });

           document.querySelector(".use-keyboard-input").addEventListener('keyup', function(event) {
            
            //if(keyElement.classList.contains("keyboard__key--active")){
              let code = event.key;
              if(key[0] === code){  
                Keyboard._toggleShift();
                keyElement.classList.remove("keyboard__key--active");
                
              }
            //}
          });


          keyElement.addEventListener("click", () => {
            this._toggleShift();
            
          });

          break;

        case "enter":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("keyboard_return");

          keyElement.addEventListener("click", () => {
            let element =  document.querySelector(".use-keyboard-input");
            let length = this.properties.value.length;
            let position = element.selectionEnd;
            let beginString =  element.value;
            this.properties.value = beginString.substring(0, position);
            this.properties.value += "\n";
            this.properties.value += beginString.substring(position, length);        
            this._triggerEvent("oninput");
            element.selectionEnd = position + 1;
          });

          break;

        case "space":
          keyElement.classList.add("keyboard__key--extra-wide");
          keyElement.innerHTML = createIconHTML("space_bar");

          keyElement.addEventListener("click", () => {
            let element =  document.querySelector(".use-keyboard-input");
            let length = this.properties.value.length;
            let position = element.selectionEnd;
            let beginString =  element.value;
              this.properties.value = beginString.substring(0, position);
              this.properties.value += " ";
            this.properties.value += beginString.substring(position, length);        
            this._triggerEvent("oninput");
            element.selectionEnd = position + 1;
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
          if(this.properties.russianLanguage && (!isNaN(key[0]) || key[0] === "/") && this.properties.shift){
            index = key.length-1;
          }
          //проверка клавиш где есть русские буквы, а английских нету
          else if(!this.properties.russianLanguage && this.properties.shift && notLetters.indexOf(key[0])!=-1){
            index = 2;
          }
          //чтобы не перезаписывало цифры при смене языка RU/EN
          else if(indexLang === 1 &&  !isNaN(key[0])){
            index = 0; 
          } 
            //проверка на зажатый shift
          else if(this.properties.shift && (!isNaN(key[0]) || !key[0].match(/[a-z]/i))){
            index = 1;
          }
          else{
            index = indexLang;
          }

          document.querySelector(".use-keyboard-input").addEventListener('keydown', function(event) {
            let code = event.key;
            if(key[index]===code){
              keyElement.classList.add("keyboard__key--active-button");
            }
          });
          document.querySelector(".use-keyboard-input").addEventListener('keyup', function(event) {
            let code = event.key;
            if(key[index]===code){
            keyElement.classList.remove("keyboard__key--active-button");
            }
          });



          keyElement.textContent = key[index].toLowerCase();
          keyElement.addEventListener("click", () => {
            let element =  document.querySelector(".use-keyboard-input");
            let length = this.properties.value.length;
            let position = element.selectionEnd;
            let beginString =  element.value;
            this.properties.value = beginString.substring(0, position);
            if((this.properties.capsLock && !this.properties.shift) || (!this.properties.capsLock && this.properties.shift)){
              this.properties.value += key[index].toUpperCase();
            } else {
              this.properties.value += key[index].toLowerCase();
            }
             this.properties.value += beginString.substring(position, length);    
            this._triggerEvent("oninput");
            element.selectionEnd = position + 1;
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