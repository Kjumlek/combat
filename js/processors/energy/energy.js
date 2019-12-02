///////////////////////////////////////////
//ENERGY
///////////////////////////////////////////
function energyProcessor(char){
    //energie qui remonte
    char.energyStep = 120 - (char.energy * 0.5);
    if (char.energy > 0){
        //if(char.energy < 239 && okFight){
        //    char.energy += char.recuperation * gamespeed;}
    }
    //vitesse d'animation de l'energie
    char.energyStep = 120 - char.energy * 0.5;
}
///////////////////////////////////////////
//JAUGE PLUS
///////////////////////////////////////////
function jaugePlus(char, charb){
    char.smashOK = false;
    charb.vape = true;
    charb.energy -= char.vectorForce * char.comboVector * gamespeed;
    // * punchedSpeed;
    charb.jaugeComboStep = 0;
    charb.jaugeComboStepMicro = 0;
    if (char.jaugeComboCounter == 0){
        char.jaugeComboCounter++;
        char.jaugeComboStepMicro+=3;
    }
}