window.addEventListener('load', function () {
    // 1.获取元素
    var focus = document.querySelector('.focus');
    var ul = focus.children[0];
    var ol = focus.children[1];
    var w = focus.offsetWidth;
    // 2. 利用定时器轮播图片
    var index = 0;
    var timer = setInterval(function () {
        index++;
        ul.style.transition = 'all .3s';
        var translatex = -index * w;
        ul.style.transform = 'translateX(' + translatex + 'px)';
    }, 3000);
    ul.addEventListener('transitionend', function () {
        if (index >= 3) {
            index = 0;
            ul.style.transition = 'none';
            var translatex = -index * w;
            ul.style.transform = 'translateX(' + translatex + 'px)';
        } else if (index < 0) {
            index = 2;
            ul.style.transition = 'none';
            var translatex = -index * w;
            ul.style.transform = 'translateX(' + translatex + 'px)';
        }
        // 3.小圆点跟随变化 两句话实现
        // remove add toggle 后面的类名不加点
        ol.querySelector('.current').classList.remove('current');
        ol.children[index].classList.add('current');
    });
    // 4. 手指滑动轮播图
    var startX = 0;
    var moveX = 0;
    var flag = false;
    ul.addEventListener('touchstart', function (e) {
        startX = e.targetTouches[0].pageX;
        clearInterval(timer);
    });
    ul.addEventListener('touchmove', function (e) {
        moveX = e.targetTouches[0].pageX - startX;
        var translatex = -index * w + moveX;
        ul.style.transition = 'none';
        ul.style.transform = 'translateX(' + translatex + 'px)';
        flag = true;
    });
    ul.addEventListener('touchend', function () {
        if (flag) {
            if (Math.abs(moveX) > 50) {
                if (moveX > 0) {
                    index--;
                } else {
                    index++;
                };
                ul.style.transition = 'all .3s';
                var translatex = -index * w;
                ul.style.transform = 'translateX(' + translatex + 'px)';
            } else {
                ul.style.transition = 'all .1s';
                var translatex = -index * w;
                ul.style.transform = 'translateX(' + translatex + 'px)';
            }

        }
        timer = setInterval(function () {
            index++;
            ul.style.transition = 'all .3s';
            var translatex = -index * w;
            ul.style.transform = 'translateX(' + translatex + 'px)';
        }, 3000);
    })

})