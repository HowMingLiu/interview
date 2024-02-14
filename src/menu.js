let oMenu = document.querySelector(".menu");
let oUl = document.querySelector(".logo ul");
let oLogo = document.querySelector(".logo");
oMenu.onclick = function(){
  if(getStyle(oUl, "display") == "none"){
    oUl.style.display = "flex";
    oLogo.style.backgroundColor = "black";
  }else{
    oUl.style.display = "none";
    oLogo.style.backgroundColor = "rgba(0,0,0,0.35)"
  }
}

function getStyle(node, cssStyle){
  return node.currentStyle ? node.currentStyle[cssStyle] : getComputedStyle(node)[cssStyle];
}