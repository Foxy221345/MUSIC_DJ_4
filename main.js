song1="";
song2="";

leftWristX=0;
LeftWristY=0;

rightWristX=0;
rightWristY=0;

score_left_wrist=0;
score_right_wrist=0;

song1_status="";
song2_status="";

function preload()
{
    song1=loadSound("music.mp3");
    song2=loadSound("music2.mp3");
}

function setup()
{
    canvas=createCanvas(600,450);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose',gotPoses);
}

function draw()
{
    image(video,0,0,600,500);
 song1_status= song1.isPlaying();
 song2_status=song2.isPlaying();

    fill("#8442a1");
    stroke("#561e6e");

    if(score_left_wrist>0.2)
{

circle(leftWristX, leftWristY,20);

song2.stop();

if(song1_status=="false")
{
    console.log("song1 is playing");
 song1.play();
 console.log("**song1 is playing**");
 document.getElementById("song").innerHTML=song1;
}
}

if(score_right_wrist>0.2)
{

circle(rightWristX, rightWristY,20);

song1.stop();

if(song2_status=="false")
{
    console.log("song2 is playing");
 song2.play();
 document.getElementById("song").innerHTML=song2;
}
}
   

}

function modelLoaded()
{
    console.log("PoseNet model is initialized");
}

function gotPoses(results)
{
    if(results.length>0)
    {
        console.log(results);
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("lefWristX = " + leftWristX+"leftWristY = " + leftWristY);

        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);

        score_left_wrist=results[0].pose.keypoints[9].score;
        score_right_wrist=results[0].pose.keypoints[10].score;
    }
}

function play()
{ song.play();
  song.setVolume(1);
  song.rate(1); 
}
