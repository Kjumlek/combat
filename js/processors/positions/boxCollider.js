/*/////////////////////////////////////////////////
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
}*/

function bodyBoxCollider(char, pos, bBox){
    if (char.reverseAnim == 1){
        bBox.pX = pos.pX+18 + char.bodyAdvance[Math.floor(char.step)];
    }
    else if (char.reverseAnim == -1){
        bBox.pX = pos.pX+18 - char.bodyAdvance[Math.floor(char.step)];
    }
    if (char.jumpState){
        bBox.pY = pos.pY-12 + char.bodyY[Math.floor(char.step)];
    }
    else if (!char.downState){
        bBox.pY = pos.pY-6 + char.bodyY[Math.floor(char.step)];
    }
    else if (char.downState){
        bBox.pY = pos.pY+4 + char.bodyY[Math.floor(char.step)];
    }
}
function armBoxCollider(char, pos, aBox){
    //if(char.step == 0 || !char.iterationHit == 0 || pos.jumping){
        aBox.armH = char.armHeight[Math.floor(char.step)];
        aBox.armmY = char.armY[Math.floor(char.step)];
        aBox.armA = char.armAdvance[Math.floor(char.step)];
    //}
    aBox.height = 6 + aBox.armH;
    if (char.reverseAnim == 1){
        aBox.pX = pos.pX+18 + aBox.armA;
    }
    else if (char.reverseAnim == -1){
        aBox.pX = pos.pX+15 - aBox.armA;
    }
    if (!char.downState){
        aBox.pY = pos.pY+3 + aBox.armmY;
    }
    else if (char.downState){
        aBox.pY = pos.pY+9 + aBox.armmY;
    }
}
function legBoxCollider(char, pos, lBox){
    //if(
        //char.step == 0 
    //    || 
    //!char.iterationHit 
    //|| pos.jumping
    //){
        lBox.legH = char.legHeight[Math.floor(char.step)];
        lBox.leggY = char.legY[Math.floor(char.step)];
        lBox.legA = char.legAdvance[Math.floor(char.step)]
    //}

    lBox.height = 13 + lBox.legH;
    lBox.pY = pos.pY+17 + lBox.leggY;
    if (char.reverseAnim == 1){
        lBox.pX = pos.pX+18 + lBox.legA;
    }
    else if (char.reverseAnim == -1){
        lBox.pX = pos.pX+15 - lBox.legA;
    }
}

function detector(char, boxB, aBoxA, aboxB, lBoxA, lboxB){
    if (
    //si punch touche body
    ((aBoxA.pX + aBoxA.width >= boxB.pX) 
    && (aBoxA.pX <= boxB.pX + boxB.width) 
    && (aBoxA.pY <= boxB.pY + boxB.height) 
    && (aBoxA.pY + aBoxA.height >= boxB.pY))
    ||
    //si kick touche body
    ((lBoxA.pX + lBoxA.width >= boxB.pX) 
    && (lBoxA.pX <= boxB.pX + boxB.width) 
    && (lBoxA.pY <= boxB.pY + boxB.height) 
    && (lBoxA.pY + lBoxA.height >= boxB.pY))    
    ){
        if (char.reverseAnim == 1){
            char.detectR = true;
        }
        else if (char.reverseAnim == -1){
            char.detectL = true;
        }
    }
    /*else if (
    //si punch touche punch
    ((aBoxA.pX + aBoxA.width >= aboxB.pX) 
    && (aBoxA.pX <= aboxB.pX + aboxB.width) 
    && (aBoxA.pY <= aboxB.pY + aboxB.height) 
    && (aBoxA.pY + aBoxA.height >= aboxB.pY))
    ||
    //si kick touche punch
    ((lBoxA.pX + lBoxA.width >= aboxB.pX) 
    && (lBoxA.pX <= aboxB.pX + aboxB.width) 
    && (lBoxA.pY <= aboxB.pY + aboxB.height) 
    && (lBoxA.pY + lBoxA.height >= aboxB.pY))    
    ){
        if (char.reverseAnim == 1){
            char.detectR = true;
        }
        else if (char.reverseAnim == -1){
            char.detectL = true;
        }
    }
    else if (
    //si punch touche kick
    ((aBoxA.pX + aBoxA.width >= lboxB.pX) 
    && (aBoxA.pX <= lboxB.pX + lboxB.width) 
    && (aBoxA.pY <= lboxB.pY + lboxB.height) 
    && (aBoxA.pY + aBoxA.height >= lboxB.pY))
    ||
    //si kick touche kick
    ((lBoxA.pX + lBoxA.width >= lboxB.pX) 
    && (lBoxA.pX <= lboxB.pX + lboxB.width) 
    && (lBoxA.pY <= lboxB.pY + lboxB.height) 
    && (lBoxA.pY + lBoxA.height >= lboxB.pY))    
    ){
        if (char.reverseAnim == 1){
            char.detectR = true;
        }
        else if (char.reverseAnim == -1){
            char.detectL = true;
        }
    }*/
    else {
        char.detectR = false;
        char.detectL = false;
    }

}