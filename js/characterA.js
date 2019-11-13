///////////////////////////////////////////
//ENERGY PERSONNAGE//
///////////////////////////////////////////
//energie
var energyPos = {height:36, width:167, pX:5, pY:1}
var energyPos2 = {height:6, width:121, pX:24, pY:15}
//visualisation
var jaugecomboPos = {height:21, width:117, pX:7, pY:24}
var energyD;
var jaugevectorStep = 0;
var jaugevectorPos = {height:2, width:82, pX:36, pY:35}
///////////////////////////////////////////
//CARACTERISTIQUES//
var fighter;
fighter = {
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
    punchEject : false,

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
var fighterPos;
fighterPos = {jumping:true,
    width:70, height:55,
    pX:75, pX_velocity:0,
    pY:105, pY_velocity:0
};

///////////////////////////////////////////
//DETECTION CLAVIER & ACTIONS ETAS//
///////////////////////////////////////////
//detection appuis
document.addEventListener("keydown",function(event){
    if(fighter.energy >= 1 && okFight && !bot.combo && !fighter.contreIteration){
        keyboardDown(fighter, fighterPos, 40, 38, 37, 39, 83, 68, event);
    }
});
keyLatch = {
    keyListener:function(e) {
        var key_state = (e.type == "keyup")?true:false;
        keyboardUp(fighter, e, 37, 38, 39, 40, 83, 68);
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
    playerCondition(fighter, bot);
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
    //KO    
    koProcessor(padController);
    /////////////////////////////////////////////////
    //detection des coups donnés à droite
    detectorRight(bot, botPos, fighterPos);
    /////////////////////////////////////////////////
    //contre//
    contreProcessorRight(padController, fighter, bot, botPos);
    /////////////////////////////////////////////////
    punchRightProcessor(fighter, bot, botPos);
    /////////////////////////////////////////////////
    //detection des coups donnés à gauche
    detectorLeft(bot, botPos, fighterPos);
    /////////////////////////////////////////////////
    //contre//
    contreProcessorLeft(padController, fighter, bot, botPos);
    /////////////////////////////////////////////////
    punchLeftProcessor(fighter, bot, botPos);
    /////////////////////////////////////////////////
    //deplacement 
    moveProcessor(fighter, fighterPos, botPos, padController);
    /////////////////////////////////////////////////
    //sens
    playerDirection(fighter, bot, fighterPos, botPos);
    /////////////////////////////////////////////////
    
    window.requestAnimationFrame(loop);
};
window.addEventListener("keydown", padController.keyListener)
window.addEventListener("keyup", padController.keyListener);
window.requestAnimationFrame(loop);