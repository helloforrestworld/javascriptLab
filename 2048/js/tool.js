
var createRn = function (arr){
  var max = Math.max(...arr);
  var min = Math.min(...arr);
  return Math.round(Math.random() * (max - min) + min);
};

var css = function (ele, type, value){
  var testPx = /^(\d+)(\.\d+)?(px)$/i,
      eleStyle = getComputedStyle(ele),
      ret = null;
  
  if(typeof value === 'undefined'){
    if(typeof type === 'object'){
      for(var key in type){
        setStyle.call(this, key, type[key]);
      }
    }else{
      if(eleStyle.hasOwnProperty(type)){
        ret = eleStyle[type];
        return testPx.test(ret) ? parseFloat(ret) : ret;
      }else{
        return cssTransform(ele, type) || 0;
      }
    }
  }else{
    setStyle.call(this, type, value);
  }
  function setStyle(key, value){
    if(eleStyle.hasOwnProperty(key)){
      if(key === 'opacity'){
        ele.style.opacity = value;
      }else{
        ele.style[key] = typeof value === 'string' ? value : value + 'px';
      }
    }else{
      cssTransform(ele, key, value)
    }
  }
}

var cssTransform = function (ele, type, value){
  var attrs = ele.__transform = ele.__transform || {}, str = '';
  if(typeof value === 'undefined'){
    return attrs[type];
  }
  attrs[type] = value;
  for(var key in attrs){
    switch(key){
      case 'translateX':
      case 'translateY':
        str += ` ${key}(${parseFloat(attrs[key])}px)`;
      break;
      case 'rotate':
      case 'rotateX':
      case 'rotateY':
      case 'skewX':
      case 'skewY':
        str += ` ${key}(${parseFloat(attrs[key])}deg)`;
      break;
      default:
        str += ` ${key}(${attrs[key]})`;
    }
  }
  ele.style.transform = str.trim();
}

// 动画函数
var animation = function (ele, attrs, duration, fn){
  if(ele.animation) return;
  if(typeof duration === 'function'){
    fn = duration;
    duration = 100;
  }
  if(typeof duration === 'undefined'){
    duration = 100;
  }
  var beginValue = {}, changeValue = {};
  for(var key in attrs){
    beginValue[key] = css(ele, key) || 0;
    changeValue[key] = attrs[key] - beginValue[key];
  }
  
  var d = duration;
  var startTime = Date.now();
  var current, c, b, t;
  var animation = () => {
    ele.animation = window.requestAnimationFrame(animation, ele);
    t = Date.now() - startTime;
    if(t >= d){
      t = d;
      window.cancelAnimationFrame(ele.animation);
      ele.animation = null;
    }
    for(key in changeValue){
      c = changeValue[key];
      b = beginValue[key];
      current = c/d*t+b;
      css(ele, key, current);
    }
    if(!ele.animation && typeof fn === 'function'){
      fn.call(ele);
    }
  };
  animation();
};

var setBg = function(n){
  switch(n){
    case 2: return "#eee4da";break;
    case 4: return "#ede9c8";break;
    case 8: return "#f2b179";break;
    case 16: return "#f59563";break;
    case 32: return "#f57c5f";break;
    case 64: return "#f65e3b";break;
    case 128: return "#edcf72";break;
    case 256: return "#edcc61";break;
    case 512: return "#99cc00";break;
    case 1024: return "#33b5e5";break;
    case 2048: return "#0099cc";break;
    case 4096: return "#aa66cc";break;
    case 8192: return "#9933cc";break;
  }
  return '#000000';
};

var setColor = function(n){
  return n <= 4 ? '#776e65' : '#fff';
};