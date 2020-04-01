let words =[]
const levels = {
 easy: 5,
 medium: 3,
 hard: 2
};
let currentLevel = levels.easy;
let time =currentLevel;
let score=0;
let isPlaying=false;

const wordInput = document.querySelector('#inputWord');
const currentWord = document.querySelector('#currentWord');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');
const progress_bar = document.querySelector('#progress-bar-id');
const levelDis = document.querySelector("#levelDisp");
const buttonDiv = document.querySelector('#buttonDiv');
const game = document.querySelector('#game');
const gameOver = document.querySelector('#gameOver')
const finalScore =document.querySelector('#finalScore');
const finish = document.querySelector('#finish')
const resultTable = document.querySelector('#resultTable')
const formerror  = document.querySelector('#formerror')

function fetchWords(){
 let xmlhttp = new XMLHttpRequest();
 xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
      words = JSON.parse(this.responseText);
      init()
      buttonDiv.style.display="none";
      game.style.display = "block";
      
  }
};

 xmlhttp.open("GET","serveWords.php",true)
 xmlhttp.send()
 
}

function init(){
 seconds.innerHTML = currentLevel;
 levelDis.innerHTML="Level: Easy";
 showWord(words);

wordInput.addEventListener('input', startMatch);
time = time+2
setInterval(countdown, 1000);
setInterval(checkStatus, 50);
}

function startMatch() {
 if (wordInput.value === currentWord.innerHTML) {
      message.classList.remove('text-danger');
      message.classList.remove('display-4');
      message.innerHTML = 'Correct!!!';
      isPlaying = true;
      wordInput.value = '';
      score++;
      check_progress();
      scoreDisplay.innerHTML=score;
      if(score===16)
      { seconds.innerHTML = levels.medium
        currentLevel=levels.medium;
        levelDis.innerHTML="Level: Medium"
      }
      if(score===31)
      { levelDis.innerHTML="Level: Hard"
        currentLevel=levels.hard;
        seconds.innerHTML = levels.hard
      }
      time = currentLevel;
      showWord(words);
 }
 else{
  message.innerHTML = '';
 }

}

function check_progress(){
  width=""
  if(score<50 && score>30){

    num=(score-30)/20*100;
    progress_bar.classList.add("bg-danger")
  }
  if(score<30 && score>15){

    num=(score-15)/15*100;
    progress_bar.classList.add("bg-success")
  }
  if(score<15){
    num=score/15*100;
    progress_bar.classList.remove("bg-success")
  }
  
  width=""+num+"%"
  progress_bar.style.width=width;
}
let i=0
function showWord(words) {

//  const randIndex = Math.floor(Math.random() * words.length);
 if(i<50){
  currentWord.innerHTML = words[i];
  i++;
 }
 else{
   message.innerHTML="Game Completed"
   game.style.display='none';
   gameOver.style.display='block';
   finalScore.innerHTML=score
 }


}


function countdown() {
 
 if (time > 0) {
   time--;
 } else if (time === 0) {
   isPlaying = false;
 }
 timeDisplay.innerHTML = time;
}


function checkStatus() {
 if (!isPlaying && time === 0) {
   message.innerHTML = 'Game Over!!!';
   message.classList.add("text-danger")
   message.classList.add("display-4")
   game.style.display='none';
   wordInput.value = '';
   gameOver.style.display='block';
   finalScore.innerHTML=score
 }
}

function gameRestart(){
  wordInput.value = '';
  location.reload();

}

function formSave(){
  let emaill = document.querySelector('#email').value
  let name = document.querySelector('#userName').value
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emaill))
  {let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          
          resultTable.innerHTML=this.responseText
          finish.style.display="block";
  
      }
  };
  if(emaill !== '' && name !==''){
  xmlhttp.open("POST", "submit.php", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");  
  xmlhttp.send("email="+emaill+"&name="+name+"&score="+score); 
  }
    
  }
  else{
    formerror.innerHTML = 'Wrong Email Format'
  }
  }