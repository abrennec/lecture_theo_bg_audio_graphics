import oscP5.*;
import netP5.*;

OscP5 oscP5;
NetAddress myRemoteLocation;

int maxBranches = 4;

Boolean generateTree = true;
float angle = PI/3;

color background = color(216,235,242);
color trunk = color(153,53,17);
color branch = color(67, 153,41);

float ratio = 0.66;
float maxLength = 1;
float currentRotation = 0;
float rotationIncrease = 0.01;

PVector[][] lines = {{}};
int instance = int(random(10000));
int count = 0;

PVector root = new PVector(0,0,0);
PVector rotation = new PVector(0,0,0);

void setup(){
  myRemoteLocation = new NetAddress("127.0.0.1",57120);
  oscP5 = new OscP5(this,12000);
  size(640, 480, P3D); 
  noStroke();  
  frameRate(30);
}

void draw(){
  
  background(background);
  //pushMatrix();

  if(generateTree){
    initializeTree();

    newTree(root, rotation, height/3);
    generateTree = false;

  };
  
  drawTree(currentRotation);
  currentRotation += rotationIncrease; //slooowly rotate tree
}

void newTree(PVector root, PVector rotation, float totalLength){
  PVector end;
  float partOfLength = totalLength * random(1);

  PVector tail = rotationBranch(root, rotation, partOfLength);
  
  if(totalLength * pow(ratio, 6)<= maxLength){   
    end = new PVector(1,1,1);
  }
 
  else{
    end = new PVector(0,0,0);
  };

  PVector[] toAdd = {root, tail, end};
  lines = (PVector[][])append(lines, toAdd);
  totalLength *=ratio;

   if (totalLength> maxLength){
     
     
     int n = int(random(1,maxBranches));

     for(int i =0; i< n; i++){

      float theta1 = random(-1*angle, angle);
            float theta2 = random(-1*angle, angle);
      float theta3 = random(-1*angle, angle);
      PVector newRot = new PVector(rotation.x+theta1, rotation.y+theta2, rotation.z+theta3);

      newTree(tail, newRot, totalLength);

     }
   };
}

void mousePressed(){
 OscMessage myMessage = new OscMessage("/start");
 myMessage.add("makingsound");
 oscP5.send(myMessage, myRemoteLocation);
  
  generateTree = true;  
  trunk = color(random(255), random(255), random(255));
  branch = color(random(255), random(255), random(255));
  background = color(random(255), random(255), random(255));
}

void drawTree(float rot){
// pushMatrix();
  translate(width/2, 9*height/10, 0);
  rotateY(rot);
    for(int i=1; i< lines.length;i++){
      PVector root = lines[i][0];
      PVector tail = lines[i][1];
      PVector leaf = lines[i][2];
      if(leaf.x == 1){
        stroke(branch);
      }
      else{
        stroke(trunk);
      };
      line(root.x, root.y,root.z, tail.x, tail.y, tail.z);
    };
//  popMatrix();
}


void keyPressed(){
 
  generateTree = true;  
  trunk = color(random(255), random(255), random(255));
  branch = color(random(255), random(255), random(255));
  background = color(random(255), random(255), random(255));
    
};

PVector rotX(PVector ipt, float angle){
  float iptY = cos(angle)*ipt.y-sin(angle)*ipt.z;
  float iptZ = sin(angle)*ipt.y+cos(angle)*ipt.z;

  PVector out = new PVector(ipt.x, iptY, iptZ);
  return out;
};

PVector rotY(PVector ipt, float angle){
  float iptX = cos(angle)*ipt.x + sin(angle)*ipt.z;
  float iptZ = -sin(angle)*ipt.x + cos(angle)*ipt.z;
  PVector out = new PVector(iptX, ipt.y, iptZ);
  return out;
};

PVector rotZ(PVector ipt, float angle){
  float iptX = cos(angle)*ipt.x-sin(angle)*ipt.y;
  float iptY = sin(angle)*ipt.x + cos(angle)*ipt.y;
  PVector out = new PVector(iptX, iptY, ipt.z);
  
  return out;
};

PVector rotXYZ(PVector ipt, PVector rot){
  PVector ret = rotX(rotY(rotZ(ipt, rot.z), rot.y), rot.x);
  return ret;
};

PVector rotationBranch(PVector ipt, PVector rot, float amt){
  PVector yVec = new PVector(0, -amt, 0);
    yVec = rotXYZ(yVec, rot);
  yVec.add(ipt);

  return yVec;
  
  
};

void initializeTree(){
  PVector[][] newLines = {{}}; 

lines = newLines;

  
};
