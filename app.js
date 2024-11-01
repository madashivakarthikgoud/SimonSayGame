let gameSeq=[];
let userSeq=[];

let started=false;
let level=0;

let btns=["yellow","red","green","purple"];

let h2=document.querySelector("h2");

document.addEventListener("keypress",function(){
    if(started==false){
        console.log("Game is Started");
        started=true;
    }

    levelUp();
});

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(() => {
        btn.classList.remove("userFlash");
    }, 250);
}

function levelUp(){
    userSeq=[];
    level++;
    h2.innerText=`level${level}`;

    let ranIdx=Math.floor(Math.random()*3);
    let ranColor=btns[ranIdx];
    let ranBtn=document.querySelector(`.${ranColor}`);
    // console.log(ranIdx);
    // console.log(ranColor);
    // console.log(ranBtn);
    gameSeq.push(ranColor);
    console.log(gameSeq);
    gameFlash(ranBtn);
}

function checkAns(idx){

    if(gameSeq[idx]===userSeq[idx]){
        if(userSeq.length===gameSeq.length){
           setTimeout(levelUp,1000);
        }
    }
    else{
        h2.innerHTML=`GameOver! Your Score was<b> ${level}</b> <br>Press any key to start.`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },150);
        reset();
    }
}

function btnPress(){
    let btn=this;   
    userFlash(btn);

    userColor=btn.getAttribute("id")
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress); 
}

function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}