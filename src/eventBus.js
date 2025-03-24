import Vue from 'vue'
const App = new Vue({})
/**
 * 事件名: mainScroll
 * 含义: 主区域滚动条位置发生后触发
 * 参数: 
 * 滚动的dom元素，如果是undefined，则表示dom元素已经不存在
 * 
 * 事件名: setMainScroll
 * 含义: 当需要设置主区域滚动条位置时触发
 * 参数: 滚动高度
 */

Vue.prototype.$bus = App;
export default App;


// const listeners = {};

// // 事件总线
// export default {
//   // 监听某一个事件
//   $on(eventName,handler) {
//     if(!listeners[eventName]) {
//       listeners[eventName] = new Set();
//     }
//     listeners[eventName].add(handler);
//   },
//   // 取消事件的监听
//   $off(eventName,handler) {
//     if(!listeners[eventName]) {
//       return;
//     }
//     listeners[eventName].delete(handler);
//   },
//   // 触发事件
//   $emit(eventname,...args) {
//     if(!listeners[eventname]) {return};
//     for(const handler of listeners[eventname]) {
//       handler(...args);
//     }
//   }
// }