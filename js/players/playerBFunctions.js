///////////////////////////////////////////
//DETECTION CLAVIER & ACTIONS ETAS//
///////////////////////////////////////////
//detection appuis
document.addEventListener("keydown",function(event){
    if (bot.energy > 0 && okFight && !fighter.combo && !bot.contreIteration){
        keyboardDown(bot, botPos, 83, 90, 81, 68, 49, 50, event, anyBallB);
    }
});
bkeyLatch = {
    keyListener:function(event) {
        var key_state = (event.type == "keyup")?true:false;
        keyboardUp(bot, event, 81, 90, 68, 83, 49, 50);
    }
}
window.addEventListener("keyup", bkeyLatch.keyListener);
///////////////////////////////////////////
//MOTEUR D'ANIMATION ENEMI
///////////////////////////////////////////
function botstand(){
//COMBO JAUGE ENEMI
    jaugeComboProcessor(bot);
    jaugevector2Step-= 0.6;
    bot.comboVector -=0.0015;
    if (bot.comboVector <= 1){
        bot.comboVector = 1;}
    if (jaugevector2Step <= 0){
        jaugevector2Step = 30;}
    if (bot.comboVector >= 5){
        bot.comboVector = 5;}
    energyD2 = 83-(((bot.comboVector-1)/4)*82);
//ENERGY
    energyProcessor(bot);
//CONDITIONS
    playerCondition(bot, fighter, botPos);
}

var BPadController, 
    Bloop;

BPadController = {
    left:false,
    right:false,
    up:false,
    keyListener:function(event) {
        if(okFight //&& !comboDisplay
            ){
        var Bkey_state = (event.type == "keydown")?true:false;
        switch(event.keyCode) {
            case 81:// left key
            BPadController.left = Bkey_state;
            bot.downState = false;
            break;
            case 90:// up key
            if (bot.keyCounter ==0 && bot.energy > 0){
            BPadController.up = Bkey_state;
            }
            break;
            case 68:// right key
            BPadController.right = Bkey_state;
            bot.downState = false;
            break;}
        }
    }
};
//Moteur de déplacement
Bloop = function() {
    //Collider
    bodyBoxCollider(bot, botPos, bodyBoxB);
    armBoxCollider(bot, botPos, armBoxB);
    legBoxCollider(bot, botPos, legBoxB);
    //fireball
    theFireballs(anyBallB, anyBall, bot, fighter, fighterPos);
    //KO    
    koProcessor(BPadController);
    /////////////////////////////////////////////////
    detector(bot, bodyBoxA, armBoxB, armBoxA, legBoxB, legBoxA);
    //detection des coups donnés à droite
    //detectorRight(fighter, fighterPos, botPos);
    /////////////////////////////////////////////////
    //contre//
    contreProcessorRight(BPadController, bot, fighter, fighterPos);
    /////////////////////////////////////////////////
    punchRightProcessor(bot, fighter, botPos, fighterPos);
    /////////////////////////////////////////////////
    //detection des coups donnés à gauche
    //detectorLeft(fighter, fighterPos, botPos);
    /////////////////////////////////////////////////
    //contre//
    contreProcessorLeft(BPadController, bot, fighter, fighterPos);
    /////////////////////////////////////////////////
    punchLeftProcessor(bot, fighter, botPos, fighterPos);
    /////////////////////////////////////////////////
    flyPunchProcessor(bot, fighter, fighterPos);
    //deplacement 
    moveProcessor(bot, fighter, botPos, fighterPos, BPadController);
    /////////////////////////////////////////////////
    //sens
    playerDirection(bot, fighter, botPos, fighterPos);
    /////////////////////////////////////////////////

    window.requestAnimationFrame(Bloop);
};
window.addEventListener("keydown", BPadController.keyListener)
window.addEventListener("keyup", BPadController.keyListener);
window.requestAnimationFrame(Bloop);