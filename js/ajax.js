// 初始化显示加载中
function loadingMsg(params) {
    document.getElementById(params.wrap).innerHTML = ` 
        <div class="loading-wait">
            ${params.msg}
            <div class="loading-icon">
                <i class="iconfont icon-jiazai"></i>
            </div>
        </div>`
}

// loadingMsg({'wrap': 'info-wrap', 'msg': '内容加载中'});
// loadingMsg({'wrap': 'welfare-wrap', 'msg': '内容加载中'});
// loadingMsg({'wrap': 'doctor-wrap', 'msg': '内容加载中'});
// loadingMsg({'wrap': 'news-wrap', 'msg': '内容加载中'});

// 朗朗口腔
$.ajax({
    url: "./server/index.php",    //请求的url地址
    dataType: "json",   //返回格式为json
    async: true, //请求是否异步，默认为异步，这也是ajax重要特性
    cache: false, // 是否读取缓存
    data: {"categoryId": 123456},    //参数值
    type: "POST",   //请求方式
    success: function (req) {
        let data = req.data
        let ele = document.getElementById('info-wrap')
        if (!data || data.length === 0) {
            ele.innerHTML = `<div class="loading-wait">当前没有数据</div>`
            return false
        }
        let htmlContent = ''
        for (let i = 0; i < data.length; i++) {
            htmlContent += `
                <figure>
                    <img src="${data[i].imgUrl}" alt="${data[i].title}">
                    <figcaption>${data[i].title}</figcaption>
                    <p>${data[i].dec}</p>
                </figure>`
        }
        ele.innerHTML = htmlContent
    }
})

// 朗朗公益
$.ajax({
    url: "./server/index.php",    //请求的url地址
    dataType: "json",   //返回格式为json
    async: true, //请求是否异步，默认为异步，这也是ajax重要特性
    cache: false, // 是否读取缓存
    data: {
        "module": 'welfare',
        "categoryId": 10000
    },    //参数
    type: "POST",   //请求方式
    success: function (req) {
        let data = req.data
        let ele = document.getElementById('welfare-wrap')
        if (!data || data.length === 0) {
            ele.innerHTML = `<div class="loading-wait">当前没有数据</div>`
            return false
        }
        let htmlContent = ''
        for (let i = 0; i < data.length; i++) {
            if (i === 1) {
                htmlContent += `
                    <div class="row" style="background-color: #${data[i].bgColor};color: #${data[i].color}">
                            <div class="content-big">
                                <img src="${data[i].imgUrl}" alt="${data[i].title}">
                            </div>
                            <div class="content-small content-des">
                                <h3 class="content-title">${data[i].title}</h3>
                                <time class="time" datetime="${data[i].date}">${data[i].date}</time>
                                <i class="line"></i>
                                <p class="des">${data[i].dec}</p>
                                <a href="javascript:void(0)" class="more-link-2" style="color: #${data[i].color}">
                                    查看更多 <i class="icon iconfont icon-jiantou1"></i>
                                </a>
                            </div>
                        </div>
                    `
            } else {
                htmlContent += `
                    <div class="row" style="background-color: #${data[i].bgColor};color: #${data[i].color}">                         
                            <div class="content-big content-des">
                                <h3 class="content-title">${data[i].title}</h3>
                                <time class="time" datetime="${data[i].date}">${data[i].date}</time>
                                <i class="line"></i>
                                <p class="des">${data[i].dec}</p>
                                <a href="javascript:void(0)" class="more-link-2" style="color: #${data[i].color}">
                                    查看更多 <i class="icon iconfont icon-jiantou1"></i>
                                </a>
                            </div>
                            <div class="content-small">
                                <img src="${data[i].imgUrl}" alt="${data[i].title}">
                            </div>
                        </div>
                    `
            }
        }
        ele.innerHTML = htmlContent
    }
})

// 资讯动态
let tagMenu = document.getElementsByClassName('tab-menu')[0];
let newsWrap = document.getElementById('news-wrap');
$.ajax({
    url: "./server/newsCategory.php",    //请求的url地址
    dataType: "json",   //返回格式为json
    async: true, //请求是否异步，默认为异步，这也是ajax重要特性
    cache: false, // 是否读取缓存
    header: {
        "Content-type": "application/json; charset=utf-8"
    },
    type: "POST",   //请求方式
    success: function (req) {
        let data = req.data
        // 判断数据是否存在
        if (!data || data.length === 0) {
            tagMenu.innerHTML = `<div class="loading-wait">当前没有数据</div>`
            return false
        }
        let htmlContent = ''
        let htmlContent2 = ''
        htmlContent += `<li class="current"><a href="javascript:void(0)" title="${data[0].categoryName}" data-request="false" onclick="loadNewsDate(this,${data[0].id},0)">${data[0].categoryName}</a></li>`
        htmlContent2 += `<div id="${data[0].name}"></div>`
        for (let i = 1; i < data.length; i++) {
            htmlContent += ` <li><a href="javascript:void(0)" title="${data[0].categoryName}" data-request="false" onclick="loadNewsDate(this,${data[i].id},${i})">${data[i].categoryName}</a></li>`
            htmlContent2 += `<div id="${data[i].name}" style="display: none"></div>`
        }
        tagMenu.innerHTML = htmlContent
        newsWrap.innerHTML = htmlContent2
        loadNewsDate(tagMenu.children[0].getElementsByTagName('a')[0], data[0].id, 0)
    }
});

// news加载函数
function loadNewsDate(ele, id, index) {
    // 点击样式切换
    let items = tagMenu.children;
    for (let i = 0; i < items.length; i++) {
        items[i].className = '';
    }
    ele.parentNode.className = 'current';
    // news内容切换
    let tabContentWrap = document.getElementById('news-wrap').children;
    for (let i = 0; i < tabContentWrap.length; i++) {
        if (i === index) {
            tabContentWrap[i].style.display = 'block';
        } else {
            tabContentWrap[i].style.display = 'none';
        }
    }
    if (ele.getAttribute('data-request') === 'false') {
        $.ajax({
            url: "./server/indexNews.php",    //请求的url地址
            dataType: "json",   //返回格式为json
            async: true, //请求是否异步，默认为异步，这也是ajax重要特性
            cache: false, // 是否读取缓存
            header: {
                "Content-type": "application/json; charset=utf-8"
            },
            data: JSON.stringify({
                categoryId: id
            }),    //参数
            type: "POST",   //请求方式
            success: function (req) {
                let data = req.data
                // 判断数据是否存在
                if (!data || data.length === 0) {
                    tabContentWrap[index].innerHTML = `<div class="loading-wait">当前没有数据</div>`
                    return false
                }
                let htmlContent = '<div class="news-wrap clearfix">'
                data.forEach(item => {
                    let time = item.time.split(' ')[0]
                    htmlContent += `<div class="item">
                                    <div style="background-image: url(${item.imgUrl})" class="img-cover">
                                        <img src="images/indexNews.png" alt="newsImgTemplate">
                                    </div>
                                    <h3 class="content-title">${item.title}</h3>
                                    <time datetime="${time}">${time}</time>
                                    <i class="line"></i>
                                    <p class="dec">${item.dec}</p>
                                    <a href="" title="more" class="more-link-2">查看更多<i class="iconfont icon-jiantou1"></i></a>
                                </div>`
                })
                tabContentWrap[index].innerHTML = htmlContent + `</div>`
                ele.setAttribute('data-request', 'true')
            }
        })

    }
}


