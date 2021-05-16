#!/usr/bin/env node
const program = require('commander')

// 定义当前版本和指令
// command 会根据指令去自动匹配bin下面的文件名
program
    .version(require('../package.json').version)
    .usage('<command> [options]')
    .command('add', 'add a new template')
    .command('delete', 'delete a template')
    .command('list', 'list all the template')
    .command('init', 'generate a new project from a template')

// 解析argv
program.parse(process.argv)