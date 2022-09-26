//2단 메뉴
$(".nav > ul > li").mouseover(function() {
    $(this).find(".submenu").stop().slideDown(300);
})
$(".nav > ul > li").mouseout(function() {
    $(this).find(".submenu").stop().slideUp(300);
})

// 슬라이드 

var currentIndex = 0;

setInterval(function () {
    if(currentIndex < 2) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }
    var slidePosition = currentIndex * (-1000) + "px";
    $(".slideList").animate({left : slidePosition}, 400);
    
}, 3000);




// 탭메뉴
var tabBtn = $(".tap_btn > ul > li");
var tabCont= $(".tab_Cont > div");

tabCont.hide().eq(0).show();

tabBtn.click(function(event) {
    event.preventDefault()
    var target = $(this);
    var index = target.index();

    tabBtn.removeClass("active");
    target.addClass("active");

    tabCont.css("display", "none");
    tabCont.eq(index).css("display", "block");
    
})

// layer
$("#content1 .left").click(function(){
    $(".layer_bg").show();
    $(".layer").show(300);
})
$(".layer .close").click(function(){
    $(".layer_bg").hide();
    $(".layer").hide(300);
})