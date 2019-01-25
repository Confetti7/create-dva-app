#!/usr/bin/env node
'use strict';

// 引入commander，用于处理自定义nodejs命令
var program = require('commander');
// 引用package.json里面的版本号来定义当前版本
program.version(require('../package').version);
// 定义使用方法
program.usage('<command>');

// 定义create-dva-app命令
program
    .command('create-dva-app')
    .description('clone template-dva-app')
    .alias('new-dva')
    .action(() => {
        require('../command/create-dva-app')();
    });

// 解析命令行参数argv，这里的process.argv是nodejs全局对象的属性
program.parse(process.argv);

// 处理参数和提供帮助信息
if (!program.args.length) {
    program.help();
}
