const allMusic = [
    {
        name : "Kazoom",
        artist : "Quincas Moreira",
        img : "musicbg01",
        audio: "Music_audio01"
    },
    {
        name : "Average",
        artist : "Patrick Patrikios",
        img : "musicbg02",
        audio: "Music_audio02"
    },
    {
        name : "Average",
        artist : "Patrick Patrikios",
        img : "musicbg03",
        audio: "music-3"
    },
    {
        name : "Average",
        artist : "Patrick Patrikios",
        img : "musicbg04",
        audio: "music-4"
    },
    {
        name : "Average",
        artist : "Patrick Patrikios",
        img : "musicbg05",
        audio: "music-5"
    },
    {
        name : "Average",
        artist : "Patrick Patrikios",
        img : "musicbg06",
        audio: "music-6"
    },
    {
        name : "Average",
        artist : "Patrick Patrikios",
        img : "musicbg07",
        audio: "music-7"
    },
    {
        name : "Average",
        artist : "Patrick Patrikios",
        img : "musicbg08",
        audio: "music-8"
    },
    {
        name : "Average",
        artist : "Patrick Patrikios",
        img : "musicbg09",
        audio: "music-9"
    },
    {
        name : "Average",
        artist : "Patrick Patrikios",
        img : "musicbg10",
        audio: "music-10"
    },
]

const musicWrap = document.querySelector(".music__wrap");
const musicView = document.querySelector(".music__view .img img");
const musicName = document.querySelector(".music__view .title h3");
const musicArtist = document.querySelector(".music__view .title p");
const musicAudio = document.querySelector("#main-audio");
const musicPlay = document.querySelector("#control-play");
const musicPrevBtn = document.querySelector("#control-prev");
const musicNextBtn = document.querySelector("#control-next");

let musicIndex = 1;

//음악 재생
function loadMusic(num) {
    musicName.innerText = allMusic[num].name;
    musicArtist.innerText = allMusic[num].artist;
    musicView.src = `../../assets/img/${allMusic[1].img}.png`
    musicView.alt = allMusic(num-1);
    musicAudio.src = `../../assets/audio/${allMusic[num-1].audio}.mp3`
}
musicAudio.play();
// 재생버튼
function playMusic (){
    musicAudio.play();
}

//정지버튼
function pauseMusic () {

}

//이전 곡 듣기 버튼
function prevMusic () {

}
//다음 곡 듣기 버튼
function nextMusic () {

}

window.addEventListener("load", () => {
    loadMusic(musicIndex);
})


//플레이버튼
musicPlay.addEventListener("click", () => {
    playMusic();
})