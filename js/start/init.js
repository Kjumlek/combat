///////////////////////////////////////////
//LANCEMENT
///////////////////////////////////////////
var menu0 = true;
var gamespeed = 0.5;
var punchedSpeed = 1;
//declenchement mode ko
var kocount = 0;
//declencheur menu fight
var startcount = 0;
//Activation du combat
var okFight = false;
//affichage menu fight
var displayFight = false;
//animation et position display
var displayFightStep = 0;
var displayFightLenght = 0;
var displayFightPos = {height:150, width:150, pX:75, pY:0}
//nombre de rounds
var roundNumber = 5;
var roundCounter = 0;
///////////////////////////////////////////
//position animations du fond
var bgStep = 0;
///////////////////////////////////////////
var roundBL = {height:5, width:7, pX:2, pY:28};
var roundBR = {height:5, width:7, pX:281, pY:28};

///////////////////////////////////////////
//MUSIQUE
///////////////////////////////////////////
var musikState = false;
function autoplay(){
    trozik.play();
    trozik.volume = 0.5;}
function autostop(){
    trozik.pause();
    trozik.currentTime = 0;}
///////////////////////////////////////////



///////////////////////////////////////////
//FIGHT DISPLAY INITIALISATION//
///////////////////////////////////////////
var displayStartCount = 0;
var displayCounter = 0;

document.addEventListener("keydown",function(event){
    if (event.keyCode == 13) {
        menu0 = false;}

    //display
    fighter.roundWin = 0;
    bot.roundWin = 0;
    if (event.keyCode == 79 && startcount == 0 && !menu0){
        //joue la musique
        autoplay();
        moveBg = -50;
        roundCounter++;
        if (roundCounter > roundNumber){
            roundCounter = 1;
            for (var i = 0; i < 5; i++){
                fighter.roundWin = 0;
                bot.roundWin = 0;
                fighterScore.roundW[i] = 0;
                botScore.roundW[i] = 0;
            }

        }
        kocount = 0;
        
        goModeCounter = 0;
        comboDisplay = 0;
        combodelay = false;
        comboLevel = 0;

        fighter.comboVector = 1;
        bot.comboVector = 1;
        fighter.reverseAnim = 1;
        bot.reverseAnim = -1;
        displayFight = true;
        okFight = false;
        startcount++;
        displayStartCount = 0;
        displayCounter = 0;

        bot.combo = false;
        botPos.pX = 188;
        botPos.pY = 182;
        bot.energy = 240;
        bot.energyStep = 0;
        bot.jaugeComboStep = 0;
        bot.jaugeComboStepMicro = 0;
        bot.jaugeCStep = 0;

        fighter.combo = false;
        fighterPos.pX = 55;
        fighterPos.pY = 182;
        fighter.energy = 240;
        fighter.energyStep = 0;
        fighter.jaugeComboStep = 0;
        fighter.jaugeComboStepMicro = 0;
        fighter.jaugeCStep = 0;
    }
    /*else if (event.code === 'KeyP'){
        if (!musikState){
            autoplay();
            musikState = true;}
        else if (musikState){
            autostop();
            musikState = false;}
    }*/
    
});
///////////////////////////////////////////
//DISPLAY FIGHT
///////////////////////////////////////////
function modeStart(){
    if(displayFight){
        //vitesse D'animation
        displayFightStep+= 0.1 * gamespeed;
        //conditions pour l'index d'affichage
        if (displayFightStep >= displayFightLenght){
            displayFightStep = displayFightLenght;
        }
        //decompte
        displayStartCount++;
        if (displayStartCount >= 900
        && displayCounter == 4){
            displayCounter+=1;
            displayFight = false;
            displayStartCount = 0;
        }
        else if (displayStartCount >= 700
        && displayCounter == 3){
            displayCounter+=1;
            displayFightStep = 20;
            displayFightLenght = 29;
            countFight.play();
            okFight = true;
        }
        else if (displayStartCount >= 500
        && displayCounter == 2){
            displayCounter+=1;
            displayFightStep = 0;
            displayFightLenght = 9;
        }
        else if (displayStartCount >= 200
        && displayCounter == 1){
            displayCounter+=1;
            //if(roundCounter == 0){roundCounter = 1};
            if(roundCounter == 1){round1.play();
                displayFightStep = 30;
                displayFightLenght = 38;}
            else if(roundCounter == 2){round2.play();
                displayFightStep = 39;
                displayFightLenght = 47;}
            else if(roundCounter == 3){round3.play();
                displayFightStep = 48;
                displayFightLenght = 56;}
            else if(roundCounter == 4){round4.play();
                displayFightStep = 57;
                displayFightLenght = 65;}
            else if(roundCounter == 5){round5.play();
                displayFightStep = 66;
                displayFightLenght = 74;}
            else{};
        }
        else if (displayCounter == 0){
            displayCounter+=1;
            displayFightStep = 10;
            displayFightLenght = 19;
            round.play();
            timeNumberStep1 =  0;
            timeNumberStep2 = 6;
        };
    }
}
