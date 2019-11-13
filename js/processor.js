/////////////////////////////////////////////////
//detection des coups donnés à droite
/////////////////////////////////////////////////
function detectorRight(char, pos, posb){
    if(pos.pX + char.smashDistance >= posb.pX
    && pos.pY > posb.pY-18
    && pos.pY < posb.pY+18
    && char.reverseAnim == 1){
        char.detectR = true;
    }
    else {char.detectR = false;
    }
}

/////////////////////////////////////////////////
//detection des coups donnés à gauche
/////////////////////////////////////////////////
function detectorLeft(char, pos, posb){
    if(pos.pX - char.smashDistance <= posb.pX
    && pos.pY > posb.pY-18
    && pos.pY < posb.pY+18
    && char.reverseAnim == -1){
        char.detectL = true;
    }
    else {char.detectL = false;
    }
}

/////////////////////////////////////////////////
//DEPLACEMENTS
/////////////////////////////////////////////////
function moveProcessor(char, pos, posb, pad){

    //saut possible
    if (pad.up && pos.jumping == false 
        && char.keyCounter == 0
        && !comboDisplay) {
        pos.pY_velocity -= 14 * gamespeed * punchedSpeed;
        pos.jumping = true;
        char.keyCounter++;
    }
    //direction gauche
    if (pad.left 
        && char.padDirection == true 
        && !char.downState) {
            if(char.reverseAnim == -1){
                pos.pX_velocity -= 2.9 * gamespeed * punchedSpeed *((comboDisplay-1)*-1);
            }
            if(char.reverseAnim == 1){
                pos.pX_velocity -= 2.5 * gamespeed * punchedSpeed *((comboDisplay-1)*-1);
            }
    }
    //direction droite
    if (pad.right 
        && char.padDirection == true 
        && !char.downState) {
            if(char.reverseAnim == 1){
                pos.pX_velocity += 2.9 * gamespeed * punchedSpeed *((comboDisplay-1)*-1);
            }
            if(char.reverseAnim == -1){
                pos.pX_velocity += 2.5 * gamespeed * punchedSpeed *((comboDisplay-1)*-1);
            }
    }

    //physique
    pos.pY_velocity += 1.6 * gamespeed * gamespeed * punchedSpeed * punchedSpeed;// gravity
    pos.pX += pos.pX_velocity;
    pos.pY += pos.pY_velocity;
    pos.pX_velocity *= 0.5;// friction
    pos.pY_velocity *= 1;// friction

    //tombe au sol
    if (pos.pY > 140 - 32) {
    pos.jumping = false;
    pos.pY = 140 - 32;
    pos.pY_velocity = 0;
    }

    //gauche de l'écran
    if (pos.pX < -10) {
    pos.pX = -10;
    }
    //droite de l'écran
    else if (pos.pX > 380-pos.width) {
    pos.pX = 380-pos.width;
    }

    //saut possible vers la droite
    else if (pos.pX > posb.pX-24 
    && pos.pY > posb.pY-18
    && pos.pY < posb.pY+18
    && char.reverseAnim == 1) {
        pos.pX = posb.pX-24;}

    //saut possible vers la gauche
    else if (pos.pX < posb.pX+24 
    && pos.pY > posb.pY-18
    && pos.pY < posb.pY+18
    && char.reverseAnim == -1) {
        pos.pX = posb.pX+24;}
}


/////////////////////////////////////////////////
//KO
/////////////////////////////////////////////////
function koProcessor(pad){
    if(kocount != 0){
        pad.left = false;
        pad.up = false;
        pad.right = false;
    }
}

/////////////////////////////////////////////////
//CONTRE A DROITE
/////////////////////////////////////////////////
function contreProcessorRight(pad, char, charb, posb){
    if(char.arrGarde){char.contreCounterL = 0;};
    if(!char.arrGarde){char.contreCounterL+=0.1;};
    if (pad.left && charb.step <= charb.smashPoint-(charb.animSpeed+1)){
        char.contreCounterL++;
    }
    if(charb.step >= charb.smashPoint-(charb.animSpeed+1)
    && charb.step < charb.smashPoint
    && char.contreCounterL < 1.1
    && pad.left
    && charb.detectR == true){
        char.smashOk = true;
        char.contreIteration = true;
        char.contreCounterL++;
        contre(char);
        char.step=0;
        punched(charb);}
    if(char.punchEject && char.reverseAnim == -1){
        posb.pX_velocity -= 1.9 * gamespeed * punchedSpeed;
        char.punchEject = false;}
}
/////////////////////////////////////////////////
//CONTRE A GAUCHE
/////////////////////////////////////////////////
function contreProcessorLeft(pad, char, charb, posb){
    if(char.arrGarde){char.contreCounterR = 0;};
    if(!char.arrGarde){char.contreCounterR+=0.1;};
    if (pad.right && charb.step <= charb.smashPoint-(charb.animSpeed+1)){
        char.contreCounterR++;
    }
    if(charb.step >= charb.smashPoint-(charb.animSpeed+1)
    && charb.step < charb.smashPoint
    && char.contreCounterR < 1.1
    && pad.right
    && charb.detectL == true){
        char.smashOk = true;
        char.contreIteration = true;
        char.contreCounterR++;
        contre(char);
        char.step=0;
        punched(charb);}
    if(char.punchEject && char.reverseAnim == 1){
        posb.pX_velocity += 1.9 * gamespeed * punchedSpeed;
        char.punchEject = false;}
}



///////////////////////////////////////////
//CONDITIONS
///////////////////////////////////////////

///////////////////////////////////////////
//SMASH & KO
function playerCondition(char ,charb, pos){
    // Moment du coup
    if (char.step >= char.smashPoint){char.smashOk = true;}
    // Iteration du air Kick
    if (char.step > 15){char.contreIteration = false;}
    if (char.step >= char.fightStyleLenght){char.interationHit = true;}
    //ko
    if (char.energy <= 0){
        ko(char, charb);
        char.jaugeCStep = 1;
        startcount = 0;
        comboDisplay = 0;
        okFight = false;
        if (kocount == 0){
            koSound.play();
            kocount++;}
        if (char.step >= char.fightStyleLenght){
            char.step = char.fightStyleLenght;}
    }
    else if (char.keyCounterM == 1 && !char.jumpState){
        if (char.step >= char.fightStyleLenght){
            char.step -= char.fightStyleLenght;}
        }
///////////////////////////////////////////
//CONTRE
    else if (
        char.contreIteration){
            char.firstGround = true;
        if (char.step >= 8){
            char.punchEject = true;
        }
        if (char.step >= char.fightStyleLenght){
            attend(char);
            char.contreIteration = false;
        }
    }
///////////////////////////////////////////
//AUTRES CONDITIONS
    // Anim saut et frappé en l'air
    else if (pos.jumping == true && char.jumpState == true){
        if(!char.vape){
            jump(char);
            if (char.step >= 7){
                char.step-=4;}
        }
        else if(char.vape){
            punched(char);}
    }
    // Au sol
    else if (char.jumpState == false){
        //pas de garde
        if (char.vraimentgarde == false){
            //ATTEND
            //re-initialisation
            if (char.step >= char.fightStyleLenght){
                char.step -= char.fightStyleLenght;
                char.jaugeComboCounter = 0;
                char.kickRepeat = true;
                char.punchrepeat = [false, false];
                char.animSpeed = 0.4;
                char.firstGround = false;
                char.smashOk = false;
                //mode avance apres coup
                char.padDirection = true;
                if(char.directionJump == false 
                && !char.arrGarde ){
                    if(!charb.combo){
                        attend(char);}
                    else if (charb.combo){
                        groggy(char);}
                        char.gardeState = false;
                };
            }
            //mise en danger (a updater)
            else if (char.step >= char.fightStyleLenght-1){
                charb.vape = false;
            }
        }
        //garde
        else {
            if (charb.combo) {groggy(char);}
            //mode d'animation
            if (char.step >= char.fightStyleLenght){
                char.step = char.fightStyleLenght-1 + char.blockedStep;
                char.kickRepeat = true;
                char.punchrepeat = [false, false];
                char.animSpeed = 0.4;
                char.firstGround = false;
                char.smashOk = false;
            }
            //blocage touche
            if(char.blockedAnimation){
                char.step = char.fightStyleLenght;
                char.blockedStep+=0.2;
                if(char.blockedStep >= 5){
                    char.blockedStep = 0;
                    char.blockedAnimation = false;}
            }
        }
    }
    //etat de saut
    else if (char.jumpState == true){
        //fin animation
        if (char.step >= char.fightStyleLenght){
            char.step -= 4;
            char.gardeState = false;
            char.smashOk = false;
            attend(char);
        }
        //fin du air
        if (char.jumpStep >= 30){
            char.jumpState = false;
        }
    }
}
///////////////////////////////////////////
//COMBO JAUGE
///////////////////////////////////////////
//augmentation jauges combo
function jaugeComboProcessor(char){
    if (char.jaugeComboStep < 15){
        //jauge crenelée
        if(char.jaugeComboStep < char.jaugeComboStepMicro){
            char.jaugeComboStep+=0.08 * gamespeed;}
    }
    //jauge max
    else {
        //anim quand ok
        char.jaugeComboStep+=0.10 * gamespeed;
        //jauge max > initialisation
        if(char.jaugeComboStep >= 9){
            if (goModeCounter == 0){
                comboKey = -1;
                combo3.play();
                goMode();
                goModeCounter++;
                char.combo = true;
                comboDisplay = 1;
                char.comboMode = true;
                setTimeout(function(){
                    combodelay = true;
                    combo1.play();
                    }, 500 / gamespeed);
            }
        }
        if(char.jaugeComboStep >= 20){
            char.jaugeComboStep-=5;
        }
    }
}
///////////////////////////////////////////
//FLASH HITS
///////////////////////////////////////////
var flashAnimStep = 0;
function flashLeft(char, posb){
    flashAnimStep = 0;
    flashHitStep = Math.floor(Math.random() * 3) * 4;
    if(!char.downState){
        flashHitPos.pX = posb.pX + 30;
        flashHitPos.pY = posb.pY - 10;}
    else if(char.downState){
        flashHitPos.pX = posb.pX + 30;
        flashHitPos.pY = posb.pY + 10;}
}
function flashRight(char, posb){
    flashAnimStep = 0;
    flashHitStep = Math.floor(Math.random() * 3) * 4;
    
    if(!char.downState){
        flashHitPos.pX = posb.pX + 27;
        flashHitPos.pY = posb.pY - 10;}
    else if(char.downState){
        flashHitPos.pX = posb.pX + 27;
        flashHitPos.pY = posb.pY + 10;}
}
///////////////////////////////////////////
///////////////////////////////////////////
//ENERGY
///////////////////////////////////////////
function energyProcessor(char){
    //energie qui remonte
    char.energyStep = 120 - (char.energy * 0.5);
    if (char.energy > 0){
        if(char.energy < 239){
            char.energy += char.recuperation * gamespeed;}
    }
    //vitesse d'animation de l'energie
    char.energyStep = 120 - char.energy * 0.5;
    char.step += 0.7 * char.animSpeed * 0.5 * gamespeed * punchedSpeed;
    char.jumpStep += 1;
}
///////////////////////////////////////////
//JAUGE PLUS
///////////////////////////////////////////
function jaugePlus(char, charb){
    char.smashOK = false;
    charb.vape = true;
    charb.energy -= char.vectorForce * char.comboVector * gamespeed;
    charb.jaugeComboStep = 0;
    charb.jaugeComboStepMicro = 0;
    if (char.jaugeComboCounter == 0){
        char.jaugeComboCounter++;
        char.jaugeComboStepMicro+=3;
    }
}

///////////////////////////////////////////
//PUNCH ON THE RIGHT
///////////////////////////////////////////
//coups donnés à droite
function punchRightProcessor(char, charb, pos, posb){
    if(char.smashOk == true
    && char.detectR == true){
        //nouvelle fonction garde
        if (charb.arrGarde == true){
            garde(charb);
            charb.padDirection = false;
            charb.vraimentgarde = true;
        }
        //rajout ligne (bug?)
        if(charb.vraimentgarde == false && char.energy > 0){
            punched(charb);
            flashRight(char, posb);
            if(pos.jumping && comboDisplay == 1){
                posb.pY_velocity -= 2 * gamespeed;
                posb.pX_velocity += 4 * gamespeed;}
            if(!comboDisplay){
                posb.pX_velocity += 0.4 * gamespeed;}
            jaugePlus(char, charb);
        }
        else{
            //rajout ligne (bug?)
            if (char.downState != charb.downState && char.energy > 0){
                punched(charb);
                flashRight(char, posb);
                if(!comboDisplay){
                    posb.pX_velocity += 0.4 * gamespeed;}
                jaugePlus(char, charb);}  
            else{
                swing8.play();
                charb.blockedAnimation = true;}          
        }
    }
}
///////////////////////////////////////////
//PUNCH ON THE LEFT
///////////////////////////////////////////
function punchLeftProcessor(char, charb, pos, posb){
    //coups donnés à gauche
    if(char.smashOk == true
    && char.detectL == true){
        //nouvelle fonction garde
        if (charb.arrGarde == true){
            garde(charb);
            charb.padDirection = false;
            charb.vraimentgarde = true;
        }
        if(charb.vraimentgarde == false && char.energy > 0){
            punched(charb);
            flashLeft(char, posb);
            if(pos.jumping && comboDisplay == 1){
                posb.pY_velocity -= 2 * gamespeed;
                posb.pX_velocity -= 4 * gamespeed;}
            if(!comboDisplay){
                posb.pX_velocity -= 0.4 * gamespeed;}
                jaugePlus(char, charb);
        }
        else{
            if (char.downState != charb.downState && char.energy > 0){
                punched(charb);
                flashLeft(char, posb);
                if(!comboDisplay){
                    posb.pX_velocity -= 0.4 * gamespeed;
                }
                jaugePlus(char, charb);
            }  
            else{
                swing8.play();
                charb.blockedAnimation = true;
            }
        }
    }
}
///////////////////////////////////////////
//DIRECTIONS DES JOUEURS//
///////////////////////////////////////////
function playerDirection(char, charb, pos, posb){
    if(posb.pX > pos.pX){
        charb.reverseSprite = 55;
        charb.reverseAnim = -1;
        charb.inverseStart = 130;
        charb.miniAdjust = -20;

        char.reverseSprite = 0;
        char.reverseAnim = 1;
        char.inverseStart = 0;
        char.miniAdjust = 0;
    }
}
///////////////////////////////////////////
