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
    shift: false,
    indexNeedElement: 0
  },
  keyLayout : [
    ["`","ё","~"],["1","!"], ["2","@","\""], ["3","#","№"], ["4","$",";"], ["5","%"], ["6","^",":"], ["7", "&","?"], ["8", "*"], ["9", "("], ["0",")"], ["backspace"],
    ["q","й"], ["w","ц"], ["e","у"], ["r","к"], ["t","е"], ["y","н"], ["u","г"], ["i","ш"], ["o","щ"], ["p","з"],["[","х","{"], ["]","ъ","}"],
    ["CapsLock"], ["a","ф"], ["s","ы"], ["d","в"], ["f","а"], ["g","п"], ["h","р"], ["j","о"], ["k","л"], ["l","д"], [";","ж",":"], ["'","э","\""],["enter"],
    ["Shift"], ["z","я"], ["x","ч"], ["c","с"], ["v","м"], ["b","и"], ["n","т"], ["m","ь"], [",","б","<"], [".","ю",">"], ["/",".","?",","],
    ["en","ru"],["space"],["done"],["left-arrow"],["right-arrow"]
  ],
  notLetters : [",",".","/","`",";","'","[","]"],

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
    
    const fragment = document.createDocumentFragment();
    
   
    const KeysValuesMaps = [
      [192, ['`', '~', 'ё', 'Ё']],
      [49, ['1', '!', '1', '!']],
      [50, ['2', '@', '2', '"']],
      [51, ['3', '#', '3', '№']],
      [52, ['4', '$', '4', ';']],
      [53, ['5', '%', '5', '%']],
      [54, ['6', '^', '6', ':']],
      [55, ['7', '&', '7', '?']],
      [56, ['8', '*', '8', '*']],
      [57, ['9', '(', '9', '(']],
      [48, ['0', ')', '0', ')']],
      [8,  ['backspace']],
      [81, ['q', 'Q', 'й', 'Й']],
      [87, ['w', 'W', 'ц', 'Ц']],
      [69, ['e', 'E', 'у', 'У']],
      [82, ['r', 'R', 'к', 'К']],
      [84, ['t', 'T', 'е', 'Е']],
      [89, ['y', 'Y', 'н', 'Н']],
      [85, ['u', 'U', 'г', 'Г']],
      [73, ['i', 'I', 'ш', 'Ш']],
      [79, ['o', 'O', 'щ', 'Щ']],
      [80, ['p', 'P', 'з', 'З']],
      [219, ['[', '{', 'х', 'Х']],
      [221, [']', '}', 'ъ', 'Ъ']],
      [20, ['CapsLock']],
      [65, ['a', 'A', 'ф', 'Ф']],
      [83, ['s', 'S', 'ы', 'Ы']],
      [68, ['d', 'D', 'в', 'В']],
      [70, ['f', 'F', 'а', 'А']],
      [71, ['g', 'G', 'п', 'П']],
      [72, ['h', 'H', 'р', 'Р']],
      [74, ['j', 'J', 'о', 'О']],
      [75, ['k', 'K', 'л', 'Л']],
      [76, ['l', 'L', 'д', 'Д']],
      [186, [';', ':', 'ж', 'Ж']],
      [222, ["'", '"', 'э', 'Э']],
      [13, ['enter']],
      [16, ['Shift']],
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
      [302, ["en","ru"]],
      [32, ['space']],
      [301, ['done']],
      [1, ['left-arrow']],
      [2, ['right-arrow']],
      ];

    // Creates HTML for an icon
    const createIconHTML = (icon_name) => {
      return `<i class="material-icons">${icon_name}</i>`;
    };

    KeysValuesMaps.forEach(key => {
      const keyElement = document.createElement("button");
      //const insertLineBreak = [].indexOf(key) !== -1;
      const insertLineBreakMass = ["]", "/","backspace", "enter"].indexOf(key[1][0]) !== -1;
      

      // Add attributes/classes
      keyElement.setAttribute("type", "button");
      keyElement.classList.add("keyboard__key");

   
      document.querySelector(".use-keyboard-input").addEventListener("blur", () => {
        document.querySelector(".use-keyboard-input").focus();
      });

      //set indexElement
   

      switch (key[1][0]) {
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
            if( element.selectionEnd !== 0){
            element.selectionEnd= element.selectionEnd-1;
            }
            this._triggerEvent("oninput");
          });

          break;

        case "right-arrow":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("keyboard_arrow_right");

          keyElement.addEventListener("click", () => {
            let element =  document.querySelector(".use-keyboard-input");
            element.selectionStart = element.selectionEnd+1;
            this._triggerEvent("oninput");
          });

          break;

        case "CapsLock":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
          if(this.properties.capsLock){
            keyElement.classList.add("keyboard__key--active");
          }
          
          keyElement.innerHTML = createIconHTML("keyboard_capslock");

          keyElement.addEventListener("click", () => {
            this._toggleCapsLock("caps");
            keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
          });


          /*document.querySelector(".use-keyboard-input").addEventListener('keydown', function(event) {
            let code = event.key;
            if(key[0] === code){  
              Keyboard._toggleCapsLock("caps");
              keyElement.classList.toggle("keyboard__key--active", Keyboard.properties.capsLock);
            }
          });*/
          break;

        case "Shift":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
          keyElement.classList.toggle("keyboard__key--active", this.properties.shift);
          keyElement.textContent = key[1][0].toLowerCase();        
          keyElement.addEventListener("click", () => {
            this.properties.shift = !this.properties.shift;
            keyElement.classList.toggle("keyboard__key--active", this.properties.shift);
            this._getIndexElement();
            let position = 0;
            for (const elem of this.elements.keys) {
              if (elem.childElementCount === 0 && elem.innerHTML !== "ru"
               && elem.innerHTML !== "en" && elem.innerHTML !== "shift") {   
                
                elem.textContent = KeysValuesMaps[position][1][this.indexNeedElement];
                 
              }
              position++; 
            } 
            this._toggleCapsLock("shift");        
          });

          /*document.querySelector(".use-keyboard-input").addEventListener('keydown', function(event) {
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
          });*/
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
            keyElement.textContent = key[1][0].toLowerCase();
            keyElement.addEventListener("click", () => {
              this.properties.russianLanguage = !this.properties.russianLanguage;
              keyElement.textContent = this.properties.russianLanguage ? key[1][1].toLowerCase() : key[1][0].toLowerCase();
              this._getIndexElement();
              let position = 0;
              for (const elem of this.elements.keys) {
                if (elem.childElementCount === 0 && elem.innerHTML !== "ru"
                 && elem.innerHTML !== "en" && elem.innerHTML !== "shift") {
                  elem.textContent = KeysValuesMaps[position][1][this.indexNeedElement];
                }
                position++;
              /*this.properties.russianLanguage = !this.properties.russianLanguage;
              document.querySelector(".keyboard__keys").innerHTML = "";
              this.elements.keysContainer.appendChild(this._createKeys());
              this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");
              if((this.properties.capsLock && !this.properties.shift) || (!this.properties.capsLock && this.properties.shift)){
                this._toggleCapsLock();
              }*/
             }
            });

          break;

        default:
          /*document.querySelector(".use-keyboard-input").addEventListener('keydown', function(event) {
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
          });*/
          this._getIndexElement();
          keyElement.textContent = key[1][this.indexNeedElement].toLowerCase();
          keyElement.addEventListener("click", () => {
            let element =  document.querySelector(".use-keyboard-input");
            let length = this.properties.value.length;
            let position = element.selectionEnd;
            let beginString =  element.value;
            this.properties.value = beginString.substring(0, position);
            if((this.properties.capsLock && !this.properties.shift) || (!this.properties.capsLock && this.properties.shift)){
              this.properties.value += key[1][this.indexNeedElement].toUpperCase();
            } else {
              this.properties.value += key[1][this.indexNeedElement].toLowerCase();
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
 
  _getIndexElement(){
    if(!this.properties.russianLanguage && !this.properties.shift){
      this.indexNeedElement = 0;
    } else if(!this.properties.russianLanguage && this.properties.shift){
      this.indexNeedElement = 1;
    } else if(this.properties.russianLanguage && !this.properties.shift){
      this.indexNeedElement = 2;
    } else if(this.properties.russianLanguage && this.properties.shift){
      this.indexNeedElement = 3;
    }
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

  _toggleCapsLock(name) {
    if(name==="caps"){
      this.properties.capsLock = !this.properties.capsLock;
    }
    

    for (const key of this.elements.keys) {
      if (key.childElementCount === 0 && key.innerHTML !== "ru"
       && key.innerHTML !== "en" && key.innerHTML !== "shift") {

        if(this.properties.capsLock && this.properties.shift){
          key.textContent = key.textContent.toLowerCase();
        } else if(!this.properties.capsLock && !this.properties.shift){
          key.textContent = key.textContent.toLowerCase();
        } else {
          key.textContent = key.textContent.toUpperCase();
        }
       /* if(this.properties.capsLock === false && this.properties.shift === false){
          key.textContent = key.textContent.toLowerCase();
        } else if(this.properties.capsLock === true && this.properties.shift === true){
          key.textContent = key.textContent.toLowerCase();
        } else {
          key.textContent = key.textContent.toUpperCase();
        }*/
        
      }
    }
  },

  
  _toggleShift() {
   
  },


  _toggleLanguage(){
   
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