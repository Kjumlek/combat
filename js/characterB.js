///////////////////////////////////////////
//ENERGY ENEMI//
///////////////////////////////////////////
//energie
var botenergyPos = { height:36, width:167, pX:180, pY:1}
var botenergyPos2 = {height:6, width:121, pX:206, pY:15}
//visualisation
var jaugecombo2Pos = {height:21, width:117, pX:226, pY:24}
var energyD2;
var jaugevector2Step = 30;
var jaugevector2Pos = {height:2, width:82, pX:232, pY:35}
///////////////////////////////////////////
//CARACTERISTIQUES//
var bot;
bot = {
    energy : 240,
    energyStep : 0,
    //MOUVEMENTS
    //sprite
    step : 0,
    //mouvement choisi
    fightStyle : 0, fightStyleLenght : 7,
    //vitesse du mouvement
    animSpeed : 1,

    //SENS DU JOUEUR
    //ajuste les pixels
    reverseSprite : 0,
    //valeur du sens
    reverseAnim : 1,
    //nombre de sprites
    inverseStart : 0, miniAdjust : 0,

    //SMASH
    smashOk : false, smashPoint : -1, smashDistance : 0,
    //FORCE
    vectorForce : 1,
    //REGEN
    recuperation : 0.03,
    //ETAT DE VAPE
    vape : false,

    //DIRECTION
    padDirection : false, directionJump : false, downState : false,
    //JUMP
    jumpState : false, jumpStep : 0,
    //GARDE
    gardeState : false, vraimentgarde : false, arrGarde : false,
    //CONTRE
    blockedAnimation : false, blockedStep : 0, contreCounterL : 0, contreCounterR : 0,

    //SYSTEME ANTI ROLL
    //bloque les punchs du meme cote
    punchrepeat : [false,false],
    //Attend la fin des kicks
    contreIteration : false,
    interationHit: false,
    keyCounter : 0, keyCounterG : 0, keyCounterK : 0, keyCounterP : 0,
    keyCounterM : 0,

    //ENCHAINEMENTS
    //double punch
    doublePunch : false,
    //super punch
    superPunch1 : false, superPunch2 : false,
    //double air kick
    doubleAirKick : false,
    //super kick
    superKick1 : false, superKick2 : false,
    //punch eject
    punchEject : false, punchFly : false,

    //DETECTION
    detectR : false, detectL : false,

    //1ER PLAN
    firstGround : false, firstGroundKo : false,

    //jauge combo
    jaugeComboStep : 0, jaugeComboCounter : 0, jaugeComboStepMicro : 0,
    comboMode : false, combo : false,
    jaugeCStep : 0,
    comboVector : 1
};

//position du joueur
var botPos;
botPos = {jumping:true, 
    width:70, height:55,
    pX:220, pX_velocity:0,
    pY:105, pY_velocity:0
};

///////////////////////////////////////////
//DETECTION CLAVIER & ACTIONS ETAS//
///////////////////////////////////////////
//detection appuis
document.addEventListener("keydown",function(event){
    if (bot.energy >= 1 && okFight && !fighter.combo && !bot.contreIteration){
        keyboardDown(bot, botPos, 83, 90, 81, 68, 49, 50, event);
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
    //KO    
    koProcessor(BPadController);
    /////////////////////////////////////////////////
    //detection des coups donnés à droite
    detectorRight(fighter, fighterPos, botPos);
    /////////////////////////////////////////////////
    //contre//
    contreProcessorRight(BPadController, bot, fighter, fighterPos);
    /////////////////////////////////////////////////
    punchRightProcessor(bot, fighter, botPos, fighterPos);
    /////////////////////////////////////////////////
    //detection des coups donnés à gauche
    detectorLeft(fighter, fighterPos, botPos);
    /////////////////////////////////////////////////
    //contre//
    contreProcessorLeft(BPadController, bot, fighter, fighterPos);
    /////////////////////////////////////////////////
    punchLeftProcessor(bot, fighter, botPos, fighterPos);
    /////////////////////////////////////////////////
    //deplacement 
    moveProcessor(bot, botPos, fighterPos, BPadController);
    /////////////////////////////////////////////////
    //sens
    playerDirection(bot, fighter, botPos, fighterPos);
    /////////////////////////////////////////////////

    window.requestAnimationFrame(Bloop);
};
window.addEventListener("keydown", BPadController.keyListener)
window.addEventListener("keyup", BPadController.keyListener);
window.requestAnimationFrame(Bloop);