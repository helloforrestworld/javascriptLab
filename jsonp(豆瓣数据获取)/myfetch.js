
function fetch(opt){
	let {type} = opt;
	if(type === 'ajax'){
	  return new CreatAjax(opt);
	}
	if(type === 'jsonp'){
	  return new CreatJsonp(opt);
	}
}

class CreatAjax{
	constructor(opt){
		if( typeof opt.url == 'undefined'){
			throw new Error('url must be included at opt');
		}
		this.method = 'get';
		this.data =  {};
		this.dataType = 'json';
		Object.assign(this,opt);
		return this;
	}
	init(acceptType = ''){
		let {url,data,method,dataType} = this;
		let dataForm  = formData(data);
		method = method.toLowerCase();
		dataType = dataType.toLowerCase();
		acceptType = acceptType.toLowerCase();
	
		return Promise.resolve({
			then(resolve,reject){ 
				const xhr = new XMLHttpRequest();
				if(method === 'get'){
					url += `?`+ dataForm;
				}
				xhr.open(method,url,true);
				if(method === "post"){
					switch(dataType){
						case 'json':
						xhr.setRequestHeader('Content-Type', 'application/json');
						xhr.send(JSON.stringify(data));
						break;
						case 'form':
						xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
						xhr.send(dataForm);
						break;
						case 'file':
						xhr.setRequestHeader('X-Requested-With','XMLHttpRequset');
						xhr.send(data);
						break;
					}
				}else{
					xhr.send();
				}
				xhr.onload = function(){
					let {status,responseText} = this;
					if((status>=200&&status<300) ||  status == 304 ){
						resolve( acceptType== 'json'? JSON.prase(responseText):responseText );											
					}else{
						reject(status);
					}
				}
			}
		})
	}
}


class CreatJsonp{
	constructor(opt){
		if(typeof opt.url === 'undefined '){
			throw new Error('url must be included ad opt');
		};
		this.method = 'get';
		this.cb = 'cb';
		this.timeout = 10000;
		this.data = {};
		Object.assign(this,opt);
		return this;
	}
	init(dataType = ''){
		let {url,cb,data,timeout} = this;
		dataType = dataType.toLowerCase();
		
		return  Promise.resolve(
			{
				then(res,rej){
					let callBackName = 'cb' + Date.now();
					let script = document.createElement('script');
				    data[cb]  =  callBackName;
					data =  formData(data);
					url +=  '?' + data ;
					script.setAttribute('src' , url) 
					window[callBackName] = function(data){    //在window下面挂载 这个函数
						res(dataType==='json'? JSON.parse(data):data);
						delete window[callBackName];
						document.body.removeChild(script)  	//清除遗留的方法和标签
						clearTimeout(script.timer);
					}
					
					script.timer = setTimeout(()=>{
						rej( new Error('Server do not response'));
						delete window[callBackName];
						document.body.removeChild(script)  	//清除遗留的方法和标签
					},timeout)
					
					document.body.appendChild(script);		//这里已经就发送请求了,返回的就是 执行这个函数，然后把数据当成 参数传到里面
				}
			}
		)
	}
}


function formData(data){
	let query = [];
	for(let key in data ){
		query.push( `${ encodeURIComponent(key) }=${ encodeURIComponent(data[key]) } `)
	}
	return query.join('&');	
}
