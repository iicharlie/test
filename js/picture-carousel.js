/**
 * Created by ljwlgl on 17-4-11.
 */

window.onload = function () {

    var myOffset = 0 ; //偏移量
    var moveTime = 2000;//图片轮播时间
    var container = document.getElementById('container');
    var list = document.getElementById('list');
    var images = list.getElementsByTagName('img');
    var next = document.getElementById('next');
    var prev = document.getElementById('prev');
    var buttons  = document.getElementById('buttons').getElementsByTagName('span');
    var index = 2;  //用于记录当前显示的是第几个图片
    var flag = true;
    var timeout;//设置计时器
    var listNum = images.length;//图片个数
    var imageWidth = images[0].width;//获取图片宽度
    var imageHight = images[0].height;//获取图片长度

    list.style.left = -imageWidth+'px';//先将图片list向左偏移一个图片长度，故首页显示成第二张图片
    buttons[1].className = 'on';
    timeout = setTimeout(go,moveTime);

    container.onmouseover = function () {//鼠标移上后清除浮动
        clearTimeout(timeout);
    }

    container.onmouseout = function () {
        timeout = setTimeout(go,moveTime);
    }

    for(var i=0;i<buttons.length;i++){
        buttons[i].onclick = function () {
            if(this.className == 'on') return;
            var myIndex = parseInt(this.getAttribute('index'));
            myOffset=myOffset+(index - myIndex)*imageWidth;
            move();
            index = myIndex;
            showButton();
        }
    }
    function go() {//设置自动播放
        if(flag) {
            myOffset = myOffset - imageWidth;
            index++;

        }else{
            myOffset = myOffset + imageWidth;
            index--;
        }
        if(index > listNum) index = 1;
        if(myOffset >= imageWidth){flag = true;}
        if(myOffset <= -(listNum-2)*imageWidth){flag = false;}
        move();
        showButton();
        timeout = setTimeout(go,moveTime);
    }


    function showButton() {//改变底部按钮状态
        for(var i=0;i<buttons.length;i++){
            buttons[i].className = '';
        }
        buttons[index-1].className = 'on';
    }

    function move() {//移动list
        list.style.transform = "translate("+myOffset+"px,0px)";

    }
    next.onclick = function () {
        index++;
        if(index > listNum) index = 1;
        myOffset = myOffset - imageWidth;
        if(myOffset > imageWidth){myOffset = -(listNum-2)*imageWidth;}
        if(myOffset < - (listNum-2)*imageWidth){myOffset = imageWidth;}
        move();
        showButton();
    }

    prev.onclick = function () {
        index--;
        if(index < 1) index = listNum;
        myOffset = myOffset + imageWidth;
        if(myOffset > imageWidth){myOffset = -(listNum-2)*imageWidth;}
        if(myOffset < - (listNum-2)*imageWidth){myOffset = imageWidth;}
        move();
        showButton();
    }



}

