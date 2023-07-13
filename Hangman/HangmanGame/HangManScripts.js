
const letterContainer = document.getElementById("letter_container");
const optionsContainer = document.getElementById("options_container");
const userInputSection = document.getElementById("user_input_section");
const newGameContainer = document.getElementById("new_game_container");
const newGameButton = document.getElementById("new_game_btn");
const canvas = document.getElementById("canvas");
const resultText= document.getElementById("result_text");


let options = {
   "modern fish": ["Clownfish",
"Shark",
"Barracuda",
"Piranha",
"Skate",
"Salmon",
],
    "mythical fish": ["Dagon",
        "Siren",
"Kraken",
"Leviathan",
"Charybdis",
"Jormungandr",
    ],
"ancient fish": [ "Leedsichthys ",
    "Stethacanthus",
"Tiktaalik",
"Megalodon",
"Megapiranha ",
"Priscacara ",
],
};

let winCount = 0;
let count =0;

let chosenWord= "";


const displayOptions = () => {
    optionsContainer.innerHTML +=`<h3> Select a theme:</h3>`;
    let buttonCon = document.createElement("div");
    for (let value in options){
        buttonCon.innerHTML += `<button class="options" onclick="generateWord('${value}')"> ${value} </button>`;
    }
    optionsContainer.appendChild(buttonCon);
}; 


// ГДЕ ТО ТУТ ОШИБКА
const blocker = () => {
    let optionsButtons = document.querySelectorAll(".options");
    let letterButtons = document.querySelectorAll(".letters");

optionsButtons.forEach((button) => {
    button.disabled = true;
});

letterButtons.forEach((button) => {
    button.disabled.true;
});
newGameContainer.classList.remove("hide");
};


//Или тут
const generateWord = (optionValue) => {
    let optionsButtons = document.querySelectorAll(".options");

optionsButtons.forEach((button) => {
    if(button.innerText.toLowerCase() === optionValue) {
        button.classList.add("active");
    }
    button.disabled = true;
});

letterContainer.classList.remove("hide");
userInputSection.innerText = "";


//Слово загадка. Добавить подсказку?
let optionArray = options[optionValue];
chosenWord = optionArray[Math.floor(Math.random() * optionArray.length)];
chosenWord = chosenWord.toUpperCase();
console.log(chosenWord);

//Тут штрихофка для загадонного слова
let displayItem = chosenWord.replace(/./g, '<span class="dashes">_</span');
userInputSection.innerHTML = displayItem;
};





const initializer = () => {
    winCount = 0;
count = 0;

userInputSection.innerHTML = "";
optionsContainer.innerHTML = "";
letterContainer.classList.add("hide");
newGameContainer.classList.add("hide");
letterContainer.innerHTML ="";



for(let i=65;i<91;i++){
    let button = document.createElement("button");
    button.classList.add("letters");


    
button.innerText = String.fromCharCode(i);
button.addEventListener("click", () => {
    let charArray = chosenWord.split("");
    let dashes = document.getElementsByClassName("dashes")[0];
    if (charArray.includes(button.innerText)){
        charArray.forEach((char, index) => {
        
            if(char === button.innerText) {
                //  ТУТ БЛЯТЬ КАКАЯ ТО ОШИБКА
            
                const strArray = Array.from(dashes.innerText);
                strArray[index] = char;
                dashes.innerText = strArray.join("");

                winCount += 1;
        console.log(dashes)
                if(winCount == charArray.length) {
                    resultText.innerHTML= `<h2 class ='win-msg'> You win! You have rescued him from....fins!</h2>
                    <p>The word was<span> ${chosenWord}</span></p>`;
                    blocker();
                
                    
                }
            }

        });
    } 
    

});

letterContainer.appendChild(button);
}



displayOptions(); 
};


newGameButton.addEventListener("click", initializer);
window.onload = initializer;

