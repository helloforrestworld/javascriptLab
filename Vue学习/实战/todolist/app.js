
// 本地存储
let store = {
  set(key,value){
    window.localStorage.setItem(key,JSON.stringify(value))
  },
  fetch(key){
    return JSON.parse( window.localStorage.getItem(key)) || []
  }
}
let list = store.fetch('todolist');//数据

// 根据hash值过滤
let filter = {
  'all':function(list){
    return list
  },
  'finished':function(list){
    return list.filter(function(item){
      return item.isChecked
    })
  },
  'unfinished':function(list){
    return list.filter(function(item){
      return !item.isChecked
    })
  }
}

// 实例
let vm = new Vue({
  el:'.main',
  data:{
    list:list,
    todo:'',//记录添加todo输入框的内容
    editingTodo:{},//记录正在编辑的数据
    editBefore:'',//记录编辑前的数据的title
    visibility:''//记录hash值
  },
  watch:{
    list:{//深度监控list
      deep:true,
      handler(){
        store.set('todolist',list);
      }
    }
  },
  methods: {
    addOneList() {//添加一条数据
      if(this.todo.trim() !== ''){
        this.list.push({
          title:this.todo,
          isChecked:false
        })
        this.todo = '';
      }
    },
    deleteOneList(item){//删除一条数据
      let index = this.list.indexOf(item);
      this.list.splice(index,1);
    },
    editTodo(item){//编辑todo
      this.editBefore = item.title//记录title
      this.editingTodo = item;//当前数据正在编辑
    },
    ensureEdit(){//确认编辑
      this.editingTodo = ''
    },
    toEditBefore(item){//esc回滚到编辑前
      item.title = this.editBefore;
      this.editingTodo = ''
      this.editBefore = ''
    }
  },
  directives:{
    focus:{//自定义focus指令
      update(el,binding){
        if(binding.value){
          el.focus();
        }
      }
    }
  },
  computed:{
    unfinishLen(){
      return this.list.filter(function(item){
        return !item.isChecked
      }).length
    },
    filterList(){
      return filter[this.visibility]?filter[this.visibility](this.list):this.list
    }
  }
})

// 获取hash
function getHash(){
  let hash = window.location.hash.slice(1);
  vm.visibility = hash;
}
getHash();
window.addEventListener('hashchange',getHash,false)