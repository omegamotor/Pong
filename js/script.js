const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 500;

//parametry boiska
const cw = canvas.width;
const ch = canvas.height;

//wielkość piłki
const ballSize= 20; 
let ballX =  cw/2-ballSize/2;
let ballY =  ch/2-ballSize/2;

//Wymiary paletek
const paddleH = 100;
const paddleW = 20;

//Odległość gracza i AI od początku 
const playerX = 70;
const AI_X = 910;

//odległości paletek od boków boiska
let playerY = 200;
let AI_Y = 200;

//linia na środku
const lineW = 6;
const lineH = 16;

let ballSpeedX = -1.5;
let ballSpeedY = .1;

let pktP = 0;
let pktIA = 0;

let round = 1;
let roundNow = 1;

var BR = 0;

//rysuj gracza
function player()
{
    ctx.fillStyle = '#5286a7';
    ctx.fillRect(playerX,playerY,paddleW,paddleH);
    
}

//rysuj AI
function AI()
{
    ctx.fillStyle = 'gray';
    ctx.fillRect(AI_X,AI_Y,paddleW,paddleH);
}

//rysuj piłkę
function ball()
{
    ctx.fillStyle = 'white';
    ctx.fillRect(ballX,ballY,ballSize,ballSize);
    
    ballX+= ballSpeedX;
    ballY+= ballSpeedY;
    
    //Odbicia piłki od grnicy canvasa
    if (ballY <=0 || ballY + ballSize >= ch)
    {
        ballSpeedY = -ballSpeedY;
            speedUp();
    } 
    
    
    
    // Odbicie od ramek
    else if (ballX<=0 || ballX + ballSize >=cw)
    {
        ballSpeedX = -ballSpeedX;
        //console.log("Test");
        speedUp();
    } 

    
    //ODbicie od "Bramki" wyłączone na razie  ballX + ballSize >= cw) 
    //Odbicie od paletki przez gracza
    if(ballX <= playerX + paddleW && ballX >= playerX - paddleW)
    {
       console.log("działa x");
       
        
        
        
        if(ballY - ballSize <= playerY && ballY - ballSize){

            console.log("działa góra");
            ballSpeedY = - ballSpeedY;
           
        }

        
        
    else if(ballY >= playerY-ballSize && ballY <= playerY + paddleH+ballSize)
       {
        ballSpeedX = - ballSpeedX;
       speedUp();
           //console.log("działa Y");
       }   
   }
    
    
    
    
    
    
    
    
    //Odbicie od paletki przez AI
    else if(ballX+ballSize >= AI_X && ballX <= AI_X+paddleW){
       // console.log("działa");
        if(ballY+ballSize >= AI_Y && ballY <= AI_Y + paddleH ){
            ballSpeedX = - ballSpeedX;
            speedUp();
            }     
    } 

}



//Liczenie punktów
function pkt(){
    
    //AI pkt ++
    if(ballX <= 0) //+ paddleW
      {
        //console.log("Punkt Dla AI");
          round++;
          BR=1;
    }
    else if(ballX+ballSize >= cw){
        
       // console.log("Punkt Dla Gracza");
        round++;
        BR=1;
        //continue;
    }

}

//stół
function table(){
    //kolor tła czarny z automatu
    ctx.fillStyle = 'black';
    //rysój kwadrat
    ctx.fillRect(0,0,cw,ch);
    //Linie na środku
    
    for(let linePosition = 20; linePosition < ch;linePosition += 30)
    {
        ctx.fillStyle = 'gray';
        ctx.fillRect(cw/2-lineW/2,linePosition,lineW,lineH);
    }
}



//jak daleko od początku przeglądarki jest okno canvas
topCanvas = canvas.offsetTop;


function playerPosition(e){
    
    //console.log("Pozycja Myszki to "+ (e.clientY - topCanvas));
    let mouseY=e.clientY- topCanvas - paddleH/2;
    playerY = mouseY;
    
    
    if(mouseY<=0){
        playerY = 0;  
    }
    if(mouseY >=ch-paddleH){
        
        playerY = ch-paddleH;
    }
    
    AI_Y = playerY;
    
}

//Sztuczna inteligencja


function aiPosition(){
    
    //środek rakiety
    var middlePaddel = AI_Y + paddleH/2;
    var middleBoll = ballY + ballSize / 2;
    
    if(ballX>=500)
    {
        
        if(middlePaddel-middleBoll > 200)
        {
            AI_Y -= 15;
        }
        else if(middlePaddel-middleBoll > 50)
        {
            AI_Y -= 5;
        } 
        else if(middlePaddel-middleBoll < -200)
        {
            AI_Y += 15;
        }
        else if(middlePaddel-middleBoll < -50)
        {
            AI_Y += 5;
        }
        
    }
    else if(ballX < 500 && ballX > 150)
    {
        
        if(middlePaddel-middleBoll > 100)
        {
            
            AI_Y-=3;
        }
        else if(middlePaddel-middleBoll > -100)
        AI_Y+=3;
    }
}




function speedUp()
{
    if(ballSpeedX>0 && ballSpeedX<16)
    {
        ballSpeedX+=1;
    }
    else if(ballSpeedX<0 && ballSpeedX>-16)
    {
        ballSpeedX-=1;
    } 
    //prędkość y
    if(ballSpeedY>0 && ballSpeedY<16)
    {
        ballSpeedY+=0.2;
    }
    else if(ballSpeedY<0 && ballSpeedY>-16)
    {
        ballSpeedY-=0.2;
    }  
    
}





canvas.addEventListener('mousemove', playerPosition)//na ruch myszy wywołaj funkcję player position i zmień pozycję paletki




function ballRun(){
   
    ballSpeedX = Math.random()*2.5-Math.random()*2.5;
    ballSpeedY = Math.random()*2.5-Math.random()*2.5;
    BR=0;
}



function ballSlow(){
    
    
    ballSpeedX=1;
    ballSpeedY=1;
}


function game(){
        table();
        // Kod restartu
        
        
        player();
        AI();
        //aiPosition();
        pkt();
    //if(BR===0){
        ball();
    canvas.addEventListener("mousedown",ballSlow);
    //}
   // else if(BR===1){
        //ballX =  cw/2-ballSize/2;
         //ballY =  ch/2-ballSize/2;
         //canvas.addEventListener("mousedown",ballRun);
        //console.log("działa");
        
        
    }
    

    setInterval(game,1000/90)





