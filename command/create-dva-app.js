/*
 * @Author: liuxu
 * @Date: 2019-01-25 5:39:06
 */

'use strict';
var exec = require('child_process').exec;
var fs = require('fs');

var colors = require('colors');
var { ProgressBar } = require('../utils');

var projectUrl = 'https://github.com/Confetti7/template-dva-app.git';

module.exports = () => {
    var rename =
        process.argv && process.argv.slice(2) && process.argv.slice(2)[0];

    fs.exists(rename, exists => {
        if (exists) {
            console.log(
                colors.red(
                    'There is a file with the same name already exists..'
                )
            );
        } else {
            console.log(
                `\nCreating a new dva app in ${colors.green(process.cwd())}.\n`
            );
            console.log('\nInstalling.. This might take a couple of seconds.');

            var progressBar = new ProgressBar();
            progressBar.start();

            // 定义git命令远程拉取项目
            var cmdStr = `git clone ${projectUrl} ${rename}`;

            // 执行shell命令
            exec(cmdStr, (error, stdout, stderr) => {
                if (error) {
                    console.log(error);
                    process.exit();
                }
                progressBar.end();
                // 进度条还没写完 晚点退出进程
                setTimeout(() => {
                    console.log(
                        `\n\nInstallation complete in ${colors.cyan(
                            progressBar.timer() / 1000 + 's'
                        )}\n`
                    );
                    process.exit();
                }, 1000);
            });
        }
    });
};
