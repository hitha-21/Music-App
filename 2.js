const body = document.body;

const disk = document.querySelector(".disk");

const title = document.querySelector(".info h1");

const subtitle = document.querySelector(".info p");

const progress = document.querySelector(".progress");

const glow = document.querySelector(".mouse-glow");

const playBtn = document.querySelector(".play");

const nextBtn = document.querySelector(".next");

const prevBtn = document.querySelector(".prev");

const audio = document.getElementById("audio");

const clock = document.getElementById("clock");

const lyric = document.getElementById("lyric");

const progressContainer =
document.querySelector(".progress-container");

/* SONGS */

const songs = [

{
  title:"Can't Tell Me Nothing",

  artist:"Kanye West",

  image:"images/kanye.jpg",

  audio:"Songs/kanye_west (1).mp3",

  lyrics:[

    {time:0,text:"La la la la wait till I get my money right"},

    {time:8,text:"I had a dream I could buy my way to heaven"},

    {time:13,text:"When I awoke I spent that on a necklace"},

    {time:18,text:"I told God I'll be back in a second"},

    {time:24,text:"Man it's so hard not to act reckless"},

    {time:30,text:"To whom much is given much is tested"},

    {time:36,text:"Get arrested guess until he get the message"},

    {time:42,text:"I feel the pressure under more scrutiny"},

    {time:48,text:"And what I do? Act more stupidly"},

    {time:54,text:"Bought more jewelry more Louis V"},

    {time:60,text:"My mama couldn't get through to me"},

    {time:66,text:"The drama people suing me"}

  ]

},

{
  title:"Reflections",

  artist:"The Neighbourhood",

  image:"images/reflections.jpg",

  audio:"Songs/reflections (1).mp3",

  lyrics:[

    {time:0,text:"You are my reflection"},

    {time:8,text:"Everything I see is you"},

    {time:15,text:"Dark nights and faded lights"},

    {time:23,text:"Lost inside this empty room"},

    {time:30,text:"Tell me what you're thinking now"},

    {time:38,text:"Can you hear the silence too"},

    {time:46,text:"I keep staring at reflections"},

    {time:54,text:"Trying to find the truth"}

  ]

},

{
  title:"We Don't Talk Anymore",

  artist:"Charlie Puth",

  image:"images/charlie.jpg",

  audio:"Songs/charlie (1).mp3",

  lyrics:[

    {time:0,text:"We don't talk anymore"},

    {time:7,text:"Like we used to do"},

    {time:14,text:"We don't laugh anymore"},

    {time:21,text:"What was all of it for?"},

    {time:28,text:"Oh we don't talk anymore"},

    {time:35,text:"Like we used to do"},

    {time:42,text:"I just heard you found the one"},

    {time:50,text:"You've been looking for"}

  ]

},

{
  title:"Calma Remix",

  artist:"Pedro Capó & Farruko",

  image:"images/calma.jpg",

  audio:"Songs/calma (1).mp3",

  lyrics:[

    {time:0,text:"Calma, mi vida, con calma"},

    {time:8,text:"Que nada hace falta si estamos juntitos andando"},

    {time:16,text:"Calma, mi vida, con calma"},

    {time:24,text:"Que nada hace falta si estamos juntitos bailando"},

    {time:32,text:"Vamos pa' la playa"},

    {time:38,text:"Pa' curarte el alma"},

    {time:44,text:"Cierra la pantalla"},

    {time:50,text:"Abre la medalla"}

  ]

},

{
  title:"Sadderdaze",

  artist:"The Neighbourhood",

  image:"images/sad.jpg",

  audio:"Songs/sad (1).mp3",

  lyrics:[

    {time:0,text:"I'm swimming in my thoughts again"},

    {time:9,text:"And it feels like drowning slowly"},

    {time:17,text:"Dark clouds inside my head tonight"},

    {time:25,text:"Everything feels lonely"},

    {time:33,text:"Maybe I'm just sadderdaze"},

    {time:41,text:"Lost inside this haze"},

    {time:49,text:"Trying to escape myself"},

    {time:57,text:"But I always stay"}

  ]

}

];

/* STATE */

let currentSong = 0;

let isPlaying = false;

/* LOAD SONG */

function loadSong(index){

  const song = songs[index];

  title.innerHTML = song.title;

  subtitle.innerHTML = song.artist;

  lyric.innerHTML =
  "Loading lyrics...";

  disk.style.background =
  `url(${song.image}) center/cover`;

  audio.src = song.audio;

  /* AUTO COLOR THEME */

  const img = new Image();

  img.src = song.image;

  img.onload = function(){

    const canvas =
    document.createElement("canvas");

    const ctx =
    canvas.getContext("2d");

    canvas.width = img.width;

    canvas.height = img.height;

    ctx.drawImage(
      img,
      0,
      0
    );

    const data =
    ctx.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    ).data;

    let r = 0;
    let g = 0;
    let b = 0;
    let count = 0;

    for(let i = 0; i < data.length; i += 40){

      r += data[i];

      g += data[i + 1];

      b += data[i + 2];

      count++;
    }

    r = Math.floor(r / count);

    g = Math.floor(g / count);

    b = Math.floor(b / count);

    const rgb =
    `rgb(${r}, ${g}, ${b})`;

    body.style.background =
    `
    radial-gradient(
      circle at center,
      ${rgb},
      #000000 70%
    )
    `;

    glow.style.background =
    `
    radial-gradient(
      circle,
      ${rgb},
      transparent 70%
    )
    `;

    progress.style.background =
    `
    linear-gradient(
      90deg,
      ${rgb},
      white
    )
    `;

    disk.style.boxShadow =
    `
    0 0 60px ${rgb}
    `;

  };

}

/* PLAY */

function playSong(){

  isPlaying = true;

  playBtn.innerHTML = "⏸";

  disk.style.animationPlayState =
  "running";

  audio.play();

}

/* PAUSE */

function pauseSong(){

  isPlaying = false;

  playBtn.innerHTML = "▶";

  disk.style.animationPlayState =
  "paused";

  audio.pause();

}

/* NEXT SONG */

function nextSong(){

  currentSong++;

  if(currentSong >= songs.length){

    currentSong = 0;
  }

  animateSongChange();

  loadSong(currentSong);

  playSong();

}

/* PREVIOUS SONG */

function prevSong(){

  currentSong--;

  if(currentSong < 0){

    currentSong = songs.length - 1;
  }

  animateSongChange();

  loadSong(currentSong);

  playSong();

}

/* PLAY BUTTON */

playBtn.addEventListener("click",()=>{

  if(isPlaying){

    pauseSong();

  }else{

    playSong();
  }

});

/* NEXT BUTTON */

nextBtn.addEventListener(
  "click",
  nextSong
);

/* PREVIOUS BUTTON */

prevBtn.addEventListener(
  "click",
  prevSong
);

/* REAL PROGRESS BAR */

audio.addEventListener(
  "timeupdate",
  ()=>{

  const progressPercent =
  (audio.currentTime /
  audio.duration) * 100;

  progress.style.width =
  progressPercent + "%";

});

/* SYNC LYRICS */

let currentLyricIndex = -1;

audio.addEventListener("timeupdate",()=>{

  const currentTime =
  audio.currentTime;

  const lyrics =
  songs[currentSong].lyrics;

  if(!lyrics) return;

  for(let i = 0; i < lyrics.length; i++){

    const nextLyric =
    lyrics[i + 1];

    if(

      currentTime >= lyrics[i].time &&

      (
        !nextLyric ||
        currentTime < nextLyric.time
      ) &&

      currentLyricIndex !== i

    ){

      currentLyricIndex = i;

      lyric.style.opacity = "0";

      lyric.style.transform =
      "translateY(15px)";

      setTimeout(()=>{

        lyric.innerHTML =
        lyrics[i].text;

        lyric.style.opacity = "1";

        lyric.style.transform =
        "translateY(0px)";

      },180);

    }

  }

});

/* CLICK TO SEEK */

progressContainer.addEventListener(
  "click",
  (e)=>{

  const width =
  progressContainer.clientWidth;

  const clickX = e.offsetX;

  const duration =
  audio.duration;

  audio.currentTime =
  (clickX / width) * duration;

});

/* AUTO NEXT */

audio.addEventListener(
  "ended",
  ()=>{

  nextSong();

});

/* KEYBOARD CONTROLS */

document.addEventListener(
  "keydown",
  (e)=>{

  if(e.code === "Space"){

    e.preventDefault();

    if(isPlaying){

      pauseSong();

    }else{

      playSong();
    }

  }

  if(e.code === "ArrowRight"){

    nextSong();

  }

  if(e.code === "ArrowLeft"){

    prevSong();

  }

});

/* SONG TRANSITION */

function animateSongChange(){

  title.style.opacity = "0";

  subtitle.style.opacity = "0";

  title.style.transform =
  "translateY(10px)";

  subtitle.style.transform =
  "translateY(10px)";

  setTimeout(()=>{

    title.style.opacity = "1";

    subtitle.style.opacity = "1";

    title.style.transform =
    "translateY(0px)";

    subtitle.style.transform =
    "translateY(0px)";

  },200);

}

/* CLOCK */

setInterval(()=>{

  const now = new Date();

  clock.innerHTML =
  now.toLocaleTimeString([],{
    hour:'2-digit',
    minute:'2-digit'
  });

},1000);

/* MOUSE GLOW */

document.addEventListener(
  "mousemove",
  (e)=>{

  glow.style.transform =
  `translate(
    ${e.clientX - 250}px,
    ${e.clientY - 250}px
  )`;

});

/* START */

loadSong(currentSong);