///////////////////////////////////////////
//COMBO JAUGE
///////////////////////////////////////////
//augmentation jauges combo
function jaugeComboProcessor(char){
    if (char.jaugeComboStep < 15){
        //jauge crenelée
        if(char.jaugeComboStep < char.jaugeComboStepMicro){
            char.jaugeComboStep+=0.08 * gamespeed;}
    }
    //jauge max
    else {
        //anim quand ok
        char.jaugeComboStep+=0.10 * gamespeed;
        //jauge max > initialisation
        if(char.jaugeComboStep >= 9){
            if (goModeCounter == 0){
                comboKey = -1;
                combo3.play();
                goMode();
                goModeCounter++;
                char.combo = true;
                comboDisplay = 1;
                char.comboMode = true;
                setTimeout(function(){
                    combodelay = true;
                    combo1.play();
                    }, 500 / gamespeed);
            }
        }
        if(char.jaugeComboStep >= 20){
            char.jaugeComboStep-=5;
        }
    }
}