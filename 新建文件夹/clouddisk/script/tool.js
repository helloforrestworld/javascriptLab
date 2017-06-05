//根据id找到 目标对象
function getDataById(data,id){
	var current = null,len = data.length,i;
	
	for(i = 0;i<len;i++){
		
		if(data[i].id === id){
			current = data[i];
			break;
		};
		
		if(!current&&data[i].children.length){
			
			current = getDataById(data[i].children,id);
			
			if(current)break;
		};
		
	};
	
	return current;
}


//根据id找到目标以及目标所有父级

function getDataParent(data,id){
	if(typeof id ==='undefined')return null;
	var parent = [];
	var current = getDataById(data,id);
	
	parent.push(current);
	parent = parent.concat(getDataParent(data,current.pId));
	return parent;
}


//碰撞检测
function duang(current, target){
      var currentRect = current.getBoundingClientRect(),
          targetRect = target.getBoundingClientRect();
        
      // 拿到当前拖拽元素四个边距离文档左侧和上侧的绝对距离
      var currentL = currentRect.left,
          currentT = currentRect.top,
          currentR = currentRect.right,
          currentB = currentRect.bottom;
          
      var targetL = targetRect.left,
          targetT = targetRect.top,
          targetR = targetRect.right,
          targetB = targetRect.bottom; 
          
      return currentR >= targetL && currentB >= targetT && currentL <= targetR && currentT <= targetB;
}