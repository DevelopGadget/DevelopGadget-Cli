#!/usr/bin/env node

const { bold } = require('chalk');
const { textSync } = require('figlet');
const { program } = require('commander');
const { gitPush } = require('./src/command_git');
// Mostrar un banner con un mensaje formado por caracteres.
const msn = (msn) => {
    console.log(
        bold.cyan(
            textSync(msn, {
                font: 'ANSI Shadow',
                horizontalLayout: 'default',
                verticalLayout: 'default',
            })
        )
    );
};

console.log(`\n`);

msn('DG-CLI');

console.log(`\n`);

program.option('-g, --git');
program.option('-m, --multiple');
program.option('-t, --template');
program.version('1.0.0');

program.parse(process.argv);

if (program.git) gitPush();