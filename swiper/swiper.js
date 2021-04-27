window.onload = function () {

  const swiper = document.getElementById('swiper');
  const imgList = swiper.getElementsByTagName('img');
  // swiper容器宽度
  swiper.style.width = 640 * imgList.length + 'px';

  const active = document.getElementById('active');
  const swiperWrapper = document.getElementById('swiperWrapper');
  // swiper圆点居中
  active.style.left = (swiperWrapper.offsetWidth - active.offsetWidth) / 2 + 'px';

  const arrow = document.getElementById('arrow');
  arrow.style.top = (swiperWrapper.offsetHeight - arrow.offsetHeight) / 2 + 'px';

  let index = 0;
  let timer = null;

  const activeList = active.getElementsByTagName('a');
  activeList[index].style.backgroundColor = '#fff';

  for (let i = 0; i < activeList.length; i++) {
    activeList[i].index = i;
    activeList[i].onclick = function () {
      clearInterval(timer);
      index = this.index;
      setActive();
      animation(swiper, -640 * index, 0, function () {
        auto();
      });
    };
  }

  const left = document.getElementById('prev');
  const right = document.getElementById('next');

  left.onclick = function () {
    prev();
  };

  right.onclick = function () {
    next();
  };

  auto();

  function auto() {
    clearInterval(timer)
    timer = setInterval(() => {
      next();
    }, 3000);
  }

  function prev() {
    // 上一张
    clearInterval(timer);
    index--;
    if (index < 0) {
      index = imgList.length - 2;
      swiper.style.left = -(swiper.offsetWidth - 640) + 'px';
    }
    animation(swiper, -640 * index, 10, function () {
      setActive();
      auto();
    });
  }

  function next() {
    // 下一张
    clearInterval(timer);
    index++;
    index %= imgList.length;
    animation(swiper, -640 * index, 10, function () {
      setActive();
      auto();
    });
  }

  function setActive() {
    // 判断当前索引是否为最后一张图片
    if (index >= imgList.length - 1) {
      index = 0;
      swiper.style.left = 0;
    }
    for (let i = 0; i < activeList.length; i++) {
      activeList[i].style.backgroundColor = '';
    }
    activeList[index].style.backgroundColor = '#fff';
  }

  function animation(obj, target, speed, callback) {
    clearInterval(obj.timer);
    // 元素当前位置
    const current = parseInt(getComputedStyle(obj, null)['left']);

    // 判断图片左移右移
    if (current > target) {
      speed = -speed;
    }

    obj.timer = setInterval(() => {
      const oldValue = parseInt(getComputedStyle(obj, null)['left']);
      let newValue = oldValue + speed;

      if ((speed <= 0 && newValue < target) || (speed >= 0 && newValue > target)) {
        newValue = target;
      }

      obj.style.left = newValue + 'px';

      // 元素位置到达目标
      if (newValue == target) {
        clearInterval(obj.timer);
        // 判断是否有回调函数
        callback && callback();
      }
    }, 15);
  }
};