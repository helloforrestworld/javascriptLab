var menuMult = document.querySelectorAll('.head_menu_mult');//header带列表的容器
//初始化header功能
for(var i = 0,len = menuMult.length; i < len; i++){
  menuMult[i].onmouseleave = function () {
    
    var menuList = this.nextElementSibling;
    
    if(menuList){
      
      this.style.backgroundColor = '';
      this.style.borderLeft = this.style.borderRight = '';
      menuList.style.display = 'none';
      
    }
  }
  menuMult[i].onmouseenter = function(){
    var _this = this;
    var menuList = this.nextElementSibling;
    if(menuList){
      
      this.style.backgroundColor = '#fff';
      this.style.borderLeft = this.style.borderRight = '1px solid #eeeeee';
      menuList.style.display = 'block';
      
      // 性能考虑 绑定一次
      if(!menuList.onmouseenter){
        
        menuList.onmouseenter = this.onmouseenter.bind(this);
        menuList.onmouseleave = this.onmouseleave.bind(this);
        
      }
    }
  }
}
// 搜索placeholder功能
var inpText = document.getElementById('search_menu');
var placeholder = document.getElementsByClassName('placeholder')[0];
var timer = null;
inpText.oninput = function(){
  var timer = setInterval(function(){
    
    if(inpText.value !== ''){
      
      placeholder.style.display = 'none';
    }else{
      
      placeholder.style.display = '';
    }
    clearInterval(timer);
    
  },30)
}
inpText.onblur = function(){
  if(inpText.value == ''){
    
    placeholder.style.display = '';
    
  }
}
// 搜素类型选择样式
var aSearchType = document.querySelectorAll('.search_bar a');
for(var i = 0,len = aSearchType.length; i < len;i++){
  aSearchType[i].onclick = function(){
    
    for(var i = 0,len = aSearchType.length; i < len;i++){
      
      aSearchType[i].classList.remove('active');
      
    }
    
    this.classList.add('active');
  }
}
// 二维码关闭
var closeQr = document.querySelector('.qr_wrap span');
closeQr.onclick = function(){
  
  this.parentNode.style.display = 'none'; 
  
}

// 左侧大选项卡功能
var detailWrap = document.querySelector('.detail_contain');
var detailList = document.querySelectorAll('.detail');
var aLeftList = document.querySelectorAll('.menu_list li');
var mainTopTeft = document.querySelector('.main_top_left');
var beforeList = null;//用于清楚上一个 不循环清除

mainTopTeft.onmouseleave = function(){
  
  beforeList.style.display = '';
  detailWrap.style.display = '';
  beforeList = null;
  
}

for(var i = 0, len = aLeftList.length; i < len; i++){
  aLeftList[i].index = i;
  aLeftList[i].onmouseenter = function(){
    
    detailWrap.style.display = 'block';
    
    if(beforeList){//清除上一个
      beforeList.style.display = '';
    }
    
    detailList[this.index].style.display = 'block';
    beforeList = detailList[this.index];
  }
}


// 第一个轮播图
// 轮播图索引集合
var index = {a:0,b:0};

var scrollaList = document.querySelectorAll('.scroll_a li');
var arrClsA = new Array(scrollaList.length - 3);

arrClsA = ['center','right',...arrClsA,'left'];

  // 两个按钮
var aPrev = document.querySelector('.a_prev');
var aNext = document.querySelector('.a_next'); 

// 导航
var aNavs = document.querySelectorAll('.scroll_a_nav li');
var aNavsLen = aNavs.length;
aNext.onclick = function(){
  next(arrClsA,index,scrollaList,aNavs,'a');
}
aPrev.onclick = function(){
  prev(arrClsA,index,scrollaList,aNavs,'a');
}


// A导航条点击
for(var i = 0; i < aNavsLen; i++){
  aNavs[i].index = i;
  aNavs[i].onclick = function () {
    var num = this.index - index['a'];
    for(var i = 0; i < Math.abs(num); i++){
      if(num > 0){
        next(arrClsA,index,scrollaList,aNavs,'a');
      }else{
        prev(arrClsA,index,scrollaList,aNavs,'a');
      }
    }
  }
}

// A自动播放
var timerA = setInterval(function(){
  next(arrClsA,index,scrollaList,aNavs,'a');
},3000);
var scrollaWrap = document.querySelector('.scroll_a_wrap');
scrollaWrap.onmouseenter = function(){
  aNext.classList.add('active');
  aPrev.classList.add('active');
  clearInterval(timerA);
}
scrollaWrap.onmouseleave = function() {
  aNext.classList.remove('active');
  aPrev.classList.remove('active');
  timerA = setInterval(function(){
    next(arrClsA,index,scrollaList,aNavs,'a');
  },3000);
}

// 第二个轮播图
var scrollbList = document.querySelectorAll('.scrollb li');
var bNavs = document.querySelectorAll('.scrollb_nav a');

var arrClsB = new Array(scrollbList.length - 3);
arrClsB = ['scrollb_center','scrollb_right',...arrClsB,'scrollb_left']
var timerB = null;
var bPrev = document.querySelector('.b_prev');
var bNext = document.querySelector('.b_next');

//索引文字
var bStrong = document.querySelector('.scrollb_head strong');

var scrollBwrap = document.querySelector('.scroll_b_wrap');

scrollBwrap.onmouseenter = function () {
  bPrev.classList.add('active');
  bNext.classList.add('active');
  clearInterval(timerB);
}
scrollBwrap.onmouseleave = function () {
  bPrev.classList.remove('active');
  bNext.classList.remove('active');
  timerB = setInterval(function(){
    next(arrClsB,index,scrollbList,bNavs,'b',changIndex);
  },3800);
}

bNext.onclick = function(){
  next(arrClsB,index,scrollbList,bNavs,'b',changIndex)
}
bPrev.onclick = function(){
  prev(arrClsB,index,scrollbList,bNavs,'b',changIndex)
}

// 第二个轮播图自动播放
timerB = setInterval(function(){
  next(arrClsB,index,scrollbList,bNavs,'b',changIndex);
},3800);

// 索引值显示
function changIndex(){
  bStrong.innerHTML = `${index['b'] + 1}/${arrClsB.length}`;
}

//轮播图通用
// next 下一张
function next(arrCls,indexObj,target,nav,string,callback){
  arrCls.unshift(arrCls.pop());
  indexObj[string] = (indexObj[string] + 1) % arrCls.length;
  changeClass(target,arrCls);
  changeNav(nav,indexObj[string]);
  if(callback) callback();
}
// prev 上一张
function prev(arrCls,indexObj,target,nav,string,callback){
  arrCls.push(arrCls.shift());
  indexObj[string] = indexObj[string] == 0? arrCls.length - 1 : --indexObj[string] ;
  changeClass(target,arrCls);
  changeNav(nav,indexObj[string]);
  if(callback) callback();
}

// change 对应class
function changeClass(target,arrCls){
  for(var i = 0; i < target.length; i++){
    target[i].setAttribute('class',arrCls[i]);
  }
}
// change 对应的导航点
function changeNav(target,index){
  for(var i = 0; i < target.length; i++){
    target[i].classList.remove('active');
  }
  target[index].classList.add('active');
}

// 第三个竖向轮播图
var scorllcWrap = document.querySelector('.bs_wrap');
var scorllcMain = document.querySelector('.bs_main');
var timerC = null;
var indexC = 0;
var lenC = scorllcMain.children.length;
timerC = setInterval(scrollcAuto,6000);

scorllcWrap.onmouseenter = function() {
  clearInterval(timerC);
}
scorllcWrap.onmouseleave = function () {
  timerC = setInterval(scrollcAuto,6000);
}

function scrollcAuto(){
  indexC ++;
  if(indexC == lenC){
    indexC = 0;
    scorllcMain.style.top = '0px';
    return;
  }
  scorllcMain.style.top = scorllcMain.offsetTop - 72 + 'px';
}

// 右半区第一个选项卡
var boardList = document.querySelectorAll('.mes_head a');
var boardCon = document.querySelectorAll('.mes_con');
var boardLen = boardList.length;

for(var i = 0;i < boardLen; i++){
  (function(i){
    boardList[i].onmouseenter = function(){
      for(var j = 0; j < boardLen; j++){
        boardList[j].classList.remove('active');
        boardCon[j].classList.remove('active');
      }
      boardList[i].classList.add('active');
      boardCon[i].classList.add('active');
    }
  })(i)
}

// 右半区第二个选项卡
//可展开的li
var aCollas = document.querySelectorAll('.collas');
// 展开框容器
var oCover = document.querySelector('.cover_list');
// 展开框
var aCoverList = document.querySelectorAll('.c_list');
// 选卡内head
var aCoverHead = document.querySelectorAll('.collas_head');

// hover展开
for(var i = 0; i < aCollas.length; i++){
  aCollas[i].index = i;
  aCoverList[i].index = i;
  aCollas[i].onmouseenter = function () {
    oCover.style.display = 'block';
    for(var i = 0; i < aCoverList.length; i++){
      aCoverList[i].classList.remove('active');
      aCollas[i].classList.remove('active');
    }
    aCoverList[this.index].classList.add('active');
    this.classList.add('active');
  }
  aCoverList[i].onmouseenter = function(){
    aCollas[this.index].classList.add('active');
  }
}

// 展开框移除
var coverClose = document.querySelector('.c_close');
// 所有输入框
var aCoverInp = oCover.querySelectorAll('input[type="text"]');
var inpLen = aCoverInp.length;
coverClose.onclick = function(){
  for(var i = 0; i < aCoverList.length; i++){
    aCollas[i].classList.remove('active');
  }
  for(var i = 0;i < inpLen; i++){
    aCoverInp[i].value = '';
  }
  oCover.style.display = '';
}

// 选项卡内 的选项卡方法

for(var i = 0,len = aCoverHead.length; i < len; i++){
  innerCardTab(aCoverHead[i]);
}

function innerCardTab(aFather){
  var aNav = aFather.querySelectorAll('a');
  var aLen = aNav.length;
  for(var i = 0; i < aLen; i++){
    aNav[i].index = i;
    aNav[i].onmouseenter = function(){
      var _this = this;
      for(var i = 0; i < aLen; i++){
        aNav[i].classList.remove('active');
      }
      aNav[this.index].classList.add('active');
      setTimeout(function(){
        var targetUl = _this.parentNode.nextElementSibling.firstElementChild;
        targetUl.style.left = _this.index * (-330) + 'px';
      },100)
    }
  }
}
  
