import { data } from './data.js'
import { navInit, allCardPage, contentInit, card, perPage } from './pagenation.js'


let dataNow = data;

// 過濾薯條套餐的資料
let dataFries = data.filter( item => {
  return item.title.includes("薯條");
})

// 過濾漢堡套餐的資料
let dataHamburger = data.filter( item => {
  return item.title.includes("漢堡");
})

let oUl = document.querySelector(".cartDesktop ul");
let oLis = oUl.getElementsByTagName("li");

oLis[0].innerHTML = `全部 (${data.length})`
oLis[1].innerHTML = `只愛吃薯條 (${dataFries.length})`
oLis[2].innerHTML = `不敗漢堡系列 (${dataHamburger.length})`

oUl.onclick = function(e){
  let target = e.target;
  if(target.nodeName.toUpperCase() == "LI"){
    for(let i = 0; i < oLis.length; i++){
      oLis[i].index = i;
      oLis[i].className = "none";
    }
    target.className = "active"
  }
  
  if(target.index == 0){
    dataNow = data;
  }else if(target.index == 1){
    dataNow = dataFries;
  }else{
    dataNow = dataHamburger;
  }
  navInit(dataNow, perPage);
  allCardPage(dataNow, perPage);
  contentInit(card[0]);
}