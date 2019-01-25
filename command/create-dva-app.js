/*
 * @Author: liuxu
 * @Date: 2019-01-25 5:39:06
 */

'use strict';
var exec = require('child_process').exec;
var fs = require('fs');

var projectUrl = 'https://github.com/Confetti7/template-dva-app.git';

module.exports = () => {
    var rename =
        (process.argv && process.argv.slice(2) && process.argv.slice(2)[1]) ||
        'template-dva-app';

    fs.exists(rename, exists => {
        if (exists) {
            console.error(
                'There is a file with the same name already exists..'
            );
        } else {
            console.log('Start pulling..');

            // 定义git命令远程拉取项目
            var cmdStr = `git clone ` + projectUrl;

            // 执行shell命令
            exec(cmdStr, (error, stdout, stderr) => {
                if (error) {
                    console.log(error);
                    process.exit();
                }
                console.log('Complete pulling..');
                process.exit();
            });
        }
    });
};
