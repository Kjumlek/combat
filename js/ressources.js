///////////////////////////////////////////
//MEDIAS IMAGE//
///////////////////////////////////////////
//ready?
var startFightScreen = new Image();
startFightScreen.onload = animate;
startFightScreen.src ="images/rounds/round.png";

//Personnage
var fighterImg = new Image();
fighterImg.onload = animate;
fighterImg.src ="images/characters/combatstand.png";
//jauge container perso
var jaugeCL = new Image();
jaugeCL.src ="images/infoBars/energyCL.png";
//jauge perso
var jaugeL = new Image();
jaugeL.src ="images/infoBars/Lenergy.png";
//jauge combo
var jaugeCombo = new Image();
jaugeCombo.src ="images/infoBars/jaugecombo.png";


//Enemi
var botImg = new Image();
botImg.onload = animate;
botImg.src ="images/characters/combatstand2.png";
//jauge container enemi
var jaugeCR = new Image();
jaugeCR.src ="images/infoBars/energyCR.png";
//jauge enemi
var jaugeR = new Image();
jaugeR.src ="images/infoBars/Renergy.png";
//jauge combo
var jaugeCombo2 = new Image();
jaugeCombo2.src ="images/infoBars/jaugecombo2.png";

//jauge vector
var jaugevector = new Image();
jaugevector.src ="images/infoBars/jaugevector.png";

//comboText
var comboText = new Image();
comboText.src ="images/combo/combo.png";
//comboNumber
var comboNumber = new Image();
comboNumber.src ="images/ui/numbers.png";
//comboTimer
var comboTimer = new Image();
comboTimer.src ="images/combo/comboTimer.png";
//comboTimerBar
var comboTimerBar = new Image();
comboTimerBar.src ="images/combo/comboTimerBar.png";
//combinaison
var combinaison = new Image();
combinaison.src ="images/combo/combinaison.png";

//flash
var flashHit = new Image();
flashHit.src ="images/scene/flashHit.png";

//Background
var bg = new Image();
bg.onload = animate;
bg.src ="images/scene/beach.png";
//Premier plan
var trees = new Image();
trees.src ="images/scene/trees.png";
///////////////////////////////////////////




///////////////////////////////////////////
//MEDIAS AUDIO//
///////////////////////////////////////////
//music
var trozik = new Audio();
trozik.src = "sounds/music/combat.mp3";
///////////////////////////////////////////
//swing
var swing1 = new Audio();
swing1.src = "sounds/swing/swing1.mp3";
var swing2 = new Audio();
swing2.src = "sounds/swing/swing2.mp3";
var swing3 = new Audio();
swing3.src = "sounds/swing/swing3.mp3";
var swing4 = new Audio();
swing4.src = "sounds/swing/swing4.mp3";
var swing5 = new Audio();
swing5.src = "sounds/swing/swing5.mp3";
var swing6 = new Audio();
swing6.src = "sounds/swing/swing6.mp3";
var swing7 = new Audio();
swing7.src = "sounds/swing/swing7.mp3";
var swing8 = new Audio();
swing8.src = "sounds/swing/swing8.mp3";
//ko
var koSound = new Audio();
koSound.src = "sounds/ui/ko.mp3";
///////////////////////////////////////////
//combos
var combo1 = new Audio();
combo1.src = "sounds/combo/nivcombo1.mp3";
var combo2 = new Audio();
combo2.src = "sounds/combo/nivcombo2.mp3";
var combo3 = new Audio();
combo3.src = "sounds/combo/nivcombo3.mp3";
var combo4 = new Audio();
combo4.src = "sounds/combo/nivcombo4.mp3";
var combo5 = new Audio();
combo5.src = "sounds/combo/nivcombo5.mp3";
var combo6 = new Audio();
combo6.src = "sounds/combo/nivcombo6.mp3";
var combo7 = new Audio();
combo7.src = "sounds/combo/nivcombo7.mp3";
//comboFail
var comboFail = new Audio();
comboFail.src ="sounds/combo/comboFail.mp3";
///////////////////////////////////////////
//rounds
var round = new Audio();
round.src = "sounds/rounds/round.mp3";
var round1 = new Audio();
round1.src = "sounds/rounds/1.mp3";
var round2 = new Audio();
round2.src = "sounds/rounds/2.mp3";
var round3 = new Audio();
round3.src = "sounds/rounds/3.mp3";
var round4 = new Audio();
round4.src = "sounds/rounds/4.mp3";
var round5 = new Audio();
round5.src = "sounds/rounds/5.mp3";
//count fight
var countFight = new Audio();
countFight.src = "sounds/ui/fight.mp3";
///////////////////////////////////////////
