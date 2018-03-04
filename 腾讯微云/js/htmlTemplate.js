// 文件核心结构
function fileHtmlInner(data){
	var str = `
	<div class="item" data-file-id = "${data.id}">
			<lable class="checkbox"></lable>
			<div class="file-img">
					<i></i>
			</div>
			<p class="file-title-box">
					<span class="file-title">${data.title}</span>
					<span class="file-edtor">
							<input class="edtor" value="" type="text"/>
					</span>
			</p>
	</div>
	`;
	return str
}
// 单个文件夹完整html
function fileHtml(data){
	var fileHtml = `
		<div class="file-item">
				${fileHtmlInner(data)}
		</div>`;
		return fileHtml
}

// 返回一个文件的Dom结构(新建文件)
function domFile(data){
	var newDiv = document.createElement('div');
	newDiv.className = 'file-item';
	newDiv.innerHTML = fileHtmlInner(data);
	return newDiv
}

// 通过id 渲染 所有子文件区域 html
function createFilesHtml(datas,id){
	let fileHtmls = ``
	
	let childs = dataControl.getChildById(datas,id);//当面目录 文件数据
  
  // 文件html结构获取
  childs.forEach(function(item){
    fileHtmls += fileHtml(item);
  })
	
	return fileHtmls
}

// 生成树形结构
function treeHtml(data,i){
	var treehtmls = '<ul>';
	var childs = dataControl.getChildById(data,i);
	
	childs.forEach(function(item){
		 //获取元素属于第几层  设置padding
		var level = dataControl.getLevelById(data,item.id);
		
		// 判断当前数据有无子数据
		var hasChild = dataControl.hasChilds(data,item.id);
		
		// 处理className 
		var cls = hasChild? 'tree-contro':'tree-contro-none';
		
		 // class:  tree-nav tree-contro tree-contro-none
		treehtmls += `
				<li>
						<div data-file-id = "${item.id}" class="tree-title ${cls}" style="padding-left:${level*14}px">
								<span>
										<strong class="ellipsis">${item.title}</strong>
										<i class="ico"></i>
								</span>
						</div>
						${treeHtml(data,item.id)}
				</li>
				`
	})
	treehtmls += `</ul>`;
	return treehtmls
}

// 生成单挑树形菜单 DOM (新建文件夹)
function createTreeDom(data,obj){
	var newLi = document.createElement('li');
	//获取元素属于第几层  设置padding
  var level = dataControl.getLevelById(data,obj.id);
	newLi.innerHTML = `
					<div data-file-id = "${obj.id}" class="tree-title tree-contro-none" style="padding-left:${level*14}px">
							<span>
									<strong class="ellipsis">${obj.title}</strong>
									<i class="ico"></i>
							</span>
					</div>
					<ul></ul>
			`
	return newLi
}

// 通过id返回导航栏html结构
function createNavHtml(datas,id){
	let dataParents = dataControl.getParents(datas,id).reverse();//导航由大到小
	let len = dataParents.length;
	let navHtml = '';

	// 循环数据拼接navHtml
	dataParents.forEach((item,index)=>{
	 
	 if(index === dataParents.length - 1)return 
	 
	 navHtml += `<a href="javascript:;" style="z-index:${len--}" data-file-id="${item.id}">${item.title}</a>`;
	})

	navHtml += `<span class="current-path" style="z-index:${len --}" >${dataParents[dataParents.length-1].title}</span>`;
	
	return navHtml
}


// 通过Id找到对应的树形菜单  添加className
function positonTreeById(positionId){
	let treeCurrent = document.querySelector(`.tree-title[data-file-id= "${positionId}"]`);
	tools.addClass(treeCurrent,'tree-nav');
}

