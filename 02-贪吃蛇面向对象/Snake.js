(function (w) {
    function Snake(width, height, direction) {
        this.width = width || 20;
        this.height = height || 20;
        this.direction = direction || 'right';
        //蛇的身体：body数组 存储是每一节的数据
        this.body = [
            {
                x: 3,
                y: 2,
                bgc: 'red'
            },
            {
                x: 2,
                y: 2,
                bgc: getRandomColor()
            },
            {
                x: 1,
                y: 2,
                bgc: getRandomColor()
            }
        ];
    };
    //（1） 蛇显示：每一条蛇都有显示到页面的功能，应该添加到原型中
    Snake.prototype.render = function (map) {
        //this:指向调用这个函数的蛇对象
        this.snakeElements = [];//声明数组存储身体div(用于刷新位置)
        for (var i = 0; i < this.body.length; i++) {
            //每一节身体的数据
            var section = this.body[i];
            //(1)创建元素
            var div2 = document.createElement('div');
            //（2）设置属性
            div2.style.position = 'absolute';
            div2.style.left = section.x * this.width + 'px';
            div2.style.top = section.y * this.height + 'px';
            div2.style.width = this.width + 'px';
            div2.style.height = this.height + 'px';
            div2.style.backgroundColor = section.bgc;
            this.snakeElements.push(div2);
            //(3)添加到页面
            map.appendChild(div2);
        };
    };
    //（2）蛇移动
    Snake.prototype.move = function () {
        //this:调用这个方法的蛇对象

        //(1)倒着遍历蛇的身体，让每一节身体位置与前一节一致（蛇头除外）
        for (var i = this.body.length - 1; i > 0; i--) {//细节：这里i>0,而不是i>=0,蛇头不是跟前一节位置一致
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        };
        //（2）蛇头位置取决于移动方向
        switch (this.direction) {
            case 'left':
                this.body[0].x--;
                break;
            case 'top':
                this.body[0].y--;
                break;
            case 'right':
                this.body[0].x++
                break;
            case 'bottom':
                this.body[0].y++;
                break;
        };

        console.log(this.body);

        //(3)刷新蛇
        //先移除旧蛇
        this.remove();
        //重新显示新蛇
        this.render(map);
    };

    //(3)蛇移除：remove
    Snake.prototype.remove = function () {
        //this:调用这个方法的蛇对象
        for (var i = 0; i < this.snakeElements.length; i++) {
            this.snakeElements[i].parentNode.removeChild(this.snakeElements[i]);
        };
    };

    //(4)蛇吃食物：eat
    /**
     * @description: 
     * @param {type} food:吃到的食物 
     * @param {type} map:显示到那个元素
     * @return: 
     */
    Snake.prototype.eat = function (food, map) {
        //this:调用eat方法的蛇对象

        //(1)纪录蛇当前尾巴的位置
        var wx = this.body[this.body.length - 1].x;
        var wy = this.body[this.body.length - 1].y;
        //(2）将食物添加到body的后面
        this.body.push({
            x: wx,
            y: wy,
            bgc: food.bgc
        });
        //(3)刷新蛇的位置
        //先移除旧蛇
        this.remove();
        //重新显示新蛇
        this.render(map);

    };

    //暴露接口
    w.Snake = Snake;
})(window);