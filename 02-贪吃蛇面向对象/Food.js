
/* 沙箱模式： */
(function (w) {
    //1.声明构造函数创建食物对象
    function Food(x, y, bgc, width, height) {
        this.x = x || 0;//如果用户没有传参，默认值就是0（随机位置）
        this.y = y || 0;
        this.bgc = bgc || getRandomColor();
        this.width = width || 20;
        this.height = height || 20;
    };

    //2.每一个食物都可以渲染到页面，所以这个方法写到原型中
    Food.prototype.render = function (map) {
        //this : 谁调用这个方法，this就指向谁
        //this指向调用这个方法的每一个食物对象
        //1.创建空元素
        var div1 = document.createElement('div');
        //2.设置属性
        div1.style.position = 'absolute';
        //如果this.x是0，就生成随机位置
        /* 
        页面格子数量 ：var num =  map.offsetWidth / this.width   (800/20 = 40)
        随机位置 ：var x =  0-num之间的随机整数   (5:第五个格子)
        left值：  x * this.width
        */
        var x = Math.floor(Math.random() * (map.offsetWidth / this.width));//随机格子数
        var y = Math.floor(Math.random() * (map.offsetHeight / this.height));//随机格子数
        div1.style.left = (this.x || x * this.width) + 'px';
        div1.style.top = (this.y || y * this.height) + 'px';

        div1.style.width = this.width + 'px';
        div1.style.height = this.height + 'px';
        div1.style.backgroundColor = this.bgc;

        this.ele = div1;//存储页面的div1，用于移除
        //3.添加到页面
        map.appendChild(div1);
    };

    //3.暴露接口
    w.Food = Food;
})(window);