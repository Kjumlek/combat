///////////////////////////////////////////
//LANCEMENT
///////////////////////////////////////////
var gamespeed = 0.55;
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
var displayFightPos = {height:150, width:150, pX:100, pY:0}
//nombre de rounds
var roundNumber = 5;
var roundCounter = 0;
///////////////////////////////////////////
//position animations du fond
var bgStep = 0;
///////////////////////////////////////////



///////////////////////////////////////////
//MUSIQUE
///////////////////////////////////////////
var musikState = false;
function autoplay(){
    trozik.play();
    trozik.volume = 0.3;}
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
    //display
    if (event.keyCode == 79 && startcount == 0){
        roundCounter++;
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
        botPos.pX = 220;
        botPos.pY = 182;
        bot.energy = 240;
        bot.energyStep = 0;
        bot.jaugeComboStep = 0;
        bot.jaugeComboStepMicro = 0;
        bot.jaugeCStep = 0;

        fighter.combo = false;
        fighterPos.pX = 75;
        fighterPos.pY = 182;
        fighter.energy = 240;
        fighter.energyStep = 0;
        fighter.jaugeComboStep = 0;
        fighter.jaugeComboStepMicro = 0;
        fighter.jaugeCStep = 0;
    }
    else if (event.code === 'KeyP'){
        if (!musikState){
            autoplay();
            musikState = true;}
        else if (musikState){
            autostop();
            musikState = false;}
    }
    
});
///////////////////////////////////////////



///////////////////////////////////////////
//COMBO SYSTEM
///////////////////////////////////////////
//AFFICHAGE
//flash hits
var flashHitStep = 0;
var flashHitPos = {height:500, width:500, pX:100, pY:55}
//affichage comboText
var comboTextStep = 0;
var comboTextPos = {height:33, width:49, pX:139, pY:26}
//affichage comboNumber
var comboNumberStepMicro = 0;
var comboNumberStep = 0;
var comboNumberPos = {height:24, width:15, pX:185, pY:31}
//affichage comboTimer
var comboTimerPos = {height:10, width:120, pX:115, pY:60}
//affichage comboTimerBar
var comboTimerBarStep = 0;
var comboTimerBarPos = {height:2, width:112, pX:119, pY:64}
//affichage bouton
var combinaisonPos = {height:30, width:30, pX:160, pY:68}
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
        if (event.keyCode == 76){comboKey = 28;}
        if (event.keyCode == 77){comboKey = 35;}
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
//COMBO PROCESSOR
///////////////////////////////////////////
document.addEventListener("keydown",function(event){
if((fighter.combo || bot.combo) && okcombo && combodelay){
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
            if(comboLevel == 0){combo1.play(); fighter.comboVector += 0.1;}
            if(comboLevel == 1){combo2.play(); fighter.comboVector += 0.2;}
            if(comboLevel == 2){combo3.play(); fighter.comboVector += 0.3;}
            if(comboLevel == 3){combo4.play(); fighter.comboVector += 0.6;}
            if(comboLevel == 4){combo5.play(); fighter.comboVector += 1.5;}
            if(comboLevel == 5){combo6.play(); fighter.comboVector += 3.2;}
            if(comboLevel == 6){combo7.play(); fighter.comboVector += 5; 
                stopCombo2();}}
        if (bot.combo){
            if(comboLevel == 0){combo1.play(); bot.comboVector += 0.1;}
            if(comboLevel == 1){combo2.play(); bot.comboVector += 0.2;}
            if(comboLevel == 2){combo3.play(); bot.comboVector += 0.3;}
            if(comboLevel == 3){combo4.play(); bot.comboVector += 0.6;}
            if(comboLevel == 4){combo5.play(); bot.comboVector += 1.5;}
            if(comboLevel == 5){combo6.play(); bot.comboVector += 3.2;}
            if(comboLevel == 6){combo7.play(); bot.comboVector += 5; 
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
//AFFICHAGE DU CANVAS//
///////////////////////////////////////////
//Moteur d'animation
function animate(){
    //var ladate=new Date();
    //console.log(ladate.getSeconds());
    if(trozik.currentTime >= trozik.duration-0.07){
        trozik.play();
        trozik.currentTime = 11.996;
    }
    
    draw();
    stepConvert();
    backAnime();
    modeFight();
    stand();
    botstand();
    requestAnimationFrame(animate);
}

var stepAnim;
var botstepAnim;
var jccA;
var jccB;
var energyStepp;
var botenergyStepp;
var csM1, csM2, csM3;
function stepConvert(){
    stepAnim = fighter.step;
    botstepAnim = bot.step;
    jccA = fighter.jaugeComboStep;
    jccB = bot.jaugeComboStep;
    csM1 = combiStepMicro[0];
    csM2 = combiStepMicro[1];
    csM3 = combiStepMicro[2];
}
//dessine les sprites
function draw(){
    ctx.clearRect(0, 0, width, height);
    drawShell(r, 
    Math.floor(stepAnim), Math.floor(bgStep), Math.floor(botstepAnim),
    Math.floor(displayFightStep),
    Math.floor(jccA), Math.floor(jccB),
    Math.floor(comboTextStep), Math.floor(comboNumberStep), Math.floor(comboNumberStepMicro),
    Math.floor(csM1), Math.floor(csM2), Math.floor(csM3),
    Math.floor(jaugevectorStep), Math.floor(jaugevector2Step),
    Math.floor(flashHitStep)
    );
}
//coordonnées des sprites
function drawShell(r, 
    stepAnim, bgStep, botstepAnim, 
    displayFightStep, jccA, jccB, 
    comboTextStep, comboNumberStep, comboNumberStepMicro,
    csM1, csM2, csM3,
    jaugevectorStep, jaugevector2Step,
    flashHitStep
    ){
    //grandeur des images
    var s = r/20;
    
    //background
    ctx.drawImage(bg,350*bgStep, 0, 350, 150, 0*s, 0*s, 350*s, 150*s);

    //priorité d'affichage joueurs
    if (!fighter.firstGround && !fighter.firstGroundKo){
        //joueur
        ctx.drawImage(fighterImg, ((fighter.inverseStart+(fighter.reverseAnim * fighter.fightStyle)+(fighter.reverseAnim * stepAnim))*70), 0+fighter.reverseSprite, 70, 55, (fighterPos.pX + fighter.miniAdjust)*s, (fighterPos.pY-23)*s, 70*s, 55*s);
        //enemi
        ctx.drawImage(botImg, ((bot.inverseStart+(bot.reverseAnim * bot.fightStyle)+(bot.reverseAnim * botstepAnim))*70), 0+bot.reverseSprite, 70, 55, (botPos.pX + bot.miniAdjust)*s, (botPos.pY-23)*s, 70*s, 55*s);
    }
    else if (fighter.firstGround || fighter.firstGroundKo){
        //enemi
        ctx.drawImage(botImg, ((bot.inverseStart+(bot.reverseAnim * bot.fightStyle)+(bot.reverseAnim * botstepAnim))*70), 0+bot.reverseSprite, 70, 55, (botPos.pX + bot.miniAdjust)*s, (botPos.pY-23)*s, 70*s, 55*s);
        //joueur
        ctx.drawImage(fighterImg, ((fighter.inverseStart+(fighter.reverseAnim * fighter.fightStyle)+(fighter.reverseAnim * stepAnim))*70), 0+fighter.reverseSprite, 70, 55, (fighterPos.pX + fighter.miniAdjust)*s, (fighterPos.pY-23)*s, 70*s, 55*s);
    }
    //abres
    ctx.drawImage(trees,0, 0, 350*s, 150*s);

    if(comboDisplay == 1){
    //flash
    ctx.drawImage(flashHit, flashHitStep * 500, 0, 500, 500, (flashHitPos.pX-250)*s, (flashHitPos.pY-250)*s, 500*s, 500*s);
    }

    //jauges vector force
    ctx.drawImage(jaugevector, 0, 2*jaugevectorStep, (82-energyD), 2, jaugevectorPos.pX*s, jaugevectorPos.pY*s, (82-energyD)*s, 2*s);
    ctx.drawImage(jaugevector, 0, 2*jaugevector2Step, (82-energyD2), 2, (jaugevector2Pos.pX+energyD2)*s, jaugevector2Pos.pY*s, (82-energyD2)*s, 2*s);

    //jauges
    ctx.drawImage(jaugeCL, 167*fighter.jaugeCStep, 0, 167, 36, energyPos.pX*s, energyPos.pY*s, 167*s, 36*s);
    ctx.drawImage(jaugeCR, 167*bot.jaugeCStep, 0, 167, 36, botenergyPos.pX*s, botenergyPos.pY*s, 167*s, 36*s);
    ctx.drawImage(jaugeL, 0, 0, 120-(120-(fighter.energy/2)), 6, energyPos2.pX*s, energyPos2.pY*s,(121-(120-(fighter.energy/2)))*s, 6*s);
    ctx.drawImage(jaugeR, 0+(120-(bot.energy/2)), 0, 121, 6, (botenergyPos2.pX+(120-(bot.energy/2)))*s-2, botenergyPos2.pY*s, 121*s, 6*s);
    //jauges combo
    ctx.drawImage(jaugeCombo, 117*jccA, 0, 117, 21, jaugecomboPos.pX*s, jaugecomboPos.pY*s, 117*s, 21*s);
    ctx.drawImage(jaugeCombo2, 117*jccB, 0, 117, 21, jaugecombo2Pos.pX*s, jaugecombo2Pos.pY*s, 117*s, 21*s);  
    
    //combo buttons
    if(comboDisplay == 1 && combodelay){
        ctx.drawImage(comboText, 49*comboTextStep, 0, 49, 33, comboTextPos.pX*s, comboTextPos.pY*s, 49*s, 33*s);
        ctx.drawImage(comboNumber, 15*(comboNumberStep + comboNumberStepMicro) , 0, 15, 24, comboNumberPos.pX*s, comboNumberPos.pY*s, 15*s, 24*s);
        ctx.drawImage(comboTimer, 0, 0, 120, 10, comboTimerPos.pX*s, comboTimerPos.pY*s, 120*s, 10*s);  
        ctx.drawImage(comboTimerBar, 0, 0, 112, 2, comboTimerBarPos.pX*s, comboTimerBarPos.pY*s, 1*comboTimerBarStep*s, 2*s);              
        ctx.drawImage(combinaison, 30*(combinaisonStep[0] + csM1), 0, 30, 30, (combinaisonPos.pX - 22)*s, combinaisonPos.pY*s, 30*s, 30*s);
        ctx.drawImage(combinaison, 30*(combinaisonStep[1] + csM2), 0, 30, 30, combinaisonPos.pX*s, combinaisonPos.pY*s, 30*s, 30*s);    
        ctx.drawImage(combinaison, 30*(combinaisonStep[2] + csM3), 0, 30, 30, (combinaisonPos.pX + 22)*s, combinaisonPos.pY*s, 30*s, 30*s);
    }

    //startscreen
    if(displayFight){
        ctx.drawImage(startFightScreen, 150*displayFightStep, 0, 150, 150, displayFightPos.pX*s, displayFightPos.pY*s, 150*s, 150*s);
    }
}
///////////////////////////////////////////



///////////////////////////////////////////
//MOTEUR D'ANIMATION START & COMBOMODE
///////////////////////////////////////////
function modeFight(){
///////////////////////////////////////////
//DISPLAY FIGHT
///////////////////////////////////////////
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
            if (roundCounter == roundNumber){
                roundCounter = 0;}
        }
        else if (displayCounter == 0){
            displayCounter+=1;
            displayFightStep = 10;
            displayFightLenght = 19;
            round.play();
        };
    }
///////////////////////////////////////////
//COMBO ACTIVATING PROCESSOR2
///////////////////////////////////////////
    //comboBar
    if(comboDisplay && combodelay){
        if(comboTimerBarStep <= 112){
            comboTimerBarStep+= 0.221 + comboLevel * 0.04;}
        else {stopComboDisplay();}
    }    
    ///////////////////////////////////////
    //comboText
    if(comboDisplay && combodelay){
        comboTextStep+=0.1;
        if (comboTextStep >= 19){
            comboTextStep = 0}
    }
    else if(!comboDisplay){
        comboNumberStep = 0;
        comboTimerBarStep = 0
    }
    //comboNumber
    if(comboDisplay){
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

///////////////////////////////////////////
//DECOR
///////////////////////////////////////////
//animation decor (a revoir)
function backAnime(){
    bgStep += 0.1 * gamespeed * punchedSpeed;
    if (bgStep >= 8){
        bgStep = 0;
    }
}
///////////////////////////////////////////


