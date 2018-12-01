(function(){ //动画帧兼容
	window.requestAnimationFrame = window.requestAnimationFrame||
		window.webkitRequestAnimationFrame||
		window.mozRequestAnimationFrame;
	window.cancelAnimationFrame = window.cancelAnimationFrame||
		window.webkitCancelAnimationFrame ||
		window.mozCancelAnimationFrame||
		window.cancelRequestAnimationFrame||
		window.webkitCancelRequestAnimationFrame||window.mozCancelRequestAnimationFrame;
	
	if(!window.requestAnimationFrame){ //用setTimeout模拟
		var lastTime = Date.now();
		window.requestAnimationFrame = function(callback){
			
			var index; //编号
			
			var nowTime = Date.now();
			
			//如果延迟超过16.7毫秒就直接执行
			var delay =  Math.max( 16.7 - (nowTime - lastTime),0);
			
			index = setTimeout(callback,delay);
			
			lastTime = nowTime + delay;
			return index
		}
		
	}
	
	if(!window.cancelAnimationFrame){
		window.cancelAnimationFrame = function(index){
			clearTimeout(index);
		}
	}
}())
var Tween = { //Tween算法
	linear: function (t, b, c, d){
		return c*t/d + b;
	},
	easeIn: function(t, b, c, d){
		return c*(t/=d)*t + b;
	},
	easeOut: function(t, b, c, d){
		return -c *(t/=d)*(t-2) + b;
	},
	easeBoth: function(t, b, c, d){
		if ((t/=d/2) < 1) {
			return c/2*t*t + b;
		}
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInStrong: function(t, b, c, d){
		return c*(t/=d)*t*t*t + b;
	},
	easeOutStrong: function(t, b, c, d){
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeBothStrong: function(t, b, c, d){
		if ((t/=d/2) < 1) {
			return c/2*t*t*t*t + b;
		}
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	elasticIn: function(t, b, c, d, a, p){
		if (t === 0) { 
			return b; 
		}
		if ( (t /= d) == 1 ) {
			return b+c; 
		}
		if (!p) {
			p=d*0.3; 
		}
		if (!a || a < Math.abs(c)) {
			a = c; 
			var s = p/4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	elasticOut: function(t, b, c, d, a, p){
		if (t === 0) {
			return b;
		}
		if ( (t /= d) == 1 ) {
			return b+c;
		}
		if (!p) {
			p=d*0.3;
		}
		if (!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},    
	elasticBoth: function(t, b, c, d, a, p){
		if (t === 0) {
			return b;
		}
		if ( (t /= d/2) == 2 ) {
			return b+c;
		}
		if (!p) {
			p = d*(0.3*1.5);
		}
		if ( !a || a < Math.abs(c) ) {
			a = c; 
			var s = p/4;
		}
		else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		if (t < 1) {
			return - 0.5*(a*Math.pow(2,10*(t-=1)) * 
					Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		}
		return a*Math.pow(2,-10*(t-=1)) * 
				Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
	},
	backIn: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
		   s = 1.70158;
		}
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	backOut: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 1.70158;  //回缩的距离
		}
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	}, 
	backBoth: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 1.70158; 
		}
		if ((t /= d/2 ) < 1) {
			return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		}
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	bounceIn: function(t, b, c, d){
		return c - Tween['bounceOut'](d-t, 0, c, d) + b;
	},       
	bounceOut: function(t, b, c, d){
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
		}
		return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
	},      
	bounceBoth: function(t, b, c, d){
		if (t < d/2) {
			return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
		}
		return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
	}
};

//css函数
function css(el,attr,val){
	var transformAttr = ['rotate','rotateX','rotateY','skew','skewX','skewY','scale','scaleX','scaleY','translate','translateX','translateY'];
	for(var i = 0 ; i < transformAttr.length; i++){
		if(attr === transformAttr[i]){
			//transform属性单独处理
			el.transform = el.transform || {
				'rotate':0,
				'rotateX':0,
				'rotateY':0,
				'skew':0,
				'skewX':0,
				'skewY':0,
				'scale':1,
				'scaleX':1,
				'scaleY':1,
				'translate':0,
				'translateX':0,
				'translateY':0,
				'translateZ':0 //硬件加速
			}; //默认值
			
			var str = '';
			if(val === undefined){
				return el.transform[attr]
			}
			el.transform[attr] = val;
			
			for(var key in el.transform){
				switch(key){
					case 'rotate':
					case 'rotateX':
					case 'rotateY':
					case 'skew':
					case 'skewX':
					case 'skewY':
						str += key + '(' + el.transform[key] + 'deg) '
						break
					case 'translate':
					case 'translateX':
					case 'translateY':
						str += key + '(' + el.transform[key] + 'px) '
						break
					default:
						str += key + '(' + el.transform[key] + ') '
				}
			}
			el.style.transform = str;
			return
		}
	}
	
	
	if(val === undefined){
		return parseFloat( window.getComputedStyle(el)[attr] )
	}
	if(attr === 'opacity'){
		el.style[attr] = val;
	}else{
		el.style[attr] = val + 'px';
	}
}

//动画函数
function startMove(init){
	var el = init.el;//运动的元素
	var target = init.target;//目标值
	var b = {}; //初始值
	var c = {}; //初始值 与 目标值 的差值
	var t =  0; //当前第几次
	//总次数
	var d =  Math.ceil( init.time / 16.7 );
	
	cancelAnimationFrame(init.el.timer);
	
	//初始化
	for(key in target){
		b[key] = css(el,key);
		c[key] = target[key] - b[key];
	}
	//执行动画
	(function moveFn(){
		t++;
		if(t > d){
			cancelAnimationFrame(init.el.timer);
			init.callBack && init.callBack.call(el);
		}else{
			for(key in target){
				var val  = Tween[init.type](t,b[key],c[key],d)
				css(el,key,val);
			}
			init.callIn && init.callIn.call(el);
			init.el.timer = requestAnimationFrame(moveFn,el);
		}
	}())
}

function swiper(init){
	var wrap = init.wrap; //滚动元素的父级
	var scroll = wrap.children[0];//滚动元素
	var dir = init.dir;//方向
	var startPoint = {x:0,y:0}; //触碰初始位置
	var startTranslate = {x:0,y:0};//初始translate
	var backOut = init.backOut;
	
	//解决横竖滑屏冲突
	var checkBug = true; //第一次move检测上下左右滑屏是否冲突
	var dirBoolean = {
		x : false,
		y : false
	}
	
	//记录上次的坐标点  防止安卓误触touchmove
	var lastPoint = {
		x:0,
		y:0
	}
	
	var translateAttr = { //方向 对应 要设置的属性名
		x : 'translateX',
		y : 'translateY'
	}
	
	//缓冲动画
	var lastTime = 0; //上一次滑动时间戳
	var lastDis = 0;// 当前move与上一次move手指距离
	var lastTimeDis= 0;//当前move与上一次move时间差
	
	
	//范围限制
	var min = { //最小值
		x : wrap.clientWidth - scroll.offsetWidth,
		y : wrap.clientHeight - scroll.offsetHeight
	}
	
	var lastOut = 0 //上一次超出的距离
	
	
	wrap.addEventListener('touchstart',function(e){
		
		init.start && init.start.call(wrap,e) //触摸前回调
		
		e.preventDefault();
		
		var touch = e.changedTouches[0];
		
		startPoint = { //触碰位置
			x : touch.pageX,
			y : touch.pageY
		}
		
		lastPoint = { //记录上次位置
			x : touch.pageX,
			y : touch.pageY
		}
		
		startTranslate = { //初始位置
			x : css(scroll,'translateX'),
			y : css(scroll,'translateY')
		}
		
		
		//缓冲动画
		lastTime = Date.now();
		lastDis = 0;// 当前move与上一次move手指距离
		lastTimeDis= 0;//当前move与上一次move时间差
		
		min = { //最小值
			x : wrap.clientWidth - scroll.offsetWidth,
			y : wrap.clientHeight - scroll.offsetHeight
		}
	},false)
	
	wrap.addEventListener('touchmove',function(e){
		var touch = e.changedTouches[0];
		var nowPoint = { //当前手指move的位置
			x : touch.pageX,
			y : touch.pageY
		}
		var disPoint = {  //差值
			x : nowPoint.x - startPoint.x,
			y : nowPoint.y - startPoint.y
		}
		
		var targetPoint = { //scroll需要滚动到的位置
			x: disPoint.x + startTranslate.x,
			y: disPoint.y + startTranslate.y,
		}
		
		//解决横滑 和 竖滑 冲突
		
		if(nowPoint.x === lastPoint.x && nowPoint.y === lastPoint.y){ //防止安卓某些浏览器误触touchmove
			return
		}

		
		if(checkBug){
			if(Math.abs(disPoint.x) > Math.abs(disPoint.y)){//判断用户往哪个方向移动
				//应该横向滑
				dirBoolean.x = true;
				dirBoolean.y = false;
				
			}else{
				//应该竖向滑
				dirBoolean.x = false;
				dirBoolean.y = true;
			}
			checkBug = false;
		}
		
		if(dirBoolean[dir]){
			e.preventDefault();
			
			//backOut:none 不允许超出
			if(backOut === 'none'){
				targetPoint[dir] = targetPoint[dir] > 0? 0 :targetPoint[dir];
				targetPoint[dir] = targetPoint[dir] < min[dir]? min[dir]:targetPoint[dir];
			}else if(backOut === 'pull'){
			
			//添加拉力
			//思路
			/*
				1.超出部分 越拉越难 拉力越大   拉力系数越小     超出部分 =  超出部分 * f    如 100 * 0.7
				2.超出部分 最多为一屏 当超出部分等于一屏时 拉力达到最大 拉力系数为0
				3.所以 f =  1 -  超出部分/屏幕宽高
			*/
				if(targetPoint[dir] > 0){
					//拉力系数
					var f = getF(targetPoint[dir]);
					//新超出的部分 * 新的拉力系数 
					targetPoint[dir] = (targetPoint[dir] - lastOut) * f + lastOut;
					//更新超出的新值
					lastOut = targetPoint[dir];
				}else if(targetPoint[dir] < min[dir]){
					//超出部分
					var out  =  targetPoint[dir] - min[dir];
					//弹力系数
					var f = getF(out);
					
					targetPoint[dir] = (out - lastOut) * f  + lastOut  + min[dir];
					
					lastOut += (out - lastOut) * f;
				}
			}
			
			
			css(scroll,translateAttr[dir],targetPoint[dir]);
			init.move && init.move.call(wrap,e)
			//缓冲动画
			var nowTime = Date.now();
			lastTimeDis = nowTime - lastTime;
			lastDis = nowPoint[dir] - lastPoint[dir];
		}
		
		//上一次的值更新 
		lastPoint.x = nowPoint.x;
		lastPoint.y = nowPoint.y;
		//上一次时间值更新
		lastTime = nowTime;
		
	},false)
	
	wrap.addEventListener('touchend',function(e){ //结束后回调
		checkBug = true;
		
		//缓冲动画
		var nowTime = Date.now();//抬起时间
		var lastSpeed = lastDis / lastTimeDis; //最后一次滑动的速度
		var now =  css(scroll,translateAttr[dir]);//获取当前translate值
		var s;//缓冲动画滚动距离
		var target;//目标值对象
		
		lastSpeed = lastSpeed? lastSpeed : 0; //触碰瞬间抬起lastSpeed为NaN
		
		if(nowTime - lastTime > 100){ //如果抬起期间和move时间相差太远 判定为滑动后长按
			lastSpeed = 0; //这时候就不需要缓冲动画了
		}
		
		s  = Math.round(lastSpeed * 170) + now; //与速度成正比的滚动距离
		
		
		//范围限制
		if(s > 0){
			s = 0;
		}else if(s < min[dir]){
			s = min[dir];
		}
		//清空上一次的超出距离
		lastOut = 0;
		
		if(dir === 'x'){//目标值对象
			target = {'translateX': s}
		}else{
			target = {'translateY': s}
		}
		startMove({//运动函数
			el:scroll,
			type:'easeOutStrong',
			target:target,
			time:500,
			callIn:function(){init.move && init.move.call(wrap,e)},
			callBack:function(){init.over && init.over.call(wrap,e)}
		})
		init.end && init.end.call(wrap,e);
	},false)
	
	
	function getF(out){ //获取弹力系数
		out = Math.abs(out);
		var clientDir = {
			x: 'clientWidth',
			y: 'clientHeight'
		}
		//控制弹力系数倍数缩防
		var a = 68 * ( out / wrap[clientDir[dir]]) + 1;
		//弹力系数
		var f = (1 - out / wrap[clientDir[dir]]) / a; 
		return f < 0 ? 0 : f
	}
}


//有滚动条的自定义滑屏
function swiperBar(init){
	var wrap = init.wrap; //外框
	var scroll = wrap.children[0]; //滚动元素
	var bar = document.createElement('span'); //滚动条
	var dir = init.dir; //方向
	bar.className = 'scrollbar';
	
	var scale; //  外框 / 滚动区域
	
	var wc = { 
		x: 'clientWidth',
		y: 'clientHeight'
	}
	var so = {
		x: 'offsetWidth',
		y: 'offsetHeight'
	}
	var tr = {
		x: 'translateX',
		y: 'translateY'
	}
	
	var wrapRect,scrollRect; //外框大小  滚动区域大小
	
	 //滚动条初始化
	wrapRect = wrap[wc[dir]];
	scrollRect = scroll[so[dir]];
	scale = wrap[wc[dir]] /  scroll[so[dir]];
	if(dir === 'x'){
		bar.style.cssText = 'transition:opacity 300ms;opacity:0; z-index:999;position:absolute;left:0;bottom:0;width:'+scale * wrap.clientWidth +'px;height:4px;background-color:rgba(0,0,0,0.6);border-radius:5px';
	}else if(dir === 'y'){
		bar.style.cssText = 'transition:opacity 300ms;opacity:0;z-index:999;position:absolute;right:0;top:0;width:4px;height:'+scale * wrap.clientHeight+'px;background-color:rgba(0,0,0,0.6);border-radius:5px';
	}
	
	wrap.appendChild(bar);
	
	
	//start 滚动条显示 重新获取一下比例 并重设滚动条宽高
	//over 滚动条隐藏
	//move 滚动条 按比例移动
	//滚动条如何移动?
	/*
		1.	与scroll移动反方向
		2.  toMove / scroll =  barMove / wrap
		3.  scale  =  wrap / scroll 
		3.  tomove * scale = barMove
	*/
	
	function resetScale(){
		wrapRect = wrap[wc[dir]];
		scrollRect = scroll[so[dir]];
		scale = wrapRect /  scrollRect;
		if(dir === 'x'){
			bar.style.width = scale * wrapRect + 'px';
		}else if(dir === 'y'){
			bar.style.height = scale * wrapRect + 'px';
		}
	}
	
	swiper({
		wrap:wrap,
		dir:dir,
		backOut:init.backOut,
		start:function(){
			resetScale();
			init.start && init.start.call(wrap);
		},
		end:function(){
			init.end && init.end.call(wrap);
		},
		move:function(){
			if(bar.style.opacity === '0'){
				bar.style.opacity = 1;
			}
			var barMove = -css(scroll,tr[dir]) * scale;
			css(bar,tr[dir],barMove)
			init.move && init.move.call(wrap);
		},
		over:function(){
			bar.style.opacity = 0;
			init.over && init.over.call(wrap);
		}
	})
}

//tap
function tap(el,fn){
	var startPoint = {};
	var endPoint = {};
	el.addEventListener('touchstart',function(e){
		startPoint = {
			x : e.changedTouches[0].pageX,
			y : e.changedTouches[0].pageY,
		}
	},false)
	el.addEventListener('touchend',function(e){

		endPoint = {
			x : e.changedTouches[0].pageX,
			y : e.changedTouches[0].pageY,
		}
		if( Math.abs(startPoint.x - endPoint.x) < 5 && Math.abs(startPoint.y - endPoint.y) < 5){
			fn && fn.call(el,e);
		}
	},false)
}