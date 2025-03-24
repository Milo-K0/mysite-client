import loadingUrl from '../assets/loading.gif'
import styles from './loading.module.less'
// 判断el中是否存在loading效果的img元素
function getLoadingImg(el) {
  return el.querySelector('img[data-role=loading]');
}
function createLoadingImg() {
  const img = document.createElement('img');
  img.dataset.role = 'loading';
  img.src = loadingUrl;
  img.className = styles.loading
  return img;
}
// 导出指令的配置对象
export default function(el,binding) {
  // 根据binding.value的值，决定创建或删除img元素
  if(binding.value) {
    const curImg = getLoadingImg(el);
    if(!curImg) {
      let img = createLoadingImg();
      el.appendChild(img);
    }
  }else {
    const curImg = getLoadingImg(el);
    if(curImg){
      curImg.remove();
    }
  }
}

// bind(el,binding) {
//   // 根据binding.value的值，决定创建或删除img元素
  
// },
// update(el,binding) {
//   // 根据binding.value的值，决定创建或删除img元素
// }