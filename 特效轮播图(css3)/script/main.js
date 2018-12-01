var data = [
	{
		img:'./image/1.jpg'
	},
	{
		img:'./image/2.jpg'
	},
	{
		img:'./image/3.jpg'
	},
	{
		img:'./image/4.jpg'
	},
	{
		img:'./image/5.jpg'
	},
	{
		img:'./image/6.jpg'
	},
	{
		img:'./image/7.jpg'
	}
];

//最外层容器
var contain = document.querySelector('.contain');
//幻灯片容器
var slideContain = document.querySelector('.slide-contain');
//导航容器
var navContain = document.querySelector('.nav-contain');

var index = 0,len = data.length;

//生成所有幻灯片和导航按钮

slideContain.innerHTML = creatSlide(data)['strSlides'];
navContain.innerHTML = creatSlide(data)['strNavs'];



//获取所有的幻灯片和导航按钮

var slideItems =  document.querySelectorAll('.slide-item');
var navItems  = document.querySelectorAll('.nav-item');

//给导航按钮添加点击事件

for(var i =0;i<len;i++){
	(function(i){
		navItems[i].onclick = function(){
			index = i;
			Tab();
		}
	})(i);
}



//图片切换

Tab();//初始化


//前后切换按钮
var prev = document.querySelector('.prev');
var next =document.querySelector('.next');

prev.onclick = function(){
	index = index===0?data.length-1:--index;
	Tab();
	
}
next.onclick = function(){
	index = index===data.length-1?0:++index;
	Tab();
}


//自动轮播
var timer = null;


//自动轮播

timer = setInterval(next.onclick,3000);

//鼠标悬停

contain.onmouseover = function(){
	clearInterval(timer);
};
contain.onmouseout = function(){
	timer=setInterval(next.onclick,3000);
}





function Tab(){
	//先清除所有
	for(var i =0 ;i<len;i++){
		slideItems[i].classList.remove('active');
		navItems[i].classList.remove('active');
	}
	slideItems[index].classList.add('active');
	navItems[index].classList.add('active');
	
	setTimeout(function(){
	contain.style.backgroundImage = `url(${data[index].img})`;
	},1002);//延迟执行 然大容器背景看起来是上一张

}



//生成幻灯片和导航按钮
function creatSlide(data){
	var strSlides = ``;
	var strNavs = ``;
	for(var i =0;i<data.length;i++){
		
		strSlides += `<div class = "slide-item ${i%2?'right':'left'}">
						<span class = "pic" style = "background-image:url(${data[i].img})"></span>
						<div class="caption">
							<h2></h2>
							<h2></h2>
						</div>
					</div>`;
		strNavs += `
					<span class="nav-item">
						<img src="${data[i].img}" />
					</span>
		
						`
	}
	
	return {strSlides,strNavs};
}





