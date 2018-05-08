import * as PIXI from 'pixi.js';
import TweenLite from "gsap";

import btnspin from '../img/btn-spin.png';
import marker from '../img/marker.png';
import whl from '../img/wheel.png';

export default function app(appscale) {
  var app;
  var gamecontainer;
  var wheel;
  var spinbtn;
  
  document.addEventListener("DOMContentLoaded", function(event) { 
    init();
  });
  
  var init = function () {    
    app = new PIXI.Application(1000, 1000,{transparent:true});
    document.getElementById("mgacontainer").appendChild(app.view);
    
    gamecontainer = new PIXI.Container();
    app.stage.addChild(gamecontainer);
    
    var bg = new PIXI.Sprite(PIXI.Texture.WHITE);
    bg.x=0;
    bg.y=0;
    bg.width = 1000;
    bg.height = 1000;
    bg.tint = 0xff0000;
    
    gamecontainer.addChild(bg);
    
    window.addEventListener("resize", function(event){ 
      ResizeFullScreen();
    });

    window.addEventListener("onorientationchange", function(event){ 
        ResizeFullScreen();
    });

    LoadAssets();
  }
  
  var ResizeFullScreen = function() {
    var canvas=app.view;
    
    var MaxX,MaxY,scaleX,scaleY,scale;
    
    var elementscale = document.getElementById('mgacontainer');
    
    var MaxX, MaxY;
    
    MaxX=window.innerWidth;
    MaxY=window.innerHeight;
    
    scaleX = MaxX / 1000;
    scaleY = MaxY / 1000;
    scale = Math.min(scaleX, scaleY);
    
    canvas.width = MaxX;
    canvas.height = MaxY;
    
    gamecontainer.x = MaxX / 2;
    gamecontainer.y = MaxY / 2;

    gamecontainer.pivot.x = 500;
    gamecontainer.pivot.y = 500;
    
    gamecontainer.scale.x = gamecontainer.scale.y = scale;
    
    app.renderer.resize(MaxX,MaxY);
  }
  
  var LoadAssets = function () {
    var myloader = new PIXI.loaders.Loader("",10) 
    .add("btnspin",btnspin)
    .add("marker",marker)
    .add("whl",whl)

    myloader.once('complete',function(loader, resources) {
        StartAnim();
    })
    myloader.load();
  }
  
  var StartAnim = function () {
    
    
    spinbtn = PIXI.Sprite.fromImage("btnspin");
    spinbtn.anchor.x = 0.5;
    spinbtn.anchor.y = 0.5;
    spinbtn.position.x = 500;
    spinbtn.position.y = 850;
    
    spinbtn.interactive = true;
    spinbtn.buttonMode = true;
    
    spinbtn.on('pointerdown', getapi);
    
    gamecontainer.addChild(spinbtn);
    
    wheel = PIXI.Sprite.fromImage("whl");
    wheel.anchor.x = 0.5;
    wheel.anchor.y = 0.5;
    wheel.position.x = 500;
    wheel.position.y = 450;
    
    gamecontainer.addChild(wheel);
    
    var mrkr = PIXI.Sprite.fromImage("marker");
    mrkr.anchor.x = 0.5;
    mrkr.anchor.y = 0.5;
    mrkr.position.x = 500;
    mrkr.position.y = 120;
    
    gamecontainer.addChild(mrkr);
    
    ResizeFullScreen();
  }
  
  var startspin = function () {
    SpinIt();
  }
  
  var SpinIt = function (winnr) {
    if (wheel.rotation != 0) {
      wheel.rotation %= 2*Math.PI;
    }
    
    var e = 89/4 * Math.PI + winnr*Math.PI/2;
    
    TweenLite.to(wheel, 8, {
        rotation: e,
        ease: Power1.easeInOut,
        onComplete: restartbtn
    })
  }
  
  var restartbtn = function () {
    spinbtn.alpha = 1;
    spinbtn.interactive = true;
    spinbtn.buttonMode = true;
  }
  
  var getapi = function () {
    spinbtn.alpha = 0.4;
    spinbtn.interactive = false;
    spinbtn.buttonMode = false;
    var xhttp;
    xhttp=new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        SpinIt(JSON.parse(this.responseText).position);
      }
    };
//    xhttp.open("GET", "http://localhost/Frontend_test/wheel/api/simpleapi.php", true);
    xhttp.open("GET", "api/apiresponse.json", true);
    xhttp.send();
  }

}