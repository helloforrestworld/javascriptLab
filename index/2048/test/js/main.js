(function (d){
  // -------------------------------------
  var len = 4;
  
  var data = createMap(len, len);
  
  console.log(data);
  
  var start = document.querySelector('#start');
  
  var num = 0;
  
  // -------------------------------------
  // 初始化数字试图
  init();
  
  start.onclick = function (){
    data = createMap(len, len);
    init()
  };
  
  // -------------------------------------
  
  // 创建格子背景
  (function (){
    var grids = d.querySelector('.grids');
    for(var i=0; i<len; i++){
      for(var j=0; j<len; j++){
        var item = d.createElement('div');
        item.className = 'grid-item';
        item.id = `grid-${i}-${j}`;
        item.style.left = setPos(i, j).x;
        item.style.top = setPos(i, j).y;
        grids.appendChild(item);
      }
    }
  })();
  
  // 初始化视图
  function init(){
    num = 0;
    updateScore(num);
    updateView();
    randomCreateNum();
    randomCreateNum();
  }
  
  // 更新和创建数字试图
  function updateView(){
    var figureHtml = document.querySelector('.figures');
    var str = '', n, color, html;
    for(var i=0; i<len; i++){
      for(var j=0; j<len; j++){
        if(!data[i][j]){
          n = 0;
          color = '';
          html = '';
        }else{
          n = 1;
          color = `background:${setBg(data[i][j])};color:${setNc(data[i][j])}`;
          html = data[i][j];
        }
        str += `<div class="figure-item" id="figure-${i}-${j}" style="transform:scale(${n});left:${setPos(i, j).x};top:${setPos(i, j).y};${color}">${data[i][j]}</div>`;
      }
    }
    figureHtml.innerHTML = str;
  }
  
  // 更新分数
  function updateScore(num){
    var score = document.querySelector('#score');
    console.log(score);
    score.innerHTML = num;
  }
  
  // --------------------------------------
  
  // 设置不同格子的位置
  function setPos(x, y){
    return {
      x: 20 + 120 * y + 'px',
      y: 20 + 120 * x + 'px'
    }
  }
  
  // 不同的数字设置不同的颜色
  function setBg(n){
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
  }
  // 数字颜色
  // 小于等于4的都是棕色，其它全部是白色
  function setNc(n){
    return n <= 4 ? '#776e65' : '#fff';
  }
  
  // 创建地图
  function createMap(x, y){
    var arr = new Array(x);
    for(var i=0,len=arr.length; i<len; i++){
      arr[i] = new Array(y).fill(0);
    }
    return arr;
  }
  
  // ----------------------------------------------
  
  // 生成范围随机数
  function createRn(arr){
    var max = Math.max(...arr),
        min = Math.min(...arr);
    return Math.round(Math.random() * (max - min) + min);
  }
  
  // 随机生成2和4
  function randomCreateNum(){
    // 生成之前判断是否有空位
    if(!hasSpace()){
      return false;
    }
    var x = createRn([0, len-1]),
        y = createRn([0, len-1]);
    // 判断随机的x,y位置是否已经是不是0的数字
    // 如果已经有其它数字就重新赋值
    while(1){
      if(data[x][y] == 0){
        break;
      }
      x = createRn([0, len-1]);
      y = createRn([0, len-1]);
    }
    // 随机概率50%产生2或者4
    var num = data[x][y] = Math.random() < 0.5 ? 2 : 4;
    //生成后显示数字
    showNumItem(x, y, num);
    // 如果执行成功返回 true
    return true;
  }
  
  // 判断当前是否还有空余位置
  function hasSpace(){
    var has = false;
    data.forEach(function(item, i) {
      item.forEach(function(item, i) {
        if(item == 0){
          has = true;
        }
      });
    });
    return has;
  }
  
  // 显示对应的数字格子
  function showNumItem(x, y , num){
    var item = d.querySelector(`#figure-${x}-${y}`);
    item.style.background = setBg(num);
    item.style.color = setNc(num);
    item.style.transition = 'transform 50ms linear';
    item.style.transform = 'scale(1)';
    item.innerHTML = num;
  }
  
  // --------------------------------------------------
  //控制键盘移动棋子
  document.onkeydown = function (e){
    var keyCode = e.keyCode;
    
    switch(keyCode){
      case 37:
        if(moveLeft()){
          randomCreateNum();
          gameOver();
        }
        break;
      case 38:
        if(moveUp()){
          randomCreateNum();
          gameOver();
        }
        break;
      case 39:
        if(moveRight()){
          randomCreateNum();
          gameOver();
        }
        break;
      case 40:
        if(moveDown()){
          randomCreateNum();
          gameOver();
        }
        break;
    }
    
    return false;
  };
  
  // ------------------------------------------------------
  //游戏结束
  function gameOver(){
    if(!hasSpace() && !canMove()){
      alert('笨蛋!');
    }
  }
  function canMove(){
    if(toLeft() || toUp() || toDown() || toRight()){
      return true;
    }
    return false;
  }
  // ------------------------------------------------------
  // 向左移动
  function moveLeft(){
    if(!toLeft()){
      return false;
    }
    // 移动棋子
    for(var i=0; i<len; i++){
      for(var j=1; j<len; j++){
        if(data[i][j] != 0){
          for(var k=0; k<j; k++){
            if(data[i][k] == 0 && blockX(i, k, j, data)){
              startMove(i, k, i, j);
              data[i][k] = data[i][j];
              data[i][j] = 0;
            }
            if(data[i][k] == data[i][j] &&  blockX(i, k, j, data)){
              startMove(i, k, i, j);
              data[i][k] += data[i][j];
              data[i][j] = 0;
              num += data[i][k];
              updateScore(num)
            }
          }
        }
      }
    }
    updateView();
    return true;
  }
  
  // 判断是否能向左移动
  function toLeft(){
    var ret = false;
    for(var i=0; i<len; i++){
      // 向左移动的时候不用考虑最左侧一排
      for(var j=1; j<len; j++){
        if(data[i][j] != 0){
          if(data[i][j-1] == 0 || data[i][j-1] == data[i][j]){
            ret = true;
          }
        }
      }
    }
    return ret;
  }
  
  // 向右移动
  function moveRight(){
    if(!toRight()){
      return false;
    }
    for(var i=0; i<len; i++){
      for(var j=len-2; j>=0; j--){
        if(data[i][j] != 0){
          for(var k=len-1; k>j; k--){
            if(data[i][k] == 0 && blockX(i, j, k, data)){
              startMove(i, j, i, k);
              data[i][k] = data[i][j];
              data[i][j] = 0;
            }
            if(data[i][k] == data[i][j] && blockX(i, j, k, data)){
               startMove(i, j, i, k);
              data[i][k] += data[i][j];
              data[i][j] = 0;
              num += data[i][k];
              updateScore(num)
            }
          }
        }
      }
    }
    updateView();
    return true;
  }
  
  // 判断是否能向右移动
  function toRight(){
    var ret = false;
    for(var i=0; i<len; i++){
      for(var j = len-2; j>=0; j--){
        if(data[i][j] != 0){
          if(data[i][j+1] == 0 || data[i][j+1] == data[i][j]){
            ret = true;
          }
        }
      }
    }
    return ret;
  }
  
  // -----------------------------------------------------------
  // 判断是否可以横向移动
  function blockX(row, start, end, data){
    for(var i=start+1; i<end; i++){
      if(data[row][i] !=0 ){
        return false;
      }
    }
    return true;
  }
  // -----------------------------------------------------------
  // 向上移动
  function moveUp(){
    if(!toUp()){
      return false;
    }
    for(var j=0; j<len; j++){
      for(var i=1; i<len; i++){
        if(data[i][j] != 0){
          for(var k=0; k<i; k++){
            if(data[k][j] == 0 && blockY(j, k, i, data)){
              startMove(i, j, i, k);
              data[k][j] = data[i][j];
              data[i][j] = 0;
            }
            if(data[k][j] == data[i][j] && blockY(j, k, i, data)){
               startMove(i, j, i, k);
              data[k][j] += data[i][j];
              data[i][j] = 0;
              num += data[k][j];
              updateScore(num)
            }
          }
        }
      }
    }
    updateView();
    return true;
  }
  
  // 判断是否能向上移动
  function toUp(){
    var ret = false;
    for(var j=0; j<len; j++){
      for(var i = 1; i<len; i++){
        if(data[i][j] != 0){
          if(data[i-1][j] == 0 || data[i-1][j] == data[i][j]){
            ret = true;
          }
        }
      }
    }
    return ret;
  }

  // 向下移动
  function moveDown(){
    if(!toDown()){
      return false;
    }
    for(var j=0; j<len; j++){
      for(var i=len-2; i>=0; i--){
        if(data[i][j] != 0){
          for(var k=len-1; k>i; k--){
            if(data[k][j] == 0 && blockY(j, i, k, data)){
              startMove(i, j, i, k);
              data[k][j] = data[i][j];
              data[i][j] = 0;
            }
            if(data[k][j] == data[i][j] && blockY(j, i, k, data)){
               startMove(i, j, i, k);
              data[k][j] += data[i][j];
              data[i][j] = 0;
              num += data[k][j];
              console.log(num);
              updateScore(num);
            }
          }
        }
      }
    }
    updateView();
    return true;
  }
  
  // 判断是否能向下移动
  function toDown(){
    var ret = false;
    for(var j=0; j<len; j++){
      for(var i = len - 2; i>=0; i--){
        if(data[i][j] != 0){
          if(data[i+1][j] == 0 || data[i+1][j] == data[i][j]){
            ret = true;
          }
        }
      }
    }
    return ret;
  }
  
  
  // -----------------------------------------------------------
  // 判断是否可以纵向移动
  function blockY(cell, start, end, data){
    for(var i=start+1; i<end; i++){
      if(data[i][cell] !=0 ){
        return false;
      }
    }
    return true;
  }
  
  // -----------------------------------------------------------
  // 移动棋子
  function startMove(startX, startY, endX, endY){
    var item = d.querySelector(`#figure-${startX}-${startY}`);
    var pos = setPos(endX, endY);
    item.style.left = pos.x;
    item.style.top = pos.y;
  };
})(document)