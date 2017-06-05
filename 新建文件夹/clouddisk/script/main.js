
/*问题一：鼠标画框报错 ？
  问题二：  一个一个组织冒泡？
  问题三： 数据的id 的改名方式
 * */


var files = user_data.files;
var fileBox = document.querySelector('.file-container');
var navBox = document.querySelector('.nav');
var banner = document.querySelector('.banner');
var nowId; //被选中的id
load(0);
function load(currentId){
	
	
	var current  = getDataById(files,currentId);
	var currentPar = getDataParent(files,currentId);
	
	//生成文件夹
	fileBox.innerHTML = creatFiles(current.children);
	//生成导航栏
	navBox.innerHTML = creatNavs(currentPar);	
	
}



//事件委托 （导航项目和文件的点击事件）;

//文件的点击事件

fileBox.addEventListener('click',function(e){
	var target = e.target;
	e.preventDefault();
	if(target.nodeName ==='A'){
		var currentId = Number(target.dataset.index)||target.dataset.index;
		if(currentId==='0'){
			currentId=0;
		}
		nowId=currentId; //存放已经选中的文件夹 由于重新渲染的时候将checked改成false
		var current = getDataById(files,currentId); //找到当前的 添加checked
		current.checked = target.classList.toggle('active')?true:false; //checked 添加在数据身上
		target.parentNode.checked = target.parentNode.classList.toggle('active')?true:false;//边框  //checked添加在文件框身上 
																							//后面重命名功能用到
		
	}else if(target.className!=='file-container'&&target.nodeName!=='INPUT'){
		
		var currentId = Number(target.dataset.index)||target.dataset.index;
		var current = getDataById(files,currentId); 
		//没有被选中才可以进入文件夹
		if(!current.checked){
			
			if(nowId){
				//数据的checked属性初始化;
				var checkedPar = getDataParent(files,nowId)[1]; //找到它父级 循环children 数据里面的checked = false 
				for(var i =0;i<checkedPar.children.length;i++){
					checkedPar.children[i].checked = false;
				}
			}
			
			load(currentId);
		};
	}
},false);

//导航
navBox.addEventListener('click',function(e){
	
	var target = e.target;
	
	if(target.nodeName==='A'){
		var currentId = Number(target.dataset.index)||target.dataset.index;
		if(currentId==='0'){
			currentId=0;
		}
		
		if(nowId){
		//数据的checked属性初始化;
			var checkedPar = getDataParent(files,nowId)[1]; //找到它父级 循环children 数据里面的checked = false 
			for(var i =0;i<checkedPar.children.length;i++){
				checkedPar.children[i].checked = false;
			}
			nowId = undefined;
		}
		load(currentId);
		
	}
},false);


//新建文件夹

var addFile = document.querySelectorAll('.btn button')[1];

addFile.onclick = function(){
	
	var navs = navBox.querySelectorAll('a');
	var len = fileBox.querySelectorAll('.fileitem').length;
	
	var currentId = Number(navs[navs.length-1].dataset.index)||navs[navs.length-1].dataset.index;
	if(currentId==='0'){
		currentId=0;
	}
	var current = getDataById(files,currentId);
	
	var obj = {
		name:'新建文件夹',
		id: currentId+'-'+len,
		pId:currentId,
		children:[]
	};
	
	current.children.push(obj);
	if(nowId){
		var checkedPar = getDataParent(files,nowId)[1]; //找到它父级 循环children 数据里面的checked = false 
		for(var i =0;i<checkedPar.children.length;i++){
			checkedPar.children[i].checked = false;
		}
	}
	nowId = undefined;
	load(currentId);
	
}


//右键自定义菜单

var menu = document.querySelector('.menu');
var fileWrap = document.querySelector('.file-box');
fileWrap.addEventListener('contextmenu',function(e){
	e.preventDefault();
	
	if(e.target.className === 'file-container'){
		menu.style.display = 'flex';
		var l,t;
		var x = e.offsetX,y = e.offsetY;
		
		if(fileBox.offsetWidth - x<= menu.offsetWidth){
			l =  fileBox.offsetWidth-menu.offsetWidth;
		}else{
			l = x;
		};
		
		if(fileBox.offsetHeight - y <= menu.offsetHeight){
			t = fileBox.offsetHeight - menu.offsetHeight;
		}else{
			t = y;
		};
		//防止菜单超出
		
		menu.style.opacity = '1';
		menu.style.left = l+'px';
		menu.style.top  = t + 'px';
	}
})

//点击fileWrap 菜单隐藏
fileWrap.addEventListener('click',function(e){
	menu.style.display = 'none';
})


	//菜单功能实现
var menuBtns  =  menu.querySelectorAll('span');
	
	//删除
menuBtns[0].onclick = function(e){
	
	if(nowId){
		var checkedPar = getDataParent(files,nowId)[1]; //找到它父级 循环children 数据里面的checked = false 
		for(var i =0;i<checkedPar.children.length;i++){
			if(checkedPar.children[i].checked===true){
				checkedPar.children.splice(i,1);
				i--;
			}
		}
		load(checkedPar.id);
		nowId = undefined;
	}
}

	//新建
	
menuBtns[1].onclick = addFile.onclick;

	//重命名
menuBtns[2].onclick = function(e){
	var fileCheck = fileBox.children;
	for(var i = 0;i<fileCheck.length;i++){
		(function(i){
		if(fileCheck[i].checked){
			var nameDiv = fileCheck[i].querySelector('.name');
			nameDiv.lastElementChild.value = nameDiv.firstElementChild.innerHTML;
			nameDiv.firstElementChild.style.display = 'none';
			nameDiv.lastElementChild.style.display = 'block';
			nameDiv.lastElementChild.select();
			
			//点击文档  确认重命名
			fileWrap.addEventListener('click',function(e){
				if(e.target.className === 'file-container'){
					
					if(!fileCheck[i])return;//如果那个元素已经被删除了  直接返回 防止报错
					
					nameDiv.firstElementChild.innerHTML = nameDiv.lastElementChild.value; //确认新名字
					nameDiv.firstElementChild.style.display = 'block';  //文字span显示
					nameDiv.lastElementChild.style.display = 'none';	//文本框影藏
					
					fileCheck[i].checked = false;					// 文件框 checked = false
					fileCheck[i].classList.remove('active');		//文件框样式取消
					fileCheck[i].firstElementChild.classList.remove('active'); //选择按钮样式取消
					
					//数据层也改变
					var currentId = Number(nameDiv.firstElementChild.dataset.index)||nameDiv.firstElementChild.dataset.index;
					if(currentId==='0'){
						currentId=0;
					}
					getDataById(files,currentId).name = nameDiv.firstElementChild.innerHTML; //存放新名称
					getDataById(files,currentId).checked = false;    // 数据中的checked = false
					
				}
			})
		}})(i)
	}
}

//鼠标画框

fileWrap.onmousedown =function(e){
	
	e.preventDefault();
//	console.log(e.target);
	var startX = e.offsetX,startY = e.offsetY;//鼠标点击时的坐标
	var div = document.createElement('div');
	div.style.position = 'absolute';
	div.style.height = div.style.width = 0;
	div.style.top = '-9999px';
	div.style.left = '-9999px';
	div.style.border = '1px solid black';
	div.style.background = 'rgba(180,180,180,0.6)'
		
	fileWrap.appendChild(div);
		
		
	//div各种清除冒泡
	div.addEventListener('mousemove',function(e){
		e.stopPropagation();			
	})
	div.addEventListener('mousedown',function(e){
		e.stopPropagation();			
	})
	menu.addEventListener('mousemove',function(e){
		e.stopPropagation();
	})
	
	//碰撞检测
	var fileItems = fileWrap.querySelectorAll('.fileitem');
	
	fileWrap.onmousemove = function(e){
		fileBox.style.zIndex = -1;
		
		var currentX = e.offsetX,currentY = e.offsetY;
		div.style.height =  Math.abs(currentY - startY) + 'px';
		div.style.width =  Math.abs(currentX - startX) + 'px';
		div.style.top =  Math.min(currentY,startY) + 'px';
		div.style.left =  Math.min(currentX,startX) + 'px';
		
		
		//碰撞检测
		for(var i = 0 ;i<fileItems.length;i++){
			(function(i){
				//在文件框身上不能画框
				fileItems[i].onmousedown = function(e){
					e.stopPropagation();
				}
				//防止冒泡删除到删除不存在的div画框
				fileItems[i].onmouseup = function(e){
					e.stopPropagation();
				}
				/**/
				if(duang(fileItems[i],div)){
					var target = fileItems[i];
					var currentId = Number(target.dataset.index)||target.dataset.index;
					if(currentId==='0'){
						currentId=0;
					}
					nowId=currentId; //存放已经选中的文件夹 由于重新渲染的时候将checked改成false
					
					target.classList.add('active');             //文件框样式
					target.firstElementChild.classList.add('active'); //选择按钮样式
					
					var current = getDataById(files,currentId);
					current.checked = true; //找到当前的数据 添加checked
					target.checked = true;//找到当前的文件框元素 添加checked 用于重命名
				}
			})(i)
		}
	}
		
	//鼠标上抬  画框移除
	
//	document.addEventListener('mouseup',function(e){
//		fileBox.style.zIndex = 0;
//		fileWrap.onmousemove = null;
//		fileWrap.removeChild(div);
//	})
	document.onmouseup = function(e){
		fileBox.style.zIndex = 0;
		fileWrap.onmousemove = null;
		fileWrap.removeChild(div);
	
	};
	
	//防止点到banner 的时候冒泡document
	banner.onmouseup = function(e){
		e.stopPropagation();
	};
	//防止点到导航条 的时候冒泡document
	navBox.onmouseup = function(e){
		e.stopPropagation();
	}

}











	

