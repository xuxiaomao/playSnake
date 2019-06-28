(function (w) {
    //1.构造函数创建对象
    function Game() {
        //初始化三个游戏角色
        this.snake = new Snake();
        this.food = new Food();
        this.map = map;

        //开始显示到页面
        this.snake.render(this.map);
        this.food.render(this.map);
    };

    //2.开始游戏
    Game.prototype.start = function () {
        //this:调用这个方法的game对象
        window.onkeydown = function (e) {

            //this:window 默认

            /*1.原先的面向过程代码，snake和food是一个全局变量。但是现在面向对象，
            snake和food变成了游戏对象的属性。 this.snake 和 this.food 

            2.但是在window.onkeydown的事件处理函数中，this默认指向的是window

            3.需要将这个事件处理对象中的this动态修改为游戏对象
                * bind() : 不会立即执行函数，而是重新生成一个修改后this的新函数
            */
            
            var code = e.keyCode;
            console.log(code);

            switch (code) {/* 细节：蛇不能倒着走 */
                case 37://左
                    //除外right方向之外蛇才可以往左移动
                    if (this.snake.direction != 'right') {
                        this.snake.direction = 'left';
                    };

                    break;
                case 38://上
                    if (this.snake.direction != 'bottom') {
                        this.snake.direction = 'top';
                    };

                    break;
                case 39://右
                    if (this.snake.direction != 'left') {
                        this.snake.direction = 'right';
                    };
                    break;
                case 40: //下
                    if (this.snake.direction != 'top') {
                        this.snake.direction = 'bottom';
                    };
                    break;
                default:
                    return;//如果是其他按键，不做处理
                    break;
            };

            //(1)蛇移动
            this.snake.move();
            //(2)边界检测
            if (this.snake.body[0].x < 0 || this.snake.body[0].x >= map.offsetWidth / this.snake.width) {
                alert('Game Over');
                location.reload();//刷新页面
            };

            if (this.snake.body[0].y < 0 || this.snake.body[0].y >= map.offsetHeight / this.snake.height) {
                alert('Game Over');
                location.reload();//刷新页面
            };
            //(3)吃食物
            //如果蛇头位置与食物位置一致，就表示吃到食物
            if (this.snake.body[0].x == this.food.ele.offsetLeft / this.food.width && this.snake.body[0].y == this.food.ele.offsetTop / this.food.height) {
                console.log('好开心啊，有东西吃啦');
                this.snake.eat(this.food, this.map);
                //(4)刷新食物:蛇只有吃到食物才需要刷新
                this.food.ele.parentNode.removeChild(this.food.ele);
                //重新创建食物并显示到页面
                this.food = new Food();
                this.food.render(this.map);
            };
        }.bind(this);//将window.onkeydown里面的默认this(指向window).动态修改为当前作用域的this(game)
    };


    //3.结束游戏
    Game.prototype.over = function () {
        alert('Game Over');
        location.reload();
    };

    //暴露接口
    w.Game = Game;
})(window);



/**
* @description: 生成16进制随机颜色
* @param {type} 
* @return: 
*/
function getRandomColor() {
    //(1)将0-f十六个字符存入数组中
    var arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
    //(2)声明变量存储十六进制颜色
    var str = '#';
    //(3)生成随机字符 6次
    for (var i = 1; i <= 6; i++) {
        //生成随机下标（[0-15]），获取字符
        var index = Math.floor(Math.random() * 16);
        str += arr[index];
    };
    return str;
};