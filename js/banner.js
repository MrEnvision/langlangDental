// 获取滚动范围的对象
let slideWrap = document.getElementById('banner');
// 获取滚动的对象
let slideContent = slideWrap.getElementsByClassName('slice-content')[0];
// 获取图片对象
let liItems = slideWrap.getElementsByTagName('ul')[0].children;
// 获取分页的按钮对象
let aItems = document.getElementsByClassName('slide-nav')[0].children;
// 获取箭头按钮
let prev = slideWrap.getElementsByClassName('slide-prev')[0];
let next = slideWrap.getElementsByClassName('slide-next')[0];
// 获取可视区宽度
let viewWidth = document.documentElement.clientWidth || document.body.clientWidth; // 后面部分主要考虑的是浏览器的兼容性

// 存储当前索引
let index = 0;
// 自动播放定时器
let autoTimer;
// 滚动开关 - 用于处理连续点击的场景，只有一次移动处理完下一次点击才有效
let flag = false;
// 定时器标记
let flagTimer;

// 切换封装
function slice(index) {
    toggleHigh(index)
    imgSlice(index)
}

// 图片切换
function imgSlice(index) {
    slideContent.style.left = -(viewWidth * index) + 'px';
    // 开启定时器
    flagTimer = setTimeout(() => {
        flag = false
        // 清除定时器
        clearTimeout(flagTimer)
    }, 1000)
}

// 高光切换
function toggleHigh(index) {
    Array.prototype.forEach.call(aItems, item => {
        item.className = '';
    })
    aItems[index].className = 'current';
}

// 自动滚动幻灯片
function autoPlay() {
    autoTimer = setInterval(() => {
        index = index + 1 > liItems.length - 1 ? 0 : index + 1;
        slice(index)
    }, 3000)
}

// —————————————— 设置 ——————————————
// 设置滚动对象宽度
slideContent.style.width = viewWidth * liItems.length + 'px';
// 设置图片对象宽度
Array.prototype.forEach.call(liItems, item => {
    item.style.width = viewWidth + 'px';
})
// 分页按钮监听事件
Array.prototype.forEach.call(aItems, (item, i) => {
    item.addEventListener('click', () => {
        index = i
        slice(index)
    })
})
// 箭头按钮监听事件
prev.addEventListener('click', () => {
    if (flag) return false
    flag = true
    index = index - 1 < 0 ? liItems.length - 1 : index - 1
    slice(index)
})
next.addEventListener('click', () => {
    if (flag) return false
    flag = true
    index = index + 1 > liItems.length - 1 ? 0 : index + 1;
    slice(index)
})
// 自动播放
autoPlay();
// 如果鼠标进入区域，则暂停自动滚动，反之继续自动滚动
slideWrap.addEventListener('mouseenter', () => {
    clearInterval(autoTimer)
})
slideWrap.addEventListener('mouseleave', () => {
    autoPlay()
})
