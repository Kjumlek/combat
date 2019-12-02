//FONCTION RECONNAISSANCE CLAVIER DOWN
function keyboardDown(x, xPos, kD, kU, kL, kR, kP, kK, event, ballID){ 

    //garde basse
    if (event.keyCode == kD && down1(x)){
        gardeBasse(x);
        gardeBasseState(x);}
    //fait marcher les haddokens en l'air
    if (event.keyCode == kD){
        x.haddoken1 = true;
        x.haddonkenCounter = 0;
        setTimeout(function(){
            x.haddoken1 = false;
        }, 160 / gamespeed);}
    //jump
    else if (event.keyCode == kU && up1(x, xPos)){
        jumpState(x);}
    //direction gauche
    else if (event.keyCode == kL && (x.iterationHit || x.superKick1 || x.superPunch1)
        ){
        move(x);
        moveStateL(x);
        x.keyCounterM = 1;
    }
    //direction droite
    else if (event.keyCode == kR && (x.iterationHit || x.superKick1 || x.superPunch1)
        ){
        move(x);
        moveStateR(x);
        x.keyCounterM = 1;
    }
    //punch et amorce double punch
    else if (event.keyCode == kP && punch1(x)){
        punchLeft(x);
        punchLeftState(x);

    }
    //envoi un haddoken
    else if (event.keyCode == kP && fireballC(x)){
        punchLeft(x);
        punchLeftState(x);
        pushTheBall(ballID, x, xPos);
        x.haddoken2 = false}
    //double punch
    else if (event.keyCode == kP && punch2(x)){
        punchRight(x);
        punchRightState(x);}
    //uppercut
    else if (event.keyCode == kP && punch3(x)){
        uppercut(x);
        uppercutState(x);}
    //kick
    else if (event.keyCode == kK && kick1(x)){
        kick(x);
        kickState(x);}
    //low kick
    else if (event.keyCode == kK && lkick1(x)){
        lowKick(x);
        lowKickState(x);}
    //Superkick
    else if (event.keyCode == kK && skick1(x)){
        cisorKick(x);
        cisorKickState(x);}    
    //air kick et amorce double air kick
    else if (event.keyCode == kK && akick1(x)){
        airKick(x);
        airKickState(x);}
    //double air kick
    else if (event.keyCode == kK && akick2(x)){
        airKick(x);
        airKick2();
        dbairKickState(x);}
    //air punch
    else if (event.keyCode == kP && apunch1(x) 
    && !x.haddoken1
    && !x.haddoken2
    && !x.haddoken3){
        airPunch(x);
        airPunchState(x);}
    else{}
}
//FONCTION RECONNAISSANCE CLAVIER UP
function keyboardUp(x, ev, kL, kU, kR, kD, kP, kK){
    switch(ev.keyCode) {
        case kL:// left key
        relacheKey(x);
        case kU:// up key
        x.keyCounter = 0;
        relacheKey3(x);
        break;
        case kR:// right key
        relacheKey(x);
        break;
        case kD:// down key
        x.keyCounterG = 0;
        x.downState = false;
        //preparation haddoken
        if (x.haddoken2){
            x.haddoken3 = true;
            setTimeout(function(){
                x.haddoken3 = false;
            }, 160 / gamespeed);
        }
        relacheKey(x);
        break;
        case kP:// Punch
        x.keyCounterP = 0;
        relacheKey2(x);
        break;
        case kK:// Kick
        x.keyCounterK = 0;
        relacheKey2(x);
        break;
    }
}
//RELACHE CLAVIER
function relacheKey(x){
    x.padDirection = false;
    x.arrGarde = false;
    x.gardeState = false;
    x.vraimentgarde = false;
    x.contreCounter = 0;
    x.keyCounterM = 0;}
function relacheKey2(x){
    x.punchrepeat = [false,false];
    x.arrGarde = false;
    x.gardeState = false;
    x.vraimentgarde = false;
    x.keyCounterM = 0;}
function relacheKey3(x){
}

//LISTE DES COUPS
//ATTEND
function attend(x){
    x.step = 0;
    x.fightStyle = 0;
    x.fightStyleLenght = 7;
    x.animSpeed = 0.4;
    x.smashPoint = 20;
    x.recuperation = 0.03;
    x.bodyAdvance = [1, 1, 1, 1, 1, 1, 1];
    x.bodyY = [1, 1, 0, 0, 1, 2, 2];
    x.armAdvance = [0, 0, 0, 0, 0, 0, 0];
    x.armHeight = [0, 0, 0, 0, 0, 0, 0];
    x.armY = [-1, -1, -1, 0, 1, 2, 1];
    x.legAdvance = [1, 0, 0, 0, 0, 0, 0];
    x.legHeight = [1, 0, 0, 0, 0, 0, 0];
    x.legY = [1, 0, 0, 0, 0, 0, 0];
}
//GARDES
//garde haute
function down1(x){
    if(x.keyCounterG == 0 && 
        !x.jumpState
     //&& x.keyCounterK == 0
        ) {return true;}
    else{return false};
}
function garde(x){
    x.step = 0;
    x.fightStyle = 7;
    x.fightStyleLenght = 4;
    x.animSpeed = 0.8;
    x.smashPoint = 20;
    x.vectorForce= 0;
    x.recuperation = 0;
    x.bodyAdvance = [0, 0, 0, 0, -1];
    x.bodyY = [-1, -1, -1, -1, -1];
    x.armAdvance = [1, 1, 1, 1, 0];
    x.armHeight = [6, 6, 6, 6, 6];
    x.armY = [-5, -5, -5, -5, -5];
    x.legAdvance = [0, 0, 0, 0, 0];
    x.legHeight = [0, 0, 0, 0, 0];
    x.legY = [0, 0, 0, 0, 0];
}
//garde basse
function gardeBasse(x){
    x.step = 0;
    x.fightStyle = 15;
    x.fightStyleLenght = 4;
    x.smashPoint = 20;
    x.vectorForce = 0;
    x.recuperation = 0;
    x.bodyAdvance = [0, 0, 0, 0, -1];
    x.bodyY = [-1, -1, -1, -1, -1];
    x.armAdvance = [1, 1, 1, 1, 0];
    x.armHeight = [6, 6, 6, 6, 6];
    x.armY = [0, 0, 0, 0, 0];
    x.legAdvance = [0, 0, 0, 0, 0];
    x.legHeight = [0, 0, 0, 0, 0];
    x.legY = [0, 0, 0, 0, 0];
}
function gardeBasseState(x){
    if (x.vraimentgarde){
        x.padDirection = false;}
    else {
        x.padDirection = true;}
        x.downState = true;
        x.gardeState = true;
    x.vraimentgarde = true;
    x.keyCounterG++;
    x.firstGround = false;
    x.keyCounterM = 0;

}

//SAUT
function up1(x, pos){
    if(x.keyCounter == 0 && pos.jumping == false) {return true;}
    else{return false};
}
function jump(x){
    x.fightStyle = 85;
    x.fightStyleLenght = 7;
    x.jumpstep = 0;
    x.animSpeed = 1;
    x.smashPoint = 20;
    x.recuperation = 0;
    //
    x.bodyAdvance = [1, 1, 1, 1, 1, 1, 1];
    x.bodyY = [14, 8, 0, 0, 0, 0, 0];
    //
    x.armAdvance = [2, 1, 1, 1, 1, 1, 1];
    x.armHeight = [0, 0, 0, 0, 0, 0, 0];
    x.armY = [6, 0, -3, -4, -4, -4, -4];
    //
    x.legAdvance = [0, 0, 1, 1, 1, 1, 1];
    x.legHeight = [0, 0, 4, 4, 4, 4, 4];
    x.legY = [0, 0, -8, -8, -8, -8, -8];
}
function jumpState(x){
    x.step = 0;
    x.jumpState = true;
    x.punchrepeat = [true,true];
    x.directionJump = false;
    //x.keyCounterM = 0;
}

//DEPLACEMENTS
function move(x){
    if (x.iterationHit
        && x.keyCounterK == 0
        && x.keyCounterP == 0
        && !x.vape
        ){
        x.fightStyle = 23;
        x.fightStyleLenght = 10;
        x.animSpeed = 0.7;
        x.smashPoint = 20;
        x.recuperation = 0.01;
        x.armAdvance = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        x.armHeight = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        x.armY = [-2, -3, -4, -3, -2, 0, 1, 2, 3, 2];
        x.legHeight = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        x.legY = [-5, -6, -7, -6, -5, -3, -2, -1, 0, -1];
    }

}
//deplacement gauche
function moveStateL(x){
    x.padDirection = true;
    x.directionJump = false;
    if (x.reverseAnim == 1){
        x.gardeState = true;
        x.arrGarde = true;
        if (x.iterationHit){
            x.bodyAdvance = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
            x.bodyY = [-3, -4, -5, -5, -4, -2, -1, 0, 1, 0];
            x.armAdvance = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
            x.legAdvance = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
        }

        }
    else{
        if (x.iterationHit){
            x.bodyAdvance = [3, 3, 3, 3, 3, 3, 3, 3, 3, 3];
            x.bodyY = [-3, -4, -5, -5, -4, -2, -1, 0, 1, 0];
            x.armAdvance = [3, 3, 3, 3, 3, 3, 3, 3, 3, 3];
            x.legAdvance = [3, 3, 3, 3, 3, 3, 3, 3, 3, 3];
        }
        if(x.superPunch1){
            x.superPunch2 = true;
            x.superKick2 = true;
            setTimeout(function(){
                x.superPunch2 = false;
                x.superKick2 = false;
            }, 160 / gamespeed);
        }
        if(x.superKick1){
            x.superPunch2 = true;
            x.superKick2 = true;
            setTimeout(function(){
                x.superKick2 = false;
                x.superPunch2 = false;
            }, 160 / gamespeed);
        }
        if(x.haddoken1){
            x.haddoken2 = true;
            setTimeout(function(){
                x.haddoken2 = false;
            }, 160 / gamespeed);
        }
    }
}
//deplacement droit
function moveStateR(x){
    x.padDirection = true;
    x.directionJump = false;
    if (x.reverseAnim == -1){
        x.gardeState = true;
        x.arrGarde = true;
        if (x.iterationHit){
            x.bodyAdvance = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
            x.bodyY = [-3, -4, -5, -5, -4, -2, -1, 0, 1, 0];
            x.armAdvance = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
            x.legAdvance = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
        }

    }
    else{
        if (x.iterationHit){
            x.bodyAdvance = [3, 3, 3, 3, 3, 3, 3, 3, 3, 3];
            x.bodyY = [-3, -4, -5, -5, -4, -2, -1, 0, 1, 0];
            x.armAdvance = [3, 3, 3, 3, 3, 3, 3, 3, 3, 3];
            x.legAdvance = [3, 3, 3, 3, 3, 3, 3, 3, 3, 3];
        }

        if(x.superPunch1){
            x.superPunch2 = true;
            x.superKick2 = true;
            setTimeout(function(){
                x.superPunch2 = false;
                x.superKick2 = false;
            }, 160 / gamespeed);
        }
        if(x.superKick1){
            x.superPunch2 = true;
            x.superKick2 = true;
            setTimeout(function(){
                x.superKick2 = false;
                x.superPunch2 = false;
            }, 160 / gamespeed);
        }
        if(x.haddoken1){
            x.haddoken2 = true;
            setTimeout(function(){
                x.haddoken2 = false;
            }, 160 / gamespeed);
        }
    }
}
//FIREBALLS
//condition pour Haddoken
function fireballC(x){
    if(x.haddoken3 && x.haddonkenCounter == 0) {return true;}
    else{return false};
}
//envoi un Haddoken
function pushTheBall(ballID, x, pos){
    x.haddonkenCounter = 1;
    if(x.reverseAnim == 1){
        ballID.push({
            x: pos.pX - moveBg + 49 - 11,
            y: pos.pY -5,
            step: 0,
            blockDir: 0.5,
            counter: 0,
            sens : 0
        });
    }
    else if(x.reverseAnim == -1){
        ballID.push({
            x: pos.pX - moveBg - 19 + 11,
            y: pos.pY -5,
            step: 0,
            blockDir: -0.5,
            counter: 0,
            sens : 1
        });
    }
}
//COUPS
//punch et amorce double punch
function punch1(x){
    if(x.punchrepeat[0] == false 
        && x.doublePunch == false 
        && x.keyCounterP == 0
        && x.superPunch2 == false
        && x.iterationHit
        && !x.contreIteration
        && !x.vape
        && !x.haddoken1
        ) {return true;}
    else{return false};
}
function punchLeft(x){
    x.fightStyle = 33;
    x.fightStyleLenght = 5;
    x.animSpeed = 1;
    x.smashPoint = 3;
    x.smashDistance = 30;
    swing1.play();
    x.vectorForce= 1.7;
    x.recuperation = 0;
    x.bodyAdvance = [3, 4, 4, 4, 2];
    x.bodyY = [0, 0, 0, 0, 0];
    x.armAdvance = [0, 15, 15, 6, 2];
    x.armHeight = [0, 0, 0, 0, 0];
    x.armY = [0, 0, 0, 0, 0];
    x.legAdvance = [1, 1, 1, 0, 0];
    x.legHeight = [0, 0, 0, 0, 0];
    x.legY = [0, 0, 0, 0, 0];
}
function punchLeftState(x){
    x.padDirection = false;
    x.step = 0;
    x.punchrepeat[0] = true;
    x.punchrepeat[1] = false;
    x.doublePunch = true;
    x.vraimentgarde = false;
    x.keyCounterP++;
    x.firstGround = true;
    x.iterationHit = false;
    x.keyCounterM = 0;
    //appel combo
    setTimeout(function(){
        x.doublePunch = false;
    }, 160 / gamespeed);
}
//double punch et amorce uppercut
function punch2(x){
    if(x.punchrepeat[1] == false 
        && x.doublePunch == true 
        && x.kickRepeat == true
        && x.superPunch1 == false
        && x.superPunch2 == false
        && !x.vape
        ) {return true;}
    else{return false};
}
function punchRight(x){
    x.fightStyle = 38;
    x.fightStyleLenght = 7;
    x.animSpeed = 1;
    x.smashPoint = 3;
    x.smashDistance = 30;
    swing2.play();
    x.vectorForce= 1.9;
    x.recuperation = 0;
    x.bodyAdvance = [6, 7, 7, 8, 9, 8, 5];
    x.bodyY = [0, 0, 0, 0, 0, 0, 0];
    x.armAdvance = [4, 7, 18, 19, 19, 7, 0];
    x.armHeight = [0, 0, 0, 0, 0, 0, 0];
    x.armY = [0, 0, 0, 0, 4, 0, 0];
    x.legAdvance = [3, 3, 3, 3, 3, 3, 0];
    x.legHeight = [0, 0, 0, 0, 0, 0, 0];
    x.legY = [0, 0, 0, 0, 0, 0, 0];
}
function punchRightState(x){
    x.padDirection = false;
    x.step = 0;
    x.punchrepeat[1] = true;
    x.punchrepeat[0] = false;
    x.doublePunch = false;
    x.vraimentgarde = false;
    x.keyCounterP++;
    x.superPunch1 = true;
    x.firstGround = true;
    x.iterationHit = false;
    x.keyCounterM = 0;
    setTimeout(function(){
        x.superPunch1 = false;
    }, 160 / gamespeed);
}
//uppercut
function punch3(x){
    if(x.punchrepeat[0] == false  
        && x.kickRepeat == true
        && x.superPunch2 == true
        && x.doublePunch == false
        && !x.vape
        ) {return true;}
    else{return false};
}
function uppercut(x){
    x.fightStyle = 45;
    x.fightStyleLenght = 7;
    x.animSpeed = 0.8;
    x.smashPoint = 4;
    x.smashDistance = 35;
    swing4.play();
    x.vectorForce= 3.3;
    x.recuperation = 0;
    x.bodyAdvance = [10, 10, 10, 10, 10, 10, 10];
    x.bodyY= [1, 3, 2, 0, -2, -4, -6];
    x.armAdvance = [8, 8, 8, 8, 14, 14, 7];
    x.armHeight = [0, 0, 0, 0, 11, 19, 22];
    x.armY = [2, 4, 6, 6, -3, -20, -20];
    x.legAdvance = [0, 4, 4, 7, 7, 7, 6];
    x.legHeight = [0, 0, 2, 3, 3, 3, 3];
    x.legY = [0, 0, -2, -3, -3, -3, -3];
}
function uppercutState(x){
    x.padDirection = false;
    x.step = 0;
    x.punchrepeat[0] = true;
    x.punchrepeat[1] = false;
    x.doublePunch = false;
    x.vraimentgarde = false;
    x.kickRepeat = false;
    //x.keyCounterP++;
    x.firstGround = true;
    x.keyCounterM = 0;
    x.iterationHit = false;
    x.punchFly = true;
}
//kick et amorce super kick
function kick1(x){
    if(x.punchrepeat[0] == false 
        && x.jumpState == false 
        && x.downState == false 
        && x.kickRepeat == true
        && x.keyCounterK == 0
        //&& x.keyCounterM == 0
        && x.superKick2 == false
        && !x.contreIteration
        ) {return true;}
    else{return false};
}
function kick(x){
    x.fightStyle = 53;
    x.fightStyleLenght = 5;
    x.animSpeed = 0.8;
    x.smashPoint = 3;
    x.smashDistance = 40;
    swing4.play();
    x.vectorForce= 2.6;
    x.recuperation = 0;
    x.iterationHit = false;
    x.bodyAdvance = [4, 7, 11, 7, 4];
    x.bodyY = [-2, -2, -2, -1, 0];
    x.armAdvance = [7, 11, 13, 10, 0];
    x.armHeight = [0, 0, 0, 0, 0];
    x.armY = [-4, -4, -4, -4, 0];
    x.legAdvance = [7, 27, 29, 15, 0];
    x.legHeight = [0, -4, -4, 0, 0];
    x.legY = [-8, -19, -19, -12, 0];
}
function kickState(x){
    x.padDirection = false;
    x.step = 0;
    x.punchrepeat[0] = true;
    x.punchrepeat[1] = false;
    x.kickRepeat = false;
    x.keyCounterK++;
    x.superKick1 = true;
    x.firstGround = true;
    //x.keyCounterM = 0;
    setTimeout(function(){
        x.superKick1 = false;
    }, 160 / gamespeed);
}
//low kick
function lkick1(x){
    if(x.punchrepeat[0] == false 
        && x.jumpState == false 
        && x.downState == true 
        && x.kickRepeat == true
        && x.keyCounterK == 0) {return true;}
    else{return false};
}
function lowKick(x){
    x.fightStyle = 57;
    x.fightStyleLenght = 5;
    x.animSpeed = 0.7;
    x.smashPoint = 4;
    x.smashDistance = 48;
    swing3.play();
    x.vectorForce= 3.5;
    x.recuperation = 0;
    x.bodyAdvance = [0, 5, 10, 12, 14];
    x.bodyY = [-10, -10, -10, -5, -5];
    x.armAdvance = [0, 5, 11, 16, 16];
    x.armHeight = [4, 4, 4, 4, 4];
    x.armY = [-6, -4, -8, -5, -3];
    x.legAdvance = [0, 3, 9, 30, 31];
    x.legHeight = [3, 3, 4, -2, -3];
    x.legY = [-3, -3, -4, 2, 3];
}
function lowKickState(x){
    x.padDirection = false;
    x.step = 0;
    x.punchrepeat[0] = true;
    x.punchrepeat[1] = false;
    x.kickRepeat = false;
    x.vraimentgarde = false;
    x.keyCounterK++;
    x.firstGround = true;
    x.keyCounterM = 0;
}
//Superkick
function skick1(x){
    if(x.superKick2 == true
        && x.kickRepeat == true
        && x.iterationHit) {return true;}
    else{return false};
}
function cisorKick(x){
    x.fightStyle = 63;
    x.fightStyleLenght = 7;
    x.animSpeed = 0.7;
    x.smashPoint = 3;
    x.smashDistance = 48;
    swing3.play();
    x.vectorForce= 4;
    x.recuperation = 0;
    x.iterationHit = false;
    x.bodyAdvance = [10, 10, 10, 10, 10, 8, 2];
    x.bodyY = [-3, 0, 0, 0, 0, -3, -3];
    x.armAdvance = [8, 8, 8, 8, 8, 8, 0];
    x.armHeight = [0, 0, 0, 0, 0, 0, 0];
    x.armY = [0, 0, 0, 0, 0, 0, 0];
    x.legAdvance = [9, 17, 22, 12, 20, 9, 0];
    x.legHeight = [6, 20, 20, 20, 20, 6, 0];
    x.legY = [-6, -28, -28, -28, -28, -6, 0];
}
function cisorKickState(x){
    x.padDirection = false;
    x.step = 0;
    x.punchrepeat[1] = true;
    x.punchrepeat[0] = false;
    x.kickRepeat = false;
    x.keyCounterK++;
    x.firstGround = true;
    x.keyCounterM = 0;
    x.punchFly = true;
}
//contre
function contre(x){
    x.step = 0;
    x.fightStyle = 69;
    x.fightStyleLenght = 16;
    x.animSpeed = 0.5;
    x.smashPoint = 8;
    x.smashDistance = 48;
    swing4.play();
    x.vectorForce= 1.9;
    x.recuperation = 0.01;
    //x.vape = true;
    x.firstGround = true;
    x.keyCounterM = 0;
    x.contreIteration = true;
    x.padDirection = false;
    x.bodyAdvance = [0, 4, 8, 12, 15, 18, 18, 18, 20, 22, 22, 22, 22, 22, 22, 22];
    x.bodyY = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    x.armAdvance = [15, 5, 6, 8, 10, 12, 12, 25, 30, 32, 33, 32, 33, 33, 33, 33];
    x.armHeight = [4, 4, 8, 8, 15, 16, 8, 4, 4, 4, 4, 4, 4, 4, 4, 4];
    x.armY = [-4, -4, -8, -8, -10, -10, -4, -4, -4, -4, -4, -4, -4, -4, -4, -4];
    x.legAdvance = [22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22];
    x.legHeight = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    x.legY = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

}
//air kick et amorce double air kick
function akick1(x){
    if(x.jumpState == true 
        && x.kickRepeat == true
        && x.doubleAirKick == false
        && x.keyCounterK == 0) {return true;}
    else{return false};
}
function airKick(x){
    x.fightStyle = 92;
    x.fightStyleLenght = 7;
    x.animSpeed = 0.6;
    x.smashPoint = 5;
    x.smashDistance = 40;
    swing3.play();
    x.vectorForce= 2.2;
    x.recuperation = 0;
    x.bodyAdvance = [0, 0, 0, 0, 0, 0, 0];
    x.bodyY = [-6, -6, -5, -4, -4, -4, -4];
    x.armAdvance = [3, 2, 0, 0, 0, 0, 0];
    x.armHeight = [4, 6, 4, 4, 4, 4, 4];
    x.armY = [-4, -7, -7, -7, -7, -4, -4];
    x.legAdvance = [0, 3, 0, -4, 17, 20, 4];
    x.legHeight = [3, 5, 3, 4, -2, -2, -2];
    x.legY = [-9, -9, -9, -9, -9, -9, -9];
}
function airKickState(x){
    x.step = 0;
    x.punchrepeat = [true,true];
    x.jumpState = false;
    x.kickRepeat = false;
    x.keyCounterK++;
    x.doubleAirKick = true;
    //x.iterationHit = false;
    x.firstGround = true;
    x.keyCounterM = 0;
    //appel combo
    setTimeout(function(){
        x.doubleAirKick = false;
    }, 160 / gamespeed); 
}
//double air kick
function akick2(x){
    if(x.doubleAirKick == true
        && x.step >= 5) {return true;}
    else{return false};
}
function airKick2(){
    swing4.play();
}
function dbairKickState(x){
    x.step = 0;
    x.punchrepeat = [true,true];
    x.jumpState = false;
    x.kickRepeat = false;
    x.keyCounterK++;
    x.doubleAirKick = false;
    x.firstGround = true;
    //x.iterationHit = false;
    x.keyCounterM = 0;
    x.vectorForce= 2.5;
}
//air punch
function apunch1(x){
    if(x.jumpState == true 
        && x.kickRepeat == true
        && x.keyCounterP == 0
        ) {return true;}
    else{return false};
}
function airPunch(x){
    x.fightStyle = 99;
    x.fightStyleLenght = 5;
    x.animSpeed = 0.5;
    x.smashPoint = 3;
    x.smashDistance = 24;
    swing1.play();
    x.vectorForce= 5;
    x.recuperation = 0;
    x.bodyAdvance = [0, 5, 5, 5, 5];
    x.bodyY = [-4, 2, 3, 4, 4];
    x.armAdvance = [0, 6, 10, 4, 4];
    x.armHeight = [20, 12, 20, 12, 9];
    x.armY = [-12, -12, -4, 6, 6];
    x.legAdvance = [0, 0, 0, 0, 0];
    x.legHeight = [0, 0, 0, 0, 0];
    x.legY = [-5, -5, -5, -5, -5];
}
function airPunchState(x){
    x.step = 0;
    x.punchrepeat = [true,true];
    x.jumpState = false;
    x.kickRepeat = false;
    x.keyCounterP++;
    x.firstGround = true;
    x.iterationHit = false;
    x.keyCounterM = 0;
}
//ETATS
//frappé
function punched(x, y){
    x.step = 0;
    x.fightStyle = 106;
    x.fightStyleLenght = 5;
    x.animSpeed = 0.5;
    x.smashPoint = 20;
    swing7.play();
    x.vraimentgarde = false;
    x.recuperation = 0;
    x.firstGround = false;
    x.keyCounterM = 0;
    //x.bodyAdvance = -6;
    x.bodyAdvance = [0, 0, 0, 0, 0];
    x.bodyY = [-5, -5, -5, -5, -5];
    x.armAdvance = [0, 0, 0, 0, 0];
    x.armHeight = [0, 0, 0, 0, 0];
    x.armY = [0, 0, 0, 0, 0];
    x.legAdvance = [0, 0, 0, 0, 0];
    x.legHeight = [0, 0, 0, 0, 0];
    x.legY = [0, 0, 0, 0, 0];
        if (x.pSV == 0 
            //&& Math.floor(x.step) == 0
            && Math.floor(y.step) == y.smashPoint
            ){
            punchedSpeed = 0.1;
            x.pSV++;
            setTimeout(function(){
                punchedSpeed = 1;
                x.pSV = 0;
                }, 30 / gamespeed);
        }
        
}
//airPunched
apSV=0;
function airPunched(x){
    //punchedSpeed = 0.4;
    x.fightStyle = 120;
    x.fightStyleLenght = 10;
    x.animSpeed = 0.5;
    x.smashPoint = 20;
    swing7.play();
    x.vraimentgarde = false;
    x.recuperation = 0;
    x.firstGround = false;
    x.keyCounterM = 0;
    x.bodyAdvance = [18, 18, 18, 18, 18, 18, 18, 18, 18, 18];
    x.bodyY = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    x.armAdvance = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    x.armHeight = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    x.armY = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    x.legAdvance = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    x.legHeight = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    x.legY = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    /*if (apSV == 0){
        apSV++;
        setTimeout(function(){
            punchedSpeed = 1;
            apSV = 0;
            }, 20 / gamespeed);
    }*/
}
//groggy
function groggy(x){
    x.fightStyle = 111;
    x.fightStyleLenght = 10;
    x.animSpeed = 0.3;
    x.smashPoint = 20;
    x.vraimentgarde = false;
    x.recuperation = 0;
    x.firstGround = false;
    x.keyCounterM = 0;
    x.bodyAdvance = [0, -2, -4, -4, -2, 0, 2, 4, 4, 2];
    x.bodyY = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    x.armAdvance = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    x.armHeight = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    x.armY = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    x.legAdvance = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    x.legHeight = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    x.legY = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
}
//ko
function ko(x, y){
    x.fightStyle = 120;
    x.fightStyleLenght = 10;
    x.animSpeed = 0.2;
    x.smashPoint = 20;
    x.vraimentgarde = false;
    x.recuperation = 0;
    x.jaugeCstep = 1;
    y.firstGround = true;
    comboDisplay = 0;
    x.keyCounterM = 0;
}


