#!/usr/bin/env node
'use strict';

var program = require('commander');
var clone = require('../command/create-dva-app');
program.version(require('../package').version);
program.usage('<command>');

program.parse(process.argv);

// 处理参数和提供帮助信息
if (!program.args.length) {
    program.help();
} else {
    clone();
}
