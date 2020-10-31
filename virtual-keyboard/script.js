const beep = new Audio();
beep.src = "assets/click.mp3";

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
    indexNeedElement: 0,
    voice: false
  },
  KeysValuesMaps : [
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
    [300, ['voice']],
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
    [301, ['done']],
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
    [13, ['enter']],
    [18, ["en","ru"]],
    [32, ['space']],
    [37, ['left-arrow']],
    [39, ['right-arrow']]
   
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
    

    // Creates HTML for an icon
    const createIconHTML = (icon_name) => {
      return `<i class="material-icons">${icon_name}</i>`;
    };

    this.KeysValuesMaps.forEach(key => {
      const keyElement = document.createElement("button");
      //const insertLineBreak = [].indexOf(key) !== -1;
      const insertLineBreakMass = ["]", "enter","backspace", "done"].indexOf(key[1][0]) !== -1;
      

      // Add attributes/classes
      keyElement.setAttribute("type", "button");
      keyElement.classList.add("keyboard__key");

   
      document.querySelector(".use-keyboard-input").addEventListener("blur", () => {
        if(!this.elements.main.classList.contains("keyboard--hidden")){
          document.querySelector(".use-keyboard-input").focus();
        }    
      });

      //set indexElement
   

      switch (key[1][0]) {
        case "voice":
          keyElement.classList.add("keyboard__key--voice-wide", "keyboard__key--activatable");
          keyElement.innerHTML = createIconHTML("keyboard_voice");

          const recognition = new webkitSpeechRecognition();

            keyElement.addEventListener("click", () => {
            keyElement.classList.toggle("keyboard__key--active");
            this.properties.voice = !this.properties.voice;
            let element =  document.querySelector(".use-keyboard-input");
            let length = element.value.length;
            let position = element.selectionEnd;
            let beginString =  element.value;
           
           //recognition.interimResults = true;
           if(this.properties.russianLanguage){
            recognition.lang = 'ru-RU';
           } else {
            recognition.lang = 'en-US';
           }
           if(this.properties.voice){

            recognition.onresult = function(e){
              let length = element.value.length;
              let position = element.selectionEnd;
              let beginString =  element.value;
              //this.properties.value += event.results[0][0].transcript;
              if(element.value !== ""){
                element.value += " ";
              }
              element.value = beginString.substring(0, position);
              element.value +=e.results[0][0].transcript + " "; 
              element.value += beginString.substring(position, length);
              element.selectionEnd = position + e.results[0][0].transcript.length + 1;
              
            }

            recognition.addEventListener('end', function () {
              if(Keyboard.properties.voice){
                recognition.start();
              } else {
                recognition.stop();
                keyElement.classList.remove("keyboard__key--active");
              }

            });
        
            recognition.start();    
          } else {
            recognition.stop();
          }
           
            beep.play();
            });
          
            
        break;

        case "backspace":
          keyElement.classList.add("keyboard__key--backspace-wide");
          keyElement.innerHTML = createIconHTML("backspace");

          keyElement.addEventListener("click", () => {
            beep.play();
            let element =  document.querySelector(".use-keyboard-input");
            let length = element.value.length;
            let position = element.selectionEnd;
            let beginString =  element.value;
            this.properties.value = beginString.substring(0, position - 1);
            this.properties.value += beginString.substring(position, length);
            this._triggerEvent("oninput");
            element.selectionEnd = position - 1;
          });

          document.querySelector(".use-keyboard-input").addEventListener('keydown', function(event) {
            if(key[0] === event.keyCode){
              beep.play();
              keyElement.classList.add("keyboard__key--active-button");
            }
          });
          document.querySelector(".use-keyboard-input").addEventListener('keyup', function(event) {
            if(key[0] === event.keyCode){
            keyElement.classList.remove("keyboard__key--active-button");
            }
          });

          break;

        case "left-arrow":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("keyboard_arrow_left");

          keyElement.addEventListener("click", () => {
            beep.play();
            let element =  document.querySelector(".use-keyboard-input");
            if( element.selectionEnd !== 0){
            element.selectionEnd= element.selectionEnd-1;
            }
            this._triggerEvent("oninput");
          });

          document.querySelector(".use-keyboard-input").addEventListener('keydown', function(event) {
            if(key[0] === event.keyCode){
              beep.play();
              keyElement.classList.add("keyboard__key--active-button");
            }
          });
          document.querySelector(".use-keyboard-input").addEventListener('keyup', function(event) {
            if(key[0] === event.keyCode){
            keyElement.classList.remove("keyboard__key--active-button");
            }
          });

          break;

        case "right-arrow":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("keyboard_arrow_right");

          keyElement.addEventListener("click", () => {
            beep.play();
            let element =  document.querySelector(".use-keyboard-input");
            element.selectionStart = element.selectionEnd+1;
            this._triggerEvent("oninput");
          });

          document.querySelector(".use-keyboard-input").addEventListener('keydown', function(event) {
            if(key[0] === event.keyCode){
              beep.play();
              keyElement.classList.add("keyboard__key--active-button");
            }
          });
          document.querySelector(".use-keyboard-input").addEventListener('keyup', function(event) {
            if(key[0] === event.keyCode){
            keyElement.classList.remove("keyboard__key--active-button");
            }
          });

          break;

        case "CapsLock":
          keyElement.classList.add("keyboard__key--capslock-wide", "keyboard__key--activatable");
          if(this.properties.capsLock){
            keyElement.classList.add("keyboard__key--active");
          }
          
          keyElement.innerHTML = createIconHTML("keyboard_capslock");

          keyElement.addEventListener("click", () => {
            beep.play();
            this._toggleCapsLock("caps");
            keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
          });


          document.querySelector(".use-keyboard-input").addEventListener('keydown', function(event) {
            if(key[0] === event.keyCode){  
              beep.play();
              Keyboard.properties.capsLock = event.getModifierState("CapsLock"); 
              Keyboard._toggleCapsLock();
              keyElement.classList.toggle("keyboard__key--active", Keyboard.properties.capsLock);
            }
          });
          break;

        case "Shift":
          keyElement.classList.add("keyboard__key--shift-wide", "keyboard__key--activatable");
          keyElement.classList.toggle("keyboard__key--active", this.properties.shift);
          keyElement.textContent = key[1][0].toLowerCase();        
          keyElement.addEventListener("click", () => {
            beep.play();
            this.properties.shift = !this.properties.shift;
            keyElement.classList.toggle("keyboard__key--active", this.properties.shift);
            this._getIndexElement();
            let position = 0;
            for (const elem of this.elements.keys) {
              if (elem.childElementCount === 0 && elem.innerHTML !== "ru"
               && elem.innerHTML !== "en" && elem.innerHTML !== "shift") {   
                
                elem.textContent = this.KeysValuesMaps[position][1][this.indexNeedElement];
                 
              }
              position++; 
            } 
            this._toggleCapsLock("shift");        
          });

          document.querySelector(".use-keyboard-input").addEventListener('keydown', function(event) {
            if(key[0] === event.keyCode && !keyElement.classList.contains("keyboard__key--active")){  
              beep.play();
              Keyboard.properties.shift = !Keyboard.properties.shift;
              keyElement.classList.toggle("keyboard__key--active", Keyboard.properties.shift);
              Keyboard._getIndexElement();
              let position = 0;
              for (const elem of Keyboard.elements.keys) {
                if (elem.childElementCount === 0 && elem.innerHTML !== "ru"
                 && elem.innerHTML !== "en" && elem.innerHTML !== "shift") {   
                  
                  elem.textContent = Keyboard.KeysValuesMaps[position][1][Keyboard.indexNeedElement];
                   
                }
                position++; 
              } 
            Keyboard._toggleCapsLock("shift");  
            }
          });

           document.querySelector(".use-keyboard-input").addEventListener('keyup', function(event) {
            if(key[0] === event.keyCode && keyElement.classList.contains("keyboard__key--active")){  
              Keyboard.properties.shift = !Keyboard.properties.shift;
              keyElement.classList.toggle("keyboard__key--active", Keyboard.properties.shift);
              Keyboard._getIndexElement();
              let position = 0;
              for (const elem of Keyboard.elements.keys) {
                if (elem.childElementCount === 0 && elem.innerHTML !== "ru"
                 && elem.innerHTML !== "en" && elem.innerHTML !== "shift") {   
                  
                  elem.textContent = Keyboard.KeysValuesMaps[position][1][Keyboard.indexNeedElement];
                   
                }
                position++; 
              } 
              Keyboard._toggleCapsLock("shift");  
            }
          });
          break;

        case "enter":
          keyElement.classList.add("keyboard__key--done-wide");
          keyElement.innerHTML = createIconHTML("keyboard_return");

          keyElement.addEventListener("click", () => {
            beep.play();
            let element =  document.querySelector(".use-keyboard-input");
            let length = element.value.length;
            let position = element.selectionEnd;
            let beginString =  element.value;
            this.properties.value = beginString.substring(0, position);
            this.properties.value += "\n";
            this.properties.value += beginString.substring(position, length);        
            this._triggerEvent("oninput");
            element.selectionEnd = position + 1;
          });

          document.querySelector(".use-keyboard-input").addEventListener('keydown', function(event) {
            if(key[0] === event.keyCode){
              beep.play();
              keyElement.classList.add("keyboard__key--active-button");
            }
          });
          document.querySelector(".use-keyboard-input").addEventListener('keyup', function(event) {
            if(key[0] === event.keyCode){
            keyElement.classList.remove("keyboard__key--active-button");
            }
          });

          break;

        case "space":
          keyElement.classList.add("keyboard__key--extra-wide");
          keyElement.innerHTML = createIconHTML("space_bar");

          keyElement.addEventListener("click", () => {
            beep.play();
            let element =  document.querySelector(".use-keyboard-input");
            let length = element.value.length;
            let position = element.selectionEnd;
            let beginString =  element.value;
              this.properties.value = beginString.substring(0, position);
              this.properties.value += " ";
            this.properties.value += beginString.substring(position, length);        
            this._triggerEvent("oninput");
            element.selectionEnd = position + 1;
          });

          document.querySelector(".use-keyboard-input").addEventListener('keydown', function(event) {
            if(key[0] === event.keyCode){
              beep.play();
              keyElement.classList.add("keyboard__key--active-button");
            }
          });
          document.querySelector(".use-keyboard-input").addEventListener('keyup', function(event) {
            if(key[0] === event.keyCode){
            keyElement.classList.remove("keyboard__key--active-button");
            }
          });

          break;

        case "done":
          keyElement.classList.add("keyboard__key--done-wide", "keyboard__key--dark");
          keyElement.innerHTML = createIconHTML("check_circle");

          keyElement.addEventListener("click", () => {
            beep.play();
            this.close();
            this._triggerEvent("onclose");
            
          });

          break;

        case "en":  
            keyElement.classList.add("keyboard__key--wide");
            keyElement.textContent = key[1][0].toLowerCase();
            keyElement.addEventListener("click", () => {
              beep.play();
              this.properties.russianLanguage = !this.properties.russianLanguage;
              keyElement.textContent = this.properties.russianLanguage ? key[1][1].toLowerCase() : key[1][0].toLowerCase();
              this._getIndexElement();
              let position = 0;
              for (const elem of this.elements.keys) {
                if (elem.childElementCount === 0 && elem.innerHTML !== "ru"
                 && elem.innerHTML !== "en" && elem.innerHTML !== "shift") {
                  elem.textContent = this.KeysValuesMaps[position][1][this.indexNeedElement];
                }
                position++;
             }
            });

            document.querySelector(".use-keyboard-input").addEventListener('keydown', function(event) {
              if(key[0] === event.keyCode && event.getModifierState("Shift")){
                  beep.play();
                  Keyboard.properties.russianLanguage = !Keyboard.properties.russianLanguage;
                  keyElement.textContent = Keyboard.properties.russianLanguage ? key[1][1].toLowerCase() : key[1][0].toLowerCase();
                  Keyboard._getIndexElement();
                  let position = 0;
                  for (const elem of Keyboard.elements.keys) {
                    if (elem.childElementCount === 0 && elem.innerHTML !== "ru"
                     && elem.innerHTML !== "en" && elem.innerHTML !== "shift") {
                      elem.textContent = Keyboard.KeysValuesMaps[position][1][Keyboard.indexNeedElement];
                    }
                    position++;
                }
              }
            });

          break;

        default:
          document.querySelector(".use-keyboard-input").addEventListener('keydown', function(event) {
            if(key[0] === event.keyCode){
              beep.play();
              keyElement.classList.add("keyboard__key--active-button");
            }
          });
          document.querySelector(".use-keyboard-input").addEventListener('keyup', function(event) {
            if(key[0] === event.keyCode){
            keyElement.classList.remove("keyboard__key--active-button");
            }
          });
          this._getIndexElement();
          keyElement.textContent = key[1][this.indexNeedElement].toLowerCase();
          keyElement.addEventListener("click", () => {
            beep.play();
            let element =  document.querySelector(".use-keyboard-input");
            let length = element.value.length;
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