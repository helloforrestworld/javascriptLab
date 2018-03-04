
(function(){
  // 主体部分高度自适应
  let  header = tools.$('header')[0],
       content = tools.$('.weiyun-content')[0];
  let wHeight = window.innerHeight;
  const hHeight = header.offsetHeight;
  content.style.height = wHeight - hHeight + 'px';
  
  window.onresize = function(){
    wHeight = window.innerHeight;
    content.style.height = wHeight - hHeight + 'px';
  }
  
  // 准备的数据
  let datas = data.files;
  
  let renderId = 0; //根目录
  
  // 元素获取
  let fileList = tools.$('.file-list')[0];//文件容器
  let pathNav = tools.$('.path-nav')[0];//导航容器
  let treeMenu = tools.$('.tree-menu')[0];//树形菜单容器
  let empty = tools.$('.g-empty')[0]; // 当前目录没有文件显示的提醒
  let getpid = tools.$('#getpid');//储存父ID的隐藏域
  
  
  // 渲染文件区域
  fileList.innerHTML = createFilesHtml(datas,renderId);
  
  // 渲染导航区域
  pathNav.innerHTML = createNavHtml(datas,renderId);
  
  // 渲染树形菜单区域
  treeMenu.innerHTML = treeHtml(datas,-1);
  // 对应的菜单加上className
  positonTreeById(renderId);
  
 // 文件区域点击 事件委托 文件夹点击
  tools.addEvent(fileList,'click',function(e){
    // 事件源兼容
    e = e || window.event;
    let tar = e.target || e.srcElement;
    // 找到真正的目标
    tar = tools.parents(tar,'.item');
  
    if(tar){
      let curId = parseInt( tar.dataset['fileId']);//当前目录id
      getpid.value = curId;//存储pId
      renderNavFileTree(datas,curId);// 通过目录id 渲染 (导航、文件、树形菜单)
    }
  })
  
  // 树形菜单点击 渲染对应的导航栏 和 文件区域
  tools.addEvent(treeMenu,'click',function(e){
    // 事件源兼容
    e = e || window.event;
    let tar = e.target || e.srcElement;
    // 找到真正的目标
    tar = tools.parents(tar,'.tree-title');
    
    if(tar){
      let curId = parseInt( tar.dataset['fileId']);//当前目录id
      getpid.value = curId;//存储pId
      renderNavFileTree(datas,curId);// 通过目录id 渲染 (导航、文件、树形菜单)
    }
  })
  
  // 导航栏点击
  tools.addEvent(pathNav,'click',function(e){
    // 事件源兼容
    e = e || window.event;
    let tar = e.target || e.srcElement;
    // 找到真正的目标
    tar = tools.parents(tar,'a');
    if(tar){
      let curId = parseInt( tar.dataset['fileId']);//当前目录id
      getpid.value = curId;//存储pId
      renderNavFileTree(datas,curId);// 通过目录id 渲染 (导航、文件、树形菜单)
    }
  })
  
  
  // 通过目录id 渲染 (导航、文件、树形菜单)
  function renderNavFileTree(datas,id){
    //渲染导航区域 
    pathNav.innerHTML = createNavHtml(datas,id);
    
    // 点击tar 给tar加上className 
    let preTree = tools.$('.tree-nav',treeMenu)[0];
    tools.removeClass(preTree,'tree-nav');
    positonTreeById(id);
    
    // 渲染文件区域
    let hasChild = dataControl.hasChilds(datas,id);//本目录是否有文件

    if(hasChild){
       // 渲染
     fileList.innerHTML = createFilesHtml(datas,id);
       // 隐藏
     empty.style.display = 'none';
     
     // 所有文件夹添加事件
     tools.each(files,function(item){
       initFileEvent(item);
     })
     
    }else{
      
     fileList.innerHTML = '';
     empty.style.display = 'block';
     
    }
    //全选按钮取消
    tools.removeClass(checkAll,'checked');
  }
  
  
  
  let files = tools.$('.file-item',fileList);//所有的文件集合
  let checkboxs = tools.$('.checkbox',fileList);//文件夹上面的勾选框集合
  let checkAll = tools.$('.checked-all')[0];//全选按钮
  
  // 所有文件夹添加事件
  tools.each(files,function(item,index){
    initFileEvent(item);
  })
   // 文件事件添加函数
  function initFileEvent(item){
    let checkbox = tools.$('.checkbox',item)[0];//勾选框
    // 文件移入
    tools.addEvent(item,'mouseenter',function(e){
      tools.addClass(this,'file-checked');
    })
      //文件移出
    tools.addEvent(item,'mouseleave',function(e){
      if(!tools.hasClass(checkbox,'checked')){
        tools.removeClass(this,'file-checked');
      }
    })
    // 勾选框点击
    tools.addEvent(checkbox,'click',function(e){
      e = e || window.event;
       //阻止冒泡到fileList
      e.stopPropagation();
      e.cancelBubble = true;
       //样式toggle
      let isChecked = tools.toggleClass(this,'checked');
       // 判断是否需要全选
      if(!isChecked){
        tools.removeClass(checkAll,'checked');
      }else{
        if(whoSelect().length === files.length){
          tools.addClass(checkAll,'checked');
        }
      }
    })
  }
  
  // 全选按钮添加事件
  tools.addEvent(checkAll,'click',function(e){
    let isAllChecked = false;
    isAllChecked = tools.toggleClass(this,'checked');
    
    // 是否全选
    if(isAllChecked){
      tools.each(files,function(item,index){
        tools.addClass(item,'file-checked');
        tools.addClass(checkboxs[index],'checked');
      })
    }else{
      tools.each(files,function(item,index){
        tools.removeClass(item,'file-checked');
        tools.removeClass(checkboxs[index],'checked');
      })
    }
    
  })
  
  
  // 找到被选中的文件夹
  function whoSelect(){
    let arr = [];
    tools.each(checkboxs,function(item,index){
      if(tools.hasClass(item,'checked')){
        arr.push(files[index]);
      }
    })
    return arr
  }
  
  
  //新建文件夹
  let cFold = tools.$('.create')[0];
  
  tools.addEvent(cFold,'mouseup',function(e){
    
    empty.style.display = 'none';//提醒区移除
    
    let newEle = domFile({
      title:'新文件',
      id:Date.now()
    })
    fileList.insertBefore(newEle,fileList.firstElementChild);
    
    // 新添加文件的子元素
    let fileTitle = tools.$('.file-title',newEle)[0];
    let fileEditor = tools.$('.file-edtor',newEle)[0];
    let editor = tools.$('.edtor',fileEditor)[0];
    
    // 文本框显示
    fileTitle.style.display = 'none';
    fileEditor.style.display = 'block';
    editor.select();
    
    cFold.isCreateFile = true;// 状态 :正在创建文件
    
  })
  
  // doucment添加 mousedown 确认添加文件夹
  tools.addEvent(document,'mousedown',function(e){
    
    if(cFold.isCreateFile){
      let newFold = fileList.firstElementChild;//新添加的文件夹
      let editor = tools.$('.edtor',newFold)[0]//输入框
      let value = editor.value;
      
      
      if(value.trim() === ''){
        newFold.remove();//创建失败
      }else{
        let fileTitle = tools.$('.file-title',newFold)[0];
        let fileEditor = tools.$('.file-edtor',newFold)[0];
        
        fileTitle.innerHTML = value;
        fileTitle.style.display = 'block';
        fileEditor.style.display = 'none';
        
          //添加事件
        initFileEvent(newFold);
        
          // 树形菜单选渲染 
        let pId = parseInt(getpid.value);
        let id = parseInt(tools.$('.item',newFold)[0].dataset['fileId'])
        let newData={
          id:id,
          pid:pId,
          title:value,
          type:'file'
        }
        let curTree = treeMenu.querySelector(`.tree-title[data-file-id= "${pId}"]`);
        let nextUl = curTree.nextElementSibling;//找到父Ul
        
        datas.unshift(newData);//更新数据
        
        let newLi = createTreeDom(datas,newData);//生成的单条树形菜单
        
        nextUl.appendChild(newLi);//放入Ul
        
          // 加上小角标
        if(nextUl.innerHTML !== ''){
          tools.removeClass(curTree,'tree-contro-none');
          tools.addClass(curTree,'tree-contro');
        }
        
          //提示框 
        showTips('ok','创建成功');
      }
    }
    cFold.isCreateFile = false;// 状态 :关闭状态
  })
  
  
  // 封装小tips框
  let fullTipBox = tools.$('.full-tip-box')[0];
  let tipsText = tools.$('.text',fullTipBox)[0];
  
  function showTips(cls,title){
    // 每次出来之前拉回原位
    fullTipBox.style.top ='-32px';
    fullTipBox.style.transition = 'none';
    fullTipBox.style.className = 'full-tip-box';
    
    
    setTimeout(function(){
      fullTipBox.style.top = 0;
      fullTipBox.style.transition = '300ms';
      tipsText.innerHTML = title;
      tools.addClass(fullTipBox,cls);
    },0)
    
    clearTimeout(fullTipBox.timer);
    fullTipBox.timer = setTimeout(function(){
      fullTipBox.style.top ='-32px';
    },2000)
    
  }
  
  
  //鼠标画框框选
  let selectArea = null;
  let disX,disY;
  tools.addEvent(document,'mousedown',function(e){
    e = e || window.event;
    e.preventDefault();
    disX = e.pageX,
    disY = e.pageY; 
    
    tools.addEvent(document,'mousemove',fnMove);
    
    tools.addEvent(document,'mouseup',fnUp);
    
    function fnMove(e){
      e = e || window.event;
      let w = Math.abs(e.pageX - disX),
          h = Math.abs(e.pageY - disY);
      if(!(w > 10 || h > 10))return 
          
      selectArea = selectArea?selectArea:document.createElement('div');
      selectArea.className = 'selectTab';
      selectArea.style.display = 'block';
      selectArea.style.width = w +'px';
      selectArea.style.height = h +'px';
      selectArea.style.left = Math.min(e.pageX,disX)+'px';
      selectArea.style.top = Math.min(e.pageY,disY)+'px';
      
        //碰撞检测 
      tools.each(files,function(item,index){
        if(tools.collisionRect(item,selectArea)){
          tools.addClass(item,'file-checked');
          tools.addClass(checkboxs[index],'checked');
          
            
        }else{
          tools.removeClass(item,'file-checked');
          tools.removeClass(checkboxs[index],'checked');
        }
      })
      
        //全选 
      if(whoSelect().length === files.length){
        tools.addClass(checkAll,'checked');
      }else{
        tools.removeClass(checkAll,'checked');
      }
      
      document.body.appendChild(selectArea);
    }
    
    function fnUp(e){
      tools.removeEvent(document,'mousemove',fnMove);
      tools.removeEvent(document,'mouseup',fnUp);
      if(selectArea){
        selectArea.style.display = 'none';
      }
    }
  })
  
  
}())


