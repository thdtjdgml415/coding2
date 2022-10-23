const allMusic = [
  {
    name: "Kazoom",
    artist: "Quincas Moreira",
    img: "musicbg01",
    audio: "Music_audio01",
  },
  {
    name: "Sharp Edges",
    artist: "half.cool",
    img: "musicbg02",
    audio: "Music_audio02",
  },
  {
    name: "Tinker Time",
    artist: "Nathan Moore",
    img: "musicbg03",
    audio: "Music_audio03",
  },
  {
    name: "Yes and No at the Same Time",
    artist: "half.cool",
    img: "musicbg04",
    audio: "Music_audio04",
  },
  {
    name: "Will 2 Pwr",
    artist: "half.cool ",
    img: "musicbg05",
    audio: "Music_audio05",
  },
  {
    name: "Housin",
    artist: "Yung Logos",
    img: "musicbg06",
    audio: "Music_audio06",
  },
  {
    name: "Good Days",
    artist: "Yung Logos",
    img: "musicbg07",
    audio: "Music_audio07",
  },
  {
    name: "Who Do You Think I Think You Are?",
    artist: "Mini Vandals",
    img: "musicbg08",
    audio: "Music_audio08",
  },
  {
    name: "Till I Let Go (Instrumental)",
    artist: "NEFFEX",
    img: "musicbg09",
    audio: "Music_audio09",
  },

];

const musicWrap = document.querySelector('.music__wrap');
const musicView = musicWrap.querySelector('.music__view .img img');
const musicName = musicWrap.querySelector('.music__view .title h3');
const musicArtist = musicWrap.querySelector('.music__view .title p');
const musicWindow = musicWrap.querySelector('.music__inner'); //뮤직 전체 창
const musicAudio = musicWrap.querySelector('#main-audio'); // 음악
const musicPlay = musicWrap.querySelector('#control-play'); // 재생 버튼
const musicPrevBtn = musicWrap.querySelector('#control-prev'); // 이전 버튼
const musicNextBtn = musicWrap.querySelector('#control-next'); // 다음 버튼
const musicProgress = musicWrap.querySelector('.progress'); // 뮤직 프로그래스
const musicProgressBar = musicWrap.querySelector('.progress .bar'); // 진행 바
const musicProgressCurrent = musicWrap.querySelector('.progress .timer .current');
const musicProgressDuration = musicWrap.querySelector('.progress .timer .duration');
const musicRepeat = musicWrap.querySelector('#control-repeat'); // 뮤직 전체 반복 재생
const musicListBtn = musicWrap.querySelector('#control-list'); // 뮤직 리스트
const musicList = musicWrap.querySelector('.music__list'); // 뮤직 리스트
const musicListUl = musicWrap.querySelector('.music__list ul'); // 뮤직 리스트
const closeList = musicWrap.querySelector(".closeList"); //리스트 닫기 버튼

// console.log(musicAudio);
let musicIndex = 1; // 현재 노래 인덱스 값
// 음악 재생
function loadMusic(num) {
    musicName.innerText = allMusic[num - 1].name; // 노래 제목
    musicArtist.innerText = allMusic[num - 1].artist; // 노래 아티스트
    musicView.src = `../../assets/img/${allMusic[num - 1].img}.png`; // 노래 이미지
    musicView.alt = allMusic[num - 1].name; // 노래 이미지 alt
    musicAudio.src = `../../assets/audio/${allMusic[num - 1].audio}.mp3`; // 노래
}
// 재생 버튼
function playMusic() {
    musicWrap.classList.add('paused');
    musicPlay.setAttribute('title', '정지');
    musicPlay.setAttribute('class', 'stop');
    musicAudio.play();
}
// 정지 버튼
function pauseMusic() {
    musicWrap.classList.remove('paused');
    musicPlay.setAttribute('title', '재생');
    musicPlay.setAttribute('class', 'play');
    musicAudio.pause();
}
// 이전 곡 듣기 버튼
function prevMusic() {
    musicIndex == 1 ? (musicIndex = allMusic.length) : musicIndex--;
    loadMusic(musicIndex);
    playMusic();
    playListMusic();
}
// 다음 곡 듣기 버튼
function nextMusic() {
    musicIndex == allMusic.length ? (musicIndex = 1) : musicIndex++;
    loadMusic(musicIndex);
    playMusic();
    playListMusic();
}
// 뮤직 진행바
musicAudio.addEventListener('timeupdate', (e) => {
    // console.log(e)
    const currentTime = e.target.currentTime; //현재 재생되는 시간
    const duration = e.target.duration; //오디오의 총 길이
    let progressWidth = (currentTime / duration) * 100; //전체 길에이서 현재 진행되는 시간을 백분위로 나눔
    musicProgressBar.style.width = `${progressWidth}%`;
    
    // 전체시간
    musicAudio.addEventListener('loadeddata', () => {
        let audioDuration = musicAudio.duration;
        let totalMin = Math.floor(audioDuration / 60); //전체 시간(초)을 분단위로 쪼갬
        let totalSec = Math.floor(audioDuration % 60); //남은 초를 저장
        if (totalSec < 10) totalSec = `0${totalSec}`; //초가 한 자릿수 일때 앞에 0을 붙임
        musicProgressDuration.innerText = `${totalMin}:${totalSec}`; //완성된 시간 문자열을 출력
    });

    // 진행시간
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if (currentSec < 10) currentSec = `0${currentSec}`;
    musicProgressCurrent.innerText = `${currentMin}:${currentSec}`;
});

// 진행버튼 클릭
musicProgress.addEventListener('click', (e) => {
    let progressWidth = musicProgress.clientWidth; // 진행바 전체 길이
    let clickedOffsetX = e.offsetX; // 진행바 기준으로 측정되는 X값 좌표
    let songDuration = musicAudio.duration; // 오디오 전체 길이
    musicAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration; // 백분위로 나눈 숫자에 다시 전체 길이를 곱하여 현재 재생값으로 바꾼다.
});

// 반복 버튼 클릭
musicRepeat.addEventListener('click', () => {
    let getAttr = musicRepeat.getAttribute('class');
    switch (getAttr) {
        case 'repeat':
            musicRepeat.setAttribute('class', 'repeat_one');
            musicRepeat.setAttribute('title', '한곡 반복');
            break;
        case 'repeat_one':
            musicRepeat.setAttribute('class', 'shuffle');
            musicRepeat.setAttribute('title', '랜덤 재생');
            break;
        case 'shuffle':
            musicRepeat.setAttribute('class', 'repeat');
            musicRepeat.setAttribute('title', '전체 반복');
            break;
    }
});
// 오디오가 끝날 때 설정
musicAudio.addEventListener('ended', () => {
    let getAttr = musicRepeat.getAttribute('class');
    switch (getAttr) {
        case 'repeat':
            nextMusic();
            break;
        case 'repeat_one':
            playMusic();
            break;
        case 'shuffle':
            let randomIndex = Math.floor(Math.random() * allMusic.length + 1); // 랜덤 인덱스 생성
            do {
                randomIndex = Math.floor(Math.random() * allMusic.length + 1);
            } while (musicIndex == randomIndex);
            musicIndex = randomIndex; // 현재 인덱스를 랜덤 인데스로 변경
            loadMusic(musicIndex); // 랜덤 인덱스가 반영된 현재 인덱스 값으로 음악을 다시 로드
            playMusic(); // 로드한 음악을 재생
            break;
        default:
            break;
    }
    playListMusic();
});
// 뮤직 리스트 버튼
musicListBtn.addEventListener('click', () => {
    musicList.classList.toggle('show');
});
//리스트 닫기 버튼
closeList.addEventListener('click', () => {
    musicList.classList.remove('show')
})

// 플레이 버튼 클릭
musicPlay.addEventListener('click', () => {
    const isMusicPaused = musicWrap.classList.contains('paused'); //음악이 재생중
    isMusicPaused ? pauseMusic() : playMusic();
});
// 이전곡 버튼 클릭
musicPrevBtn.addEventListener('click', () => {
    prevMusic();
});
// 다음곡 버튼 클릭
musicNextBtn.addEventListener('click', () => {
    nextMusic();
});

// 뮤직 리스트 구현
for (let i = 0; i < allMusic.length; i++) {
    let li = `
    <li data-index="${i + 1}">
        <strong>${allMusic[i].name}</strong>
        <em>${allMusic[i].artist}</em>
        <audio class="${allMusic[i].audio}" src="../../assets/audio/${allMusic[i].audio}.mp3"></audio>
        <span class="audio-duration" id="${allMusic[i].audio}">재생시간</span>
    </li>
    `;
    // 
    // musicListUl.innerHTML += li; li를 한번에 추가 시켜 값을 검색할 수 없었음. (한번에 로딩이 되어 아이디와 클래스 값을 하나밖에 인식 못함)
    musicListUl.insertAdjacentHTML('beforeend', li); // ul 자식으로 (마지막 자리에) 하나씩 차곡차곡 쌓아준다.
    // 리스트 음악시간 불러오기
    let liAudioDuration = musicListUl.querySelector(`#${allMusic[i].audio}`); // 리스트에서 시간을 표시할 선택자를 가져온다.
    let liAudio = musicListUl.querySelector(`.${allMusic[i].audio}`);
    liAudio.addEventListener('loadeddata', () => {
        let audioDuration = liAudio.duration; // 오디오 전체 길이
        let totalMin = Math.floor(audioDuration / 60); // 전체 길이를 분 단위로 쪼갠다.
        let totalSec = Math.floor(audioDuration % 60); // 초 계산
        if (totalSec < 10) totalSec = `0${totalSec}`; // 앞자리에 0 추가
        liAudioDuration.innerText = `${totalMin}:${totalSec}`; // 문자열 출력
        liAudioDuration.setAttribute('data-duration', `${totalMin}:${totalSec}`); // 속성에 오디오 길이 기록
    });
}
// 뮤직 리스트 클릭 시 클릭한 노래 재생
function playListMusic() {
    const musicListAll = musicListUl.querySelectorAll('li'); //뮤직 리스트 목록
    for (let i = 0; i < musicListAll.length; i++) {
        let audioTag = musicListAll[i].querySelector('.audio-duration');
        if (musicListAll[i].classList.contains('playing')) {
            musicListAll[i].classList.remove('playing'); // playing 클래스가 존재할 시 삭제
            let adDuration = audioTag.getAttribute('data-duration'); // 오디오 길이 값을 가져온다.
            audioTag.innerText = adDuration; // 가져온 오디오 길이 값을 audioTag 에 텍스트로 넣어준다.
        }
        // 현재 뮤직인덱스와 리스트 인덱스 값이 같을 때
        if (musicListAll[i].getAttribute('data-index') == musicIndex) {
            musicListAll[i].classList.add('playing'); // 클래스 playing 추가
            audioTag.innerText = '재생중'; // 재생중일 경우 재생중 멘트 추가
        }
        musicListAll[i].setAttribute('onclick', 'clicked(this)');
    }
}
playListMusic();
// 뮤직 리스트를 클릭했을 때 발생
function clicked(el) {
    let getLiIndex = el.getAttribute('data-index'); //클릭한 리스트의 인덱스값을 저장
    musicIndex = getLiIndex; //클릭한 인덱스 값을 뮤직 인덱스 저장
    loadMusic(musicIndex); //해당 인덱스 뮤직 로드
    playMusic(); //음악 재생
    playListMusic(); //음악 리스트 업데이트
}
window.addEventListener('load', () => {
    loadMusic(musicIndex);
});

//볼륨 설정

const abjvolume = document.getElementById("volume_control");

abjvolume.addEventListener("change", (e)=>{
    musicAudio.volume = abjvolume.value/10;
    
})
//아이콘 클릭시 나오게 하기
const Icon1 = document.querySelector(".icon1");

Icon1.addEventListener("click", () => {
    musicWindow.classList.toggle('show')
})


