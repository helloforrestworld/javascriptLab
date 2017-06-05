
var size = 130, space = 16, len = 4;

var Map = createMap(len, len);

var score = document.querySelector('#score');

// [
//   [0, 2, 0, 0],
//   [2, 0, 0, 0],
//   [0, 0, 0, 0],
//   [0, 0, 0, 0]
// ]

// 生成格子模块
(function (){
  var gridWrap = document.querySelector('.board-grids-wrap');
  var str = ``;
  for(var i=0; i<len; i++){
    for(var j=0; j<len; j++){
      str += `<span class="board-grids-item" style="left:${space + j*(space + size)}px;top:${space + i*(space + size)}px;"></span>`;
    }
  }
  gridWrap.innerHTML = str;
})();

// 生成地图模块
function createMap(x, y){
  var arr = new Array(x);  // var arr = [];
  for(var i=0, len = x; i < x; i++){
    arr[i] = new Array(y).fill(0);
  }
  return arr;
}
  
var startGame = document.getElementById('start');
  
startGame.addEventListener('click', palyGame);

palyGame();

function palyGame(){
	score.innerHTML = 0;
	Map = createMap(len, len);
  initGame();
  createNum();
  createNum();
}
function addScore(points){
	score.innerHTML = Number(score.innerHTML)+points;
}

function initGame(){
  var chessWrap = document.querySelector('.board-chess-wrap');
  var str = ``;
  for(var i=0; i<len; i++){
    for(var j=0; j<len; j++){
      var num = Map[i][j];
      var scale = num ? 1 : 0;
      str += `<span class="board-chess-item" id="chess-${i}-${j}" style="left:${space + j*(space + size)}px;top:${space + i*(space + size)}px;transform:scale(${scale});background-color:${setBg(num)};color:${setColor(num)};">${num}</span>`;
    }
  }
  chessWrap.innerHTML = str;
}
  
function createNum(){
  if(isNoSpace()) return false;
  
  var x = createRn([0, len - 1]);
  var y = createRn([0, len - 1]);
  
  var times = createRn([50, 80]), current = 0;
  
  while(current < times){
    if(Map[x][y] === 0) break;
    x = createRn([0, len - 1]);
    y = createRn([0, len - 1]);
    current ++;
  }
  
  if(current === times){
    for(var i=0; i<len; i++){
      for(var j=0; j<len; j++){
        if(Map[i][j] === 0){
          x = i;
          y = j;
        }
      }
    }
  }
  
  var num = Map[x][y] = 2;
  
  viewChess(x, y, num, Map);
  
  return true;
}

// 判断是否已经没有空间了
function isNoSpace(){
  for(var i=0; i<len; i++){
    for(var j=0; j<len; j++){
      if(Map[i][j] === 0){
        return false;
      }
    }
  }
  return true;
}

function viewChess(x, y, num, data){
  var chess = document.querySelector(`#chess-${x}-${y}`);
  chess.innerHTML = num;
  css(chess, {
    backgroundColor: setBg(num),
    color: setColor(num)
  });
  animation(chess, {
    scale: 1
  });
}

window.addEventListener('keydown', function (e){
  var keyCode = e.keyCode, arr = [37, 38, 39, 40]
  if(arr.indexOf(keyCode) !== -1){
    e.preventDefault()
  }
  
  switch(keyCode){
    case 37:
      if(moveToLeft()){
        createNum();
        gameOver();
      }
      break;
    case 39:
    	if(moveToRight()){
    		createNum();
    		gameOver();
    	}
    	break;
    case 38:
    	if(moveToTop()){
    		createNum();
    		gameOver();
    	}
    	break;
    case 40:
    	if(moveToBottom()){
    		createNum();
    		gameOver();
    	}
  }
});
  
function moveToLeft(){
  if(canNotMoveToLeft()) return false;
  
  for(var i=0; i<len; i++){
    for(var j=1; j<len; j++){
      if(Map[i][j] !== 0){
        for(var k=0; k<j; k++){
          // '中间没有东西'
          if(Map[i][k] === 0 && isNoBlockX(i, k, j, Map)){
            chessMove(i, j, i, k);
            Map[i][k] = Map[i][j];
            Map[i][j] = 0;
          }
          if(Map[i][k] === Map[i][j] && isNoBlockX(i, k, j, Map)){
            chessMove(i, j, i, k);
            Map[i][k] += Map[i][j];
            addScore(Map[i][k]);
            Map[i][j] = 0;
            // 积分
          }
        }
      }
    }
  }
  return true;
}
function moveToRight(){
  if(canNotMoveToRight()) return false;
  for(var i=0; i<len; i++){
    for(var j=len-2; j>=0; j--){
      if(Map[i][j] !== 0){
        for(var k=len-1; k>j; k--){
          // '中间没有东西'	
          if(Map[i][k] === 0 && isNoBlockX(i, k, j, Map)){
            chessMove(i, j, i, k);
            Map[i][k] = Map[i][j];
            Map[i][j] = 0;
          }
          if(Map[i][k] === Map[i][j] && isNoBlockX(i, k, j, Map)){
            chessMove(i, j, i, k);
            Map[i][k] += Map[i][j];
            addScore(Map[i][k]);
            Map[i][j] = 0;
            // 积分
          }
        }
      }
    }
  }
  return true;
}
function moveToTop(){
  if(canNotMoveToTop()) return false;
  for(var i=1; i<len; i++){
    for(var j=0; j<len; j++){
      if(Map[i][j] !== 0){
        for(var k=0; k<i; k++){
          // '中间没有东西'
          if(Map[k][j] === 0 && isNoBlockY(j, k, i, Map)){
            chessMove(i, j, k, j);
            Map[k][j] = Map[i][j];
            Map[i][j] = 0;
          }
          if(Map[k][j] === Map[i][j] && isNoBlockY(j, k, i, Map)){
            chessMove(i, j, k, j);
            Map[k][j] += Map[i][j];
            addScore(Map[k][j]);
            Map[i][j] = 0;
          }
        }
      }
    }
  }
  return true;
}
function moveToBottom(){
  if(canNotMoveToBottom()) return false;
  for(var i=0; i<len-1; i++){
    for(var j=0; j<len; j++){
      if(Map[i][j] !== 0){
        for(var k=len-1; k>i; k--){
          // '中间没有东西'
          if(Map[k][j] === 0 && isNoBlockY(j, k, i, Map)){
            chessMove(i, j, k, j);
            Map[k][j] = Map[i][j];
            Map[i][j] = 0;
          }
          if(Map[k][j] === Map[i][j] && isNoBlockY(j, k, i, Map)){
            chessMove(i, j, k, j);
            Map[k][j] += Map[i][j];
            addScore(Map[k][j]);
            Map[i][j] = 0;
          }
        }
      }
    }
  }
  return true;
}


function canNotMoveToLeft(){
  for(var i=0; i<len; i++){
    for(var j=1; j<len; j++){
      if(Map[i][j] !== 0){
        if(Map[i][j-1] == 0 || Map[i][j-1] == Map[i][j]){
          return false;
        }
      }
    }
  }
  return true;
}

function canNotMoveToRight(){
	for(var i=0; i<len;i++){
		for(var j=0;j<len-1;j++){
			if(Map[i][j]!==0){
				if(Map[i][j+1] == 0||Map[i][j+1] == Map[i][j]){
					return false;
				}
			}
		}
	}
	return true;
}
function canNotMoveToTop(){
	for(var i=1; i<len;i++){
		for(var j=0;j<len;j++){
			if(Map[i][j]!==0){
				if(Map[i-1][j] == 0||Map[i-1][j] == Map[i][j]){
					return false;
				}
			}
		}
	}
	return true;
}
function canNotMoveToBottom(){
	for(var i=0; i<len-1;i++){
		for(var j=0;j<len;j++){
			if(Map[i][j]!==0){
				if(Map[i+1][j] == 0||Map[i+1][j] == Map[i][j]){
					return false;
				}
			}
		}
	}
	return true;
}

// 判断横向移动的时候中间有木有东西
function isNoBlockX(row, start, end, data){
  for(var i=start+1; i<end; i++){
    if(data[row][i] != 0){
      return false;
    }
  }
  return true;
}
//判断纵向移动的时候中间有木有东西
function isNoBlockY(col,start,end,data){
	for(var i=start+1;i<end;i++){
		if(data[i][col] !=0){
			return false;
		}
	}
	return true;
}


function chessMove(startX, startY, endX, endY){
  var chess = document.querySelector(`#chess-${startX}-${startY}`);
  animation(chess, {
    left: space + endY * (size + space),
    top: space + endX * (size + space)
  }, initGame);
}

function gameOver(){
	if(canNotMoveToLeft()&&canNotMoveToRight()&&canNotMoveToTop()&&canNotMoveToBottom()){
		alert('游戏结束');
	}
}
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
