///////////////////////////////////////////
//ENERGY PERSONNAGE//
///////////////////////////////////////////
//energie
var energyPos = {height:12, width:129, pX:2, pY:10}
var energyPos2 = {height:6, width:121, pX:6, pY:13}
//visualisation
var jaugecomboPos = {height:10, width:104, pX:2, pY:18}
var energyD;
var jaugevectorStep = 0;
var jaugevectorPos = {height:2, width:82, pX:30, pY:26}

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
    iterationHit: false,
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
    comboVector : 1,

    //box collider
    //body avance
    bodyAdvance : [], bodyY : [],
    //bras avance
    armAdvance : [], armY : [], armHeight : [],
    legAdvance : [], legY : [], legHeight : [],

    pSV : 0,
    roundWin : 0
};

//position du joueur
var fighterPos;
fighterPos = {jumping:true,
    width:70, height:55,
    pX:55, pX_velocity:0,
    pY:105, pY_velocity:0
};

//score du joueur
var fighterScore;
fighterScore = {
    roundW : [0, 0, 0, 0, 0]
}

//boxes collider
var bodyBoxA = {height:27, width:14, pX:12, pY:16};
var armBoxA = {height:6, width:17, pX:12, pY:25, armA:0, armH:0, armmY:0};
var legBoxA = {height:13, width:17, pX:12, pY:35, legA:0, legH:0, leggY:0};

