
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
