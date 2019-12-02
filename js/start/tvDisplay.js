var scalingFactor = 0.5;
var numSlices =19;
var ni = -0;
function display3D(ctx, bgGround, scalingFactor, numSlices) {
    ni= -moveBg;
    var h = bgGround.height, w = bgGround.width,
    // how much should every slice be scaled in width?
    widthScale = (1 - scalingFactor) / numSlices;
    // height of each slice
    sliceHeight = h / numSlices;
    // iterate over all slices
    for (var n = 0; n < numSlices; n++) {
        // source - where to take the slices from
        var sx = 0,
        sy = sliceHeight * n,
        sWidth = w,
        sHeight = sliceHeight;
        // destination - where to draw the new slices
        var dx = (w * widthScale * (numSlices - n)) / 2,
        dy = sliceHeight * n,
        dWidth =  w * (1 - (widthScale * (numSlices - n))),
        dHeight = sliceHeight;

        ctx.drawImage(bgGround, (sx+ni/2) - (bgGround.height*2), sy, sWidth, sHeight, dx*2 - (bgGround.width/2), dy*2 + 262, dWidth * 2 + (bgGround.width/2), dHeight*2);
    }
}


///////////////////////////////////////////
//AFFICHAGE DU CANVAS//
///////////////////////////////////////////
//Moteur d'animation
function animate(){
    //var ladate=new Date();
    //console.log(ladate.getSeconds());

    //remise a zero de la musique de fond
    if(trozik.currentTime >= trozik.duration-0.07){
        trozik.play();
        trozik.currentTime = 11.996;
    }
    if(!okFight){
        timeOne = 61;
    }
    if(okFight){
        if(timeOne >= 2){
            timeOne-= 1/240;
            timeNumberStep1 =  (timeOne-1) % 10;
            timeNumberStep2 =  (Math.floor((timeOne-1)/10) % 10);
        }
        if(timeOne <= 2){
            okFight = false;
            startcount = 0;
            comboFail.play()
        }
    }


    //fonctions
    koPlus(fighter, bot, fighterScore);
    koPlus(bot, fighter, botScore);
    draw();
    stepConvert();
    backAnime();
    modeStart();
    modeCombo();
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
var moveBg = -50;
var moveUpBg = 0;
var timeNumberStep1 = 0;
var timeNumberStep2 = 0;
var timeOne = 61;
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
    Math.floor(flashHitStep),
    Math.floor(timeNumberStep1), Math.floor(timeNumberStep2)
    );
}
//coordonnées des sprites
function drawShell(r, 
    stepAnim, bgStep, botstepAnim, 
    displayFightStep, jccA, jccB, 
    comboTextStep, comboNumberStep, comboNumberStepMicro,
    csM1, csM2, csM3,
    jaugevectorStep, jaugevector2Step,
    flashHitStep,
    timeNumberStep1, timeNumberStep2
    ){
    //grandeur des images
    var s = r/20;
    //background
    ctx.drawImage(bg,350*bgStep, 0, 350, 150, -5*s, 0*s, 350*s, 150*s);
    
    //sol 3D
    display3D(ctx, bgGround, scalingFactor, numSlices);

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

    //Fireballs joueur 1
    for(var i = 0; i < anyBall.length; i++){
        ctx.drawImage(fireballImg,Math.floor(anyBall[i].step)*23,anyBall[i].sens*23, 23, 23, (anyBall[i].x+moveBg)*s,anyBall[i].y*s, 23*s, 23*s);
    }
    //Fireballs joueur 2
    for(var i = 0; i < anyBallB.length; i++){
        ctx.drawImage(fireballImg,Math.floor(anyBallB[i].step)*23,anyBallB[i].sens*23, 23, 23, (anyBallB[i].x+moveBg)*s,anyBallB[i].y*s, 23*s, 23*s);
    }

    //abres
    ctx.drawImage(trees,(moveBg*(0.5))*s, 0, 350*s, 150*s);

    if(comboDisplay == 1){
    //flash
    ctx.drawImage(flashHit, flashHitStep * 500, 0, 500, 500, (flashHitPos.pX-250)*s, (flashHitPos.pY-250)*s, 500*s, 500*s);
    }

    //jauges vector force
    ctx.drawImage(jaugevector, 0, 2*jaugevectorStep, (82-energyD), 2, jaugevectorPos.pX*s, jaugevectorPos.pY*s, (82-energyD)*s, 2*s);
    ctx.drawImage(jaugevector, 0, 2*jaugevector2Step, (82-energyD2), 2, (jaugevector2Pos.pX+energyD2)*s, jaugevector2Pos.pY*s, (82-energyD2)*s, 2*s);

    //jauges
    ctx.drawImage(jaugeCL, 129*fighter.jaugeCStep, 0, 129, 36, energyPos.pX*s, energyPos.pY*s, 129*s, 36*s);
    ctx.drawImage(jaugeCR, 129*bot.jaugeCStep, 0, 129, 36, botenergyPos.pX*s, botenergyPos.pY*s, 129*s, 36*s);
    ctx.drawImage(jaugeL, 0, 0, 120-(120-(fighter.energy/2)), 6, energyPos2.pX*s, energyPos2.pY*s,(121-(120-(fighter.energy/2)))*s, 6*s);
    ctx.drawImage(jaugeR, 0+(120-(bot.energy/2)), 0, 121, 6, (botenergyPos2.pX+(120-(bot.energy/2)))*s-2, botenergyPos2.pY*s, 121*s, 6*s);
    //jauges combo
    ctx.drawImage(jaugeCombo, 104*jccA, 0, 104, 10, jaugecomboPos.pX*s, jaugecomboPos.pY*s, 104*s, 10*s);
    ctx.drawImage(jaugeCombo2, 104*jccB, 0, 104, 10, jaugecombo2Pos.pX*s, jaugecombo2Pos.pY*s, 104*s, 10*s); 
    
    //jauges round
    ctx.drawImage(roundBarL, 7*fighterScore.roundW[0], 0, 7, 5, roundBL.pX*s, roundBL.pY*s, 7*s, 5*s);
    ctx.drawImage(roundBarL, 7*fighterScore.roundW[1], 0, 7, 5, (roundBL.pX + 5)*s, roundBL.pY*s, 7*s, 5*s);
    ctx.drawImage(roundBarL, 7*fighterScore.roundW[2], 0, 7, 5, (roundBL.pX + 10)*s, roundBL.pY*s, 7*s, 5*s);
    ctx.drawImage(roundBarL, 7*fighterScore.roundW[3], 0, 7, 5, (roundBL.pX + 15)*s, roundBL.pY*s, 7*s, 5*s);
    ctx.drawImage(roundBarL, 7*fighterScore.roundW[4], 0, 7, 5, (roundBL.pX + 20)*s, roundBL.pY*s, 7*s, 5*s);
    ctx.drawImage(roundBarR, 7*botScore.roundW[0], 0, 7, 5, roundBR.pX*s, roundBR.pY*s, 7*s, 5*s);
    ctx.drawImage(roundBarR, 7*botScore.roundW[1], 0, 7, 5, (roundBR.pX - 5)*s, roundBR.pY*s, 7*s, 5*s);
    ctx.drawImage(roundBarR, 7*botScore.roundW[2], 0, 7, 5, (roundBR.pX - 10)*s, roundBR.pY*s, 7*s, 5*s);
    ctx.drawImage(roundBarR, 7*botScore.roundW[3], 0, 7, 5, (roundBR.pX - 15)*s, roundBR.pY*s, 7*s, 5*s);
    ctx.drawImage(roundBarR, 7*botScore.roundW[4], 0, 7, 5, (roundBR.pX - 20)*s, roundBR.pY*s, 7*s, 5*s);
    
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

    //timer
    ctx.drawImage(timeNumber, 8 * timeNumberStep2, 0, 8, 11, 137 *s, 11*s, 8*s, 11*s);
    ctx.drawImage(timeNumber, 8 * timeNumberStep1, 0, 8, 11, 145 *s, 11*s, 8*s, 11*s);

    //nameList
    ctx.drawImage(charNameL, 0, 6*0, 52, 6, 2*s, 3*s, 52*s, 6*s);
    ctx.drawImage(charNameR, 0, 6*1, 52, 6, 236*s, 3*s, 52*s, 6*s);

    //startscreen
    if(displayFight){
        ctx.drawImage(startFightScreen, 150*displayFightStep, 0, 150, 150, displayFightPos.pX*s, displayFightPos.pY*s, 150*s, 150*s);
    }
    //boxes collider
    //ctx.drawImage(bodyBoxImg, bodyBoxA.pX*s, bodyBoxA.pY*s, bodyBoxA.width*s, bodyBoxA.height*s);
    //ctx.drawImage(armBoxImg, armBoxA.pX*s, armBoxA.pY*s, armBoxA.width*s, armBoxA.height*s);
    //ctx.drawImage(legBoxImg, legBoxA.pX*s, legBoxA.pY*s, legBoxA.width*s, legBoxA.height*s);

    //ctx.drawImage(bodyBoxImg, bodyBoxB.pX*s, bodyBoxB.pY*s, bodyBoxB.width*s, bodyBoxB.height*s);
    //ctx.drawImage(armBoxImg, armBoxB.pX*s, armBoxB.pY*s, armBoxB.width*s, armBoxB.height*s);
    //ctx.drawImage(legBoxImg, legBoxB.pX*s, legBoxB.pY*s, legBoxB.width*s, legBoxB.height*s);  
    if(menu0){
        ctx.beginPath();
        ctx.rect(0,0,350*s,150*s);
        //ctx.fillStyle="#000050";
        ctx.fillStyle="black";
        ctx.fill();
        //ctx.drawImage(consoleMenu,0, 0, 58, 68, 115*s, 41*s, 58*s, 68*s);
        ctx.drawImage(rules,0, 0, 288, 150, 0*s, 0*s, 288*s, 150*s);
    }
}
///////////////////////////////////////////

function koPlus(char, charb, charS){
    for (var i = 0; i < roundCounter; i++)
    if(roundCounter == i + 1){
        if (char.roundWin =  1 && char.energy == 240 && charb.energy <= 0){
            charS.roundW[i] = 2;
        }
        else if (char.roundWin = 1 && charb.energy <= 0){
            charS.roundW[i] = 1;
        }
        else if (timeOne <= 2){
            if (char.energy > charb.energy){
                charS.roundW[i] = 1;
            }           
        }
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