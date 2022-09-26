
const sliderWrap = document.querySelector(".slider__wrap");
const sliderImg = sliderWrap.querySelector(".slider__img");
const slider = sliderWrap.querySelectorAll(".slider");

let currentIndex = 0; //현재 보이는 이미지
let sliderCount = slider.length; //이미지 갯수

setInterval(() => {  
    let nextIndex = (currentIndex + 1) % sliderCount; //다음 이미지
    //1,2,3,4,0,1,2,3,4,....
   
    slider[currentIndex].style.opacity = "0";   //첫번째 이미지를 안보이게
    slider[nextIndex].style.opacity = "1";   //두번째 이미지를 보이게

    currentIndex++;
    
    currentIndex = nextIndex;
    // slider[currentIndex].style.opacity = "0";   //두번째 이미지를 안보이게
    // slider[2].style.opacity = "1";   //세번째 이미지를 보이게

    // slider[currentIndex].style.opacity = "0";   //세번째 이미지를 안보이게
    // slider[3].style.opacity = "1";   //네번째 이미지를 보이게

    // slider[currentIndex].style.opacity = "0";   //네번째 이미지를 안보이게
    // slider[4].style.opacity = "1";   //다섯번째 이미지를 보이게

    // slider[4].style.opacity = "0";   //다섯째 이미지를 안보이게
    // slider[0].style.opacity = "1";   //첫째 이미지를 보이게
},3000);
