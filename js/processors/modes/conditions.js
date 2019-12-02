///////////////////////////////////////////
//CONDITIONS
///////////////////////////////////////////
function playerCondition(char ,charb, pos){
///////////////////////////////////////////
//ANIMATIONS
    //Vitesse de l'animation du personnage
    char.step += 0.7 * char.animSpeed * 0.5 * gamespeed * punchedSpeed;
    //compteur du saut (a revoir)
    char.jumpStep += 1;
    // Iterations
    if (char.step > 15){char.contreIteration = false;}
    if (char.step >= char.fightStyleLenght){
        char.iterationHit = true;}
///////////////////////////////////////////
    
///////////////////////////////////////////
//SMASH & KO
    // Moment du coup
    if (char.step >= char.smashPoint){char.smashOk = true;}
    //ko
    if (char.energy <= 0){
        ko(char, charb);
        char.jaugeCStep = 1;
        startcount = 0;
        comboDisplay = 0;
        okFight = false;
        if (kocount == 0){
            koSound.play();
            charb.roundWin+=1;
            kocount++;
            }
        if (char.step >= char.fightStyleLenght){
            char.step = char.fightStyleLenght;}
    }
    else if (char.keyCounterM == 1 
        && !char.jumpState 
        && char.kickRepeat
        && char.keyCounterP == 0
        && !char.contreIteration
        && !char.vraimentgarde
        ){
            move(char);
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
    else if (pos.jumping == true && char.jumpState == true
        && !char.vape){
            jump(char);
            if (char.step >= 7){char.step-=4;}
    }
    // Au sol
    else if (char.jumpState == false){
        //pas de garde
        if (char.vraimentgarde == false){
            //bloque la repetition des coups si la touche arriere et enfoncée
                if (char.arrGarde && char.step >= char.fightStyleLenght){
                    attend(char);
                }
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
                        if(!char.downState){
                            attend(char);
                        }
                        else if(char.downState){
                            gardeBasse(char);
                            char.vraimentgarde = true;
                            if (char.step >= char.fightStyleLenght){
                                char.step = char.fightStyleLenght-1 + char.blockedStep;
                            }
                        }
                        
                    }
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
            punched(charb, char);
            flashRight(char, posb);
            if(pos.jumping && comboDisplay == 0){
                //
                pos.pY_velocity -= 1 * gamespeed * punchedSpeed;
                posb.pY_velocity -= 1 * gamespeed * punchedSpeed;
                posb.pX_velocity += 2 * gamespeed * punchedSpeed;}
            if(comboDisplay == 0){
                posb.pX_velocity += 0.4 * gamespeed * punchedSpeed;}
            jaugePlus(char, charb);
        }
        else{
            //rajout ligne (bug?)
            if (char.downState != charb.downState && char.energy > 0){
                punched(charb, char);
                flashRight(char, posb);
                if(comboDisplay == 0){
                    posb.pX_velocity += 0.4 * gamespeed * punchedSpeed;}
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
            punched(charb, char);
            flashLeft(char, posb);
            if(pos.jumping && comboDisplay == 0){
                //
                pos.pY_velocity -= 1 * gamespeed * punchedSpeed;
                posb.pY_velocity -= 1 * gamespeed * punchedSpeed;
                posb.pX_velocity -= 2 * gamespeed * punchedSpeed;}
            if(comboDisplay == 0){
                posb.pX_velocity -= 0.4 * gamespeed * punchedSpeed;}
                jaugePlus(char, charb);
        }
        else{
            if (char.downState != charb.downState && char.energy > 0){
                punched(charb, char);
                flashLeft(char, posb);
                if(comboDisplay == 0){
                    posb.pX_velocity -= 0.4 * gamespeed * punchedSpeed;
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
function flyPunchProcessor(char, charb, posb){
//EJECTION EN L'AIR
    if(char.punchFly && (!char.detectL && !char.detectR)){
    char.punchFly = false;}           
    else if ((char.punchFly && (char.detectL || char.detectR))
    && !charb.vraimentgarde)  {
        posb.pY_velocity -= 9 * gamespeed;
        posb.jumping = false;
        char.punchFly = false;
        if (char.reverseAnim == 1){
            posb.pX_velocity += 4 * gamespeed;
        }
        else if (char.reverseAnim == -1){
            posb.pX_velocity -= 4 * gamespeed;
        }
    }
}