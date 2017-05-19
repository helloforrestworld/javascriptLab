
//存放所有函数的对象

var mv  = {};





//-----------------DOM对象获取  ：$(容器选择器)
mv.$ = function $(Selector,context){
		//id
		var context = context||document;
		var first = Selector.substr(0,1);
		var len  =  Selector.split(' ').length;
		var ele ;  
		if(first==='#'&&len===1){
			//console.log(Selector.substr(1));
			return  document.getElementById(Selector.substr(1));
		}
		ele = context.querySelectorAll(Selector);
		return  ele = ele.length===1?ele[0]:Array.from(ele);
}



//--------------任意的加法 :add(ele3,ele2,ele1....)
function add(){
		var args = arguments;
		var result = 0;
		for(var i=0;i<args.length;i++){
			result+= args[i];
		}
		return result;
}


//---------功能：将字符串转化为数组，并且分隔符还保留 (str,分隔符)
				
function Mysplit(str,spe){
		var NewStr = str.split(spe);
		for (var i=0;i<NewStr.length;i++) {
			if(i===NewStr.length-1){
				break;
			}
			NewStr[i] +=spe;
		}
		return NewStr;			
}

//----获取对象的Css属性  css(对象名,属性值[,属性值])
		//如果属性值为'',那么清空元素所有的行间样式
mv.cssSet = function cssSet(){
			var arg = arguments;
			var ele = arg[0],type = arg[1],val = arg[2];			
			var len = arg.length;
			var _this = this;
			if(len===2){
				if(typeof type === 'object'){//传入的是对象 则进行属性操作
					for(var key in type){
						ele.style[key] =styleType(key)&& 
						typeof type[key]!='string' ? type[key]+'px':type[key];//需要加px的加px
					}
					return;
				}
				if(type ===''){
					ele.style.cssText = '';//如果传入第二参数是空字符串 则清空所有的行间样式
					return;
				}
				if(styleTrans(type)){
					return _this.cssTransform(ele,type); //读取transform属性
				}
				var atr = getComputedStyle(ele)[type];
				return parseFloat(atr)||(parseFloat(atr)===0?0:atr);//能转数字的返回数字
			}
			
			if(len===3){
				if(styleTrans(type)){//如果是transform属性
					_this.cssTransform(ele,type,val);
					return;
				}
				if(styleType(type)){
					if(typeof val === 'string'){
						ele.style[type] = val;  //传字符就必须带单位  width:100%
					}else{
						val = parseFloat(val) +'px'; //可传数字
						ele.style[type] = val;
					}
					return;
				}else{
					ele.style[type] = val;
					return;
				}
			}
			function styleType(type){
				return type ==='left'||type ==='right'||type ==='bottom'||type ==='top'||type ==='width'
				||type ==='height'||type ==='margin-top'||type ==='margin-right'||type ==='margin-bottom'
				||type ==='margin-left'||type ==='padding-top'||type ==='padding-right'||type ==='padding-bottom'
				||type ==='padding-left';
			}
			function styleTrans(type){
				return type === 'skew'||type === 'skewX'||type === 'skewY'||type === 'rotate'||
				type === 'rotateX'||type==='rotateY'||type==='translateX'||type==='translateY'||
				type === 'scale'||type === 'scaleX'||type === 'scaleY';
			}
		}
		
mv.cssTransform = function cssTransform(ele,type,val){
			var attrs= ele.transformBox = ele.transformBox?ele.transformBox:{}; //声明一个对象存放transform属性和值
			if(typeof val === 'undefined'){
				return attrs[type];
			}
			
			attrs[type] = val;
			if(val === ''){
				ele.style.transform = '';
			}
			var str =  '';
			for(var type in attrs){
				
				switch(type){
					
					case 'translateX':
					case 'translateY':
					str += attrs[type]!==''? `${type}(${attrs[type]}px)`:'';    //如果传入的是空或的话 该属性清空
					break;
					
					case 'rotate':
					case 'rotateX':
					case 'rotateY':
					case 'skew':
					case 'skewX':
					case 'skewY':
					
					str += attrs[type]!==''? `${type}(${attrs[type]}deg)`:'';
					break;
					
					default:
					
					str += attrs[type]!==''? `${type}(${attrs[type]})`:'';
				}
			}
			ele.style.transform = str.trimLeft();
}

mv.animation = function (ele,attr,duration,fx,callback){
			if(ele.animation)return; //没执行完不能再次开启定时器
			//存放起始位                                //存放该变量
			var beginValue = {}, changValue = {};
			//优化用的
			var _this = this;
		

			for(var key in  attr ){
					
				beginValue[key] =   _this.cssSet(ele,key)||0;  //这里兼容那些transform属性
				
				changValue[key] =  attr[key]  - beginValue[key];
				
			}
			
			//对传的参数一一对应
			if(typeof duration ==='number'){
				
				if(typeof fx ==='undefined'){
					fx = 'linear';
				}
				
				if(typeof fx ==='function'){
					callback =  fx ;
					fx = 'linear';
				}
				
			}
			
			//没传duration
			if(typeof duration !=='number'){
				if(typeof duration ==='undefined'){
					//后面什么都没传
					fx = 'linear';
					duration = 500;
				}
				if(typeof duration ==='string'){
					//两种情况：
						//'linear'后面跟不跟  calback
					callback = fx ; //如果没带callback  两种情况都是等于undefined
					fx = duration;
					duration = 500;
				}
				if(typeof duration ==='function'){
					//如果duration 是函数的话  后面就不带东西了
					callback = duration;
					fx = 'linear';
					duration = 500;
				}
			}
			//运动时间
			var d  = duration ;
			
			//每次执行后现在属性值
			var current ;
			
			//点击瞬间的  时间
			var startTime = Date.now();
			
			//清楚动画帧
			//window.cancelAnimationFrame(ele.animation);
			//开启定时器
				(function animationGo(){
					ele.animation = requestAnimationFrame(animationGo,ele);
					var t = Date.now() - startTime;
					if(t >= d){
				      t = d;
				      window.cancelAnimationFrame(ele.animation);
				      ele.animation = null;
				    }
					for(var key in beginValue){
						b = beginValue[key];
						c = changValue[key];
						
						current = Tween[fx](t,b,c,d);
						_this.cssSet(ele,key,current);
					}
					if(!ele.animation && typeof callback === 'function'){
				      callback.call(ele);
				    }
				})();
		}
		
var Tween = {
	linear: function (t, b, c, d){  //匀速
		return c*t/d + b;
	},
	easeIn: function(t, b, c, d){  //加速曲线
		return c*(t/=d)*t + b;
	},
	easeOut: function(t, b, c, d){  //减速曲线
		return -c *(t/=d)*(t-2) + b;
	},
	easeBoth: function(t, b, c, d){  //加速减速曲线
		if ((t/=d/2) < 1) {
			return c/2*t*t + b;
		}
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInStrong: function(t, b, c, d){  //加加速曲线
		return c*(t/=d)*t*t*t + b;
	},
	easeOutStrong: function(t, b, c, d){  //减减速曲线
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeBothStrong: function(t, b, c, d){  //加加速减减速曲线
		if ((t/=d/2) < 1) {
			return c/2*t*t*t*t + b;
		}
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	elasticIn: function(t, b, c, d, a, p){  //正弦衰减曲线（弹动渐入）
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
	elasticOut: function(t, b, c, d, a, p){    //*正弦增强曲线（弹动渐出）
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
	backIn: function(t, b, c, d, s){     //回退加速（回退渐入）
		if (typeof s == 'undefined') {
		   s = 1.70158;
		}
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	backOut: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 3.70158;  //回缩的距离
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
	bounceIn: function(t, b, c, d){    //弹球减振（弹球渐出）
		return c - Tween['bounceOut'](d-t, 0, c, d) + b;
	},       
	bounceOut: function(t, b, c, d){//*
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
}


//判断是否有这个cls
mv.hasCls = function(ele,cls){
	return  ele.classList.contains(cls);
}
//添加cls
mv.addCls = function(ele,cls){
	ele.classList.add(cls);
}
//删除
mv.removeCls = function(ele,cls){
	ele.classList.remove(cls);
}
//删除和添加

mv.toggleCls= function(ele,cls){
	ele.classList.toggle(cls);
}


//抖动函数   dre:translateX/translateY  Range为移动幅度
mv.shake = function shake(ele,dre,Range,fn){
				if(ele.shake){
					return;
				}
				var arr = [],_this=this;
				var index = 0;
				for(var i =Range<10?10:Range;i>0;i-- ){
					if(i==0){
						arr.push(i);
						return;
					}
					arr.push(i,-i);
				}
				(function shake(){
					
					ele.shake = window.requestAnimationFrame(shake,ele);
					
					_this.cssSet(ele,dre,arr[index++]);
					
					if(index===arr.length-1){
						window.cancelAnimationFrame(ele.shake);
						ele.shake = null;
						if(typeof fn ==='function'){
							fn.call(ele);
						}
					}
				})()
}

//用三个函数做的摆动函数    Range为摆动的幅度px  speed 摆动速度 值比较小     duration 持续时间
mv.clockMove =  function clockMove(ele,Range,speed,duration,fn){
					if(ele.clockMove){
						return;
					}
					var _this = this;
					var  b = new Date().getTime();
					var rad =0;
					(function clockMove(){
						var spendTime = new Date().getTime()-b;
						ele.clockMove = window.requestAnimationFrame(clockMove,ele);
						_this.cssSet(ele,'translateX',Math.sin(rad)*Range);
						rad +=speed;
						if(spendTime>=duration){
							window.cancelAnimationFrame(ele.clockMove);
							_this.cssSet(ele,'translate','');
							ele.clockMove = null;
							if(typeof fn ==='function'){
								fn.call(ele);
							}
						}
					})();
}



//返回   一个随机数   范围为  数组的最小值～数组的最大值
mv.Rondom =function Rondom(arr){
			var max = Math.max(...arr),
		    min = Math.min(...arr);
		    return Math.round(Math.random() * (max - min) + min);
		     // return Math.random() * (max - min) + min;
}