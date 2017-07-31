# Ajax

标签（空格分隔）： 笔记整理

---
[TOC]
### 从输入网址开始：
- 在学习ajax之前，你应该先了解一下，当你在浏览器的地址栏输入网址按下回车，然后到页面显示的这个过程都发生了什么。
>- 在地址栏上输入了URL，也就是(Uniform Resource Locator:统一资源定位符)。
- 第一步就是浏览器对你输入的地址进行解析，主要作用就是分析你要对哪个服务器上面的那个文件路径进行访问。
    >> 例如：http://www.abcd.com/path/user/target.html 
    - 意思就是找到www.abcd.com这台服务器上 'path/user'的target.html
    - 对地址进行DNS解析
    - DNS服务器的大接力
    - 最终找到目标服务器，然后建立连接
    - 处理请求 然后返回用户需要的数据

### 用node.js简单搭建一个服务器：
- 安装node.js
- 新建一个js文件 ，如test.js，  代码如下：
```
const http = require('http'); //加载http模块
const fs  = require('fs');  //读取文件模块
const path = require('path'); //识别路径模块

http.createServer((request,response)=>{
	
	let url =  request.url;
	
	if(url === '/'){  //指的是根目录
					             //当前文件的目录       下的'public/index.html'   file接收一下
		fs.readFile( path.resolve(__dirname,'public/index.html') ,(err,file)=>{
			response.end(file); // 返回file
		})
	}
	
//	response.end('helloha,hworld');  
	
	
}).listen(5000,()=>{
	console.log('A New Sever is running at PORT 5000');//搭建完成返回的字段
})
```
- 在建立的Js文件目录下调出命令框 输入node test.js
- 回车运行完以后简单的服务器就搭建完毕，通过访问localhost:端口就可以访问。
- 也可以在局域网下，查看自己的ip地址(ipconfig)，通过ip:端口 访问到。

### 用express 框架简易搭建：
```
const path  = require('path'); // 路径模块
const express = require('express');//express模块
const hbs =  require('hbs'); //模板引擎模块
let bodyParser = require('body-parser');//消息体解析模块

const app = express();

const PORT = 8080 ;

//开启模板引擎
app.engine('html',hbs.__express);
//设置后缀名
app.set('view engine','html');
//设置模板路径
app.set('views',path.resolve(__dirname,'views'));

//设置静态资源目录
app.use(express.static(path.resolve(__dirname,'assets')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//首页
app.get('/',(req,res)=>{
	res.render('home');
})

//-----------接口-----------------

//---------错误 信息  处理-------------------

app.use((req,res,next)=>{
	res.status(404);
	res.send('404 not found')
});

app.use((err,req,res,next)=>{
	res.status(500);
	res.send('500 server error');
})
app.listen(PORT,(err)=>{
	if(err){
		console.log(err);
	}
	console.log(`Server is running at ${PORT}`);
})
```

### Ajax：
- Ajax全称：Asynchronous JavaScript +And+ XML，其核心对象是 XMLHttpRequest 对象（简称XHR）其技术核心就是无刷新页面就可以从服务器获得数据，但是不局限于XML数据。

- Ajax四个步骤：
> 
-1. const xhr = new XMLHttpRequest();XHR对象
-2.xhr.open(method,adress,true)
-3.如果是post方法 xhr.setRequestHeadeer()
-4.xhr.send()

- Ajax get 请求 
```
//模拟个电影搜索
searchBtn.onclick = function (){
    const xhr = new XMLHttpRequest();
    xhr.open('get', 'search_movie?search=' + encodeURIComponent(searchText.value), true); //将要搜索的内容编码然后拼接到search
    xhr.send();
    xhr.onload = function (){
      let imgData = JSON.parse(xhr.responseText);//接受返回的图片地址
      
      for(let item of imgData){
        const img = new Image();
        img.src = item;
        img.onload = function (){
          moveImg.appendChild(this);
        }
      }
      
    };
  };
  
  -----------------------
  //模拟后端的处理(express)：
  
  // 搜索电影接口
app.get('/search_movie', (req, res) => {
  let type = req.query.search;
  
  let resData = [];
  
  for(let item of movieData){  //数据库搜索
    if(item.genres.indexOf(type) !== -1){
      resData.push(item.images.large);
    }
  }
  
  res.json(resData); //返回的内容
});
```
- Ajax post 请求
```
//模拟用户账号注册
form.btn.onclick = function (e){
      e.preventDefault();
      
      let json = {
        userName: form2.userName.value,
        passWord: form2.passWord.value
      };
      
      const xhr = new XMLHttpRequest();
      xhr.open('post', '/ajax_post_form', true);
      
      // 如果传的数据格式是一个JSON格式的，那么需要设置下面的请求头信息
      xhr.setRequestHeader('Content-Type', 'application/json');  
      
      // 如果是一个表单格式的 也就是 格式 像 queryString的数据
      // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      
      // 如果是json格式的，这里面的参数必须是一个标准的json
        // 如果是表单格式的，直接发送就可以了
      xhr.send(JSON.stringify(json));  // 
      
      xhr.onload = function (){
        console.log(xhr.responseText);
      }
    }


----------------------------------------------
后端接口：
app.post('/ajax_post_form', (req, res) => {
  let user = req.body;
  
  fs.readFile('./data/user.json', (err, data) => {
    let resData = JSON.parse(data.toString());
    resData.push(user)
    
    fs.writeFile('./data/user.json', JSON.stringify(resData), (err) => {
      if(err) {
        res.send('Error');
        return;
      }
	    res.send('ok');
    //  res.render('thanks');
    })
  })
})

```


- Ajax post 请求(上传文件)
```
//接受文件上传的接口
app.post('/fileupdate', (req, res) => {
  let form = new Formidable.IncomingForm();

  form.encoding = 'utf-8';
  form.uploadDir = path.resolve(__dirname, 'user');
  form.keepExtensions = true;  // 保留扩展名

  form.maxFieldsSize = 3 * 1024 * 1024;  // 限制上传文件的总大小3mb，默认为2mb

  form.parse(req)
    .on('progress', (received, expected) => {
      console.log(`上传进度:${received / expected * 100}%`);
    })
    .on('fileBegin', (name, file) => {  // 当某个文件开始上传的时候
      console.log(`${file.name}文件正在上传`);
    })
    .on('file', (name, file) => { // 当某个文件上传结束的时候
      let fileExt = path.extname(file.name); // 拿到上传文件的扩展名
      let oldFilePath = path.normalize(file.path); // 拿到上传文件的路径,并进行规范化处理
      let newFileName = 'file_' + Date.now() + fileExt;
      let newFilePath = path.resolve(__dirname, 'user', newFileName);

      // 对文件进行重命名操作
      fs.rename(oldFilePath, newFilePath, (err) => {
        if(err){
          console.log('改名失败!');
          return;
        }
        console.log(`改名成功,新文件名为:${newFileName}`);
      })
    })
    .on('end', () => { // 当全部文件上传完成的时候
      console.log(`上传完成.`);
      if(req.xhr){
        res.send('ok!');
      }else{
        res.redirect(303, '/');
      }
    })
    .on('error', (err) => {  // 当发生错误的时候
      console.log(err);
      res.send('Error!')
    });
});
```
```
表单上传:
<h1>表单上传</h1>      
<form action="fileupdate" enctype="multipart/form-data" method="post">
	<div>
		<a href="javascript:;">
			<input type="file" name="file" multiple="multiple" />
		</a>
	</div>
	<button type = "submit">开始上传</button>
</form>

//<input type="file" name="file" multiple="multiple" />multiple属性写了以后支持多个文件上传
//enctype="multipart/form-data" 上传文件类型
//enctype="application/x-www-form-urlencoded" 表单数据提交
//这样的方式是同步的 表单上传的时候是不能干别的事情的
```

```
使用ajax上传
            const  InpFile  =  document.querySelector('#Inp_file');
 			const  btn =  document.querySelector('.btn_upload');
 			const  progess = document.querySelector('.progress');
 			const  proSpan =  document.querySelector('span');
 			const  dragBox = document.querySelector('.box');
 			
 			btn.onclick = function(){
 				//拿到文件
 				let files =  InpFile.files; //这是一个类数组
 				//放到表单数据对象里面进行序列化
 				//这个对象存放数据的格式是键=>值形式
 				//表单数据对象下面有一个append方法 
 				let formObj = new FormData();
 				
 				for(fileitem of files){
 					formObj.append('userfiles[]',fileitem); //第一个参数可写可不写 加个[]主要表示多个文件的上传
 				}
 				
 				//实例化一个ajax对象
 				let xhr =  new XMLHttpRequest();
 				
 				xhr.open('post','fileupdate',true);
 				
 				//上传文件的post头信息要求  
 				//并且这样设置后，后端就能够识别前端是不是 ajax上传的文件
 				xhr.setRequestHeader('X-Requested-With','XMLHttpRequest');
 				
 				//设置进度条
 				//xhr 对象 下面有个上传监听事件
 				//其事件 对象下 可以找到  loaded total  两个的数值的 比值就可以算出上传进度
 				xhr.upload.onprogress = function(e){
 					let rate = e.loaded/e.total*100;
 					progess.value = rate;
 					proSpan.innerHTML = rate.toFixed(1)+'%';
 					
 				}
 				
 				xhr.send(formObj);
 				xhr.load = function(){
 					console.log(xhr.responseText);
 				}
 			}
 			
 			
 			dragBox.ondragover = function(e){
 				e.preventDefault();//取消默认行为 不仅要取消drop的  
 				//很奇怪  浏览器对拖拽文件下载或者打开 的默认行为竟然发生over
 			}
 			
 			dragBox.ondrop = function (e){
   		 	e.preventDefault();
   		 	//拿到 那个在我头顶的文件
   		 	//console.log(e);
 				let files =  e.dataTransfer.files; 
 				let formObj = new FormData();
 				for(fileitem of files){
 					formObj.append('userfiles[]',fileitem); //第一个参数可写可不写 加个[]主要表示多个文件的上传
 				}
 				let xhr =  new XMLHttpRequest();
 				
 				xhr.open('post','fileupdate',true);
 				
 				xhr.setRequestHeader('X-Requested-With','XMLHttpRequest');
 				
 				xhr.upload.onprogress = function(e){
 					let rate = e.loaded/e.total*100;
 					progess.value = rate;
 					proSpan.innerHTML = rate.toFixed(1)+'%';
 					
 				}
 				
 				xhr.send(formObj);
 				xhr.load = function(){
 					console.log(xhr.responseText);
 				}
 		 	}
```
- 封装一个ajax函数
```
function ajax(opt){
    let method = opt.method||'GET';
    let url   = opt.url||'';
    let send =  opt.send || null;
    let dataType = opt.dataType || 'json'; // 要传输的数据类型
    let resType = opt.resType||'json';  //  希望接受到的数据类型
    let succ = opt.succ || function(){};
    let fail = opt.fail || function(){};
    
    let xhr = new  XMLHttpRequest();
    
    xhr.open(method,url,true);
    
    if(method.toUpperCase()== 'POST'){
        
        switch(dataType){
            case 'json':
            xhr.setRequestHeader('Content-type','application/json');
            break;
            case 'form':
            xhr.setRequestHeader('Content-type','application/x-www.form/urlencoded');
            break;
            case 'file':
            xhr.setRequestHeader('X-Requested-With','XMLHtppRequest')
            break;
        }
        send(send);
    }
    
    xhr.onload = function(){
        if((xhr.status>=200&& xhr.status<300 )|| xhr.status == 304){       
            let data =  xhr.responseText；
            
            if(resType == 'json'){
                data = JSON.parse(data);    
            }
            succ(data);
        }else{
            fail(xhr.status);
        }
            
    }
}


```


### 关于回调地狱：
- 假设用户发送请求后，得到回应，然后对数据进行一大堆操作，然后继续发送请求，然后重复第一步,一直重复。。。呵呵
```
    xhr.onload = function(){
    
        if(status >=200 && status<300){
            success1(xhr.responseText)
        }
    }
    
    let success1 = function(data){
        data = .....
        //ajax发送
        
        xhr.onload = function(){
            success2(xhr.responseText)
        }
    }
    
    let success2.....
    
    //如果一步出现错误。。那就GG
```


###Promise:
> 
- 提醒：一个去了解一个新的对象，从两个方面入手
 - 对象原型的属性和方法
 - 对象本身的静态方法

* promise:
是异步编程的一种解决方案，比传统的解决方案回调函数和事件更合理和更强大。所谓promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。

* 这个结果有三种状态 pedding为默认状态、Resolved（已完成，又称Fulfilled）和Rejected（已失败）。
* 状态的转换 pedding=>>Resolved 或者pedding=>>Rejected ，状态转换后就固定下来

* 定义一个promise实例

```
var promise = new Promise( (resolve,reject)=>{
    ..dosometing
    if(succ){
        resolve(responseData);
    }else{
        reject(error)
    }
})

// 1. Promise 实例化时接受一个回调函数作为参数；
// 2. 这个回调函数有两个参数，分别为resolve 和 reject，他们俩都是函数;
// 3. resolve函数的作用就是，把这个实例的promise状态由pedding变为resolved，然后执行这个函数，将异步操作的结果作为参数传出去;
// 4. reject函数的作用就是，把这个实例的promise状态由pedding变为rejected，然后执行这个函数，将异步操作的错误作为参数传递出去;
```

> 
主要用到的方法
1.这个对象的原型上面的方法
   -then
   -catch 
2. 这个对象本身的静态方法
-Promise.resolve
-Promise.all

- then方法
 - then方法可以分别指定Resolved状态和Rejected状态的回调函数
```
 var promise = new Promise( (resolve,reject)=>{
    ..dosometing
    if(succ){
        resolve(responseData);
    }else{
        reject(error)
    }
 })
 promise.then( (val)=>{},(err)=>{})
 //Resolved状态和Rejected状态的回调函数
 //并且可以接受返回的参数
 //then这个行为是一个异步行为，promise响应后才能运作
 //第二个参数 可有可无,也可以用后面讲到的catch方法代替
  
```
- then 运行后返回的是一个新的promise实例；
    - 这个新的promise实例还比较特殊；
    - 这个then里头没有return 东西 或者 return 的不是一个promise实例,那个then返回的实例就是一个默认状态为resolved的实例，并且resolve函数返回的参数是上一个then返回的内容;
    - 如果then里头return 了一个promise实例 , 那么then的返回结果就是这个指定的promise,如果后面再链接上一个then，需要等到这个指定promise状态的改变才能运行新的then;
    - 上面讲的情况都是基于第一个promise是Resolved状态的时候，那么如果是Rejected状态的时候,就不走then了，此时then返回的promise就和它的调用者promise一模一样,这就可以解释为什么.then后面可以.catch。
```
var pom =  new Promise( (res,rej)=>{
			res(true);
		})
var pom2 =  pom.then((val)=>{
				console.log(val);
			}）
console.log(pom2);
//这样没有return 的话  pom2 就是 Resolved  value:undefined 的promise
var pom2 =  pom.then((val)=>{
				console.log(val);
				return 1
			}
console.log(pom2);			
//这样return 1的话  pom2 就是 Resolved  value:1	

pom.then((val)=>{
				console.log(val);
				return 1
	        }）.then( (val)=>{
	            console.log(val);
	        })
//在后面再用then添加回调的话回立马执行，并且val 为1 因为该promise的状态为Resolved
```


```
//另外一种情况是返回一个指定的promise对象

var pom =  new Promise( (res,rej)=>{
			res(true);
		})
var pom2 =  pom.then((val)=>{
	var pom3 = new Promise((res,rej)=>{
		setTimeout(()=>res(false) ,2000) ;
	})
	return  pom3;
})

console.log(pom2);
//一开始状态是pedding
//两秒后状态变为Resolved 并且value为fasle
//证明返回的promise对象就是pom3

//所以如果在后面继续链接上then的话不会立马执行，而是等它调用对象的状态改变才能执行，这样的话作链式的写法，并且可以做到一个异步事件执行完之后才去执行另外一个，不要以前的金字塔式的回调写法，并且可以统一捕捉错误信息
```
- catch方法
- 用于处理promise异步操作不成功的方法
```
let promise  //这是一个实例化的promise
promise.then((succ)=>{},(fail)=>{})  // 可以转换成
promise.then((succ=>{}).catch((fail)=>{})；//如果类似错误处理都差不多，那么推荐这种写法
promise.then().then().then().catch();

//还有一点需要主要的是是catch()同样返回一个promise对象,后面可以继续then catch
promise.then().catch().then();


var promise = new Promise((res,rej)=>{
    
}) 
promise.then((val)=>{
    console.log(y)
}).catch((error)=>{
    
})


```

- Promise.all
 -  Promise.all方法就是是接受多个Promise对象，然后包装成一个新的Promise实例
 -  关于参数,接受一个数组[p1,p2,p3]，里面每一项是一个Promise实例，如果不是Promise实例则会使用后面后面讲到的Promise.resolve转化为Promise,当然也不一定是数组，只要具有Iterator接口也可以
 -  关于状态,当里面的实例状态全部都完成， 才变为fulfilled状态，然后返回一个由实例返回的值组成的数组，通过then回调可以拿到。只要有其中一个实例的状态为rejected，返回的就是rejected状态，并且返回该错误。
 ```
 //一个图片加载实例
 //就是一组图片加载完 同时显示在页面上 
 
 function loadImg(src){
   return new Promise((res,rej)=>{
    var img = new Image ()
    img.src = src;
    img.onload = function(){
        res(img)
    }
    img.onerror = function(){
        rej(new Error('图片加载失败'))
    }
 }

 Promise.all([loadImg(src1), loadImg (src2),loadImg (src3)]).then((val)=>{
    for(item of val){
        document.body.appendChild(item)
    } 
 })
 
 
 
 ```
- Promise.race
- 跟Promise.all一样，同样是将一组实例包装成一个新的实例
- 关于状态，只要有其中一个状态改变了，整个实例的状态也就跟着改变，返回的值也是最先改变状态的返回值
- 一个fetch请求例子
```

var p = Promise.race([
  fetch('/resource-that-may-take-a-while'),
  new Promise(function (resolve, reject) {
    setTimeout(() => reject(new Error('request timeout')), 5000)
  })
])
p.then(response => console.log(response))
p.catch(error => console.log(error))
//上面代码中，如果fetch5秒之内方法无法返回结果，p变量的状态就会变为rejected，从而触发catch方法指定的回调函数。
```

- Promise.resolve
 - 有时我们有这样的需求，把现有的对象转化Promise对象，这就需要用到Promise.resolve.
 ``
 var jsPromise = Promise.resolve($.ajax('/whatever.json'));
 ``
 - 上面的代码就是把Jquery生成的deferred对象，转化为一个新的Promise对象。
 -  Promise.resolve 等价于下面的写法。
 > Promise.resolve('foo')
// 
等价于new Promise(resolve => resolve('foo'));


- 关于Promise.resolve的使用大致分为四种情况:
1.参数传一个Promise实例，则原封不动地返回这个Promise实例 
2.参数是一个thenable对象
3.参数不具有then方法，或者根本不是对象，则返回一个Resolved状态的新实例，返回值为传入的Promise.resolve()的原始值
4.不带参数Promise.resolve()，直接返回一个状态为resolved新的Promise 
```
thenable对象：
var theable  = {
    then: function(res,rej){
        res(true);
    }
}
var p1 = Promise.resolve(thenable);
等价于：
var p1 = new Promise((res,req)=>{
    res(true);
})


没有then方法或者不是一个对象
var p1 =  Promise.resolve('hello');
p1.then((val)=>{
    console.log(val)  //'hello'
})
```


###跨域问题：
#### Ajax 跨域：
- CORS 时默认只支持「application/x-www-form-urlencoded」
- 如果服务端跨域是CORS处理的话,就不能提交json格式了
- jquery ajax默认提交的编码格式是「application/x-www-form-urlencoded」
- 而Augular 默认提交的格式是[ application/json]
- 所以还是看服务端如何处理
- 也可以了解一下啊nginx 反向代理 


- 那么现在就有两个问题 ：如何跨域上传json数据 和 跨域上传文件

#### Jsonp跨域：
- 原理很简单 
- 第一步 ： 动态创建一个script 标签
- 第二步  : src 指向请求地址,并且 把需要传续的内容附带在queryString，最重要的是 cb/callback = 你自定义并且挂载在window的函数
- 第三步  :  后端拿到queryString 返回一个 `函数名(data)` , 相当于执行请求方挂载在window上的函数 并且把数据当作参数传到里面去
- 第四步  ：  清除script就可以了
- jsonp 只能使 get 方法



#### 封装一个Ajax + Jsonp方法：
```
//调用
    fetch({
			data:{
			   q:val,
			   start:0,
			   count:100
			},
	        type: 'jsonp',   
	        url: `https://api.douban.com/v2/book/search`,
	        timeout: 3000,
	        cb: 'callback'
      }) //返回一个实例
      .init() // 返回一个promise实例 init 还接受一个参数 指定回收的数据类型
      .then((data) => {
       }).catch((err)=>{
       })
 
     
     fetch({
			type:'ajax',
 			data:{},
			url:'/fileupdate',
			dataType:'form',   //form file json
			method:'post'
 	})
 	.init()
    .then...
//


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
	init(acceptType = ''){
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
						res(acceptType==='json'? JSON.parse(data):data);
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
```