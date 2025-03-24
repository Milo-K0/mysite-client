import getComponentRootDom from "./getComponentRootDom";
import Icon from '../components/Icon'
import styles from './showMessage.module.less'
/**
 * 
 * @param {String} content 消息内容
 * @param {String} type 消息类型 info error success warn
 * @param {Number} duration 多长时间后消失
 * @param {DomComponent} container 容器 消息会显示到该容器的正中 如果不传，则显示到页面正中
 */
export default function(options = {}) {
  //content,type='info',duration=2000,container
  const content = options.content;
  const type = options.type || 'info';
  const duration = options.duration || 2000;
  const container = options.container || document.body;
  // 创建消息元素
  const div = document.createElement('div');
  const iconDom = getComponentRootDom(Icon,{
    type: type
  });
  iconDom.style.fontSize = '24px';
  iconDom.style.marginRight = '5px';
  div.innerHTML = `<span class=${styles.icon}>${iconDom.outerHTML}</span>${content}`;
  // 设置样式
  const bgcClass = styles[`message-${type}`];
  div.className = `${styles.message} ${bgcClass}`;
  
  // 将div加入到容器中
  if(!container) {
    container = document.body;
  }
  container.appendChild(div);
  // 浏览器强行渲染
  div.clientHeight;

  // 回归到正常位置
  div.style.opacity = 1;
  div.style.transform = `translate(-50%,-50%)`;

  // 等一段时间消失
  setTimeout(() => {
    div.style.opacity = 0;
    div.style.transform = `translate(-50%,-50%) translateY(-15px)`;
    div.addEventListener('transitionend',function() {
      div.remove();
      options.callBack && options.callBack();
    },{once: true});
  },duration);
}