///////////////////////////////////////////
//DETECTION CLAVIER & ACTIONS ETAS//
///////////////////////////////////////////
//detection appuis
document.addEventListener("keydown",function(event){
    if(fighter.energy > 0 && okFight && !bot.combo && !fighter.contreIteration){
        keyboardDown(fighter, fighterPos, 40, 38, 37, 39, 72, 74, event, anyBall);
    }
});
keyLatch = {
    keyListener:function(e) {
        var key_state = (e.type == "keyup")?true:false;
        keyboardUp(fighter, e, 37, 38, 39, 40, 72, 74);
    }
}
window.addEventListener("keyup", keyLatch.keyListener);
///////////////////////////////////////////
//MOTEUR D'ANIMATION PERSONNAGE & CONDITIONS
///////////////////////////////////////////
function stand(){
//COMBO JAUGE FIGHTER
    jaugeComboProcessor(fighter);
    jaugevectorStep+= 0.6;
    fighter.comboVector -=0.0015;
    if (fighter.comboVector <= 1){
        fighter.comboVector = 1;}
    if (jaugevectorStep >= 30){
        jaugevectorStep = 0;}
    if (fighter.comboVector >= 5){
        fighter.comboVector = 5;}
    energyD = 83-(((fighter.comboVector-1)/4)*82);
//ENERGY
    energyProcessor(fighter);
//CONDITIONS
    playerCondition(fighter, bot, fighterPos);
}

var padController, 
    loop;

padController = {
    left:false,
    right:false,
    up:false,
    keyListener:function(event) {
        if(okFight //&& !comboDisplay
            ){
        var key_state = (event.type == "keydown")?true:false;
        switch(event.keyCode) {
            case 37:// left key
            padController.left = key_state;
            fighter.downState = false;
            break;
            case 38:// up key
            if (fighter.keyCounter ==0 && fighter.energy > 0){
            padController.up = key_state;
            }
            break;
            case 39:// right key
            padController.right = key_state;
            fighter.downState = false;
            break;}
        }
    }
};
//Moteur de déplacement
loop = function() {
    //Collider
    bodyBoxCollider(fighter, fighterPos, bodyBoxA);
    armBoxCollider(fighter, fighterPos, armBoxA);
    legBoxCollider(fighter, fighterPos, legBoxA);
    //fireball
    theFireballs(anyBall, anyBallB, fighter, bot, botPos);
    //KO    
    koProcessor(padController);
    /////////////////////////////////////////////////
    detector(fighter, bodyBoxB, armBoxA, armBoxB, legBoxA, legBoxB);
    //detection des coups donnés à droite
    //detectorRight(bot, botPos, fighterPos);
    /////////////////////////////////////////////////
    //contre//
    contreProcessorRight(padController, fighter, bot, botPos);
    /////////////////////////////////////////////////
    punchRightProcessor(fighter, bot, fighterPos, botPos);
    /////////////////////////////////////////////////
    //detection des coups donnés à gauche
    //detectorLeft(bot, botPos, fighterPos);
    /////////////////////////////////////////////////
    //contre//
    contreProcessorLeft(padController, fighter, bot, botPos);
    /////////////////////////////////////////////////
    punchLeftProcessor(fighter, bot, fighterPos, botPos);
    /////////////////////////////////////////////////
    //deplacement 
    moveProcessor(fighter, bot, fighterPos, botPos, padController);
    /////////////////////////////////////////////////
    flyPunchProcessor(fighter, bot, botPos);
    //sens
    playerDirection(fighter, bot, fighterPos, botPos);
    /////////////////////////////////////////////////
    
    window.requestAnimationFrame(loop);
};
window.addEventListener("keydown", padController.keyListener)
window.addEventListener("keyup", padController.keyListener);
window.requestAnimationFrame(loop);