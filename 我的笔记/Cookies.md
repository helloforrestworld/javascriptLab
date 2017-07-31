# Cookies

标签（空格分隔）： 笔记整理

---

- cookies 浏览器缓存，一般访问某个服务器的时候，都会给用户种下cookies，下次再向这个服务器请求的时候，请求会带上用户的cookies，服务器通过判断cookies来进行一些是操作，如记住用户登录，广告投放，localstorge更新等，一般的cookies清除是在会话结束后（session）即浏览器关闭或者窗口关闭。但是cookies也可以设置有效期。
- 服务器如何操作cookies，以下express代码模拟
```
const express = require('express');
const fs = require('fs');
const path = require('path');
const cookieParser = require('cookie-parser');//加载cookies模块
const app = express();

app.get('/', (req, res) => {
   console.log(req.cookies); // 读取
   console.log(req.signedCookies); // 读取 已签名的
  
   res.cookie('name', 'fq', {httpOnly: true, maxAge: 50000})
   //种cookies
   //key value  httpOnly 设置后就只能在服务端修改  maxAge是有效期
})

```
- 前端如何操作cookies
 - 设置
 - 获取
 - 删除
> cookies 一般长这样：
  'name=laowang; domain=.baidu.com; path=/; expires=new Date(2017,5,17); sercure'  
- name 是key laowang是value domain和path定义了cookies的使用范围,注意例子中指定的是.baidu.com这个主域，www.baidu.com/acb.baidu.com都能拿到cookies，expires指定的是失效时间,sercure是签名认证.
- 设置一个cookie : document.cookie = '...';
- 封装一个函数具有设置，获取，还有删除功能的:
```
//key 和 value 注意转码一下
//key 和 value 是必须传的参数
//其他如果不传就传默认值
//删除一个cookie 方法就是 把它设置为过期
//拿到cookie 用正则去匹配比较方便
const cookie =  {
	set({key,value,expires,domain,path,sercure}){
		  let  cookies  =  `${ encodeURIComponent(key)} =  ${ encodeURIComponent(value)}`;
		  if(expires){
		  	cookies += `; expires = ${expires}`; 
		  }
		  if(domain){
		  	cookies += `; domain = ${domain}`;
		  }
			if(path){
				cookies += `; path = ${path}`;
			}
			if(sercure){
				cookies += `; sercure`;
			}
			document.cookie = cookies;
	},
	get(key){
			let cookie  = document.cookie;
			let reg  =  new RegExp( '\\b'+ encodeURIComponent(key) + '=([^;]+)\\b','i') ;
			let ret =  cookie.match(reg);
			return ret ? ret[1]:'';
	},
	delete(key){
			this.set({
				key:key,
				expires:new Date(0)
			});
	}
}
```



