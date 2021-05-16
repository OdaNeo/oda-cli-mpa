#!/usr/bin/env node

const tplObj = require(`${__dirname}/../template`)

console.log(Object.keys(tplObj).join(','))