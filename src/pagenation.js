import { data } from './data.js'

let card = [];

let nowPage = 1;

// 設定每頁幾筆資料
let perPage = 6;


const oContent = document.querySelector(".sectionCard .content .card");
const oNav = document.querySelector("nav");

// 切換分頁按鈕事件
oNav.addEventListener("click", (e)=>{
    let target = e.target;
    e.preventDefault();
    let allA = oNav.querySelectorAll('a');
    // 當點擊到 a 標籤時觸發
    if(e.target.nodeName == "A"){
        // 全部 class 清空
        for(let i = 0; i < allA.length; i++){
            allA[i].className = "";
        }
        // 設定當前分頁
        // 點擊 Prev
        if(target.innerText === "Prev"){
            if(getPage() != 1){
                setPage(getPage() - 1);
            }
        // 點擊  Next
        }else if(target.innerText === "Next"){
            if(getPage() != allA.length - 2){
                setPage(getPage() + 1);
            }
        // 點擊 中間分頁 
        }else{
            setPage(parseInt(target.innerText));
        }

        allA[getPage()].className = "active";
        contentInit(card[getPage() - 1]);
    }
    // 輸出當前所在頁面
    nowPage = getPage();
})

// 當前分頁初始化 - 用來抓取並設定當前所在分頁狀態
function pageData(page){
    const getPage = () => page;
    const setPage = (n) => page = n;
    return {getPage, setPage}
}
const {getPage, setPage} = pageData(1)

// 分頁標籤
function navInit(data, perPage = 6){
    let pageNum = Math.ceil(data.length / perPage);
    let str = "";
    for(let i = 0; i < pageNum; i++){
        str += `
            <a href="#">${i+1}</a>
        `
    }
    oNav.innerHTML =  `<a href="#">Prev</a>${str}<a href="#">Next</a>`
    let allA = oNav.querySelectorAll('a');
    allA[1].className = "active";
    
}

// 全部每頁的卡片內容
function allCardPage(data,perPage = 6){
    card = [];
    let pageNum = Math.floor(data.length / perPage);
    let lastPage = data.length % perPage
    for(let i = 0; i < pageNum; i++){
        let arr = [];
        for(let j = perPage * i; j < perPage * (i + 1); j++){
            let obj = {...data[j]};
            arr.push(obj);
        }
        card.push(arr);
    }
    // 若有不足一頁
    if(lastPage){
        let arr = [];
        for(let i = data.length - lastPage; i < data.length; i++){
            let obj = {...data[i]};
            arr.push(obj);
        }
        card.push(arr);
    }
}

// 印出每頁卡片內容
function contentInit(data){
    let allStr = "";
    for(let i = 0; i < data.length; i++){
        allStr += `
        <div>
            <img src="${data[i]["photoSrc"]}">
            <h3>${data[i]["title"]}</h3>
            <p>${data[i]["engTitle"]}</p>
            <p>--------------</p>
            <span>$${data[i]["price"]}</span>
            <div class="car">
                <img src="./assets/shopping-cart2.svg">
                <p>加入購物車</p>
            </div>
        </div>
        `
    }
    oContent.innerHTML = allStr;
}

navInit(data, perPage);
allCardPage(data, perPage);
contentInit(card[0]);

export { navInit, allCardPage, contentInit, card, perPage, pageData, nowPage }