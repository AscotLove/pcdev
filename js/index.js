window.onload=function () {
  ;(function () {
    //头部使用的标签
    var oHeaderNavLi=document.querySelectorAll('.header_nav li'),
    oHeaderNavdown=document.querySelectorAll('.header_nav .header_navdown'),
    oHeaderArrow=document.querySelector('.header-arrow');
    //arrow是固定值，用一个变量保存，使不用每次计算
    var arrowW = oHeaderArrow.offsetWidth/2;
    var arrowNavLi=oHeaderNavLi[0];
    //内容区获取标签
    var oContent = document.querySelector('.content'),
    oContentNav = document.querySelector('.content-nav');
    var contentHeight=oContent.offsetHeight;

    var timer = null;
    //定义内容区下标
    var index = 0;
    //当使用两次以上时，优化为函数
    //箭头走动的函数
    arrow(arrowNavLi);
    //因为是开始就定位第一个，所以设置一个在函数外，外后运行函数会覆盖
    oHeaderNavdown[0].style.width = '100%';
    function arrow(node){
      oHeaderArrow.style.left=node.offsetLeft+node.offsetWidth/2-arrowW+'px';
    }

    for (var i = 0,len = oHeaderNavLi.length; i < len; i++) {
    var oHeaderNavLiN=oHeaderNavLi[i];
      oHeaderNavLiN.index = i;
    oHeaderNavLi[i].onclick=function () {
      arrow(this);
      index = this.index;
      move(index);
    }
    };

    //绑定鼠标滚轮事件
    oContent.onmousewheel = wheel;
    oContent.addEventListener('DOMMouseScroll',wheel);


    //第一屏
    firstArticle();
    function firstArticle() {
      //获取第一屏的变量
      var oCarouselPoints = document.querySelectorAll('.content-home-point>li'),
        oCarouselNode = document.querySelectorAll('.content-home-carousel>li')
      //定义节流变量
      var lastTimer = 0,
        lastIndex = 0,
        nowIndex = 0,
        autoTime = null;
      //函数节流

      for(var i = oCarouselPoints.length; i--;) {
        var oCarouselPointsNode = oCarouselPoints[i];
        oCarouselPointsNode.index = i;
        oCarouselPointsNode.onclick = function () {
          var nowTime  = Date.now();
          if(nowTime - lastTimer <= 2000) return;
          lastTimer = nowTime;
          nowIndex = this.index;
          if (nowIndex === lastIndex) return;
          console.log(nowIndex);
          //轮播图
          if(nowIndex > lastIndex){
            oCarouselNode[nowIndex].className = "right-show";
            oCarouselNode[lastIndex].className = "right-hide";
          }else{
            oCarouselNode[nowIndex].className = "left-show";
            oCarouselNode[lastIndex].className = "left-hide";
          }
          //下标
          oCarouselPoints[lastIndex].className = "";
          this.className = "active";
          lastIndex = nowIndex;
        }
      };
      oContentNav.onmouseenter = function () {
        clearInterval(autoTime);
      };
      oContentNav.onmouseleave = autoPlay;
      autoPlay();
      function autoPlay() {
        autoTime = setInterval(function () {
          nowIndex ++;
          lastTimer = Date.now();
          if(nowIndex >= 4) nowIndex = 0;
          //轮播图
          oCarouselNode[nowIndex].className = "right-show";
          oCarouselNode[lastIndex].className = "right-hide";
          //下标
          oCarouselPoints[lastIndex].className = "";
          oCarouselPoints[nowIndex].className = "active";
          lastIndex = nowIndex;
        },2500);
      }
    }


    //函数反抖
    function wheel(e){
      clearInterval(timer);
      timer = setTimeout(function () {
      var flag = '';
      if (e.wheelDelta) {
      if (e.wheelDelta>0) {
      flag = "up";
      }else {
      flag = "down";
      }
      }else if (e.detail) {
      if (e.detail>0) {
      flag = "down";
      }else {
      flag = "up";
      }
      }
      switch(flag){
      case "up":
      if (index > 0) {
      move(--index);
      }
      break;
      case "down":
      if(index < 4) {
      move(++index);
      }
      break;
      }
      },300)
    };
    move(1);
    function move(index) {
      oContentNav.style.transform = `translateY(${index * -contentHeight}px)`;
      for (var i = 0,len = oHeaderNavdown.length ; i < len; i++) {
      oHeaderNavdown[i].style.width = '';
      }
      oHeaderNavdown[index].style.width = '100%';
      arrow(oHeaderNavLi[index]);

    }


    window.onresize = function () {

    }
  })();
}