///////////////////////////////////////////
//FLASH HITS
///////////////////////////////////////////
var flashAnimStep = 0;
function flashLeft(char, posb){
    flashAnimStep = 0;
    flashHitStep = Math.floor(Math.random() * 3) * 4;
    if(!char.downState){
        flashHitPos.pX = posb.pX + 30;
        flashHitPos.pY = posb.pY - 10;}
    else if(char.downState){
        flashHitPos.pX = posb.pX + 30;
        flashHitPos.pY = posb.pY + 10;}
}
function flashRight(char, posb){
    flashAnimStep = 0;
    flashHitStep = Math.floor(Math.random() * 3) * 4;
    
    if(!char.downState){
        flashHitPos.pX = posb.pX + 27;
        flashHitPos.pY = posb.pY - 10;}
    else if(char.downState){
        flashHitPos.pX = posb.pX + 27;
        flashHitPos.pY = posb.pY + 10;}
}
///////////////////////////////////////////