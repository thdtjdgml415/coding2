 //네비게이션
$(".nav > ul > li").mouseover(function () {
    $(this).find(".submenu").stop().slideDown(200);
});
$(".nav > ul > li").mouseout(function () {
    $(this).find(".submenu").stop().slideUp(200);
});

// //이미지 슬라이드 (상하)
// var currentIndex = 0;  //첫번째 이미지

// setInterval(function() {
//     if (currentIndex < 2){
//         currentIndex++;
//     } else {
//         currentIndex = 0;
//     }

//     var sliderPosition = currentIndex * (-389)+"px";
//     $(".slideList").animate({top: sliderPosition}, 400);

// },3000);

// 이미지 슬라이드 (좌우)
var currentIndex = 0;

setInterval(function () {
    if (currentIndex < 2) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }

    var slidePosition = currentIndex * (-1000) + "px";
    $(".slideList").animate({ left: slidePosition }, 400);

}, 3000);

// 탭 메뉴
 
var tabBtn = $(".tab-btn > ul > li");
var tabCont = $(".tab-cont > div");

tabCont.hide().eq(0).show(); // tabcont에 전부 숨겨놓고 0번쨰 박스만 보여주라는 뜻\

tabBtn.click(function(event) {
    event.preventDefault();
    var target = $(this);
    var index = target.index();
    // console.log(index)
    tabBtn.removeClass("active"); //앞에 class가 붙어서 경로설정에 .을 쓸 필요 없다.
    target.addClass("active");

    tabCont.css("display", "none");
    tabCont.eq(index).css("display", "block");
});

//레이어 팝업
$("#content1 .right").click(function(){
    $(".layer").show(300);
    $(".layer_bg").show();
});
$(".layer .close").click(function(){
    $(".layer").hide(300);
    $(".layer_bg").hide();
});