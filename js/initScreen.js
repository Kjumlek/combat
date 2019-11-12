//CONFIG ECRAN//
var width = 700, height = 300, ratio = 2, r = 40;

const cvs = document.getElementById('canvas');
const ctx = cvs.getContext('2d');

cvs.width = width * ratio;
cvs.height = height * ratio;
cvs.style.width = width + "px";
cvs.style.height = height + "px";
ctx.scale(ratio, ratio);
ctx.imageSmoothingEnabled = false;