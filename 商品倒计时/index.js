function $(v){
				if(typeof v === 'function'){
					window.onload = v;
				}else if(typeof v==='string'){
					return document.getElementById(v);
				}else if(typeof v=='object'){
					return v;
				}
			}

function getStyle(obj,attr){
				return  obj.currentStyle? obj.currentStyle[attr]:getComputedStyle(obj)[attr];
			}

function doMove(obj,attr,dir,tar,endFn){
					clearInterval(obj.timerMov)   
					dir = parseInt(getStyle(obj,attr))<tar?dir:-dir;  
					obj.timerMov = setInterval(function(){
						var speed = parseInt(getStyle(obj,attr))+dir;
						if(speed<tar&&dir<0||speed>tar&&dir>0){
							speed=tar;
						}
						obj.style[attr] =speed +'px'
						if(speed==tar){
							clearInterval(obj.timerMov)
							endFn&&endFn();
						}
					},20)
			}

function shake(obj,attr,endFn){
					var pos = parseInt(getStyle(obj, attr));
					var num = 0;
					var arr = []; //[20 , -20 ,18,-18..........0]
					for (var i = 20; i > 0; i -= 2) {
						arr.push(i, -i);
					}
					arr.push(0);
					obj.timerSk = setInterval(function() {
						obj.style[attr] = pos + arr[num] + 'px';
						num++;
						if (num == arr.length) {
							clearInterval(obj.timerSk);
							endFn&&endFn();
						}
					}, 20)
				}

function drop(obj,tar,endFn){
					clearInterval(obj[0].timerDp);
					obj[0].timerDp = setInterval(function(){
						doMove(obj[num],'top',20,tar)
						num++;
						if(num==obj.length){
							clearInterval(obj[0].timerDp)
							endFn&&endFn();
						}
					},100)	//用的时候记得定义num
				}
function fadeOut(obj,dir,tar,endFn){
					clearInterval(obj.timerFad)
					dir=parseFloat( getStyle(obj,'opacity'))>tar?-dir:dir;
					obj.timerFad= setInterval(function(){
						var speed  = parseFloat( getStyle(obj,'opacity')) + dir;
						if(speed>tar&&dir>0||speed<tar&&dir<0){
							speed=tar;
						}
						obj.style.opacity = speed;
						if(speed==tar){
							clearInterval(obj.timerFad);
							endFn&&endFn();
						}
					},20)
				}
function index(arr,ele,beg){
				var loca = [];
				for(var i=beg;i<arr.length;i++){
					if (arr[i] == ele ){
						loca.push(i)
					}
				}
				if(loca!=0){
					return loca
				}else{
					return -1;
				}
			}