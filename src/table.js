import { dataShopping } from './dataShopping.js';

export function setTable(tableDOM, shoppingCartData){

  let tableData = dataOrg(shoppingCartData)
  createTable(tableDOM, tableData);
  createBtn(tableDOM, tableData);

  let aBtns = tableDOM.getElementsByTagName("button");
  for(let i = 0; i < aBtns.length; i++){
    aBtns[i].index = i;
    if(i % 2 == 0){
      aBtns[i].onclick = function(e){
        tableData[i/2].count--;
        // 修改購物車
        for(let j = 0; j < shoppingCartData.length; j++){
          if(tableData[i/2].title == shoppingCartData[j].title){
            shoppingCartData.splice(j, 1);
            break;
          }
        }
        // 修改表格數量
        let oCount = tableDOM.querySelector(`.count${i/2}`)
        oCount.innerHTML = tableData[i/2].count;
        // 修改表格總價
        let oTotalPrice = tableDOM.querySelector(`.totalPrice${i/2}`)
        oTotalPrice.innerHTML = tableData[i/2].count * tableData[i/2].price;
        // 修改表格總金額
        let oTotal = tableDOM.querySelector(".total")
        oTotal.innerHTML = oTotal.innerHTML - tableData[i/2].price;
        // 當數量為 0 時隱藏表格
        if(oCount.innerHTML == 0){
          oCount.parentNode.style.display = "none";
        }
        // 購物車圖示右上角的數字
        let oCart = document.querySelector(".sectionCard .top .shoppingCart span");
        let oCard = document.querySelector(".sectionCard .content .card");
        let oNav = document.querySelector(".sectionCard .content nav");
        let oTable = document.querySelector(".sectionCard .content table");
        oCart.innerHTML = shoppingCartData.length;
        if(oCart.innerHTML == "0"){
          oCart.innerHTML = ""
          oCart.style.display = "none"
          oCard.style.display = "flex";
          oNav.style.display = "flex";
          oTable.style.display = "none";
        }
      }
    }else{
      aBtns[i].onclick = function(e){
        tableData[(i + 1) / 2 - 1].count++;
        // 修改購物車
        for(let j = 0; j < shoppingCartData.length; j++){
          if(tableData[(i + 1) / 2 - 1].title == shoppingCartData[j].title){
            shoppingCartData.push(shoppingCartData[j]);
            break;
          }
        }
        console.log(shoppingCartData)
        // 修改數量
        let oCount = tableDOM.querySelector(`.count${(i + 1) / 2 - 1}`)
        oCount.innerHTML = tableData[(i + 1) / 2 - 1].count;
        // 修改單品總價
        let oTotalPrice = tableDOM.querySelector(`.totalPrice${(i + 1) / 2 - 1}`)
        oTotalPrice.innerHTML = tableData[(i + 1) / 2 - 1].count * tableData[(i + 1) / 2 - 1].price;
        // 修改表格總金額
        let oTotal = tableDOM.querySelector(".total")
        oTotal.innerHTML = parseInt(oTotal.innerHTML) + tableData[(i + 1) / 2 - 1].price;
        // 購物車圖示右上角的數字
        let oCart = document.querySelector(".sectionCard .top .shoppingCart span");
        oCart.innerHTML = shoppingCartData.length;
      }
    }
  }
}

// 整理購物車資料
function dataOrg(shoppingCartData){
  // 初始化購物車
  dataShopping.forEach(item => {  
    item.count = 0;
  })
  // 購物車整理後的資料
  shoppingCartData.forEach((item1) => {
    dataShopping.forEach((item2, index) => {
      if(item1.title == item2.title){
        dataShopping[index].count++;
        dataShopping[index].totalPrice = dataShopping[index].count * dataShopping[index].price;
      }
    })
  })
  // 過濾數量不等於 0 的餐點
  return dataShopping.filter(item => {
    return item.count != 0;
  })
}

// 建立表格內容
function createTable(tableDOM, tableData){
  tableDOM.innerHTML = `
    <tr>
      <th>品項</th>
      <th>數量</th>
      <th>單價</th>
      <th>總價</th>
      <th>修改</th>
    </tr>
  `
  let total =  0;
  tableData.forEach((item, index) => {
    let newTr =  document.createElement("tr");
    total += item.totalPrice;
    newTr.innerHTML = `
      <td>${item.title}</td>
      <td class="count${index}">${item.count}</td>
      <td>${item.price}</td>
      <td class="totalPrice${index}">${item.totalPrice}</td>
    `
    tableDOM.appendChild(newTr)
  })
  
  let newTr =  document.createElement("tr");
  newTr.innerHTML = `
    <td></td>
    <td></td>
    <td></td>
    <td>總金額</td>
    <td class="total">${total}</td>
  `
  tableDOM.appendChild(newTr)
}

// 建立按鈕
function createBtn(tableDOM, tableData){
  tableData.forEach((item, index) => {
    let newTd = document.createElement("td");
    newTd.innerHTML = `
      <button>-</button>
      <button>+</button>
    `
    tableDOM.getElementsByTagName("tr")[index + 1].appendChild(newTd)
  })
}