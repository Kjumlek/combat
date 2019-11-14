//FONCTION RECONNAISSANCE CLAVIER DOWN
function keyboardDown(x, xPos, kD, kU, kL, kR, kP, kK, event){  
    //garde basse
    if (event.keyCode == kD && down1(x)){
        gardeBasse(x);
        gardeBasseState(x);}
    //jump
    else if (event.keyCode == kU && up1(x, xPos)){
        jumpState(x);}
    //direction gauche
    else if (event.keyCode == kL){
        move(x);
        moveStateL(x);
        x.keyCounterM = 1;
    }
    //direction droite
    else if (event.keyCode == kR){
        move(x);
        moveStateR(x);
        x.keyCounterM = 1;
    }
    //punch et amorce double punch
    else if (event.keyCode == kP && punch1(x)){
        punchLeft(x);
        punchLeftState(x);}
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
    else if (event.keyCode == kP && apunch1(x)){
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
        relacheKey(x);
        break;
        case kR:// right key
        relacheKey(x);
        break;
        case kD:// down key
        x.keyCounterG = 0;
        x.downState = false;
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


//LISTE DES COUPS
//ATTEND
function attend(x){
    x.fightStyle = 0;
    x.fightStyleLenght = 7;
    x.animSpeed = 0.4;
    x.smashPoint = 20;
    x.recuperation = 0.03;
}
//GARDES
//garde haute
function down1(x){
    if(x.keyCounterG == 0
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
}
//garde basse
function gardeBasse(x){
    x.step = 0;
    x.fightStyle = 15;
    x.fightStyleLenght = 4;
    x.smashPoint = 20;
    x.vectorForce = 0;
    x.recuperation = 0;
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
}
function jumpState(x){
    x.step = 0;
    x.jumpState = true;
    x.punchrepeat = [true,true];
    x.directionJump = false;
    x.keyCounterM = 0;
}

//DEPLACEMENTS
function move(x){
    if (x.interationHit
        && x.keyCounterK == 0
        && x.keyCounterP == 0
        ){
        x.fightStyle = 23;
        x.fightStyleLenght = 10;
        x.animSpeed = 0.7;
        x.smashPoint = 20;
        x.recuperation = 0.01;
    }

}
//deplacement gauche
function moveStateL(x){
    x.padDirection = true;
    x.directionJump = false;
    if (x.reverseAnim == 1){
        x.gardeState = true;
        x.arrGarde = true;}
    else{
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
    }
}
//deplacement droit
function moveStateR(x){
    x.padDirection = true;
    x.directionJump = false;
    if (x.reverseAnim == -1){
        x.gardeState = true;
        x.arrGarde = true;}
    else{
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
    }
}
//COUPS
//punch et amorce double punch
function punch1(x){
    if(x.punchrepeat[0] == false 
        && x.doublePunch == false 
        && x.keyCounterP == 0
        && x.superPunch2 == false
        && x.interationHit
        && !x.contreIteration
        ) {return true;}
    else{return false};
}
function punchLeft(x){
    x.fightStyle = 33;
    x.fightStyleLenght = 5;
    x.animSpeed = 1;
    x.smashPoint = 2;
    x.smashDistance = 30;
    swing1.play();
    x.vectorForce= 1.4;
    x.recuperation = 0;
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
        && x.superPunch2 == false) {return true;}
    else{return false};
}
function punchRight(x){
    x.fightStyle = 38;
    x.fightStyleLenght = 7;
    x.animSpeed = 1;
    x.smashPoint = 3;
    x.smashDistance = 30;
    swing2.play();
    x.vectorForce= 2;
    x.recuperation = 0;
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
        && x.doublePunch == false) {return true;}
    else{return false};
}
function uppercut(x){
    x.fightStyle = 45;
    x.fightStyleLenght = 7;
    x.animSpeed = 0.8;
    x.smashPoint = 4;
    x.smashDistance = 35;
    swing4.play();
    x.vectorForce= 2.5;
    x.recuperation = 0;
}
function uppercutState(x){
    x.padDirection = false;
    x.step = 0;
    x.punchrepeat[0] = true;
    x.punchrepeat[1] = false;
    x.doublePunch = false;
    x.vraimentgarde = false;
    x.kickRepeat = false;
    x.keyCounterP++;
    x.firstGround = true;
    x.keyCounterM = 0;
    x.interationHit = false;
    x.punchFly = true;
}
//kick et amorce super kick
function kick1(x){
    if(x.punchrepeat[0] == false 
        && x.jumpState == false 
        && x.downState == false 
        && x.kickRepeat == true
        && x.keyCounterK == 0
        && x.keyCounterM == 0
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
    x.vectorForce= 1.7;
    x.recuperation = 0;
    x.interationHit = false;
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
    x.animSpeed = 0.6;
    x.smashPoint = 4;
    x.smashDistance = 48;
    swing3.play();
    x.vectorForce= 5.3;
    x.recuperation = 0;
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
        && x.interationHit) {return true;}
    else{return false};
}
function cisorKick(x){
    x.fightStyle = 63;
    x.fightStyleLenght = 7;
    x.animSpeed = 0.7;
    x.smashPoint = 3;
    x.smashDistance = 48;
    swing3.play();
    x.vectorForce= 3.3;
    x.recuperation = 0;
    x.interationHit = false;
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
    x.vectorForce= 3.3;
    x.recuperation = 0.01;
    x.vape = true;
    x.firstGround = true;
    x.keyCounterM = 0;
    x.contreIteration = true;
    x.padDirection = false;

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
    x.vectorForce= 2.8;
    x.recuperation = 0;
}
function airKickState(x){
    x.step = 0;
    x.punchrepeat = [true,true];
    x.jumpState = false;
    x.kickRepeat = false;
    x.keyCounterK++;
    x.doubleAirKick = true;
    x.interationHit = false;
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
    x.keyCounterM = 0;
    x.vectorForce= 4.1;
}
//air punch
function apunch1(x){
    if(x.jumpState == true 
        && x.kickRepeat == true
        && x.keyCounterP == 0) {return true;}
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
}
function airPunchState(x){
    x.step = 0;
    x.punchrepeat = [true,true];
    x.jumpState = false;
    x.kickRepeat = false;
    x.keyCounterP++;
    x.firstGround = true;
    x.keyCounterM = 0;
}
//ETATS
//frappé
pSV=0;
function punched(x){
    //punchedSpeed = 0.4;
    x.fightStyle = 106;
    x.fightStyleLenght = 5;
    x.animSpeed = 0.5;
    x.smashPoint = 20;
    swing7.play();
    x.vraimentgarde = false;
    x.recuperation = 0;
    x.firstGround = false;
    x.keyCounterM = 0;
    /*    if (pSV == 0){
            pSV++;
            setTimeout(function(){
                punchedSpeed = 1;
                pSV = 0;
                }, 20 / gamespeed);
        }*/
        
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

