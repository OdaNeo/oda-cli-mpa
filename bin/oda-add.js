#!/usr/bin/env node
// 交互式
const inquirer = require('inquirer')
const chalk = require('chalk')
const fs = require('fs')

// 读取 template.json
const tplObj = require(`${__dirname}/../template.json`)

// inquirer template
let question = [
    {
        name: 'name',
        type: 'input',
        message: 'Please input the template name',
        validate(val) {
            if (val === '') {
                return 'Name is required!'
            } else if (tplObj[val]) {
                return "Template has already existed!"
            } else {
                return true
            }
        }
    },
    {
        name: 'url',
        type: 'input',
        message: 'Please input the template url',
        validate(val) {
            if (val === "") {
                return 'The url is required!'
            }
            return true
        }
    }
]

inquirer
    .prompt(question)
    .then(answer => {
        let { name, url } = answer
        // 去除unicode字符
        tplObj[name] = url.replace(/[\u0000-\u0019]/g, '')

        fs.writeFile(`${__dirname}/../template.json`, JSON.stringify(tplObj), 'utf-8', err => {
            if (err) console.log(err)
            console.log('\n')
            console.log(chalk.green('Added successfully!\n'))
            console.log(chalk.grey('The latest template list is: \n'))
            console.log(tplObj)
            console.log('\n')
        })
    })