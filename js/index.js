/**
 * Created by Administrator on 2017/3/29.
 */
window.addEventListener("load", function() {
    //页面顶部透明度
    headerChangeColor();
    //倒计时
    outTime();
    //轮播图
    bannerScroll();
})

function headerChangeColor() {
    var header = document.querySelector("header");
    var bannerHeight = document.querySelector(".jd-banner").offsetHeight;
    var AlphaMax = 0.8;
    //console.log(bannerHeight);
    window.onscroll = function() {
        var percent = document.body.scrollTop / bannerHeight;
        //console.log(percent);
        if (percent > AlphaMax) {
            percent = AlphaMax;
        }
        header.style.backgroundColor = 'rgba(201,21,35,' + percent + ')';
    }
    window.onscroll();

}

function bannerScroll() {
    var imgUl = document.querySelector('.banner-imgs');
    var liImgs = document.querySelectorAll('.banner-imgs>li');
    var liCircle = document.querySelectorAll('.banner-circle>li')
        //console.log(liImgs);
    var screenWidth = document.body.offsetWidth;
    //console.log(screenWidth);
    var index = 1;
    var timer = setInterval(function() {
        index++;
        imgUl.style.transform = "translateX(" + (-index * screenWidth) + "px)";
        imgUl.style.transition = "transform " + .4 + "s";
    }, 1000);
    imgUl.addEventListener('transitionend', function() {
        console.log('触发了');
        if (index >= 9) {
            index = 1;
            imgUl.style.transition = "none";
            imgUl.style.transform = "translateX(" + (-index * screenWidth) + "px)";
        }
        if (index <= 0) {
            index = 8;
            imgUl.style.transition = "none";
            imgUl.style.transform = "translateX(" + (-index * screenWidth) + "px)";
        }
        for (var i = 0; i < liCircle.length; i++) {
            liCircle[i].classList.remove("current");
        }
        liCircle[index - 1].classList.add('current');
    });
    var startX = 0;
    var moveX = 0;
    imgUl.addEventListener("touchstart", function(event) {
        startX = event.touches[0].clientX;
        clearInterval(timer);
        imgUl.style.transition = "none"; //清除过渡
    })

    imgUl.addEventListener("touchmove", function(event) {
        moveX = event.touches[0].clientX - startX;
        imgUl.style.transform = "translate(" + (screenWidth * -index + moveX) + "px)";
    });
    imgUl.addEventListener(("touchend"), function() {
        if (Math.abs(moveX) >= screenWidth / 3) {
            if (moveX > 0) {
                index--;
            } else {
                index++;
            }
            imgUl.style.transition = "transform " + .4 + "s";
            imgUl.style.transform = "translateX(" + (-index * screenWidth) + "px)";
        } else {
            imgUl.style.transition = "transform " + .4 + "s";
            imgUl.style.transform = "translateX(" + (-index * screenWidth) + "px)";
        }
        timer = setInterval(function() {
            index++;
            imgUl.style.transform = "translateX(" + (-index * screenWidth) + "px)";
            imgUl.style.transition = "transform " + .4 + "s";
        }, 1000);
    })
}

function outTime() {
    var totalTime = 6 * 60 * 60;
    //var totalTime=5;
    var liArr = document.querySelectorAll(".outTime>li");
    var timer = setInterval(function() {
        totalTime--;
        if (totalTime < 0) {
            alert('错过，活该！');
            clearInterval(timer);
            return;
        }
        var hour = Math.floor(totalTime / 3600);
        var minute = Math.floor(totalTime % 3600 / 60);
        var second = Math.floor(totalTime % 60);
        liArr[0].innerHTML = Math.floor(hour / 10);
        liArr[1].innerHTML = hour % 10;
        liArr[3].innerHTML = Math.floor(minute / 10);
        liArr[4].innerHTML = minute % 10;
        liArr[6].innerHTML = Math.floor(second / 10);
        liArr[7].innerHTML = second % 10;
    }, 1000)
}