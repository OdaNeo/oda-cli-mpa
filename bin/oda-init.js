#!/usr/bin/env node
const program = require('commander')
const chalk = require('chalk')
const ora = require('ora')
const download = require('download-git-repo')
const tplObj = require(`${__dirname}/../template`)

program
    .usage('<template-name> [project-name]')

program.parse(process.argv)

// when no config 
if (program.args.length < 1) return program.help()

// validate config
let templateName = program.args[0]
let projectName = program.args[1] || 'project'

if (!tplObj[templateName]) {
    console.log(chalk.red('\n Template does not exit! \n '))
    return
}
if (!projectName) {
    console.log(chalk.red('\n Project name should not be empty! \n '))
    return
}

// 获取到template
url = tplObj[templateName]

const spinner = ora("Downloading...")
spinner.start()

download(
    url,
    projectName,
    err => {
        if (err) {
            spinner.fail()
            console.log(chalk.red(`Generation failed. ${err}`))
            return
        }

        spinner.succeed()
        console.log(chalk.green('\n Generation completed!'))
        console.log('\n To get started')
        console.log(`\n    cd ${projectName} \n`)
    }
)
