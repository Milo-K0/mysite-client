import eventBus from '@/eventBus'
import { debounce } from '@/utils';
import defaultGif from '@/assets/imgloading.gif'

let imgs = [];

function setImage(img) {
  img.dom.src = defaultGif;
  // 处理图片
  // 该图片是否在视图范围内
  const clientHeight = document.documentElement.clientHeight;
  const rect = img.dom.getBoundingClientRect();
  const height = rect.height || 150;
  if(rect.top >= -height && rect.top <= clientHeight) {
    // 在视口范围内
    const tempImg = new Image();
    tempImg.onload = function() {
      img.dom.src = img.src;
    }
    tempImg.src = img.src;
    imgs = imgs.filter(i => i !== img);
  }
  
}

// 希望，调用该函数，就可以设置那些合适的图片
function setImgs() {
  for(const img of imgs) {
    // 处理该图片
    setImage(img);
  }
}

function handleScroll() {
  setImgs();
}

eventBus.$on('mainScroll',debounce(handleScroll,50));

export default {
  inserted(el,bindings) {
    const img = {
      dom: el,
      src: bindings.value
    };
    imgs.push(img);
    // 立即处理
    setImgs();
  },
  unbind(el) {
    imgs = imgs.filter(img => img.dom !== el);
  }
}