/**
 * 用来请求后端数据的js脚本文件
 * 作者：
 * 日期：
 * 版本：1.0
 */


function fetch(opt){
  let {type} = opt;
  if(type === 'ajax'){
    return new CreateAjax(opt);
  }
  if(type === 'jsonp'){
    return new CreateJsonp(opt);
  }
}


class CreateAjax {
  constructor(opt){
    if(!opt.url){
      throw new Error('The argument\'s object must be include url.');
    }
    this.method = 'get';
    this.data = {};
    
    Object.assign(this, opt);
    return this;
  }
  init(dataType = ''){
    let {url, method, data} = this;
    
    method = method.toLowerCase();
    data = formatData(data);
    
    return Promise.resolve({
      then(resolve, reject){
        const xhr = new XMLHttpRequest();
        
        if(method === 'get'){
          url += '?' + data;
        }
        
        xhr.open(method, url, true);
        
        if(method === 'post'){
          xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
          xhr.send(data);
        }else{
          xhr.send();
        }
        
        xhr.onload = function (){
          let {status, responseText} = this;
          if(status >= 200 && status < 300 || status == 304){
            if(dataType.toLowerCase() === 'json'){
              resolve(JSON.parse(responseText));
            }
            resolve(responseText);
          }else{
            reject(status)
          }
        }
      }
    });
  }
};

class CreateJsonp {
  constructor(opt){
    if(!opt.url){
      throw new Error('The argument\'s object must be include url.');
    }
    
    this.data = {};
    this.timeout = 10000;
    this.cb = 'callback';
    
    Object.assign(this, opt);
    return this;
  }
  init(){
    let {url, cb, timeout, data} = this;
    
    return Promise.resolve({
      then(resolve, reject){
      	
        const script = document.createElement('script');
        
        let callbackname = 'cb' + Date.now();
        
        data[cb] = callbackname;
        
        window[callbackname] = function (resule){
          resolve(resule);
          clearTimeout(script.timer);
          delete window[callbackname];
          document.body.removeChild(script);
        };
        document.body.appendChild(script);
        
        
        url +=  '&'+ formatData(data);
        // 发送请求
        script.setAttribute('src', url);
        
        script.timer = setTimeout(function() {
          delete window[callbackname];
          document.body.removeChild(script);
          reject(new Error(`The request is error!`));
        }, timeout);
        
      }
    });
  }
}

function formatData(data){
  let query = [];
  for(let key in data){
    query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
  }
//  query.push(Date.now());
  return query.join('&');
}

















































