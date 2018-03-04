var lau = {};
lau.getScroll = function(){
  if(window.pageYOffset){
    return {
      x : window.pageXOffset,
      y : window.pageYOffset
    }
  }else{
    return {
      x : document.body.scrollLeft + document.documentElement.scrollLeft,
      y : document.body.scrollTop + document.documentElement.scrollTop
    }
  }
}


lau.getViewportOffset = function(){
  if(window.clientHeight){
    return {
      x : window.clientWidth,
      y : window.clientHeight
    }
  }else{
    if(document.compatMode === 'CSS1Compat') {
      return {
        x : document.documentElement.clientWidth,
        y : document.documentElement.clientHeight
      }
    }else{
      return {
        x : document.body.clientWidth,
        y : document.body.clientHeight
      }
    }
  }
}

lau.getStyle = function(ele, prop){
  if(window.getComputedStyle){
    return window.getComputedStyle(ele, null)[prop]
  }else{
    return ele.currentStyle[prop]
  }
}

// 求任意元素在文档的坐标
lau.getElePos = function(ele){
  var x = ele.offsetLeft,
      y = ele.offsetTop;
  while (ele.offsetParent) {
    ele = ele.offsetParent;
    x += ele.offsetLeft;
    y += ele.offsetTop;
  }
  return {x: x, y : y};
}

// 添加事件
lau.addEvent = function(ele,type,fn){
  if(ele.addEventListener){
    ele.addEventListener(type, fn, false);
  }else if(ele.attachEvent){
    var fnName = fn.name || fn.toString().match(/function\s*([^(]*)\(/)[1]; //获取函数名字兼容
    var fnUsual = function(){
      fn.call(ele); //保证this指向
    }
    if(fnName !== ''){ //当 不为匿名函数的时候
      ele[fnName] = fnUsual; //方便在外头取消绑定
    }
    ele.attachEvent('on' + type, fnUsual);
  }else{
    ele['on' + type] = fn;
  }
}
// 取消冒泡
lau.stopBubble = function(e){
  if(e.stopPropagation){
    e.stopPropagation();
  }else{
    e.cancelBubble = true;
  }
}
// 取消默认事件
// return false
lau.cancelHandler = function(e){
  if(e.preventDefault){
    e.preventDefault();
  }else{
    e.returnValue = false;
  }
}

// 拖拽  pageX 在ie9以下用不了
lau.drag = function(ele){
  var disX, disY;
  lau.addEvent(ele, 'mousedown' , function(e){
    var e = e || window.event;
    disX = e.pageX - ele.offsetLeft;
    disY = e.pageY - ele.offsetTop; 
    lau.addEvent(document, 'mousemove',fnMove);
    lau.addEvent(document, 'mouseup', fnUp);
  })
  function fnMove(e){
    var e = e || window.event;
    ele.style.left = e.pageX - disX + 'px';
    ele.style.top = e.pageY - disY + 'px';
  }
  function fnUp(e){
    var e = e || window.event;
    if(document.removeEventListener){
      document.removeEventListener('mousemove', fnMove);
    }else{
      document.detachEvent('onmousemove', document['fnMove']);
    }
  }
}

// 异步加载脚本
 lau.loadScript = function(src,callback){
  var script = document.createElement('script');
  var head = document.getElementsByTagName('head')[0];
  script.type = 'text/javascript';
  head.appendChild(script);
  
  if(script.readyState){
    script.onreadystatechange = function(){
      if(script.readyState == 'complete' || script.readyState == 'loader'){
        callback();
      }
    }
  }else{
    script.onload = function(){
      callback();
      // eval
      // obj[callback]();
    }
  }
  
  script.src = src; // 放下面最后 防止网速快 readyState 不变
}



// css(兼容transform部分待完善)
lau.css = function(ele,type,value){
  var arg = arguments,
      len = arg.length,
      ele = arg[0],
      type = arg[1],
      value = arg[2];
  
  // 只有两个参数
  if(len === 2){
    
    if(typeof type === 'object'){
      // 设置一组属性值
      for(var key in type){
        set(key,type[key]);
      }
      return
    }
    
    if(type.trim() === '' ){
      // 清空行间样式
      ele.style.cssText = '';
      return
    }
    
    if(typeof type === 'string'){
      // 查找属性值
      if(styleTransform(type)){
        return ele.transformAttr[type]
      }
      
      if(window.getComputedStyle){
        return window.getComputedStyle(ele,null)[type]
      }else{
        return ele.currentStyle[type]
      }
    }
  }
  
  // 三个参数
  if(len === 3){
    set(type,value);
  }
  
  // 判断是否使用px  是否属于transform属性  再设置
  function set(type,value){
    if(styleUsePx(type)){
      ele.style[type] = parseFloat(value) + 'px';
    }else if(styleTransform(type)){
      var attr = ele.transformAttr = ele.transformAttr || {},
          str = '';
          
      attr[type] = value;
      
      for(var key in attr){
        
        // deg px 两种单位
        switch(key){
          case 'translateX':
          case 'translateY':
          case 'translateZ':
          str += attr[key] === ''? ``: `${key}(${attr[key]}${Number.isNaN( Number(attr[key]))? '' :'px' })`;
          // 例如 传入 40% 40px 自己有单位就用自己的 没有就加px
          break;
          
          case 'rotate':
          case 'rotateX':
          case 'rotateY':
          case 'skew':
          case 'skewX':
          case 'skewY':
          str += attr[key] === ''? `` :`${key}(${attr[key]}deg)`;
          break;
          
          default:
          str += attr[key] === ''? `` :`${key}(${attr[key]})`;
        }
      }
      ele.style.transform = str;
    }else{
      ele.style[type] = value;
    }
  }
  
  // 常用px
  function styleUsePx(type){
    return type ==='left'||type ==='right'||type ==='bottom'||type ==='top'||type ==='width'
    ||type ==='height'||type ==='margin-top'||type ==='margin-right'||type ==='margin-bottom'
    ||type ==='margin-left'||type ==='padding-top'||type ==='padding-right'||type ==='padding-bottom'
    ||type ==='padding-left';
  }
  
  //transform
  function styleTransform(type){
    return type === 'skew'||type === 'skewX'||type === 'skewY'||type === 'rotate'||
    type === 'rotateX'||type==='rotateY'||type==='translateX'||type==='translateY'||
    type === 'scale'||type === 'scaleX'||type === 'scaleY';
  }
}


// 运动裤
lau.move = function(ele,attr,duration,fx,callback){
  
  if(ele.anim) return
  
  var css = lau.css,
      beginValue = {},//存放所有属性初始值
      changeVaule ={},//存放所有属性需要改变的量
      startTime = Date.now(),//运动开始时间点
      t = 0;//过去的时间
  
  // 参数兼容
  if(typeof duration === 'number'){
    if(typeof fx === 'undefined'){
      fx = 'linear';
    }
    if(typeof fx === 'function'){
      callback = fx;
      fx = 'linear';
    }
  }
  
  if(typeof duration === 'undefined'){
    duration = 500;
    fx = 'linear'
  }
  
  if(typeof duration === 'string'){
    callback = fx;
    fx = duration;
    duration = 500;
  }
  
  if(typeof duration === 'function'){
    callback = duration;
    fx = 'linear';
    duration = 500;
  }
  
  for(var key in attr){
    beginValue[key] = parseFloat( css(ele,key) );
    changeVaule[key] = parseFloat(attr[key]) - beginValue[key];
  }
  
  
  (function fn(){
    
    ele.anim = window.requestAnimationFrame(fn,ele);
    // 每次的current值 =  c * t/d + b;
    t = Date.now() - startTime;
    for(var key in beginValue){
      css(ele,key, Tween[fx](t,beginValue[key],changeVaule[key],duration));
    }
    
    // 出口
    if(t >= duration){
      for(var key in attr){
        css(ele,key,attr[key]);
      }
      
      if(typeof callback === 'function'){
          callback.call(ele);
      }
      window.cancelAnimationFrame(ele.anim);
      
      ele.anim = null;
    }
  })()
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

// 获取当前月份有几天
lau.retTotalDay = function(date){
  var timeObj = new Date(date);
  timeObj.setDate(1);//防止形如 1月30  设置月份 直接跳到 3 月 2
  timeObj.setMonth(now.getMonth() + 1);
  timeObj.setDate(0);
  return  timeObj.getDate();
}


lau.shake = function(ele,attr,range,callback){
  if(ele.shake)return
  var arrRange = [],index = 0;
  var beginValue = parseFloat( lau.css(ele,attr) ); 
  for(var i = range; i > 0; i--){
    arrRange.push(i,-i);
  };
  (function fn(){
    ele.shake = window.requestAnimationFrame(fn,ele);
    lau.css(ele,attr,arrRange[index++] + beginValue);
    if(index >= arrRange.length){
      window.cancelAnimationFrame(ele.shake);
      lau.css(ele,attr,beginValue);
      if(typeof callback === 'function'){
        callback.call(ele);
      }
      ele.shake = null;
    }
  }())
}

lau.clockMove = function(ele,attr,range,speed,duration,callback){
  var startTime = Date.now(),
      beginValue = parseFloat(lau.css(ele,attr)),
      rad = 0;
  
  (function fn(){
    var lastT = Date.now() - startTime;
    ele.clock = window.requestAnimationFrame(fn,ele);
    lau.css(ele,attr,Math.sin(rad)*range);
    rad += speed;
    
    if(lastT >= duration){
      window.cancelAnimationFrame(ele.clock);
      lau.css(ele,attr,beginValue);
      if(typeof callback === 'function'){
        callback.call(ele);
      }
    }
    
  }())
}

// 碰撞检测
lau.isCrash = function(current,target){
  var curR = current.getBoundingClientRect(),
      tarR = target.getBoundingClientRect();
      
  return curR['right'] >= tarR['left'] && curR['left'] <= tarR['right'] && curR['bottom'] >= tarR['top'] && curR['top'] <= tarR['bottom'] 
}