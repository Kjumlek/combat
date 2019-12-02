///////////////////////////////////////////
//COMBO SYSTEM
///////////////////////////////////////////
//AFFICHAGE
//flash hits
var flashHitStep = 0;
var flashHitPos = {height:500, width:500, pX:100, pY:55}
//affichage comboText
var comboTextStep = 0;
var comboTextPos = {height:33, width:49, pX:114, pY:26}
//affichage comboNumber
var comboNumberStepMicro = 0;
var comboNumberStep = 0;
var comboNumberPos = {height:24, width:15, pX:160, pY:31}
//affichage comboTimer
var comboTimerPos = {height:10, width:120, pX:85, pY:60}
//affichage comboTimerBar
var comboTimerBarStep = 0;
var comboTimerBarPos = {height:2, width:112, pX:89, pY:64}
//affichage bouton
var combinaisonPos = {height:30, width:30, pX:130, pY:68}
//affiche le menu
var comboDisplay = 0;
var comboLevel = 0;
var combodelay = false;
//COMPORTEMENT
//valeur par defaut du clavier
var comboKey = -1;
//valeur de la progression du combo
var ComboCodePos = 0;
//sert a bloquer le random
var goModeCounter = 0;
//combinaisons
var combinaisonStep = [0, 0, 0];
//lancement des touches aleatoires
var combiStepMicro = [0, 0, 0] ; 
var combiOk = [false, false, false];
///////////////////////////////////////////
//FONCTION INIT ETAPE
function goMode(){
    //fleche obligatoire
    combinaisonStep[0] = (Math.floor(Math.random() * 4))*7;
    //nimporte quelle touche
    combinaisonStep[1] = (Math.floor(Math.random() * 6))*7;
    //frappe obligatoire
    combinaisonStep[2] = (Math.floor(Math.random() * 2 + 4))*7;
    //etapes
    combiStepMicro = [0, 0, 0]; 
    combiOk = [false, false, false];
}
///////////////////////////////////////////
//COMBOMODE FIGHTER KEYBOARD//
document.addEventListener("keydown",function(event){
    if (!bot.combo && combodelay){
        if (event.keyCode == 40){comboKey = 21;}
        if (event.keyCode == 38){comboKey = 14;}
        if (event.keyCode == 37){comboKey = 7;}
        if (event.keyCode == 39){comboKey = 0;}
        if (event.keyCode == 72){comboKey = 28;}
        if (event.keyCode == 74){comboKey = 35;}
    }
});
///////////////////////////////////////////
//COMBOMODE ENEMI KEYBOARD//
document.addEventListener("keydown",function(event){
    if (!fighter.combo && combodelay){
        if (event.keyCode == 83){comboKey = 21;}
        if (event.keyCode == 90){comboKey = 14;}
        if (event.keyCode == 81){comboKey = 7;}
        if (event.keyCode == 68){comboKey = 0;}
        if (event.keyCode == 49){comboKey = 28;}
        if (event.keyCode == 50){comboKey = 35;}
    }
});
///////////////////////////////////////////
//COMBO STOP//
function stopComboDisplay(){
    comboLevel = 0;
    comboDisplay = 0;
    if(fighter.combo){
        fighter.combo = false;
        fighter.jaugeComboStep = 0;
        fighter.jaugeComboStepMicro = 0;}
    else if(bot.combo){
        bot.combo = false;
        bot.jaugeComboStep = 0;
        bot.jaugeComboStepMicro = 0;}
    goModeCounter = 0;
    ComboCodePos = 0;
}
///////////////////////////////////////////
//COMBO STOP2//
var okcombo = true;
function stopCombo2(){
    okcombo = false;
    setTimeout(function(){
        combodelay = false;
        stopComboDisplay();
        goMode();
        okcombo = true;
        }, 160 / gamespeed);
}



///////////////////////////////////////////
//COMBO CODE PROCESSOR
///////////////////////////////////////////
document.addEventListener("keydown",function(event){
if(((fighter.combo || bot.combo) && okcombo && combodelay) && okFight){
    for (var i = 0; i < combiOk.length-1; i++) {
        if(comboKey == combinaisonStep[i] && ComboCodePos == i){
                combiStepMicro[i] = 0; combiOk[i] = true;
                comboKey = -1; ComboCodePos++;}
        else if(comboKey != combinaisonStep[i] && ComboCodePos == i && comboKey != -1){
            comboFail.play();
            combinaisonStep[i]+=6;
            comboKey = -1; ComboCodePos = 0;
            stopCombo2();}
    }
    if(comboKey == combinaisonStep[2] 
    && ComboCodePos == 2){
        combiStepMicro[2] = 0; combiOk[2] = true;
        comboNumberStep+=4;
        comboKey = -1; ComboCodePos = 0;
        if (fighter.combo){
            if(comboLevel == 0){combo1.play(); fighter.comboVector += 0.5;}
            if(comboLevel == 1){combo2.play(); fighter.comboVector += 0.6;}
            if(comboLevel == 2){combo3.play(); fighter.comboVector += 0.7;}
            if(comboLevel == 3){combo4.play(); fighter.comboVector += 0.9;}
            if(comboLevel == 4){combo5.play(); fighter.comboVector += 1.2;}
            if(comboLevel == 5){combo6.play(); fighter.comboVector += 1.6;}
            if(comboLevel == 6){combo7.play(); fighter.comboVector += 2.5; 
                stopCombo2();}}
        if (bot.combo){
            if(comboLevel == 0){combo1.play(); bot.comboVector += 0.5;}
            if(comboLevel == 1){combo2.play(); bot.comboVector += 0.6;}
            if(comboLevel == 2){combo3.play(); bot.comboVector += 0.7;}
            if(comboLevel == 3){combo4.play(); bot.comboVector += 0.9;}
            if(comboLevel == 4){combo5.play(); bot.comboVector += 1.2;}
            if(comboLevel == 5){combo6.play(); bot.comboVector += 1.6;}
            if(comboLevel == 6){combo7.play(); bot.comboVector += 2.5; 
                stopCombo2();}}
        if (comboLevel != 6){
            setTimeout(function(){
                combiStepMicro[0] = 0; combiStepMicro[1] = 0; combiStepMicro[2] = 0;
                comboTimerBarStep = 0;
                comboLevel+= 1;
                goMode();
            }, 160 / gamespeed);}
    }
    else if(comboKey != combinaisonStep[2]
    && ComboCodePos == 2
    && comboKey != -1){
        comboFail.play();
        combinaisonStep[2]+=6;
        comboKey = -1;
        stopCombo2();}
    };
});
///////////////////////////////////////////



///////////////////////////////////////////
//COMBO ACTIVATING PROCESSOR
///////////////////////////////////////////
function modeCombo(){
    //comboBar
    if(comboDisplay == 1 && combodelay){
        if(comboTimerBarStep <= 112){
            comboTimerBarStep+= 0.221 + comboLevel * 0.04;}
        else {stopComboDisplay();}
    }    
    ///////////////////////////////////////
    //comboText
    if(comboDisplay == 1 && combodelay){
        comboTextStep+=0.1;
        if (comboTextStep >= 19){
            comboTextStep = 0}
    }
    else if(comboDisplay == 0){
        comboNumberStep = 0;
        comboTimerBarStep = 0
    }
    //comboNumber
    if(comboDisplay == 1){
        comboNumberStepMicro+=0.1;
        if (comboNumberStepMicro >= 3){
            comboNumberStepMicro = 0}
    }
    for (var i = 0; i < combiOk.length; i++) {
        if(combiOk[i]){
            combiStepMicro[i]+= 0.2;
            if(combiStepMicro[i] >= 5){
                combiStepMicro[i] = 5;
                combiOk[i] = false;}
        }
    }
    //flashHit
    if (flashAnimStep <= 3){
        flashAnimStep+=0.2;
        flashHitStep+=0.2;
    }
    if (flashAnimStep >= 3){
        flashHitStep = 11;
    }
}