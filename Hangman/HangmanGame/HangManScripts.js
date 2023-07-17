
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


//Слово загадка. 
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
               
              

                const strArray = Array.from(dashes.innerText);
                strArray[index] = char;
                dashes.innerText = strArray.join("");

        //         dashes[index].innerText = char;
                winCount += 1;
        // console.log(dashes)
                if(winCount == strArray.length) {
                    resultText.innerHTML= `<h2 class ='win-msg'> You win! You have rescued him from....fins!</h2>
                    <p>The word was <span> ${chosenWord}</span></p>`;
                    blocker();
                
                    
                }
            }

        });
    } 
    else {
        count +=1;
        drawFisherMan(count);
        //count 6 потому что 1 голова. 1 тело. 2 руки. 2 ноги.
        console.log(count);
        if (count == 6) {
            resultText.innerHTML =`<h2 class ='lose-msg'> Oh no! You lose. The fisherman was hanged by the fish...</h2>
            <p>The last word was <span> ${chosenWord}</span></p>`;
            blocker()
        }
    }
button.disabled = true;
});

letterContainer.appendChild(button);
}



displayOptions(); 

let {intitialDrawing} = canvasCreator ();
intitialDrawing();

};





const canvasCreator = () => {
    let context = canvas.getContext("2d");
    context.beginPath();
    context.strokeStyle = "#000";
    context.lineWidth = 2;


    const drawLine =(fromX, fromY, toX, toY) => {
        context.moveTo(fromX, fromY);
        context.lineTo(toX, toY);
        context.stroke();
    };


    const head = () => {
        context.beginPath();
        context.arc(70, 30, 10, 0, Math.PI*2,true);
        context.stroke();
};


const body = () => {
    drawLine(70,40,70,80);
};

const leftArm = () => {
    drawLine(70,50,50,70)
};
const rightArm = () => {
    drawLine(70,50,90,70)
};
const leftLeg = () => {
    drawLine(70,80,50,110);
};
const rightLeg = () => {
    drawLine(70, 80, 90, 110);
};

const intitialDrawing = () => {
    context.clearRect(0,0, context.canvas.width, context.canvas.height);
    drawLine(10, 130, 130, 130); //АБ инитио нижняя линия
    drawLine(10, 10, 10,131); // левая линия
    drawLine(10,10,70,10); // верззняя линия
    drawLine(70, 10, 70, 20) // край виселицы верхний
};

return{intitialDrawing,head,body,leftArm,rightArm,leftLeg,rightLeg};
};


const drawFisherMan = (count) => {
    let {head,body,leftArm,rightArm,leftLeg,rightLeg} = canvasCreator ();
    switch (count) {
        case 1:
            head();
            break;

            case 2:
                body();
                break;

                case 3:
                    leftArm();
                    break;

                    case 4:
                    rightArm();
                    break;

                    case 5:
                    leftLeg();
                    break;

                    case 6:
                        rightLeg();

                        default: break;
                       
    }
};





newGameButton.addEventListener("click", initializer);
window.onload = initializer;

