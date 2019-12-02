///////////////////////////////////////////
//FIREBALLS//
//Fireballs du joueur 1
var anyBall = [];
anyBall[0] = {
    x: 350,
    y : 0,
    step: 0,
    blockDir: 0,
    counter: 0
};
///////////////////////////////////////////
//FIREBALLS//
//Fireballs du joueur 2
var anyBallB = [];
anyBallB[0] = {
    x: 350,
    y : 0,
    step: 0,
    blockDir: 0,
    counter: 0
};


function theFireballs(ballID, ballID2, char, charb, posb){
    for(var i = 0; i < ballID.length; i++){
        ballID[i].step+=0.32;
        if (ballID[i].step >= 2){
            ballID[i].x+=ballID[i].blockDir * 4;
        }
        if( ((!charb.downState && ballID[i].x + moveBg - 5 >= posb.pX && ballID[i].x + moveBg <= posb.pX + 30) 
        && (ballID[i].y <= posb.pY && ballID[i].y  >= posb.pY - 25)) ||
        ((charb.downState && ballID[i].x + moveBg >= posb.pX && ballID[i].x + moveBg <= posb.pX + 30) 
        && (ballID[i].y <= posb.pY && ballID[i].y  >= posb.pY - 15)) 
        ){
            ballID[i].counter = 1;
            if(!charb.vraimentgarde && !charb.arrGarde ){
                if(ballID[i].step <=7){
                    punched(charb, char);
                    charb.energy -= 1.2;
                }
            }
            else if(charb.arrGarde){
                garde(charb);
            }
            else if(charb.vraimentgarde && charb.downState){
                gardeBasse(charb);
            }

            ballID[i].blockDir = 0;
            if(ballID[i].step >= 12){
                ballID[i].counter = 0;
                ballID.splice(ballID.lenght-1,1);}
        }
        else if(ballID[i].counter == 0 && ballID[i].step >= 5 && ballID[i].step <= 7 && ballID[i].x <= 305 && ballID[i].x >= 0){
            ballID[i].step = 2;
        }
        else if(ballID[i].x >= 350){
            ballID.splice(ballID.lenght-1,1);
        }
        else if(ballID[i].x <= 0){
            ballID.splice(ballID.lenght-1,1);
        }
    }
    ballID2.forEach(function (element){
        for(var i = 0; i < ballID.length; i++){
            //detection des fireballs enemis
            if (ballID[i].x <= element.x + 14
            && ballID[i].x + 14 >= element.x
            && ballID[i].y <= element.y + 11
            && ballID[i].y + 11 >= element.y 
            //conditions pour activer la collision
            && ballID[i].step <= 5 
            && ballID[i].counter == 0){
                ballID[i].counter = 1;
                ballID[i].blockDir = 0;
            }
            //disparition de la fireball
            if(ballID[i].step >= 12){
                ballID[i].counter = 0;
                ballID.splice(ballID.lenght-1,1);
            }
        }
    })
}