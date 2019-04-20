/*
 * @Author: liuxu
 * @Date: 2019-04-20 11:19:10
 */

var Progress = require('progress');

function ProgressBar(total = 128 * 1024) {
    var baseStep = 10 * 1024; //初始步长
    var currentProgress = 0; //当前进度

    /* 递归更新进度 */
    var tick = function(chunk = Math.random() * baseStep) {
        var remainingProgress = total - currentProgress; //剩余进度

        if (this.bar.complete) {
            this.bar.tick(remainingProgress);
        } else {
            if (remainingProgress > baseStep) {
                currentProgress += chunk;
                this.bar.tick(chunk);

                setTimeout(tick, Math.random() * 500); //执行初始步长
            } else {
                setTimeout(tick, 1000); //1s刷新异步状态
            }
        }
    }.bind(this);

    this.bar = new Progress('[:bar] :percent', {
        complete: '=',
        incomplete: ' ',
        width: 20,
        total: total
    });

    this.start = function() {
        this.startTime = +new Date();
        tick();
    };

    this.end = function() {
        this.endTime = +new Date();
        this.bar.complete = true;
    };

    this.timer = function() {
        return this.endTime - this.startTime;
    };
}

module.exports = ProgressBar;
