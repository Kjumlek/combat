/*//////////////////////////////////////////////
//AUTOBOT
//////////////////////////////////////////////

var nombreAleatoire;
var actionCounter = 0;
var randomTimer = 500;
var randomTimer2 = 200;
var okMoove = 0;
var intervalId1 = null;
var intervalId2 = null;
var intervalId3 = null;
var detectRight = 0;
var detectLeft = 0;


function botrandomDice() {
    nombreAleatoire = Math.floor(Math.random() * 5);
}

function action(){
    intervalId1 = setInterval(botrandomActionMooveLR, randomTimer);
    intervalId2 = setInterval(botrandomActionMooveDU, randomTimer2);
    intervalId3 = setInterval(botrandomActionMoovePK, Math.floor(Math.random() * 90 + 50));
}

function botrandomActionMooveLR(){
    if(okFight && !comboDisplay){
    botrandomDice();
    //bouge
    if(nombreAleatoire >= 1){
        //recule
        if (nombreAleatoire == 4){
            if(detectLeft == 1 || detectRight == 1){
                okMoove = -1;
                if(fighter.smashOk){
                    bot.vraimentgarde = true;
                    garde(bot);
                }
            }
            else{okMoove = 0;}
        }
        else {
            okMoove = 1;
            bot.vraimentgarde = false;
            attend(bot);
            bot.padDirection = true;
            bot.directionJump = false;
        }
    }
    //position statique
    else {
        okMoove = 0;
    }
    }
};
function botrandomActionMooveDU(){
    if(okFight){
    botrandomDice();
    //bouge
    if (nombreAleatoire == 0 || nombreAleatoire == 2){
        if(detectLeft == 1 || detectRight == 1){
            gardeBasse(bot);
            bot.downState = true;
            bot.gardeState = true;
            bot.vraimentgarde = true;
            bot.keyCounterG++;
        }
    }
    else if ((nombreAleatoire == 4 || nombreAleatoire == 5)&& botPos.jumping == false) {
        if(detectLeft == 1 || detectRight == 1){
            bot.padDirection = false;
            bot.vraimentgarde = true;
            bot.downState = false;
            jump(bot);
            botPos.pY_velocity -= 14 * gamespeed;
            botPos.jumping = true;
            bot.keyCounter++;
            bot.step = 0;
            bot.jumpState = true;
            bot.punchrepeat = [true,true];
            bot.directionJump = false;
        }
    }
    else {
        botdownState = false;
        botvraimentgarde = false;
    }
    }
};
function botrandomActionMoovePK(){
    if(okFight){
    botrandomDice();
    //bouge
    if (nombreAleatoire == 0 || nombreAleatoire == 0){
        if((detectLeft == 1 || detectRight == 1) && bot.downState == false){
            punchLeft(bot);
            bot.padDirection = false;
            bot.step = 0;
            bot.punchrepeat[0] = true;
            bot.punchrepeat[1] = false;
            bot.doublePunch = true;
            bot.vraimentgarde = false;
            bot.downState = false;
            bot.keyCounterP++;
        }
    }
    else if ((nombreAleatoire == 2 || nombreAleatoire == 2)) {
        if(detectLeft == 1 || detectRight == 1){
            kick(bot);
            bot.padDirection = false;
            bot.step = 0;
            bot.punchrepeat[0] = true;
            bot.punchrepeat[1] = false;
            bot.kickRepeat = false;
            bot.vraimentgarde = false;
            bot.downState = false;
            bot.keyCounterK++;
        }
    }
    else {
        bot.keyCounterP = 0;
        bot.keyCounterK = 0;
        bot.punchrepeat = [false,false];
        bot.arrGarde = false;
        bot.gardeState = false;
        bot.vraimentgarde = false;
        bot.downState = false;
    }
    }
};

botbot = function() {
    if(actionCounter == 0 && okFight){
        action();
        actionCounter++;
    }
    if(actionCounter > 0 && !okFight && actionCounter == 1){
        actionCounter++;
        if (bot.energy > 0){
            attend(bot);
        }
        else {
            attend(fighter);
        }
    }
    if(botPos.pX+bot.smashDistance >= fighterPos.pX && !comboDisplay){
        botPos.pX_velocity -= 2.5 * okMoove * gamespeed * punchedSpeed *((comboDisplay-1)*-1);
    }
    if(botPos.pX+bot.smashDistance <= fighterPos.pX && !comboDisplay){
        botPos.pX_velocity += 2.5 * okMoove * gamespeed * punchedSpeed *((comboDisplay-1)*-1);
    }
    if(botPos.pX+bot.smashDistance+30 >= fighterPos.pX 
        && bot.reverseAnim == 1
        && fighterPos.pY > botPos.pY-18
        && fighterPos.pY < botPos.pY+18)
        {detectRight = 1;}
    else if(botPos.pX-bot.smashDistance-30 <= fighterPos.pX 
        && bot.reverseAnim == -1
        && fighterPos.pY > botPos.pY-18
        && fighterPos.pY < botPos.pY+18)
        {detectLeft = 1;}
    else {detectLeft = 0;
        detectRight = 0;
    }       
window.requestAnimationFrame(botbot);
};
window.requestAnimationFrame(botbot);
//////////////////////////////////////////////*/