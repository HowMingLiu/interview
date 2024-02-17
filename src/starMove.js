export function starMove(node, cssObj, complete){
    clearInterval(node.timer);
    node.timer = setInterval(function(){

        // 假設所有動畫都到達目的值
        let isEnd = true;

        // 利用物件遍歷
        for(let attr in cssObj){
            // 當前遍歷屬性的值
            let iTarget = cssObj[attr];

            let iCur = null;
            if(attr == "opacity"){
                iCur = parseInt(parseFloat(getStyle(node, "opacity")) * 100);
            }else{
                iCur = parseInt(getStyle(node, attr));
            }
            let speed = (iTarget - iCur) / 8;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

            
            if(attr == "opacity"){
                iCur += speed;
                node.style.opacity = iCur / 100;
                node.style.filter = `alpha(opacity${iCur})`;
            }else{
                node.style[attr] = iCur + speed + "px";
            }

            if(iCur != iTarget){
                isEnd = false;
            }
        }

        if(isEnd){
            clearInterval(node.timer);
            if(complete){
                complete.call(node);
            }
        }
    } ,30)
}

// 獲取當前生效 CSS
function getStyle(node, cssStr){
    return node.currentStyle ? node.currentStyle[cssStr] : getComputedStyle(node)[cssStr]
}