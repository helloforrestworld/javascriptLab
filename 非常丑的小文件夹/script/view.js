

function creatFiles(data){
	var str = ``,i,len = data.length;
	
	for(i=0;i<len;i++){
		
		str += `<div class="fileitem" data-index="${data[i].id}">
					<a class="check" data-index="${data[i].id}"></a>
					<div class="pic" data-index="${data[i].id}"></div>
					<div class="name"data-index="${data[i].id}">
						<span data-index="${data[i].id}">${data[i].name}</span>
						<input type="text" value="新建文件夹" />
					</div>
				</div>`
	}
	
	return str;
};

function creatNavs(data){
	data.pop();
	var str = ``,i,len = data.length;
	
	for(i = len-1 ; i>=0 ; i--){
		if(!i){
			str +=`<a href="javascript:;" data-index = "${data[i].id}"> ${data[i].name}</a>`;
			break;
		}
		str += `<a href="javascript:;" data-index = "${data[i].id}"> ${data[i].name}></a>`;
	}
	
	return str;
}
