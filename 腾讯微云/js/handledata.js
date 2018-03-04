var dataControl = {
	//获取这个id下所有的子数据
	getChildById:function (arr,pid){
		var newArr = [];
		for( var i = 0; i < arr.length; i++ ){
			if( arr[i].pid == pid ){
				newArr.push(arr[i]);
			}
		};

		return newArr;
	},
	//找到当前数据的所有父级的name名字
	getParentsNameAll: function (currentId){
		return getParents(currentId).map(function (item){
			return item.name
		});
	},
	//获取当前id在第几层
	getLevelById:function (data,id){
		return dataControl.getParents(data,id).length;
	},
	//这个id是否有子元素？？？
	hasChilds:function (data,id){
		return dataControl.getChildById(data,id).length !== 0;
	},
	//获取当前id的所有的父级
	getParents : function (data,currentId){
		var arr = [];
		for( var i = 0; i < data.length; i++ ){
			if( data[i].id == currentId ){
				arr.push(data[i]);
				arr = arr.concat(dataControl.getParents(data,data[i].pid))
				break;
			}
		}
		return arr;
	},
	getChilds:function (data,currentId,arr,bl){
		/*
		 bl代表是否包含当前元素
		 */
		if( arr.constructor === Boolean ){
			bl = arr;
			arr = null;
		}
		var arr = arr || [];

		var childs = dataControl.getChildById(data,currentId);
		if( bl ){
			for( var j = 0; j < data.length; j++ ){
				if( data[j].id == currentId ){
					arr.push(data[j]);
				}
			}
		}
		for( var i = 0; i < childs.length; i++ ){
			arr.push(childs[i]);
			dataControl.getChilds(data,childs[i].id,arr)
		}
		return arr;
	},
	//修改自上而下的数据的id 数据的第一个为总的文件夹
	changeDataId:function (newChild,item,pid){
		//改变数据的id
		var prevId = item.id;
		var prevPid = item.pid;
		var newId = random();
		var newPid = pid;
		item.id = newId;
		item.pid = newPid;
		for( var i = 1; i < newChild.length; i++ ){
			if( newChild[i].pid == prevId ){
				dataControl.changeDataId(newChild,newChild[i],newId);
			}
		}
	},
	changeDataById:function (newChild,pid){
		//把数据重新拷贝一份
		var extendChild = tools.extend(newChild,true);
		dataControl.changeDataId(extendChild,extendChild[0],pid);
		return 	extendChild;
	},
	//判断一个数组中是否包含另一个项
	contains:function (arr,item){
		for( var j = 0; j < arr.length; j++ ){
			if( arr[j] === item ) return true
		}
		return false;
	},
	//要删除的数据，传入一个数组
	delectDataByData:function (data,childs){
		return data.filter(function (item){
			return !dataControl.contains(childs,item)
		});
	},
	//数据中是否已经存在这个名字
	isNameExsit:function (data,id,names,currentId){
		var childs = dataControl.getChildById(data,id);
		for( var i = 0; i < childs.length; i++ ){
			if( childs[i].name === names && childs[i].id != currentId ){
				return true;
				break;
			}
		}
		return false;
	},
	//修改某个id的名字
	changeNameById:function (data,id,names){
		for( var i = 0; i < data.length; i++ ){
			if( data[i].id == id ){
				data[i].name = names;
				return true;
			}
		}
		return false;	
	}
};