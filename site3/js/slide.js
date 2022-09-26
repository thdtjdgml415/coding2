var swiper = new Swiper(".mySwiper", {
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    autoplay: {
        delay: 1000,
        disableOnInteraction:false,
    },
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
    },
});

const btnstop = document.querySelector(".swiper-button-stop");   //슬라이더 정지
const btnstart = document.querySelector(".swiper-button-play");     //슬라이더 시작 

btnstart.style.display = "none";

document.querySelector(".swiper-button-stop").addEventListener("click", () => { //슬라이더 스탑버튼 클릭시 재생버튼이 나옴
    swiper.autoplay.stop();
    btnstart.style.display = "block";
    btnstop.style.display = "none";
});
document.querySelector(".swiper-button-play").addEventListener("click", () => { //슬라이더 재생버튼 클릭시 정지버튼이 나타난다
    swiper.autoplay.start();
    btnstart.style.display = "none";
    btnstop.style.display = "block";
});