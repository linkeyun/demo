function swiper(swiperImg) {
  const swiperWrapper = document.getElementById('swiperWrapper');
  const swiperContent = document.getElementById('swiperContent');
  const activeNav = document.getElementById('activeNav');

  // 自定义宽度
  const width = -swiperWrapper.offsetWidth;

  // 创建图片
  let html = '';
  // 创建下标
  let circleHtml = '';

  for (let i = 0; i < swiperImg.length; i++) {
    html += `<li><img src="${swiperImg[i].imgSrc}"></li>`;
    circleHtml += `<a href="javascript:;"></a>`
  }

  swiperContent.innerHTML = html;
  activeNav.innerHTML = circleHtml;

  activeNav.style.left = (swiperWrapper.offsetWidth - activeNav.offsetWidth) / 2 + 'px';

  // 克隆第一张图片
  let cloneNode = swiperContent.children[0].cloneNode(true);
  swiperContent.appendChild(cloneNode);

  swiperContent.style.width = -width * swiperContent.children.length + 'px';

  const arrow = document.getElementById('arrow');
  arrow.style.top = (swiperWrapper.offsetHeight - arrow.offsetHeight) / 2 + 'px';

  const active = activeNav.getElementsByTagName('a');
  const imgs = swiperContent.getElementsByTagName('li');

  let timer = null;  // 定时器
  let index = 0;  // 初始下标

  active[index].className = 'active';

  let left = document.getElementById('prev');
  let right = document.getElementById('next');

  left.onclick = function () {
    prev();
  }

  right.onclick = function () {
    next();
  }

  auto();

  function auto() {
    if (timer) clearInterval(timer);
    timer = setInterval(() => {
      next();
    }, 2000);
  }

  for (let i = 0; i < active.length; i++) {
    active[i].index = i;
    active[i].onclick = function () {
      if (timer) clearInterval(timer)
      index = this.index;
      animation(swiperContent, width * index, 0, function () {
        setActive();
        auto();
      })
    }
  }

  function prev() {
    if (timer) clearInterval(timer);
    index--;
    if (index < 0) {
      index = imgs.length - 2;
      swiperContent.style.left = -(swiperContent.offsetWidth + width) + 'px';
    }
    animation(swiperContent, width * index, 10, function () {
      setActive();
      auto();
    })
  }

  function next() {
    if (timer) clearInterval(timer)
    index++;
    index %= imgs.length;
    animation(swiperContent, width * index, 10, function () {
      setActive();
      auto();
    })
  }

  function setActive() {
    if (index >= imgs.length - 1) {
      index = 0;
      swiperContent.style.left = 0;
    }
    // 取消所有的className
    for (let i = 0; i < imgs.length - 1; i++) {
      active[i].className = '';
    }
    // 为当前下标添加className
    active[index].className = 'active';
  }

  function animation(obj, target, speed, callback) {
    /* 
     * obj: 移动对象
     * target: 目标位置
     * speed: 移动速度
     * callback: 回调函数
    */

    clearInterval(obj.timer);
    // 获取当前left值
    const current = parseInt(getComputedStyle(obj, null)['left']);

    if (current > target) {
      speed = -speed;
    }

    obj.timer = setInterval(() => {

      // 旧的left值
      const oldValue = parseInt(getComputedStyle(obj, null)['left']);
      let newValue = oldValue + speed;

      if ((speed <= 0 && newValue < target) || (speed >= 0 && newValue > target)) {
        newValue = target;
      }

      obj.style.left = newValue + 'px';

      if (newValue == target) {
        clearInterval(obj.timer);
        callback && callback();
      }
    }, 15);
  }
}