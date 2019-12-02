///////////////////////////////////////////
//MEDIAS IMAGE//
///////////////////////////////////////////
//ready?
var startFightScreen = new Image();
startFightScreen.onload = animate;
startFightScreen.src ="ressources/images/rounds/round.png";

//console
var consoleMenu = new Image();
consoleMenu.src ="ressources/images/ui/console.png";

//rules
var rules = new Image();
rules.src ="ressources/images/ui/rules.png";

//timer
var timeNumber = new Image();
timeNumber.src ="ressources/images/ui/timeNumbers.png";

//namelist
var charNameL = new Image();
charNameL.src ="ressources/images/ui/charNameL.png";
var charNameR = new Image();
charNameR.src ="ressources/images/ui/charNameR.png";

//Personnage
var fighterImg = new Image();
fighterImg.onload = animate;
fighterImg.src ="ressources/images/characters/combatstand.png";
//jauge container perso
var jaugeCL = new Image();
jaugeCL.src ="ressources/images/infoBars/energyCL.png";
//jauge perso
var jaugeL = new Image();
jaugeL.src ="ressources/images/infoBars/Lenergy.png";
//jauge combo
var jaugeCombo = new Image();
jaugeCombo.src ="ressources/images/infoBars/jaugecombo.png";
//jauge round
var roundBarL = new Image();
roundBarL.src ="ressources/images/infoBars/roundBarL.png";

//Enemi
var botImg = new Image();
botImg.onload = animate;
botImg.src ="ressources/images/characters/combatstand2.png";
//jauge container enemi
var jaugeCR = new Image();
jaugeCR.src ="ressources/images/infoBars/energyCR.png";
//jauge enemi
var jaugeR = new Image();
jaugeR.src ="ressources/images/infoBars/Renergy.png";
//jauge combo
var jaugeCombo2 = new Image();
jaugeCombo2.src ="ressources/images/infoBars/jaugecombo2.png";
//jauge round
var roundBarR = new Image();
roundBarR.src ="ressources/images/infoBars/roundBarR.png";

//jauge vector
var jaugevector = new Image();
jaugevector.src ="ressources/images/infoBars/jaugevector.png";

//fireball
var fireballImg = new Image();
fireballImg.src ="ressources/images/fireball/fireball.png";

//comboText
var comboText = new Image();
comboText.src ="ressources/images/combo/combo.png";
//comboNumber
var comboNumber = new Image();
comboNumber.src ="ressources/images/ui/numbers.png";
//comboTimer
var comboTimer = new Image();
comboTimer.src ="ressources/images/combo/comboTimer.png";
//comboTimerBar
var comboTimerBar = new Image();
comboTimerBar.src ="ressources/images/combo/comboTimerBar.png";
//combinaison
var combinaison = new Image();
combinaison.src ="ressources/images/combo/combinaison.png";

//flash
var flashHit = new Image();
flashHit.src ="ressources/images/scene/flashHit.png";

//Background
var bg = new Image();
bg.onload = animate;
bg.src ="ressources/images/scene/beach.png";
var bgGround = new Image();
bgGround.onload = animate;
bgGround.src ="ressources/images/scene/beachGround.png";
//Premier plan
var trees = new Image();
trees.src ="ressources/images/scene/trees.png";
///////////////////////////////////////////
var bodyBoxImg = new Image();
bodyBoxImg.src ="ressources/images/bodyBox.png";
var armBoxImg = new Image();
armBoxImg.src ="ressources/images/punchBox.png";
var legBoxImg = new Image();
legBoxImg.src ="ressources/images/legBox.png";




///////////////////////////////////////////
//MEDIAS AUDIO//
///////////////////////////////////////////
//music
var trozik = new Audio();
trozik.src = "ressources/sounds/music/combat.mp3";
///////////////////////////////////////////
//swing
var swing1 = new Audio();
swing1.src = "ressources/sounds/swing/swing1.mp3";
var swing2 = new Audio();
swing2.src = "ressources/sounds/swing/swing2.mp3";
var swing3 = new Audio();
swing3.src = "ressources/sounds/swing/swing3.mp3";
var swing4 = new Audio();
swing4.src = "ressources/sounds/swing/swing4.mp3";
var swing5 = new Audio();
swing5.src = "ressources/sounds/swing/swing5.mp3";
var swing6 = new Audio();
swing6.src = "ressources/sounds/swing/swing6.mp3";
var swing7 = new Audio();
swing7.src = "ressources/sounds/swing/swing7.mp3";
var swing8 = new Audio();
swing8.src = "ressources/sounds/swing/swing8.mp3";
//ko
var koSound = new Audio();
koSound.src = "ressources/sounds/ui/ko.mp3";
///////////////////////////////////////////
//combos
var combo1 = new Audio();
combo1.src = "ressources/sounds/combo/nivcombo1.mp3";
var combo2 = new Audio();
combo2.src = "ressources/sounds/combo/nivcombo2.mp3";
var combo3 = new Audio();
combo3.src = "ressources/sounds/combo/nivcombo3.mp3";
var combo4 = new Audio();
combo4.src = "ressources/sounds/combo/nivcombo4.mp3";
var combo5 = new Audio();
combo5.src = "ressources/sounds/combo/nivcombo5.mp3";
var combo6 = new Audio();
combo6.src = "ressources/sounds/combo/nivcombo6.mp3";
var combo7 = new Audio();
combo7.src = "ressources/sounds/combo/nivcombo7.mp3";
//comboFail
var comboFail = new Audio();
comboFail.src ="ressources/sounds/combo/comboFail.mp3";
///////////////////////////////////////////
//rounds
var round = new Audio();
round.src = "ressources/sounds/rounds/round.mp3";
var round1 = new Audio();
round1.src = "ressources/sounds/rounds/1.mp3";
var round2 = new Audio();
round2.src = "ressources/sounds/rounds/2.mp3";
var round3 = new Audio();
round3.src = "ressources/sounds/rounds/3.mp3";
var round4 = new Audio();
round4.src = "ressources/sounds/rounds/4.mp3";
var round5 = new Audio();
round5.src = "ressources/sounds/rounds/5.mp3";
//count fight
var countFight = new Audio();
countFight.src = "ressources/sounds/ui/fight.mp3";
///////////////////////////////////////////
