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
        punched(charb, char);}
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
        punched(charb, char);}
    if(char.punchEject && char.reverseAnim == 1){
        posb.pX_velocity += 1.9 * gamespeed * punchedSpeed;
        char.punchEject = false;}
}