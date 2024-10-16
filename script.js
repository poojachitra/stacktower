let scoreout=document.getElementById('score');
let canvas=document.getElementById('canvas');
let gameover=document.getElementById('gameover');
let context=canvas.getContext("2d")
let scrollcounter,mode,xspeed,camery,current;
let n=0;
let yspeed=5;
let height=50;
let boxes=[]
let color=['violet','black','green']
boxes[0]={
    x:200,
    y:300,
    width:150
}
debris={
    x:0,
    width:0
}
function newbox(){
boxes[current]={
    x:0,
    y:(current + 10) * height,
    width:boxes[current-1].width
};

}
function isgameover(){
     mode='gameover'
    gameover.style.display='block';
   
}
function animate(){
    if(mode!='gameover'){
        context.clearRect(0,0,canvas.width,canvas.height)
        scoreout.innerHTML=current-1;
    for(let i=0;i<boxes.length;i++){
        let box=boxes[i]
        if(i%2==0){
         context.fillStyle='violet';
        }
        else{
            context.fillStyle='black'; 
        }
         
         context.fillRect(box.x,600-box.y+camery,box.width,height)
    }
    context.fillStyle='yellow'
    context.fillRect(debris.x,600-debris.y+camery,debris.width,height);

    if(mode=='bounce'){
        boxes[current].x=boxes[current].x+xspeed;
         if( xspeed>0 &&boxes[current].width+boxes[current].x>canvas.width){
            xspeed=-xspeed;
         }
         if( xspeed<0 && boxes[current].x<0){
            xspeed=-xspeed;
         }
        }
    if(mode=='down'){
        boxes[current].y=boxes[current].y-yspeed
        if(boxes[current].y==boxes[current-1].y+height){
            mode='bounce'
        let diff=boxes[current].x-boxes[current-1].x;
        if(Math.abs(diff)>=boxes[current].width){
            isgameover();
        }
        debris={
            y:boxes[current].y,
            width:diff
        };
       if(boxes[current].x>boxes[current-1].x && mode!='gameover'){
            boxes[current].width=boxes[current].width-diff;
            debris.x=boxes[current].x+boxes[current].width;
        }
        else{
            debris.x=boxes[current].x-diff;
            boxes[current].width=boxes[current].width+diff;
           boxes[current].x=boxes[current-1].x
        }
        if(xspeed>0){
            xspeed++;
        }
        else{
            xspeed--;
        }
        current++;
        scrollcounter=height;
        newbox()
    }}
    debris.y=debris.y-yspeed;
    if(scrollcounter){
        camery++;
        scrollcounter--;
    }
}
    window.requestAnimationFrame(animate)

}
function restart(){
 gameover.style.display='none';
boxes.splice(1,boxes.length-1)
scrollcounter=0;
mode='bounce';
current=1;
camery=0;
xspeed=2
newbox()
debris.y=0
}
canvas.onpointerdown=function(e){
    if(mode=='gameover'){
        restart()
    }
    else if(mode=='bounce'){
      mode='down';
    }
}
restart()
animate()
