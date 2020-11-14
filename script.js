// model
const html = document.getElementById('app');
let userChoice;
let computerChoice;
let userscore = 0;
let computerscore = 0;
let sfxx = new Audio(`./ResultSFX/tie${Math.ceil(Math.random() * 3)}.mp3`)
let battleTheme = new Audio("battlesong.mp3");
let userSelect = '';
let computerSelect = '';
let winner = '';



// view
updateView()
function updateView() {
    html.innerHTML = `
                        <div id="score">${userscore}:${computerscore}</div>
                        <div id="selector">
                        <div id="pokemons">
                        <button class="selection" id="blastoise" onclick="getUserChoice(blastoise);"><img src="blastoise.png"></button>
                        <button class="selection" id="venesaur" onclick="getUserChoice(venesaur);"><img src="venesaur.png"></button>
                        <button class="selection" id="charizard" onclick="getUserChoice(charizard);"><img src="charizard.png"></button>
                        </div>
                        <div id="user">${userSelect}</div>
                        <div id="vs">VS</div>
                        <div id="computer">${computerSelect}</div>
                        <div id="winner">${winner}</div>
                        </div>
    `
}


// CONTROLLER



// audio

function playBattleTheme () {
    battleTheme.loop = true;
    battleTheme.volume = 0.2;
    battleTheme.play();
}

function playMonsterCry(name) {
    let cry = new Audio(name+ "_cry.mp3");
    cry.play ();
}


function getUserChoice(selected) {
 //Stian
 // får info når du trykker på en knapp, som sender IDen til kanppen inn i variabelen "userchoice"
 userChoice = selected.id;
 userSelect = `<img src="${userChoice}.png">`;
 playMonsterCry(userChoice);
 console.log("User selected " + userChoice);
 setTimeout(getComputerChoice, 2000);
 updateView();
}


function getComputerChoice() {
    //Henrik
    let number = Math.floor(Math.random() * 3)
    switch (number) {
        case 0:
            computerChoice = "blastoise"
            break;   
        case 1:
            computerChoice = "venesaur"
            break;   
        case 2:
            computerChoice = "charizard"
            break;              
        default:
            return 'Error';
        
    }   
    computerSelect =`<img src=${computerChoice}.png>`;
    playMonsterCry(computerChoice);
    console.log("Computer selected " + computerChoice );
    setTimeout(battleResult, 2000);
    updateView();
}

function battleResult() {

result = checkIfUserWon(userChoice, computerChoice)
console.log(result)
playResultSFX(result);
switch(result){
    case 'tie':
        break;
    case 'victory':
        userscore++;
        updateView();
        break;
    
    case 'loss':
        computerscore++;
        updateView();
        break;
}
}


function checkIfUserWon(userChoice, computerChoice) {
 
//Jonas
//Tar inn 2 valg og returnerer enten "victory", "tie" eller "loss"
 switch(userChoice) {
    case "blastoise": 
    switch(computerChoice) {
        case "blastoise":
        return "tie";
        
        case "venesaur":
        return "loss";
    
        case "charizard":
        return "victory";
    }
    break;

    case "venesaur": 
    switch(computerChoice) {
        case "blastoise":
        return "victory";
        
        case "venesaur":
        return "tie";
    
        case "charizard":
        return "loss";
    }
    break;

    case "charizard": 
    switch(computerChoice) {
        case "blastoise":
        return "loss";
        
        case "venesaur":
        return "victory";
    
        case "charizard":
        return "tie";
    }
    break;
    
    default:
    return "Error";
 }
 
} 

function checkGameFinished() {
    
    if (userscore === 3 || computerscore === 3) {
        if (userscore === 3) {
            winner = `<img id="winner" src="ash_happy.png" />`
        }
        if (computerscore === 3) {
            winner `<img id="looser" src="ash_sad.png" />`
        }
    }
    updateView();
}

function playResultSFX(result) {
    let sfx = new Audio('./ResultSFX/' + result + (Math.ceil(Math.random() * 3)) + '.mp3');
    console.log(sfx);
    sfx.play();

}
