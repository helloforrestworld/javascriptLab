// 1 写一个方法，方法接收两个参数，一个是所有文件的数据(例如下面的 user_data.files),另外一个参数是某个文件的id，之后这个方法的名字可以随意起例如：getItemDataById，这个方法的作用是：根据指定的id，拿到数据中对应id的那个文件的数据。

// var data = user_data.files;
// getItemDataById(data, 1)  === > 框架的数据

// 2 写一个方法，getAllParentById(data, id),这个方法的作用是根据指定的id找到这个数据它自己以及它所有的祖先数据



var user_data = {
  maxId: 6,
  files: [
    {
      name: '根目录',
      id: 0,
      type: 'root',
      children: [
        {
          name: '框架',
          id: 1,
          pId: 0,
          children: [
            {
              name: 'React',
              id: 3,
              pId: 1,
              children: []
            },
            {
              name: 'Vue',
              id: 4,
              pId: 1,
              children: [
                {
                  name: 'vue-cli',
                  id: 38,
                  pId: 4,
                  children: []
                }
              ]
            }
          ]
        },
        {
          name: 'Html5',
          id: 2,
          pId: 0,
          children: [
	          	{
          			name:'canvas',
          			id:10,
          			pId:2,
          			children:[]
          		}
          ]
        }
      ]
    }    
  ]
};
