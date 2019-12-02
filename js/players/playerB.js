///////////////////////////////////////////
//ENERGY ENEMI//
///////////////////////////////////////////
//energie
var botenergyPos = {height:36, width:129, pX:159, pY:10}
var botenergyPos2 = {height:6, width:121, pX:164, pY:13}
//visualisation
var jaugecombo2Pos = {height:21, width:104, pX:184, pY:18}
var energyD2;
var jaugevector2Step = 30;
var jaugevector2Pos = {height:2, width:82, pX:178, pY:26}

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
    armAdvance : 0, armY : 0, armHeight : 0,
    legAdvance : [], legY : [], legHeight : [],

    pSV : 0,

    roundWin : 0
};

//position du joueur
var botPos;
botPos = {jumping:true, 
    width:70, height:55,
    pX:188, pX_velocity:0,
    pY:105, pY_velocity:0
};

//score du joueur
var botScore;
botScore = {
    roundW : [0, 0, 0, 0, 0]
}

//boxes collider
var bodyBoxB = {height:27, width:14, pX:12, pY:16};
var armBoxB = {height:6, width:17, pX:12, pY:25, armA:0, armH:0, armmY:0};
var legBoxB = {height:13, width:17, pX:12, pY:35, legA:0, legH:0, leggY:0};

