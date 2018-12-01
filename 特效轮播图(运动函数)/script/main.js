var data = [
  {src:'./image/1.jpg',h2:'This is',h3:'Wonderful'},
  {src:'./image/2.jpg',h2:'This is',h3:'Wonderful'},
  {src:'./image/3.jpg',h2:'This is',h3:'Wonderful'},
  {src:'./image/4.jpg',h2:'This is',h3:'Wonderful'},
  {src:'./image/5.jpg',h2:'This is',h3:'Wonderful'},
  {src:'./image/6.jpg',h2:'This is',h3:'Wonderful'},
  {src:'./image/7.jpg',h2:'This is',h3:'Wonderful'},
];
var len = data.length;
var index = 0;//控制幻灯片索引


// 容器
var slideWrap = document.getElementsByClassName('slide')[0];
var navWrap = document.getElementsByClassName('nav')[0];

// 动态获取幻灯片和导航条目
var slideItems = slideWrap.getElementsByClassName('slide-item');
var navItems = navWrap.getElementsByClassName('nav-item');

// 前后按钮
var prev = document.getElementsByClassName('prev')[0];
var next = document.getElementsByClassName('next')[0];


var prevAttr = {scale:0.6,translateX:'-40%'};
var prevIndex = 0;


// 初始化
(function(){
  var htmlObj = createSlideandNav(data);
  
  slideWrap.innerHTML += htmlObj['slideHtml'];
  
  navWrap.innerHTML += htmlObj['navHtml'];


  for(var i = 0; i < len; i++){
    lau.css(slideItems[i],{scale:0.6,translateX:`${i%2?'40%':'-40%'}`,opacity:0})
  }
  
  lau.css(slideItems[index],{scale:1,translateX:'0px',opacity:1});
  slideItems[index].classList.add('active');
  navItems[index].classList.add('active');
}())



// 前后点击切换

prev.onclick = function(){
  index --;
  index = index < 0? len - 1: index;
  tabSlide(index);
}

next.onclick = function(){
  index ++;
  index = index > len - 1 ? 0 : index;
  tabSlide(index);
}

// 导航条点击切换
for(let i = 0; i < len; i++){
  navItems[i].onclick = function(){
    tabSlide(index = i);
  }
}



function tabSlide(index){
  // 上一张归位
  lau.move(slideItems[prevIndex],{scale:prevAttr['scale'],translateX:prevAttr['translateX'],opacity:0},200,'bounceIn');
  slideItems[prevIndex].classList.remove('active');//文字
  
  // 当前这张移动前 存下属性
  prevAttr = {scale:lau.css(slideItems[index],'scale'),translateX:lau.css(slideItems[index],'translateX')};
  
  // 移动当前幻灯片
  slideItems[index].classList.add('active');//文字
  lau.move(slideItems[index],{scale:1,translateX:0,opacity:1},200,'bounceIn');
  // 索引
  prevIndex = index;
  
  
  //导航栏
  for(var i = 0; i < len; i++){
    navItems[i].classList.remove('active');
  }
  
  slideWrap.style.backgroundImage = `url(${data[index].src})`;//大背景图
  navItems[index].classList.add('active');
}




//生成每张幻灯片 和 导航条
function createSlideandNav(data){
  var slideHtml = '',navHtml = '',len = data.length;
  for(var i = 0; i < len; i++){
    slideHtml +=`<div class="slide-item">
      <span class="pic" style="background-image:url(${data[i].src})"></span>
      <div class="caption">
        <h2>${data[i].h2}</h2>
        <h3>${data[i].h3}</h3>
      </div>
    </div>`;
    navHtml += `<span class="nav-item">
      <img src="${data[i].src}" alt="">
    </span>`
    
  }
  return {slideHtml,navHtml}
}
