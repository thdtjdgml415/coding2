// 헤더 2단메뉴
$(".nav>ul>li").hover(
    function(){
        $(this).find(".submenu").stop().slideDown();
}, function(){
    $(this).find(".submenu").stop().slideUp();
})


// 슬라이드 상하
$(".slide__list").children("div:gt(0)").hide();

let currentIndex = 0;
let slideCount = $(".slide__img .slider").length;
setInterval(function(){
        let nextIndex = (currentIndex + 1) % slideCount;
    
        $(".slide__list").find("div").eq(currentIndex).fadeOut();
        $(".slide__list").find("div").eq(nextIndex).fadeIn();
    
        currentIndex = nextIndex;

},1000);
