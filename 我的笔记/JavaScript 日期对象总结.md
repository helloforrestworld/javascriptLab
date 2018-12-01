# JavaScript 日期对象总结

标签（空格分隔）： JS

---

## 创建日期对象

JS里面的日期对象基于1970年1月1日00:00:00（标准世界时间）起的毫秒数。

可以使用`new Date()`来创建日期对象，它有4种用法。

1 不传参数的情况下

```
// 用来获取这句代码声明时候的时间
// 例如：Mon Feb 13 2017 15:44:01 GMT+0800 (中国标准时间)
var now = new Date();
```

2 如果参数是个可以解析成时间的字符串

```
// new Date('yyyy month dd h:m:s')
// 这里面的 yyyy 代表年， month 代表月（可以是数字也可以是英文缩写），dd代表日，其中年月需要传，其它的部分可以省略。
new Date('2017 3 2 12:12:12'); //Thu Mar 02 2017 12:12:12 GMT+0800 (中国标准时间)
new Date('3 2 2017 12:12:12'); // Thu Mar 02 2017 12:12:12 GMT+0800 (中国标准时间)
new Date('2 Mar 2017 12:12:12'); // Thu Mar 02 2017 12:12:12 GMT+0800 (中国标准时间)
```

3 如果是传数字参数

```
// new Date(yyyy, month, dd, h, m, s);
// 值得注意的是月份是从0（0代表1月）到11（11代表12月）
// 最好不要颠倒参数的顺序
new Date(2017, 3, 2) // Sun Apr 02 2017 00:00:00 GMT+0800 (中国标准时间)
new Date('2017, 3, 2')  //Sun Mar 02 2017 00:00:00 GMT+0800 (中国标准时间)
new Date('2017 3 2') //Sun Mar 02 2017 00:00:00 GMT+0800 (中国标准时间)
new Date('2017 4 2 12:10:10')  Sun Apr 02 2017 12:10:10 GMT+0800 (中国标准时间)
new Date(2018, 11, 1, 12, 12, 12) // Sat Dec 01 2018 12:12:12 GMT+0800 (中国标准时间)
```

## 日期对象分解

- getFullYear() ： 用来获取当前日期对象的年份
- getMonth() ： 用来获取当前日期对象的月份（月份是从0开始的，例如1代表2月份）
- getDate() ： 用来获取当前日期对象的日期
- getDay() ： 获取当前日期对象的星期几，注意星期日是0
- getHours() ： 获取当前日期对象的小时
- getMinutes() ： 获取当前日期对象的分钟
- getSeconds() ： 获取当前日期对象的秒钟
- getMilliseconds() ： 获取当前日期对象的毫秒

练习1： 假如你的生日是5月25日，那么2017年你的生日是星期几？

```
var time = new Date('2017 5 25');
    
var days = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

console.log(days[time.getDay()]);
```

练习2： 假如你的生日是5月25日，计算一下2017年到3017年有多少个生日是星期一，并统计一下这些日期在一个星期中的分布情况。

```
var data = [0, 0, 0, 0, 0, 0, 0];
    
for(var i=2017; i<=3017; i++){
  data[new Date(i, 4, 25).getDay()]++;
}

console.log(data);
```

练习3：编写数字时间

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>时间</title>
  <style>
    .clock {
      width: 400px;
      height: 160px;
      background: rgba(0, 0, 0, 0.7);
    }
    .timer, .date {
      text-align: center;
    }
    .timer {
      width: 100%;
      height: 100px;
      font: 40px/100px Arial;
      color: #ffffff;
    }
    .date {
      width: 100%;
      height: 60px;
      color: rgb(116, 205, 244);
    }
  </style>
</head>
<body>
  <section class="clock">
    <div class="timer">16:22:40</div>
    <div class="date">2017年2月13日</div>
  </section>
  <script>
    var time = document.querySelector('.timer');
    var d = document.querySelector('.date');
    
    clock();
    
    setInterval(clock, 1000);
    
    function clock(){
      var now = new Date(),
          year = now.getFullYear(), // 年
          month = now.getMonth() + 1, // 月
          date = now.getDate(),  // 日
          hour = now.getHours(),  // 小时
          min = now.getMinutes(), // 分钟
          sec = now.getSeconds();  // 秒
          
      time.innerHTML = add0(hour) + ':' + add0(min) + ':' + add0(sec);
      d.innerHTML = year + '年' + month + '月' + date + '日';
    }
    
    // 补0函数
    function add0(num){
      return num < 10 ? '0' + num : '' + num;
    }
  
  </script>
</body>
</html>
```

## timstamp 时间戳

定义：timstamp就是从1970年1月1日00:00:00开始到当前的时间的毫秒数。

获取时间戳的方式：

1 new Date().getTime();
2 Date.now();

练习4：倒计时

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>倒计时</title>
  <style>
    .timeBox{
      width: 400px;
      height: 100px;
      border: 2px solid #000;
      position: absolute;
      left: calc(50% - 200px);
      top: calc(50% - 50px);
      text-align: center;
      font: 70px/100px '微软雅黑';
    }
  </style>
</head>
<body>
  <div class="timeBox">00:30:34</div>
  <script>
    var timeBox = document.querySelector('.timeBox');
    
    var endTime = new Date('2017 2 14 10:45:00').getTime();

    countTime();
    
    var timer = setInterval(countTime, 500);
    
    function countTime(fn){
      // 当前最新的时间戳
      var nowTime = Date.now();
      // 目标时间戳和当前时间戳的差值
      var count = endTime - nowTime;
      // 判断时间是否已经到达目标点了，如果到了，就清除定时器
      if(count <= 0){
        count = 0;
        clearInterval(timer);
      }
      // 先将毫秒换算成秒数
      // 用 Math.round(number)进行四舍五入
      count = Math.round(count / 1000);
      // 将秒数分解成小时、分钟、秒
      var hours = Number.parseInt(count / 3600);
      var mins = Number.parseInt((count - hours * 3600) / 60);
      var secs = count % 60;
      
       var days = parseInt(allSeconds / (24 * 60 * 60));
       var hours = parseInt(allSeconds / (60 * 60) % 24);
       var minutes = parseInt(allSeconds / 60 % 60);
       var seconds = allSeconds % 60;
      
      timeBox.innerHTML = add0(hours) + ':' + add0(mins) + ':' + add0(secs);
      
      if(count == 0){
        console.log('时间到了!');
        fn&&fn()
      }
    }
    function add0(num){
      return num < 10 ? '0' + num : '' + num;
    }
  </script>
</body>
</html>
```

## 日期设置

- setFullYear(yyyy[,month[,dd]]) : 用来设定指定日期对象的年份、（月份、日期）
- setMonth(month[,dd]); ： 用来设置指定日期对象月份的（、日期）
- setDate(dd) ： 用来设定指定日期对象的日期的
- setHours(hh[,mm[,ss[,ms]]]) ： 用来设定当前日期对象小时（分钟、秒钟、毫秒）
- setMinutes(mm[,ss[,ms]]) ： 用来设定当前日期对象的分钟（秒钟、毫秒）
- setSeconds(ss[,ms]) ： 用来设定当前日期对象的秒钟（毫秒）
- setMilliseconds(ms) ： 用来设定当前日期对象的毫秒
- setTime() ： 用来指定当前日期对象时间戳的

练习5：获取当前月份有多少天？

```
// 时间对象 当前时间是 2016年10月5号
var t = new Date('2016 10 5');
// 先将当前月份设置为下个月
t.setMonth(t.getMonth()+1);
// 然后将日期设置为当月0号，由于没有0号会自动跳到上个月的最后一天
t.setDate(0);
// 拿到最后一天也就是当月有多少天
t.getDate()
```
