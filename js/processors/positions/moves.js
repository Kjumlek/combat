/////////////////////////////////////////////////
//DEPLACEMENTS
/////////////////////////////////////////////////
function moveProcessor(char, charb, pos, posb, pad){
    if(!pauseEffect){
    if (pad.left || pad.right){
        if(char.keyCounterM == 0 
            && char.iterationHit
            ){
            char.keyCounterM = 1;
        }
    }
    if (comboDisplay && char.combo){
        if (pos.pX < posb.pX - 20){
            pos.pX_velocity += 2.9 * gamespeed * punchedSpeed;
        }
        else if (pos.pX > posb.pX + 20){
            pos.pX_velocity -= 2.9 * gamespeed * punchedSpeed;
        }
    }
    //saut possible
    if (pad.up && pos.jumping == false 
        && char.keyCounter == 0
        && comboDisplay == 0
        && !char.vape
        && !charb.punchFly) {
        pos.pY_velocity -= 14 * gamespeed * punchedSpeed;
        pos.jumping = true;
        char.keyCounter++;
    }
    //anti screen ejector
    if(pos.pY_velocity <= -9){
        pos.pY_velocity = -9;
    }

    //direction gauche
    if (pad.left 
        && char.padDirection == true 
        && !char.downState
        && char.iterationHit) {
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
        && !char.downState
        && char.iterationHit) {
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
    pos.pX_velocity *= 0.5 * punchedSpeed;// friction
    pos.pY_velocity *= 1 * punchedSpeed;// friction
    
    //tombe au sol
    if (pos.pY > 140 - 32) {
    pos.jumping = false;
    pos.pY = 140 - 32;
    pos.pY_velocity = 0;
    }
    //bouge le fond
    if (pad.right && pos.pX >= 318-pos.width){
        if (moveBg > -105){
            moveBg--;
            posb.pX-=0.5;
        }
        
    }
    if (pad.left && pos.pX <= -10){
        if (moveBg < 0){
            moveBg++;
            posb.pX+=0.5;
        }
        
    }
    //gauche de l'écran
    if (pos.pX < -10) {
    pos.pX = -10;
    }
    //droite de l'écran
    else if (pos.pX > 318-pos.width) {
    pos.pX = 318-pos.width;
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
}