import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

var selectMoudle = {
  namespaced:true,
  state:{
    title:'',
    list:[]
  },
  mutations:{
    changeValue(state,payload){
      state.title = payload.title
    },
    updateList(state,payload){
      state.list = payload.list
    }
  },
  actions:{
    getList({commit},a){
      console.log(a)
      axios.get('https://www.easy-mock.com/mock/5aa7ebafdee46352178289fb/example/mock')
        .then((data)=>{
          commit('updateList',{list:data.data})
        })
        .catch((err)=>{
          console.log(err)
        })
    }
  }
}

var store = new Vuex.Store({
  state:{
    count:100,
    d1:2
  },
  getters:{
    filterCount(state){
      return state.count >= 120? 120 : state.count
    }
  },
  mutations:{
    addIncrement(state,payload){
      state.count += payload.addNum
    },
    deIncrement(state,payload){
      state.count -= payload.deNum
    }
  },
  actions:{
    addAction({commit,dispatch}){
      // console.log(context) //不是store实例 而是包含它一些方法的对象
      setTimeout(function(){
        // context.commit('addIncrement',{addNum:5})
        // context.dispatch('addTest',{a:1,b:2})
        commit('addIncrement',{addNum:5})
        dispatch('addTest',{a:1,b:2})
      },1000)
    },
    addTest(context,obj){
      console.log('我被触发了',obj)
    }
  },
  modules:{
    selectMoudle
  }
})
// console.log(store)
export default store