///////////////////////////////////////////
//DIRECTIONS DES JOUEURS//
///////////////////////////////////////////
function playerDirection(char, charb, pos, posb){
    if(posb.pX > pos.pX){
        charb.reverseSprite = 55;
        charb.reverseAnim = -1;
        charb.inverseStart = 130;
        charb.miniAdjust = -20;

        char.reverseSprite = 0;
        char.reverseAnim = 1;
        char.inverseStart = 0;
        char.miniAdjust = 0;
    }
}
///////////////////////////////////////////