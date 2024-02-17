import { data } from './data.js';
import { navInit, allCardPage, contentInit, card, perPage, nowPage } from './pagenation.js';
import { setTable } from './table.js';
import { starMove } from './starMove.js'

// option 使用
let dataNow = data;

// 購物車使用，此為當前畫面對應的 card
let dataTemp = data;

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

// option 的菜單數量
oLis[0].innerHTML = `全部 (${data.length})`
oLis[1].innerHTML = `只愛吃薯條 (${dataFries.length})`
oLis[2].innerHTML = `不敗漢堡系列 (${dataHamburger.length})`

// 切換 option
oUl.onclick = function(e){
  let target = e.target;
  if(target.nodeName.toUpperCase() == "LI"){
     // 切換 card 顯示
    if(oCard.style.display == "none"){
      oCard.style.display = "flex";
      oNav.style.display = "flex";
      oTable.style.display = "none";
    }
    for(let i = 0; i < oLis.length; i++){
      oLis[i].index = i;
      oLis[i].className = "none";
    }
    target.className = "active"
  }
  // 判斷需要的資料
  if(target.index == 0){
    dataNow = data;
  }else if(target.index == 1){
    dataNow = dataFries;
  }else{
    dataNow = dataHamburger;
  }

  // 購物車使用
  dataTemp = dataNow;

  // 呼叫分頁函式
  navInit(dataNow, perPage);
  allCardPage(dataNow, perPage);
  contentInit(card[0]);
}

// 搜尋功能
let oSearch = document.querySelector(".sectionCard .top #filterInput");
oSearch.onchange = function(){
  // 切換 card 顯示
  if(oCard.style.display == "none"){
    oCard.style.display = "flex";
    oNav.style.display = "flex";
    oTable.style.display = "none";
  }
  let keyWord = oSearch.value
  let dataFilter = dataNow.filter( item => {
    return item.title.includes(keyWord);
  })

  // 購物車使用
  dataTemp = dataFilter;

  if(dataFilter.length != 0){
    // 呼叫分頁函式
    navInit(dataFilter, perPage);
    allCardPage(dataFilter, perPage);
    contentInit(card[0]);
  }else{
    alert("沒有符合的餐點名稱")
  }
}

// 購物車
let shoppingCartData = []; // 購物車內的商品
let oCard = document.querySelector(".sectionCard .content .card");
// 購物車圖示右上角的數字
let oCart = document.querySelector(".sectionCard .top .shoppingCart span");
// 添加點擊事件 - 將商品加入購物車
oCard.onclick = function(e){
  let aDivs = oCard.querySelectorAll(".sectionCard .content .card>div");
  for(let i = 0; i < aDivs.length; i++){
    aDivs[i].index = i
  }
  let target = e.target;
  // 預期 x 為 div.card 元素
  let x = target.parentNode.parentNode.parentNode;
  if(x.tagName.toLowerCase() == "div" && x.className.toLowerCase() == "card"){
    // 預期 y 為每個卡片的 index
    let y = target.parentNode.parentNode.index;
    shoppingCartData.push(dataTemp[y + ((nowPage - 1) * 6)]);
    // 購物車右上角的數量
    oCart.style.display = "block";
    oCart.innerHTML = shoppingCartData.length;

    // 添加動畫
    let animateCard = target.parentNode.parentNode.querySelector("img").cloneNode(true);
    oCard.appendChild(animateCard);
    // 取得購物車小圖示的座標
    let oCartImgLeft = oCartImg.offsetLeft + oCartImg.parentNode.offsetLeft
    let oCartImgTop = oCartImg.offsetTop + oCartImg.parentNode.offsetTop

    // 設置新添加的圖片初始位置與原圖片位置相同
    animateCard.style.position = "absolute"
    animateCard.style.left = target.parentNode.parentNode.offsetLeft + "px"
    animateCard.style.top = target.parentNode.parentNode.offsetTop + "px"
    animateCard.style.width = "150px"
    animateCard.style.height = "150px"
    animateCard.style.borderRadius = "750px"
    starMove(animateCard, {
      width: 20,
      height: 20,
      left: oCartImgLeft,
      top: oCartImgTop,
    }, function(){
      // 刪除添加的照片
      animateCard.parentNode.removeChild(animateCard);
      starMove(oCartImg, {
        padding: 2
      }, function(){
        starMove(oCartImg, {
          padding: 0
        })
      })
    })
  }
}

// 開啟購物車
// oCartImg 購物車圖片
let oCartImg = document.querySelector(".sectionCard .top .shoppingCart img");
let oNav = document.querySelector(".sectionCard .content nav");
let oTable = document.querySelector(".sectionCard .content table");
oCartImg.onclick = function(){
  if(oCart.innerHTML){
    if(oCard.style.display == "none"){
      oCard.style.display = "flex";
      oNav.style.display = "flex";
      oTable.style.display = "none";
    }else{
      // 製作 table
      setTable(oTable, shoppingCartData)
  
      oCard.style.display = "none";
      oNav.style.display = "none";
      oTable.style.display = "block";
    }
  }
}