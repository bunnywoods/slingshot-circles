
function setup() {
    createCanvas(windowWidth,windowHeight);
    background('white');
    num = 0;
    
    ballNumber = document.querySelector('#inputBallNumber').value; 
    balls = [];
    radius = 100;
}
 
class Ball {
    constructor(x,y,x2,y2,dx,dy,power,color){
        this.x = x; // 공이 발사되는 x
        this.y = y; // 공이 발사되는 y
        this.x2 = x2; // 드래그 시작점 x
        this.y2 = y2; // 드래그 시작점 y
        this.dx = dx; // 공이 이동하는 x 크기
        this.dy = dy; // 공이 이동하는 y 크기
        this.p = power; //마우스를 드래그한 길이, 공이 날라가는 힘(속도),
        this.c = color; // 공 색깔
    }
    
    update(){ // 공을 변화값만큼 이동
        this.x = this.x + this.dx;
        this.y = this.y + this.dy;
    }
    
    drawBall(){ // 프레임마다 변경된 위치로 공을 그려줌
        fill(this.c);
        stroke('white'); 
        strokeWeight(2);
        circle(this.x , this.y, radius);
    }
    
}
 
function draw(){ 
    fill("rgba(253,245,226,0.6)");
    rect(0, 0, canvas.width, canvas.height);
    
    stroke('white');
    strokeWeight(0);
    for (i =0; i < num; i++) {
        balls[i].update();
        fill(balls[i].c);
        circle(balls[i].x, balls[i].y, radius);
        
        if (balls[num-1].x+radius*2 < 0 || balls[num-1].x - radius*2 > canvas.width || balls[num-1].y + radius*2 < 0 || balls[num-1] - radius*2 > canvas.height) {
            return; // 마지막 공이 완전히 캔버스 밖으로 나가면 공 그리기 종료, 
        } 
    } 
}
 
function init(x,y){ // 공을 하나씩 생성하고 속성 부여
    p = sqrt(pow((x2-x),2) + pow((y2-y),2));
    radian = atan2((x2-x),(y2-y));
    dx = (p *sin(radian + ((random(20)-10)*PI/180))*0.05) ;
    dy = (p * cos(radian + ((random(20)-10)*PI/180))*0.05) ;
    c = 'rgb('+floor(random()*(255-180)+180)+','+floor(random()*(185-110)+110)+','+floor(random()*(80-30)+30)+')';
    balls[num] = new Ball(x, y, x2, y2, dx, dy, p, c)
    if(num<ballNumber){num++} else {
        clearInterval(repeat);
        }    ;
}
 
// 마우스를 클릭했을 때 x,y 저장
function mousePressed(){
      x2 = mouseX;
      y2 = mouseY;
      print(mouseIsPressed)
    };
 
// 드래그할 때 붉은 선 그리기
function mouseDragged(){ // 마우스 버튼이 눌린 상태에서 움직일 때마다 한 번씩 호출
    stroke("brown");
    strokeWeight(5);
    line(x2, y2, mouseX, mouseY);
};
 
// 마우스를 뗐을때 x,y 저장하고, 간격을 두고 공을 생성하는 함수 init 호출
function mouseReleased(){
    x = mouseX;
    y = mouseY;
    if(abs(x - x2) <= 20 && abs(y - y2) <= 20){return} // 드래그를 너무 조금했을 때에는 무시
    num = 0;
    repeat = setInterval(function(){
        init(x,y);},100);
    draw();
    };
    
    